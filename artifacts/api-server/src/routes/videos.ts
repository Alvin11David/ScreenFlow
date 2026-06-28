import { Router, type IRouter } from "express";
import { db, videosTable, videoSharesTable, videoAnalyticsTable, usersTable } from "@workspace/db";
import { eq, and, desc, count, sql } from "drizzle-orm";
import crypto from "node:crypto";
import { CreateVideoBody, UpdateVideoBody, CreateShareLinkBody, RecordAnalyticsBody } from "@workspace/api-zod";
import { requireAuth, optionalAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const limit = Math.min(Math.abs(Number(req.query.limit)) || 20, 100);
  const offset = Math.abs(Number(req.query.offset)) || 0;

  const [totalResult] = await db
    .select({ value: count() })
    .from(videosTable)
    .where(eq(videosTable.userId, req.userId!));

  const videos = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.userId, req.userId!))
    .orderBy(desc(videosTable.createdAt))
    .limit(limit)
    .offset(offset);

  res.json({ videos, total: Number(totalResult.value) });
});

router.post("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = CreateVideoRequest.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const [video] = await db
    .insert(videosTable)
    .values({ userId: req.userId!, title: parsed.data.title, description: parsed.data.description ?? null })
    .returning();

  res.status(201).json({ video });
});

router.get("/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
  const [video] = await db
    .select()
    .from(videosTable)
    .where(and(eq(videosTable.id, Number(req.params.id)), eq(videosTable.userId, req.userId!)))
    .limit(1);

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.json({ video });
});

router.patch("/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = UpdateVideoRequest.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const [video] = await db
    .update(videosTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(and(eq(videosTable.id, Number(req.params.id)), eq(videosTable.userId, req.userId!)))
    .returning();

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.json({ video });
});

router.delete("/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
  const [deleted] = await db
    .delete(videosTable)
    .where(and(eq(videosTable.id, Number(req.params.id)), eq(videosTable.userId, req.userId!)))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.json({ message: "Video deleted" });
});

router.post("/:id/share", requireAuth, async (req: AuthenticatedRequest, res) => {
  const videoId = Number(req.params.id);

  const [video] = await db
    .select()
    .from(videosTable)
    .where(and(eq(videosTable.id, videoId), eq(videosTable.userId, req.userId!)))
    .limit(1);

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  const parsed = CreateShareRequest.safeParse(req.body);
  const shareToken = crypto.randomBytes(24).toString("hex");

  let expiresAt: Date | undefined;
  if (parsed.success && parsed.data.expiresInHours) {
    expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parsed.data.expiresInHours);
  }

  await db.insert(videoSharesTable).values({
    videoId,
    shareToken,
    password: parsed.success ? (parsed.data.password ?? null) : null,
    expiresAt: expiresAt ?? null,
  });

  const url = `/videos/shared/${shareToken}`;
  res.json({ token: shareToken, url });
});

router.get("/shared/:token", optionalAuth, async (req: AuthenticatedRequest, res) => {
  const [share] = await db
    .select()
    .from(videoSharesTable)
    .where(eq(videoSharesTable.shareToken, req.params.token))
    .limit(1);

  if (!share || (share.expiresAt && share.expiresAt < new Date())) {
    res.status(404).json({ error: "Share link not found or expired" });
    return;
  }

  const [video] = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.id, share.videoId))
    .limit(1);

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  const [owner] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      avatarUrl: usersTable.avatarUrl,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, video.userId))
    .limit(1);

  res.json({ video, owner });
});

router.post("/:id/analytics", async (req, res) => {
  const videoId = Number(req.params.id);
  const parsed = AnalyticsEvent.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid analytics data" });
    return;
  }

  const [video] = await db
    .select({ id: videosTable.id })
    .from(videosTable)
    .where(eq(videosTable.id, videoId))
    .limit(1);

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  await db.insert(videoAnalyticsTable).values({
    videoId,
    watchedSeconds: parsed.data.watchedSeconds,
    totalDuration: parsed.data.totalDuration,
    referrer: parsed.data.referrer ?? null,
    viewerIp: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null,
  });

  res.json({ message: "Analytics recorded" });
});

export default router;
