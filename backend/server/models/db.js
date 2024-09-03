// /server/models/db.js

const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(process.env.USER);
module.exports = pool.promise();
