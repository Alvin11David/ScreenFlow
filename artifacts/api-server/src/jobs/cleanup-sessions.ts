import { lt } from "drizzle-orm";
import { db, sessionsTable } from "@workspace/db";
import { logger } from "../lib/logger";

const CLEANUP_INTERVAL_MS = Number(
  process.env.SESSION_CLEANUP_INTERVAL_MS ?? 60 * 60 * 1000,
);

export async function cleanupExpiredSessions(): Promise<number> {
  const deleted = await db
    .delete(sessionsTable)
    .where(lt(sessionsTable.expiresAt, new Date()))
    .returning({ id: sessionsTable.id });
  return deleted.length;
}

export function startSessionCleanup(): NodeJS.Timeout {
  const timer = setInterval(async () => {
    try {
      const count = await cleanupExpiredSessions();
      if (count > 0) {
        logger.info({ count }, "Deleted expired sessions");
      }
    } catch (err) {
      logger.error({ err }, "Session cleanup failed");
    }
  }, CLEANUP_INTERVAL_MS);
  timer.unref();
  return timer;
}
