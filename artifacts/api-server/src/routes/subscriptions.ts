import { Router, type IRouter } from "express";
import { db, subscriptionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSubscriptionRequest } from "@workspace/api-zod";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res) => {
  const [subscription] = await db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, req.userId!))
    .limit(1);

  if (!subscription) {
    const [created] = await db.insert(subscriptionsTable).values({
      userId: req.userId!,
      plan: "free",
    }).returning();
    res.json({ subscription: created });
    return;
  }

  res.json({ subscription });
});

router.put("/me", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = UpdateSubscriptionRequest.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid plan" });
    return;
  }

  const [existing] = await db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, req.userId!))
    .limit(1);

  let subscription;
  if (existing) {
    [subscription] = await db
      .update(subscriptionsTable)
      .set({ plan: parsed.data.plan, updatedAt: new Date() })
      .where(eq(subscriptionsTable.userId, req.userId!))
      .returning();
  } else {
    [subscription] = await db
      .insert(subscriptionsTable)
      .values({ userId: req.userId!, plan: parsed.data.plan })
      .returning();
  }

  res.json({ subscription });
});

export default router;
