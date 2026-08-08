import { type Request, type Response, type NextFunction } from "express";
import { getSessionUserId } from "../lib/auth";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.session;
  const userId = await getSessionUserId(token);

  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  req.userId = userId;
  next();
}
