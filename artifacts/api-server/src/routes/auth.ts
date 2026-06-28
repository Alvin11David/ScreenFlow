import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { RegisterRequest, LoginRequest } from "@workspace/api-zod";
import { hashPassword, verifyPassword, createSession, deleteSession, getUserById, getUserByEmail } from "../lib/auth";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.post("/register", async (req, res) => {
  const parsed = RegisterRequest.safeParse(req.body);
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

  res.status(201).json({ user });
});

router.post("/login", async (req, res) => {
  const parsed = LoginRequest.safeParse(req.body);
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
  res.json({ user: safeUser });
});

router.post("/logout", async (req, res) => {
  const token = req.cookies?.session;
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

export default router;
