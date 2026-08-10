import { lt } from "drizzle-orm";
import { db, sessionsTable, presenceTable, webVitalsTable } from "@workspace/db";
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

export async function cleanupStalePresence(): Promise<number> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 1);
  const deleted = await db
    .delete(presenceTable)
    .where(lt(presenceTable.lastSeenAt, cutoff))
    .returning({ id: presenceTable.id });
  return deleted.length;
}

export async function cleanupOldWebVitals(): Promise<number> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 60);
  const deleted = await db
    .delete(webVitalsTable)
    .where(lt(webVitalsTable.createdAt, cutoff))
    .returning({ id: webVitalsTable.id });
  return deleted.length;
}

export function startSessionCleanup(): NodeJS.Timeout {
  const timer = setInterval(async () => {
    try {
      const [sessions, presence, vitals] = await Promise.all([
        cleanupExpiredSessions(),
        cleanupStalePresence(),
        cleanupOldWebVitals(),
      ]);
      if (sessions > 0 || presence > 0 || vitals > 0) {
        logger.info(
          { sessions, presence, vitals },
          "Deleted stale sessions, presence rows, and web vitals",
        );
      }
    } catch (err) {
      logger.error({ err }, "Session cleanup failed");
    }
  }, CLEANUP_INTERVAL_MS);
  timer.unref();
  return timer;
}
