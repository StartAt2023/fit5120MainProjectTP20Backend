require('dotenv').config();
const axios = require('axios');

exports.generateAIFeedback = async (req, res) => {
  try {
    const userData = req.body;

    const prompt = `
You are a digital wellbeing assistant.

A user has submitted the following screen usage behavior:

- Device: ${userData.device_type}
- Time Period: ${userData.screen_time_period}
- Activity: ${userData.screen_activity}
- Daily Screen Time: ${userData.average_screen_time} hours
- App Category: ${userData.app_category}

Please give them a friendly and helpful suggestion (1 paragraph) to improve their screen habits and achieve better balance in life.
`;

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

    const feedback = response.data.choices[0].message.content;
    res.status(200).json({ feedback });
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate AI feedback' });
  }
};
