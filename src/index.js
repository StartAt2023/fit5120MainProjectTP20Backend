require('dotenv').config({ path: './src/.env' }); 
const express = require('express');
const cors = require('cors');
const path = require('path');

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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Test endpoint to check if API is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const pool = require('./config/db');
    const client = await pool.connect();
    client.release();
    
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API Documentation Route
app.get('/', (req, res) => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FIT5120 API Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 0;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .api-section {
            background: white;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .api-section h2 {
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .endpoint {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid #667eea;
        }
        
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.9rem;
            margin-right: 10px;
        }
        
        .method.get {
            background: #28a745;
            color: white;
        }
        
        .method.post {
            background: #007bff;
            color: white;
        }
        
        .endpoint-url {
            font-family: 'Courier New', monospace;
            font-size: 1.1rem;
            color: #333;
        }
        
        .description {
            margin: 10px 0;
            color: #666;
        }
        
        .test-section {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
        }
        
        .test-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-right: 10px;
        }
        
        .test-button:hover {
            background: #5a6fd8;
        }
        
        .response-area {
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 15px;
            margin-top: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
        
        .status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-left: 10px;
        }
        
        .status.success {
            background: #d4edda;
            color: #155724;
        }
        
        .status.error {
            background: #f8d7da;
            color: #721c24;
        }
        
        .loading {
            display: none;
            color: #667eea;
            font-style: italic;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
        }
        
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 FIT5120 API Documentation</h1>
            <p>Interactive API documentation for the FIT5120 project backend</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">10</div>
                <div class="stat-label">Total Endpoints</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">6</div>
                <div class="stat-label">API Modules</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">2</div>
                <div class="stat-label">HTTP Methods</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">AI</div>
                <div class="stat-label">Powered</div>
            </div>
        </div>

        <!-- Test API -->
        <div class="api-section">
            <h2>🧪 Test API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/test</span>
                <div class="description">Simple test endpoint to verify API is working</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/test')">Test Endpoint</button>
                    <span class="loading" id="loading-test">Loading...</span>
                </div>
                <div class="response-area" id="response-test"></div>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/health</span>
                <div class="description">Health check endpoint to verify database connection</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/health')">Test Endpoint</button>
                    <span class="loading" id="loading-health">Loading...</span>
                </div>
                <div class="response-area" id="response-health"></div>
            </div>
        </div>

        <!-- Screen Usage Statistics API -->
        <div class="api-section">
            <h2>📊 Screen Usage Statistics API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/usage/stats</span>
                <div class="description">Get screen usage time statistics and AI analysis</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/usage/stats')">Test Endpoint</button>
                    <span class="loading" id="loading-usage">Loading...</span>
                </div>
                <div class="response-area" id="response-usage"></div>
            </div>
        </div>

        <!-- Cybersecurity Q&A API -->
        <div class="api-section">
            <h2>🔒 Cybersecurity Q&A API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/quiz/questions</span>
                <div class="description">Get all cybersecurity Q&A questions</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/quiz/questions')">Test Endpoint</button>
                    <span class="loading" id="loading-quiz-questions">Loading...</span>
                </div>
                <div class="response-area" id="response-quiz-questions"></div>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="endpoint-url">/api/quiz/validate-answers</span>
                <div class="description">Validate user submitted answers and return AI explanations</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('POST', '/api/quiz/validate-answers', [{'question': 'What is phishing?', 'selectedOption': 'B'}])">Test Endpoint</button>
                    <span class="loading" id="loading-quiz-validate">Loading...</span>
                </div>
                <div class="response-area" id="response-quiz-validate"></div>
            </div>
        </div>

        <!-- MBTI Personality Test API -->
        <div class="api-section">
            <h2>🧠 MBTI Personality Test API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/mbtiquiz/questions</span>
                <div class="description">Get MBTI personality test questions</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/mbtiquiz/questions')">Test Endpoint</button>
                    <span class="loading" id="loading-mbti-questions">Loading...</span>
                </div>
                <div class="response-area" id="response-mbti-questions"></div>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="endpoint-url">/api/mbtiquiz/validate-answers</span>
                <div class="description">Validate MBTI answers and collect screen usage data, provide personalized suggestions</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('POST', '/api/mbtiquiz/validate-answers', [{'question_order': 1, 'option': 'Smartphone'}, {'question_order': 6, 'option': 'A'}])">Test Endpoint</button>
                    <span class="loading" id="loading-mbti-validate">Loading...</span>
                </div>
                <div class="response-area" id="response-mbti-validate"></div>
            </div>
        </div>

        <!-- Comment System API -->
        <div class="api-section">
            <h2>💬 Comment System API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/comments</span>
                <div class="description">Get all comments list</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/comments')">Test Endpoint</button>
                    <span class="loading" id="loading-comments-get">Loading...</span>
                </div>
                <div class="response-area" id="response-comments-get"></div>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="endpoint-url">/api/comments</span>
                <div class="description">Add new comment</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('POST', '/api/comments', {'article_id': 1, 'comment_content': 'This is a test comment from API docs'})">Test Endpoint</button>
                    <span class="loading" id="loading-comments-post">Loading...</span>
                </div>
                <div class="response-area" id="response-comments-post"></div>
            </div>
        </div>

        <!-- Cybersecurity Data API -->
        <div class="api-section">
            <h2>🛡️ Cybersecurity Data API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/cybersecurity/cyberData</span>
                <div class="description">Get cybersecurity attack types and affected data statistics</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/cybersecurity/cyberData')">Test Endpoint</button>
                    <span class="loading" id="loading-cyber">Loading...</span>
                </div>
                <div class="response-area" id="response-cyber"></div>
            </div>
        </div>

        <!-- Student Focus API -->
        <div class="api-section">
            <h2>🎯 Student Focus API</h2>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="endpoint-url">/api/studentfocus/studentFocus</span>
                <div class="description">Get student screen time and focus relationship data (heatmap format)</div>
                <div class="test-section">
                    <button class="test-button" onclick="testEndpoint('GET', '/api/studentfocus/studentFocus')">Test Endpoint</button>
                    <span class="loading" id="loading-focus">Loading...</span>
                </div>
                <div class="response-area" id="response-focus"></div>
            </div>
        </div>
    </div>

    <script>
        async function testEndpoint(method, endpoint, body = null) {
            const responseId = 'response-' + endpoint.replace(/\\//g, '-').replace(/^api-/, '');
            const loadingId = 'loading-' + endpoint.replace(/\\//g, '-').replace(/^api-/, '');
            
            const responseArea = document.getElementById(responseId);
            const loadingElement = document.getElementById(loadingId);
            
            if (!responseArea || !loadingElement) {
                console.error('Could not find response area or loading element for:', endpoint);
                console.error('Response ID:', responseId);
                console.error('Loading ID:', loadingId);
                return;
            }
            
            // Show loading
            loadingElement.style.display = 'inline';
            responseArea.style.display = 'none';
            
            try {
                const options = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                
                if (body && method === 'POST') {
                    options.body = JSON.stringify(body);
                }
                
                console.log('Testing endpoint:', endpoint, 'with options:', options);
                
                const response = await fetch(endpoint, options);
                const data = await response.json();
                
                // Hide loading
                loadingElement.style.display = 'none';
                
                // Show response
                responseArea.style.display = 'block';
                responseArea.textContent = JSON.stringify(data, null, 2);
                
                // Add status indicator
                const status = document.createElement('span');
                status.className = response.ok ? 'status success' : 'status error';
                status.textContent = response.status + ' ' + response.statusText;
                
                // Remove existing status if any
                const existingStatus = responseArea.parentNode.querySelector('.status');
                if (existingStatus) {
                    existingStatus.remove();
                }
                
                responseArea.parentNode.appendChild(status);
                
            } catch (error) {
                console.error('Error testing endpoint:', error);
                loadingElement.style.display = 'none';
                responseArea.style.display = 'block';
                responseArea.textContent = 'Error: ' + error.message;
                
                const status = document.createElement('span');
                status.className = 'status error';
                status.textContent = 'Network Error';
                
                const existingStatus = responseArea.parentNode.querySelector('.status');
                if (existingStatus) {
                    existingStatus.remove();
                }
                
                responseArea.parentNode.appendChild(status);
            }
        }
    </script>
</body>
</html>`;

  res.send(htmlContent);
});

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
  console.log('🚀 Server running on port ' + PORT);
  console.log('📖 API Documentation available at: http://localhost:' + PORT);
});
