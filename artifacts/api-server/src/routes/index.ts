import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import authRouter from "./auth";
import videosRouter from "./videos";
import teamsRouter from "./teams";
import subscriptionsRouter from "./subscriptions";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use("/auth", authRouter);
router.use("/videos", videosRouter);
router.use("/teams", teamsRouter);
router.use("/subscriptions", subscriptionsRouter);

export default router;
