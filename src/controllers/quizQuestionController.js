const pool = require('../config/db'); // 引入 PostgreSQL 连接池

// 获取所有测验问题
exports.getAllQuizQuestions = async (req, res) => {
  try {
    const query = `
      SELECT section, question, options, correctanswer,quiztype
      FROM quizbank;
    `;
    const { rows: questions } = await pool.query(query);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve quiz questions', error: err.message });
  }
};

// 校验测验答案
exports.validateQuizAnswers = async (req, res) => {
  try {
    const answers = req.body;
    const results = [];

    for (const answer of answers) {
      const { id, selectedOption } = answer;

      const query = `
        SELECT correctanswer
        FROM quizbank
        WHERE id = $1;
      `;
      const { rows } = await pool.query(query, [id]);

      if (rows.length === 0) {
        results.push({
          id,
          selectedOption,
          correctAnswer: null,
          isCorrect: false,
          message: 'Question not found',
        });
        continue;
      }

      const question = rows[0];
      const isCorrect = question.correctAnswer === selectedOption;

      results.push({
        id,
        selectedOption,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    }

    console.log(results);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate quiz answers', error: err.message });
  }
};