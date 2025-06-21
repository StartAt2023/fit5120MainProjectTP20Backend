# FIT5120 Project Backend

A Node.js backend API project for the FIT5120 course, featuring screen usage analysis, cybersecurity Q&A, MBTI personality tests, and more.

## Features

- 📊 **Screen Usage Statistics** - Analyze screen time patterns with AI insights
- 🔒 **Cybersecurity Q&A** - Interactive security knowledge testing
- 🧠 **MBTI Personality Test** - Personality assessment with digital wellbeing insights
- 💬 **Comment System** - Article commenting functionality
- 🛡️ **Cybersecurity Data** - Security statistics visualization
- 🎯 **Student Focus Analysis** - Academic focus correlation with screen time

## Tech Stack

- **Backend**: Node.js + Express.js 5.1.0
- **Database**: PostgreSQL
- **AI Integration**: OpenRouter API (Mistral AI)
- **Other**: CORS, dotenv, axios

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the `src` directory:
```env
DATABASE_URL=postgresql://username:password@host:port/database
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000
```

### 3. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 4. Access API Documentation
Once the server is running, visit:
```
http://localhost:5000
```

You'll see an interactive API documentation page similar to FastAPI's Swagger UI, where you can:
- View all available endpoints
- Test API calls directly from the browser
- See real-time responses
- Understand request/response formats

## API Endpoints

| Module | Endpoint | Method | Description |
|--------|----------|--------|-------------|
| Screen Usage | `/api/usage/stats` | GET | Get usage statistics + AI analysis |
| Cybersecurity Q&A | `/api/quiz/questions` | GET | Get all questions |
| | `/api/quiz/validate-answers` | POST | Validate answers with AI explanations |
| MBTI Test | `/api/mbtiquiz/questions` | GET | Get MBTI questions |
| | `/api/mbtiquiz/validate-answers` | POST | Validate answers + collect usage data |
| Comments | `/api/comments` | GET | Get all comments |
| | `/api/comments` | POST | Add new comment |
| Cybersecurity Data | `/api/cybersecurity/cyberData` | GET | Get security statistics |
| Student Focus | `/api/studentfocus/studentFocus` | GET | Get focus heatmap data |

## Database Tables

- `screenusage` - Screen usage data
- `quizbank` - Cybersecurity Q&A database
- `mbti_quiz` - MBTI test database
- `comments` - Comment data
- `cybersecurity_data` - Security statistics
- `student_screen_focus_2025` - Student focus data

## Documentation

- **Interactive API Docs**: Visit `http://localhost:5000` for live documentation
- **Detailed API Docs**: See `API_DOCUMENTATION_EN.md` for comprehensive documentation
- **Quick Reference**: See `API_ENDPOINTS_SUMMARY_EN.md` for endpoint summary

## Features

### 🚀 Interactive Documentation
- FastAPI-style documentation page
- Real-time API testing
- Beautiful, responsive design
- Status indicators and error handling

### 🤖 AI-Powered Insights
- Screen usage analysis with AI recommendations
- Intelligent quiz explanations
- Personalized digital wellbeing suggestions

### 📊 Data Analytics
- Statistical analysis of screen usage patterns
- Cybersecurity data visualization
- Student focus correlation analysis

## Development

### Project Structure
```
src/
├── config/
│   └── db.js              # Database configuration
├── controllers/           # API controllers
├── routes/               # API routes
└── index.js              # Main server file
```

### Adding New Endpoints
1. Create controller in `controllers/`
2. Create route in `routes/`
3. Register route in `index.js`
4. Update documentation

## License

This project is part of the FIT5120 course at Monash University.
