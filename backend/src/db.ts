// src/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "비밀번호",
  database: "데이터베이스명",
  waitForConnections: true,
  connectionLimit: 10,
});
