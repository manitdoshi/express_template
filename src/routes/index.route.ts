import { Router } from "express";
import healthRoutes from "./health.route.js";

const router = Router();

// Mount route groups
router.use(healthRoutes);

export default router;
