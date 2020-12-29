const mysql = require('mysql2');
require("dotenv").config();

const PASSWORD = process.env.PASSWORD;

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: PASSWORD,
  database: 'YearOne',
});

