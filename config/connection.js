const mysql = require("mysql2");
require("dotenv").config();

const pass = process.env.DB_PASS;

const db = mysql.createConnection(
  {
    host: "localhost",
    port: "3306",
    user: "root",
    password: pass,
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

module.exports = db;
