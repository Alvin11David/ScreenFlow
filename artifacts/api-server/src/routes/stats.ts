import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/stats", (_req, res) => {
  res.json({
    activeUsers: 500000,
    videosCreated: 10000000,
    appStoreRating: 4.9,
    countries: 180,
  });
});

export default router;
