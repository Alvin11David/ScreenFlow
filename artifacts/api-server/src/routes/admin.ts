import { Router, type IRouter } from "express";
import { db, pool, usersTable, webVitalsTable } from "@workspace/db";
import { and, count, gte, inArray, sql } from "drizzle-orm";
import type { AdminOverviewResponse } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";
import { countOnline } from "../lib/presence";
import { snapshotMetrics } from "../lib/metrics";
import { logger } from "../lib/logger";

const DAILY_WINDOW_DAYS = 30;
const VITALS_WINDOW_DAYS = 30;

const router: IRouter = Router();

router.use(requireAdmin);

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

async function countUsersSince(since: Date): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(usersTable)
    .where(gte(usersTable.createdAt, since));
  return row?.value ?? 0;
}

async function buildPerformance() {
  const pingStart = performance.now();
  try {
    await pool.query("SELECT 1");
    return {
      ...snapshotMetrics(),
      dbStatus: "ok" as const,
      dbPingMs: Math.round(performance.now() - pingStart),
    };
  } catch {
    return {
      ...snapshotMetrics(),
      dbStatus: "error" as const,
      dbPingMs: 0,
    };
  }
}

async function buildWebVitals() {
  const since = daysAgo(VITALS_WINDOW_DAYS);
  const rows = await db
    .select({
      type: webVitalsTable.type,
      avg: sql<number>`round(avg(${webVitalsTable.value}), 3)`,
      p75: sql<number>`round(percentile_cont(0.75) WITHIN GROUP (ORDER BY ${webVitalsTable.value}), 3)`,
    })
    .from(webVitalsTable)
    .where(
      and(
        gte(webVitalsTable.createdAt, since),
        inArray(webVitalsTable.type, ["lcp", "cls", "inp"]),
      ),
    )
    .groupBy(webVitalsTable.type);

  const map: Record<string, { avg: number; p75: number }> = {};
  for (const row of rows) {
    map[row.type] = { avg: Number(row.avg ?? 0), p75: Number(row.p75 ?? 0) };
  }

  const [countRow] = await db
    .select({ value: count() })
    .from(webVitalsTable)
    .where(gte(webVitalsTable.createdAt, since));

  return {
    lcp: map["lcp"] ?? { avg: 0, p75: 0 },
    cls: map["cls"] ?? { avg: 0, p75: 0 },
    inp: map["inp"] ?? { avg: 0, p75: 0 },
    sampleCount: countRow?.value ?? 0,
  };
}

async function buildOverview(): Promise<AdminOverviewResponse> {
  const [totalRow] = await db.select({ value: count() }).from(usersTable);

  const [today, last7d, last30d] = await Promise.all([
    countUsersSince(startOfToday()),
    countUsersSince(daysAgo(7)),
    countUsersSince(daysAgo(30)),
  ]);

  const providerRows = await db
    .select({ provider: usersTable.authProvider, count: count() })
    .from(usersTable)
    .groupBy(usersTable.authProvider);

  const providerMap: Record<string, number> = {};
  for (const row of providerRows) providerMap[row.provider] = row.count;

  const dayExpr = sql<string>`to_char(${usersTable.createdAt}, 'YYYY-MM-DD')`;
  const dailyRows = await db
    .select({
      date: dayExpr,
      provider: usersTable.authProvider,
      count: count(),
    })
    .from(usersTable)
    .where(gte(usersTable.createdAt, daysAgo(DAILY_WINDOW_DAYS)))
    .groupBy(dayExpr, usersTable.authProvider)
    .orderBy(dayExpr);

  const dailyMap = new Map<string, Record<string, number>>();
  for (const row of dailyRows) {
    const entry =
      dailyMap.get(row.date) ??
      { email: 0, google: 0, github: 0, microsoft: 0, total: 0 };
    entry[row.provider] = (entry[row.provider] ?? 0) + row.count;
    entry.total += row.count;
    dailyMap.set(row.date, entry);
  }
  const daily = [...dailyMap.entries()].map(([date, c]) => ({
    date,
    email: c.email ?? 0,
    google: c.google ?? 0,
    github: c.github ?? 0,
    microsoft: c.microsoft ?? 0,
    total: c.total ?? 0,
  }));

  const [onlineUsers, performance, webVitals] = await Promise.all([
    countOnline(),
    buildPerformance(),
    buildWebVitals(),
  ]);

  return {
    signups: {
      total: totalRow?.value ?? 0,
      providers: {
        email: providerMap["email"] ?? 0,
        google: providerMap["google"] ?? 0,
        github: providerMap["github"] ?? 0,
        microsoft: providerMap["microsoft"] ?? 0,
      },
      today,
      last7d,
      last30d,
      daily,
    },
    onlineUsers,
    performance,
    webVitals,
  };
}

router.get("/overview", async (_req, res) => {
  try {
    const data = await buildOverview();
    res.json(data);
  } catch (err) {
    logger.error({ err }, "Admin overview failed");
    res.status(500).json({ error: "Failed to load admin overview" });
  }
});

export default router;
