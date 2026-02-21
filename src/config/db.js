
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "api.siodev.sbs",
  user: process.env.DB_USER || "sio",
  password: process.env.DB_PASSWORD || "Sio@1234",
  database: process.env.DB_NAME || "kasir_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;



