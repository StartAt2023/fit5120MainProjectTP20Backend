const pool = require('../config/db'); // 引入 PostgreSQL 连接池

// 获取所有问题
exports.getAllMBTIQuestions = async (req, res) => {
  try {
    const query = `
      SELECT "order", question, options, type
      FROM mbti_quiz
      ORDER BY "order" ASC;
    `;
    const { rows: questions } = await pool.query(query);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve MBTI quiz questions', error: err.message });
  }
};

// 校验答案
exports.validateAnswers = async (req, res) => {
  try {
    const answers = req.body;
    const results = [];

    for (const answer of answers) {
      const { option, order } = answer;

      const query = `
        SELECT correct_answer, explanation
        FROM mbti_quiz
        WHERE "order" = $1;
      `;
      const { rows } = await pool.query(query, [order]);

      if (rows.length === 0) {
        results.push({ order, message: 'Question not found' });
        continue;
      }

      const question = rows[0];

      if (!question.correct_answer) {
        results.push({
          order,
          isCorrect: null,
          explanation: "This question is for data collection purposes only.",
          correctAnswer: null
        });
        continue;
      }

      const isCorrect = question.correct_answer === option;

      results.push({
        order,
        isCorrect,
        explanation: question.explanation,
        correctAnswer: question.correct_answer
      });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate answers', error: err.message });
  }
};