require('dotenv').config({ path: './src/.env' }); 
const express = require('express');
const cors = require('cors');

const usageRoutes = require('./routes/screenUsageRoutes');
const quizRoutes = require('./routes/quizQuestionRoutes');
const mbtiQuizRoutes = require('./routes/mbtiQuizRouters');
const commentRoutes = require('./routes/commentListRouters'); 
const cyberSecurityRoutes = require('./routes/cyberSecurityRouters'); 
const studentFocusRoutes = require('./routes/studentFocusRouters');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define routes
app.use('/api/usage', usageRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/mbtiquiz', mbtiQuizRoutes);
app.use('/api/comments', commentRoutes); 
app.use('/api/cybersecurity', cyberSecurityRoutes); 
app.use('/api/studentfocus', studentFocusRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
