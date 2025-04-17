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

    // 用于 screen_usage 插入的字段容器
    const usageFields = {
      device_type: null,
      screen_time_period: null,
      screen_activity: null,
      average_screen_time: null,
      app_category: null
    };

    for (const answer of answers) {
      const { option, question_order } = answer;

      // 收集前5题用于插入数据库
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

      // 仅6号题以后参与正确答案校验
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

    // 检查前5题是否都填写完毕，再插入数据库
    const allAnswered = Object.values(usageFields).every(val => val !== null && val !== '');
    if (allAnswered) {
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
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error validating answers:', err.message);
    res.status(500).json({ message: 'Failed to validate answers', error: err.message });
  }
};