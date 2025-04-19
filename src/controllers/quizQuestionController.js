const pool = require('../config/db');
const axios = require('axios');
require('dotenv').config();

exports.getAllQuizQuestions = async (req, res) => {
  try {
    const query = `
      SELECT section, question, options, correctanswer, quiztype
      FROM quizbank;
    `;
    const { rows: questions } = await pool.query(query);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve quiz questions', error: err.message });
  }
};

exports.validateQuizAnswers = async (req, res) => {
  try {
    const answers = req.body; 
    const results = [];

    for (const answer of answers) {
      const { question, selectedOption } = answer; 

      const query = `
        SELECT correctanswer AS "correctAnswer"
        FROM quizbank
        WHERE question = $1;
      `;
      const { rows } = await pool.query(query, [question]); 

      if (rows.length === 0) {
        results.push({
          question,
          selectedOption,
          correctAnswer: null,
          isCorrect: false,
          message: 'Question not found',
          explanation: 'No explanation available because the question was not found.'
        });
        continue;
      }

      const questionData = rows[0];
      const isCorrect = questionData.correctAnswer === selectedOption;

      let explanation = '';
      const prompt = `
The user was given the following multiple-choice quiz question:

Question: ${question}
User selected: ${selectedOption}
Correct answer: ${questionData.correctAnswer}

Please explain why the user's answer is ${isCorrect ? 'correct' : 'incorrect'}, and provide a short explanation in no more than 20 words.`;

      try {
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'mistralai/mistral-small-3.1-24b-instruct:free',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000
          }
        );
        explanation = response.data.choices[0].message.content;
      } catch (error) {
        console.error('AI explanation error:', error.response?.data || error.message);
        explanation = 'Unable to generate explanation due to AI service error.';
      }

      results.push({
        question,
        selectedOption,
        correctAnswer: questionData.correctAnswer,
        isCorrect,
        explanation
      });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate quiz answers', error: err.message });
  }
};