import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/stats", (_req, res) => {
  res.json({
    activeUsers: 500,
    videosCreated: 10,
    appStoreRating: 4.9,
    countries: 180,
  });
});

export default router;
