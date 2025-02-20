// lib/db.ts
import mysql from 'mysql2';

// Create a pool instead of a single connection
const pool = mysql.createPool({
  host: 'srv1261.hstgr.io',  // Replace with your Hostinger database host
  user: 'u495328535_aistore',  // Replace with your MySQL username
  password: 'My8572839479#',  // Replace with your MySQL password
  database: 'u495328535_AIStore',  // Replace with your database name
});

// Export the pool to use it in API routes
export default pool;
