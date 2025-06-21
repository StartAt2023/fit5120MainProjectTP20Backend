const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Skip SSL verification (adjust based on your needs)
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
    console.error('⚠️  Application will continue without database connection');
    console.error('   Make sure DATABASE_URL is set correctly in your environment variables');
    // Don't exit the process, let the application continue
    // process.exit(1); // Commented out to prevent app crash
  }
})();

module.exports = pool;