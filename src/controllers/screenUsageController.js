const pool = require('../config/db');
const axios = require('axios');
require('dotenv').config();

exports.getScreenUsageStats = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM screenusage');
    const total = rows.length;

    if (total === 0) {
      return res.status(200).json({ message: 'No data found' });
    }

    const countByField = (field) => {
      const counts = {};
      for (const row of rows) {
        const value = row[field];
        counts[value] = (counts[value] || 0) + 1;
      }
      const percentages = {};
      for (const key in counts) {
        percentages[key] = ((counts[key] / total) * 100).toFixed(2) + '%';
      }
      return percentages;
    };

    const deviceType = countByField('device_type');
    const screenTimePeriod = countByField('screen_time_period');
    const screenActivity = countByField('screen_activity');
    const appCategory = countByField('app_category');

    const averageScreenTimeRange = (() => {
      const ranges = {
        '0–5': 0,
        '6–10': 0,
        '11–15': 0,
        '16+': 0
      };
      for (const row of rows) {
        const time = row.average_screen_time;
        if (time <= 5) ranges['0–5']++;
        else if (time <= 10) ranges['6–10']++;
        else if (time <= 15) ranges['11–15']++;
        else ranges['16+']++;
      }
      const percentages = {};
      for (const key in ranges) {
        percentages[key] = ((ranges[key] / total) * 100).toFixed(2) + '%';
      }
      return percentages;
    })();

    const result = {
      total_records: total,
      device_type: deviceType,
      screen_time_period: screenTimePeriod,
      screen_activity: screenActivity,
      app_category: appCategory,
      average_screen_time_range: averageScreenTimeRange
    };

    let aiAnalysis = '';
    const aiPrompt = `
Here is a summary of screen usage data in percentage:

Device Types: ${JSON.stringify(deviceType)}
Time Periods: ${JSON.stringify(screenTimePeriod)}
Activities: ${JSON.stringify(screenActivity)}
App Categories: ${JSON.stringify(appCategory)}
Screen Time Ranges: ${JSON.stringify(averageScreenTimeRange)}

Please analyze this data and provide a brief summary (max 50 words) highlighting trends, concerns, or suggestions.
`;

    try {
      const aiResponse = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-small-3.1-24b-instruct:free',
          messages: [
            {
              role: 'user',
              content: aiPrompt
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 20000
        }
      );
      aiAnalysis = aiResponse.data.choices[0].message.content;
    } catch (error) {
      console.error('AI analysis error:', error.response?.data || error.message);
      aiAnalysis = 'Unable to generate analysis due to AI service error.';
    }

    res.status(200).json({ ...result, ai_analysis: aiAnalysis });
  } catch (err) {
    console.error('Error processing screen usage stats:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
