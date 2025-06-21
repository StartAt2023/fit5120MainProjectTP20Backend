# FIT5120 Project API Documentation

## Project Overview
This is a backend API project based on Node.js + Express + PostgreSQL, with the following main features:
- Screen usage time statistics and analysis
- Cybersecurity knowledge Q&A
- MBTI personality test
- Comment system
- Cybersecurity data visualization
- Student focus analysis

## Tech Stack
- **Backend Framework**: Express.js 5.1.0
- **Database**: PostgreSQL
- **ORM**: Native SQL queries
- **AI Service**: OpenRouter API (Mistral AI)
- **Others**: CORS, dotenv, axios

## Basic Information
- **Base URL**: `http://localhost:5000` (development environment)
- **API Prefix**: `/api`
- **Data Format**: JSON
- **Authentication**: None (public API)

---

## API Endpoints Overview

### 1. Screen Usage Statistics API (`/api/usage`)
### 2. Cybersecurity Q&A API (`/api/quiz`)
### 3. MBTI Personality Test API (`/api/mbtiquiz`)
### 4. Comment System API (`/api/comments`)
### 5. Cybersecurity Data API (`/api/cybersecurity`)
### 6. Student Focus API (`/api/studentfocus`)

---

## Detailed API Documentation

### 1. Screen Usage Statistics API

#### 1.1 Get Screen Usage Statistics
- **Endpoint**: `GET /api/usage/stats`
- **Description**: Get screen usage time statistics and AI analysis
- **Response Example**:
```json
{
  "total_records": 150,
  "device_type": {
    "Smartphone": "60.00%",
    "Laptop": "25.00%",
    "Tablet": "15.00%"
  },
  "screen_time_period": {
    "Morning": "30.00%",
    "Afternoon": "40.00%",
    "Evening": "30.00%"
  },
  "screen_activity": {
    "Social Media": "45.00%",
    "Work": "30.00%",
    "Entertainment": "25.00%"
  },
  "app_category": {
    "Social": "50.00%",
    "Productivity": "30.00%",
    "Games": "20.00%"
  },
  "average_screen_time_range": {
    "0–5": "20.00%",
    "6–10": "40.00%",
    "11–15": "30.00%",
    "16+": "10.00%"
  },
  "ai_analysis": "Based on the data, most users spend 6-10 hours on screens daily, primarily on smartphones for social media. Consider implementing digital wellbeing features."
}
```

---

### 2. Cybersecurity Q&A API

#### 2.1 Get All Questions
- **Endpoint**: `GET /api/quiz/questions`
- **Description**: Get all cybersecurity Q&A questions
- **Response Example**:
```json
[
  {
    "section": "Cybersecurity Basics",
    "question": "What is phishing?",
    "options": ["A. A fishing activity", "B. Obtaining user information through fake websites", "C. Online gaming", "D. Email service"],
    "correctanswer": "B",
    "quiztype": "multiple_choice"
  }
]
```

#### 2.2 Validate Answers
- **Endpoint**: `POST /api/quiz/validate-answers`
- **Description**: Validate user submitted answers and return AI explanations
- **Request Body**:
```json
[
  {
    "question": "What is phishing?",
    "selectedOption": "B"
  }
]
```
- **Response Example**:
```json
[
  {
    "question": "What is phishing?",
    "selectedOption": "B",
    "correctAnswer": "B",
    "isCorrect": true,
    "explanation": "Correct! Phishing is a cyber attack that obtains user sensitive information through fake websites or emails."
  }
]
```

---

### 3. MBTI Personality Test API

#### 3.1 Get MBTI Questions
- **Endpoint**: `GET /api/mbtiquiz/questions`
- **Description**: Get MBTI personality test questions
- **Response Example**:
```json
[
  {
    "question_order": 1,
    "question": "Which device do you prefer to use?",
    "options": ["Smartphone", "Laptop", "Tablet"],
    "type": "device_preference"
  }
]
```

#### 3.2 Validate MBTI Answers
- **Endpoint**: `POST /api/mbtiquiz/validate-answers`
- **Description**: Validate MBTI answers and collect screen usage data, provide personalized suggestions
- **Request Body**:
```json
[
  {
    "question_order": 1,
    "option": "Smartphone"
  },
  {
    "question_order": 6,
    "option": "A"
  }
]
```
- **Response Example**:
```json
{
  "results": [
    {
      "question_order": 6,
      "isCorrect": true,
      "explanation": "This is a question about cybersecurity awareness...",
      "correctAnswer": "A"
    }
  ],
  "feedback": "Based on your screen usage habits, I recommend setting app usage time limits, especially in the evening..."
}
```

---

### 4. Comment System API

#### 4.1 Get All Comments
- **Endpoint**: `GET /api/comments`
- **Description**: Get all comments list
- **Response Example**:
```json
[
  {
    "comment_id": 1,
    "article_id": 1,
    "comment_content": "This article is very helpful!",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

#### 4.2 Add Comment
- **Endpoint**: `POST /api/comments`
- **Description**: Add new comment
- **Request Body**:
```json
{
  "article_id": 1,
  "comment_content": "This is a new comment"
}
```
- **Response Example**:
```json
{
  "message": "Comment added successfully",
  "comment_id": 2
}
```

---

### 5. Cybersecurity Data API

#### 5.1 Get Cybersecurity Data
- **Endpoint**: `GET /api/cybersecurity/cyberData`
- **Description**: Get cybersecurity attack types and affected data statistics
- **Response Example**:
```json
[
  {
    "attack_type": "Data Breach",
    "total_data_compromised_gb": 1250.50
  },
  {
    "attack_type": "Ransomware",
    "total_data_compromised_gb": 890.25
  }
]
```

---

### 6. Student Focus API

#### 6.1 Get Student Focus Data
- **Endpoint**: `GET /api/studentfocus/studentFocus`
- **Description**: Get student screen time and focus relationship data (heatmap format)
- **Response Example**:
```json
[
  {
    "screen_bin": "0-3",
    "sleep_bin": "6-8",
    "average_focus": 8.5
  },
  {
    "screen_bin": "3-6",
    "sleep_bin": "6-8",
    "average_focus": 7.2
  }
]
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Common HTTP Status Codes
- `200`: Request successful
- `201`: Created successfully
- `404`: Route not found
- `500`: Internal server error

---

## Environment Variables Configuration

The project requires the following environment variables:
```env
DATABASE_URL=postgresql://username:password@host:port/database
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000
```

---

## Database Table Structure

### Main Data Tables
1. `screenusage` - Screen usage data
2. `quizbank` - Cybersecurity Q&A database
3. `mbti_quiz` - MBTI test database
4. `comments` - Comment data
5. `cybersecurity_data` - Cybersecurity statistics data
6. `student_screen_focus_2025` - Student focus data

---

## Deployment Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables

3. Start the service:
```bash
# Development environment
npm run dev

# Production environment
npm start
```

---

## Important Notes

1. All APIs have CORS enabled, supporting cross-origin requests
2. AI analysis features depend on OpenRouter API, requiring a valid API key
3. Database connections use connection pools for better performance
4. Error handling includes global error catching and logging 