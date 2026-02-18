import bcrypt from "bcrypt";
import { query } from "../config/query.js";

export class UserService {

  async getAllUsers() {
    const result = await query(`
      SELECT u.id, u.email, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `);

    return result.rows;
  }

  async createUser(email: string, password: string, roleId: number) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(`
      INSERT INTO users (email, password, role_id)
      VALUES ($1, $2, $3)
      RETURNING id, email, role_id
    `, [email, hashedPassword, roleId]);

    return result.rows[0];
  }

  async findByEmail(email: string) {
    const result = await query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    return result.rows[0];
  }

  async getUserPermission(userId: number) {
    const result = await query(`
      SELECT p.name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = $1
    `, [userId]);

    return result.rows;
  }

  async updateUserRole(roleId:number,userId:number){
    const result = await query(`
        UPDATE users
        SET role_id= $1 
        WHERE id=$2
        RETURNING id, email, role_id`,[roleId,userId]);
        return result.rows[0];
  }

async deleteUser(userId:number){
    const result = await query(`
        
        DELETE FROM users
        WHERE id = $1  
        `,[userId]);
        return {message: "user deleted"};
}


}
