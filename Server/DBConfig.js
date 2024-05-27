const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

// load environment variables
dotenv.config({
  override: true,
  path: path.join(__dirname, ".env"),
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
