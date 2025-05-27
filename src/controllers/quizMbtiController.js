const pool = require('../config/db');
const axios = require('axios'); // 用于调用 OpenRouter AI
require('dotenv').config();

exports.getAllMBTIQuestions = async (req, res) => {
  try {
    const query = `
      SELECT "question_order", question, options, type
      FROM mbti_quiz
      ORDER BY "question_order" ASC;
    `;
    const { rows: questions } = await pool.query(query);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve MBTI quiz questions', error: err.message });
  }
};

exports.validateAnswers = async (req, res) => {
  try {
    const answers = req.body;
    const results = [];
    const usageFields = {
      device_type: null,
      screen_time_period: null,
      screen_activity: null,
      average_screen_time: null,
      app_category: null
    };

    for (const answer of answers) {
      const { option, question_order } = answer;

      if (question_order >= 1 && question_order <= 5) {
        switch (question_order) {
          case 1:
            usageFields.device_type = option;
            break;
          case 2:
            usageFields.screen_time_period = option;
            break;
          case 3:
            usageFields.screen_activity = option;
            break;
          case 4:
            usageFields.average_screen_time = parseInt(option);
            break;
          case 5:
            usageFields.app_category = Array.isArray(option) ? option[0] : option;
            break;
        }
      }

      // 第6题及以后：只查数据库判断正确性
      if (question_order > 5) {
        const query = `
          SELECT correct_answer, explanation
          FROM mbti_quiz
          WHERE "question_order" = $1;
        `;
        const { rows } = await pool.query(query, [question_order]);

        if (rows.length === 0) {
          results.push({ question_order, message: 'Question not found' });
          continue;
        }

        const question = rows[0];

        if (!question.correct_answer) {
          results.push({
            question_order,
            isCorrect: null,
            explanation: "This question is for data collection purposes only.",
            correctAnswer: null
          });
          continue;
        }

        const isCorrect = question.correct_answer === option;

        results.push({
          question_order,
          isCorrect,
          explanation: question.explanation,
          correctAnswer: question.correct_answer
        });
      }
    }

    // 判断前5题是否全部回答，用于插入和AI调用
    const allAnswered = Object.values(usageFields).every(val => val !== null && val !== '');
    let aiFeedback = null;

    if (allAnswered) {
      // 插入数据库
      const insertQuery = `
        INSERT INTO screenusage 
        (device_type, screen_time_period, screen_activity, average_screen_time, app_category)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const insertValues = [
        usageFields.device_type,
        usageFields.screen_time_period,
        usageFields.screen_activity,
        usageFields.average_screen_time,
        usageFields.app_category
      ];
      await pool.query(insertQuery, insertValues);

      // 构造用于 AI 分析的 prompt（只包含前五题）
      const prompt = `
You are a digital wellbeing assistant.

A user has submitted the following screen usage behavior:

- Device: ${usageFields.device_type}
- Time Period: ${usageFields.screen_time_period}
- Activity: ${usageFields.screen_activity}
- Daily Screen Time: ${usageFields.average_screen_time} hours
- App Category: ${usageFields.app_category}

Please give them a friendly and helpful suggestion (1 paragraph) to improve their screen habits and achieve better balance in life.
`;

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
        aiFeedback = response.data.choices[0].message.content;
      } catch (error) {
        console.error('AI feedback error:', error.response?.data || error.message);
        aiFeedback = 'Unable to generate feedback due to AI service error.';
      }
    }

    res.status(200).json({
      results,
      feedback: aiFeedback
    });

  } catch (err) {
    console.error('Error validating answers:', err.message);
    res.status(500).json({ message: 'Failed to validate answers', error: err.message });
  }
};