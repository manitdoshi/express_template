import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { requirePermission } from "../middleware/permission.middleware.js";


const router= Router();
const controller= new UserController();


router.get("/",requirePermission("VIEW_USERS"),controller.getUsers.bind(controller));

router.post("/",requirePermission("CREATE_USER"),controller.createUser.bind(controller));

router.get("/:id/permissions",controller.getUserPermission.bind(controller));


router.patch("/:id/role",controller.updateUserRole.bind(controller));

router.delete("/:id",requirePermission("VIEW_USERS"),controller.deleteUser.bind(controller));

export default router;
