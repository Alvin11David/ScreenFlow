import { Router, type IRouter } from "express";
import { ReportPresenceResponse } from "@workspace/api-zod";
import { getRequestToken } from "../middlewares/auth";
import { getSessionUserId } from "../lib/auth";
import {
  generateVisitorId,
  removeVisitorPresence,
  touchUserPresence,
  touchVisitorPresence,
} from "../lib/presence";
import { presenceRateLimit } from "../middlewares/rate-limit";

const VISITOR_COOKIE = "visitor_id";
const VISITOR_MAX_AGE = 365 * 24 * 60 * 60 * 1000;

const router: IRouter = Router();

router.post("/", presenceRateLimit, async (req, res) => {
  const token = getRequestToken(req);
  const userId = await getSessionUserId(token);
  const visitorId =
    (req.cookies?.[VISITOR_COOKIE] as string | undefined) ?? "";

  if (userId) {
    if (visitorId) await removeVisitorPresence(visitorId);
    await touchUserPresence(userId);
    res.json(ReportPresenceResponse.parse({ message: "ok" }));
    return;
  }

  const nextVisitorId = visitorId || generateVisitorId();
  res.cookie(VISITOR_COOKIE, nextVisitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: VISITOR_MAX_AGE,
    path: "/",
  });
  await touchVisitorPresence(nextVisitorId);
  res.json(ReportPresenceResponse.parse({ message: "ok" }));
});

export default router;
