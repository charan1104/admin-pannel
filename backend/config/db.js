// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// REMOVE OR COMMENT OUT THIS LINE:
// const db = pool.promise(); 

// Quick test to verify connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Successfully connected to MySQL database.');
    connection.release();
  }
});

// EXPORT THE STANDARD POOL DIRECTLY
module.exports = pool;