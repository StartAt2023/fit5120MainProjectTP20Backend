const { Pool } = require('pg');

// Function to connect to PostgreSQL
const connectDB = async () => {
  try {
    // Check if the DATABASE_URL environment variable is defined
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    // Create a new PostgreSQL connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Test the connection
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected');

    // Release the client back to the pool
    client.release();

    // Return the pool for use in the application
    return pool;
  } catch (error) {
    // Log the error message and stack trace if the connection fails
    console.error('❌ PostgreSQL Connection Failed:', error.message);
    console.error(error.stack);

    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;