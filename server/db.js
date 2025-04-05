const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'user_task',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;
