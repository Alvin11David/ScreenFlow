import { Router, type IRouter } from "express";
import { ReportWebVitalBody, ReportWebVitalResponse } from "@workspace/api-zod";
import { db, webVitalsTable } from "@workspace/db";
import { rumRateLimit } from "../middlewares/rate-limit";

const router: IRouter = Router();

router.post("/", rumRateLimit, async (req, res) => {
  const parsed = ReportWebVitalBody.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { type, value, rating, path } = parsed.data;
  await db.insert(webVitalsTable).values({
    type,
    value,
    rating,
    path: path ?? null,
  });

  res.json(ReportWebVitalResponse.parse({ message: "ok" }));
});

export default router;
