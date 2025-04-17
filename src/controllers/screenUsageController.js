const pool = require('../config/db'); 

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


    const result = {
      total_records: total,
      device_type: countByField('device_type'),
      screen_time_period: countByField('screen_time_period'),
      screen_activity: countByField('screen_activity'),
      app_category: countByField('app_category'),
      average_screen_time_range: (() => {
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
      })()
    };

    res.status(200).json(result);
  } catch (err) {
    console.error('Error processing screen usage stats:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
