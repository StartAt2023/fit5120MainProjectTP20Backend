# API Endpoints Summary

## Quick Reference

| Module | Endpoint | Method | Description |
|--------|----------|--------|-------------|
| **Screen Usage Statistics** | `/api/usage/stats` | GET | Get screen usage statistics and AI analysis |
| **Cybersecurity Q&A** | `/api/quiz/questions` | GET | Get all cybersecurity questions |
| | `/api/quiz/validate-answers` | POST | Validate answers and return AI explanations |
| **MBTI Personality Test** | `/api/mbtiquiz/questions` | GET | Get MBTI test questions |
| | `/api/mbtiquiz/validate-answers` | POST | Validate answers and collect usage data |
| **Comment System** | `/api/comments` | GET | Get all comments |
| | `/api/comments` | POST | Add new comment |
| **Cybersecurity Data** | `/api/cybersecurity/cyberData` | GET | Get cybersecurity statistics data |
| **Student Focus** | `/api/studentfocus/studentFocus` | GET | Get focus heatmap data |

## Request/Response Format

### GET Requests
- No request body required
- Returns JSON format data

### POST Requests
- Request body: JSON format
- Response: JSON format

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Status Codes
- `200`: Success
- `201`: Created successfully
- `404`: Route not found
- `500`: Server error

## Base URL
- Development environment: `http://localhost:5000`
- API prefix: `/api` 