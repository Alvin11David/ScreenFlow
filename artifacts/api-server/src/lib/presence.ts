import crypto from "node:crypto";
import { db, presenceTable, usersTable } from "@workspace/db";
import { eq, gt } from "drizzle-orm";

export const ONLINE_WINDOW_MINUTES = 5;
const HEARTBEAT_THROTTLE_MS = 60 * 1000;

const lastTouch = new Map<string, number>();

function throttled(key: string): boolean {
  const now = Date.now();
  const last = lastTouch.get(key);
  if (last && now - last < HEARTBEAT_THROTTLE_MS) return true;
  if (lastTouch.size > 100_000) lastTouch.clear();
  lastTouch.set(key, now);
  return false;
}

export function generateVisitorId(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function isOnlineSince(): Date {
  const date = new Date();
  date.setMinutes(date.getMinutes() - ONLINE_WINDOW_MINUTES);
  return date;
}

export async function touchUserPresence(userId: number): Promise<void> {
  if (throttled(`user:${userId}`)) return;
  const now = new Date();
  await db
    .insert(presenceTable)
    .values({ userId, lastSeenAt: now })
    .onConflictDoUpdate({
      target: presenceTable.userId,
      set: { lastSeenAt: now },
    });
  await db
    .update(usersTable)
    .set({ lastSeenAt: now })
    .where(eq(usersTable.id, userId));
}

export async function touchVisitorPresence(visitorId: string): Promise<void> {
  if (throttled(`visitor:${visitorId}`)) return;
  const now = new Date();
  await db
    .insert(presenceTable)
    .values({ visitorId, lastSeenAt: now })
    .onConflictDoUpdate({
      target: presenceTable.visitorId,
      set: { lastSeenAt: now },
    });
}

export async function removeVisitorPresence(visitorId: string): Promise<void> {
  await db.delete(presenceTable).where(eq(presenceTable.visitorId, visitorId));
}

export async function countOnline() {
  const since = isOnlineSince();
  const [all] = await db
    .select({ value: db.$count(presenceTable, gt(presenceTable.lastSeenAt, since)) })
    .from(presenceTable);
  const [auth] = await db
    .select({
      value: db.$count(
        presenceTable,
        gt(presenceTable.lastSeenAt, since) && presenceTable.userId != null,
      ),
    })
    .from(presenceTable);

  const total = Number(all?.value ?? 0);
  const authenticated = Number(auth?.value ?? 0);
  return {
    current: total,
    authenticated,
    anonymous: total - authenticated,
    windowMinutes: ONLINE_WINDOW_MINUTES,
  };
}
