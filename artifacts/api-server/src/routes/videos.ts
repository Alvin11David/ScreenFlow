import { Router, type IRouter } from "express";
import { db, videosTable } from "@workspace/db";
import { eq, and, desc, count } from "drizzle-orm";
import { CreateVideoBody, UpdateVideoBody } from "@workspace/api-zod";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

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
  const parsed = CreateVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { title, description, fileUrl, thumbnailUrl, duration, fileSize, resolution, status } = parsed.data;

  const [video] = await db
    .insert(videosTable)
    .values({
      userId: req.userId!,
      title,
      description: description ?? null,
      fileUrl: fileUrl ?? null,
      thumbnailUrl: thumbnailUrl ?? null,
      duration: duration ?? null,
      fileSize: fileSize ?? null,
      resolution: resolution ?? null,
      status: status ?? undefined,
    })
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
  const parsed = UpdateVideoBody.safeParse(req.body);
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

export default router;
