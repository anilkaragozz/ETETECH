import { Router } from "express";
import { getDashboardStats } from "./controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getDashboardStats);

export default router;
