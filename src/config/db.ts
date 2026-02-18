
import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rbac_system",
  password: "postgres",
  port: 5432,
}



);
