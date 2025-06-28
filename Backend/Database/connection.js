const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_ds',
  waitForConnections: true,
  connectionLimit: 10,
});
module.exports = connection;