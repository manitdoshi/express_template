import type { Request, Response, NextFunction } from "express";
import { query } from "../config/query.js";

export function requirePermission(permissionName: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdHeader = req.headers["x-user-id"];

      if (!userIdHeader) {
        return res.status(401).json({ message: "Missing x-user-id header" });
      }

      const userId = Number(userIdHeader);

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      const result = await query(`
        SELECT p.name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN role_permission rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = $1
      `, [userId]);

      const userPermissions = result.rows.map(p => p.name);

      if (!userPermissions.includes(permissionName)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();

    } catch (error) {
      console.error("Permission middleware error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
