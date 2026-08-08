import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { db, sessionsTable, usersTable, passwordResetTokensTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 10;
const SESSION_DURATION_DAYS = 30;
const RESET_TOKEN_EXPIRY_MINUTES = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

function getExpiresAt(): Date {
  const date = new Date();
  date.setDate(date.getDate() + SESSION_DURATION_DAYS);
  return date;
}

export async function createSession(userId: number): Promise<string> {
  const token = generateSessionToken();
  await db.insert(sessionsTable).values({
    userId,
    token,
    expiresAt: getExpiresAt(),
  });
  return token;
}

export async function getSessionUserId(
  token: string | undefined,
): Promise<number | null> {
  if (!token) return null;

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.token, token))
    .limit(1);

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, session.id));
    return null;
  }

  return session.userId;
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
}

export async function getUserById(id: number) {
  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      avatarUrl: usersTable.avatarUrl,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);
  return user ?? null;
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return user ?? null;
}

export async function createPasswordResetToken(
  userId: number,
  email: string,
): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + RESET_TOKEN_EXPIRY_MINUTES);

  await db.insert(passwordResetTokensTable).values({
    userId,
    email,
    token,
    expiresAt,
  });

  return token;
}

export async function verifyPasswordResetToken(
  token: string,
): Promise<{ userId: number; email: string } | null> {
  const [record] = await db
    .select()
    .from(passwordResetTokensTable)
    .where(eq(passwordResetTokensTable.token, token))
    .limit(1);

  if (!record) return null;
  if (record.expiresAt < new Date()) return null;

  return { userId: record.userId, email: record.email };
}

