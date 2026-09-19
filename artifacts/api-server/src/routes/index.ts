import { Router, type IRouter } from "express";
import healthRouter from "./health";
import freshrouteRouter from "./freshroute";

const router: IRouter = Router();

router.use(healthRouter);
router.use(freshrouteRouter);

export default router;
