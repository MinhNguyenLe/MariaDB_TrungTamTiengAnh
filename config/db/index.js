const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  name: process.env.DB_NAME,
  connectionLimit: 5,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") console.log("DB connect lost");
    if (err.code === "ER_CON_COUNT_ERROR")
      console.log("DB has too many connection");
    if (err.code === "ECONNREFUSED") console.log("DB connection was refused");
  }
  if (connection) connection.release();
});

module.exports = pool;
