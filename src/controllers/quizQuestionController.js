const pool = require('../config/db'); 


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
        });
        continue;
      }

      const questionData = rows[0];
      const isCorrect = questionData.correctAnswer === selectedOption;

      results.push({
        question,
        selectedOption,
        correctAnswer: questionData.correctAnswer,
        isCorrect,
      });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate quiz answers', error: err.message });
  }
};