require('dotenv').config({ path: './src/.env' }); 
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware
const usageRoutes = require('./routes/screenUsageRoutes'); // Import screen usage routes
const quizRoutes = require('./routes/quizQuestionRoutes');
const mbtiQuizRoutes = require('./routes/mbtiQuizRouters');

const app = express(); // Initialize Express application



// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes for screen usage data
// All routes under /api/usage will be handled by usageRoutes
app.use('/api/usage', usageRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/mbtiquiz', mbtiQuizRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for catching and responding to server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: 'Internal server error' }); // Respond with a 500 status code
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`); // Log a message indicating the server is running
});