// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool for efficiency
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to support Promises (async/await)
const db = pool.promise();

// Quick test to verify connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Successfully connected to MySQL database.');
    connection.release();
  }
});

module.exports = db;