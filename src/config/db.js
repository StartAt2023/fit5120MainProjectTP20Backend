const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 跳过 SSL 校验（根据你的需求调整）
  },
});

// Test the connection when the application starts
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL Connection Failed:', error.message);
    console.error(error.stack);
    process.exit(1); // Exit the process if the connection fails
  }
})();

module.exports = pool;