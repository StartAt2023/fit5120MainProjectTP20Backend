const pool = require('../config/db'); 


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

    for (const answer of answers) {
      const { option, question_order } = answer;

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

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate answers', error: err.message });
  }
};