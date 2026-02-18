import { createServer } from "./server.js";
import { Pool } from "pg";
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = createServer();

import { pool } from "./config/db.js";

pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB failed:", err));


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
