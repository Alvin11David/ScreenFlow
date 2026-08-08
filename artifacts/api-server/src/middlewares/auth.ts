import { type Request, type Response, type NextFunction } from "express";
import { getSessionUserId } from "../lib/auth";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export function getRequestToken(req: Request): string | undefined {
  const cookieToken = req.cookies?.session;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim() || undefined;
  }

  return undefined;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = getRequestToken(req);
  const userId = await getSessionUserId(token);

  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  req.userId = userId;
  next();
}
