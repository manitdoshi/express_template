import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service.js";
import { config } from "dotenv";
const userService = new UserService();

const JWT_SECRET = process.env.SECRET;

export class AuthService {

  async login(email: string, password: string) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
 const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );


    return token;
  }
}
