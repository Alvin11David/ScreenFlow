import { Router, type IRouter } from "express";
import { db, usersTable, passwordResetTokensTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { RegisterBody, LoginBody } from "@workspace/api-zod";
import {
  hashPassword,
  verifyPassword,
  createSession,
  deleteSession,
  getUserById,
  getUserByEmail,
  createPasswordResetToken,
  verifyPasswordResetToken,
} from "../lib/auth";
import { sendResetCodeEmail } from "../lib/mail";
import { requireAuth, getRequestToken, type AuthenticatedRequest } from "../middlewares/auth";
import { authRateLimit } from "../middlewares/rate-limit";

const router: IRouter = Router();

router.post("/register", authRateLimit, async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { email, name, password } = parsed.data;

  const existing = await getUserByEmail(email);
  if (existing) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(usersTable)
    .values({ email, name, passwordHash })
    .returning({ id: usersTable.id, email: usersTable.email, name: usersTable.name, avatarUrl: usersTable.avatarUrl, role: usersTable.role, createdAt: usersTable.createdAt });

  const token = await createSession(user.id);
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(201).json({ user, token });
});

router.post("/login", authRateLimit, async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { email, password } = parsed.data;
  const user = await getUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = await createSession(user.id);
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  const { passwordHash: _, ...safeUser } = user;
  res.json({ user: safeUser, token });
});

router.post("/logout", async (req, res) => {
  const token = getRequestToken(req);
  if (token) {
    await deleteSession(token);
  }
  res.clearCookie("session", { path: "/" });
  res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res) => {
  const user = await getUserById(req.userId!);
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  res.json({ user });
});

router.post("/forgot-password", authRateLimit, async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    res.status(200).json({ message: "If an account exists, a reset code has been sent" });
    return;
  }

  const token = await createPasswordResetToken(user.id, user.email);
  const code = token.slice(0, 5).toUpperCase();

  try {
    await sendResetCodeEmail(user.email, code);
  } catch {
    console.error("Failed to send reset email");
  }

  res.status(200).json({ message: "If an account exists, a reset code has been sent" });
});

router.post("/verify-reset-code", authRateLimit, async (req, res) => {
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !code) {
    res.status(400).json({ error: "Email and code are required" });
    return;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: "Invalid code" });
    return;
  }

  const [record] = await db
    .select()
    .from(passwordResetTokensTable)
    .where(eq(passwordResetTokensTable.userId, user.id))
    .orderBy(passwordResetTokensTable.createdAt)
    .limit(1);

  if (!record) {
    res.status(400).json({ error: "Invalid code" });
    return;
  }

  const expectedCode = record.token.slice(0, 5).toUpperCase();

  if (code.toUpperCase() !== expectedCode) {
    res.status(400).json({ error: "Invalid code" });
    return;
  }

  res.status(200).json({ message: "Code verified", userId: user.id });
});

export default router;
