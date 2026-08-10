import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import authRouter from "./auth";
import videosRouter from "./videos";
import teamsRouter from "./teams";
import subscriptionsRouter from "./subscriptions";
import adminRouter from "./admin";
import presenceRouter from "./presence";
import rumRouter from "./rum";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use("/auth", authRouter);
router.use("/videos", videosRouter);
router.use("/teams", teamsRouter);
router.use("/subscriptions", subscriptionsRouter);
router.use("/admin", adminRouter);
router.use("/presence", presenceRouter);
router.use("/rum", rumRouter);

export default router;
