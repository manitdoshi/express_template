import { Router } from "express";
import healthRoutes from "./health.route.js";
import UserRoutes from "./user.routes.js"
import AuthRoutes from "./auth.routes.js"
import type { Request, Response } from "express";


const router = Router();

// Mount route groups
router.use(healthRoutes);
router.use("/users",UserRoutes);
router.use("/login",AuthRoutes)
router.get("/", (req:Request,res:Response)=>{
res.status(200).json({
    message: "jaa na lawde",
})


});


export default router;
