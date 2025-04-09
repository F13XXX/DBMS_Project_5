const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get user profile
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const query = 'SELECT user_name, role FROM users WHERE user_name = $1';
    const result = await pool.query(query, [username]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get task completions
app.get('/api/users/:username/task-completions', async (req, res) => {
  try {
    const { username } = req.params;
    
    const query = 
    `SELECT
        ta.area_id,
        ta.area_name,
        ts.statement_id,
        ts.statement_text,
        utd.query_text,
        utd.partial_solution,
        utd.difficulty_level,
        utd.processing_time
      FROM 
        task_statements ts
      JOIN 
        task_areas ta ON ts.area_id = ta.area_id
      LEFT JOIN 
        user_task_data utd ON ts.statement_id = utd.statement_id 
                           AND utd.username = $1
      ORDER BY 
        ta.area_name, ts.statement_id`;
    
    const result = await pool.query(query, [username]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching task completions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get task analytics data
app.get('/api/users/:username/task-analytics', async (req, res) => {
  try {
    const { username } = req.params;
    const totalProcessingTimeQuery = `
    WITH personal_processing_time AS (
      SELECT 
        ta.area_name,
        ta.area_id,
        COALESCE(SUM(utd.processing_time), 0) AS total_time
      FROM task_areas ta
      LEFT JOIN user_task_data utd 
        ON ta.area_id = utd.task_area_id 
        AND utd.username = $1
      GROUP BY ta.area_id
    )
    SELECT
      ppt.area_id,
      ppt.area_name,
      ppt.total_time,
      COALESCE(AVG(utd.processing_time), 0) AS global_avg
    FROM personal_processing_time AS ppt
    LEFT JOIN user_task_data utd
    ON ppt.area_id = utd.task_area_id
    GROUP BY ppt.area_id, ppt.area_name, ppt.total_time
    ORDER BY ppt.area_id
  `;

    const averageDifficultyQuery =  `
    WITH personal_average AS (
      SELECT
        ta.area_id,
        ta.area_name,
        COALESCE(
          AVG(
            CASE LOWER(utd.difficulty_level)
              WHEN 'very easy' THEN 1
              WHEN 'easy' THEN 2
              WHEN 'normal' THEN 3
              WHEN 'difficult' THEN 4
              WHEN 'very difficult' THEN 5
            END
          ), 0
        ) AS personal_avg_diff
      FROM task_areas ta
      LEFT JOIN user_task_data utd 
        ON ta.area_id = utd.task_area_id 
        AND utd.username = $1
      GROUP BY ta.area_id, ta.area_name
    ),
    global_avg AS (
      SELECT
        ta.area_id,
        COALESCE(
          AVG(
            CASE LOWER(utd.difficulty_level)
              WHEN 'very easy' THEN 1
              WHEN 'easy' THEN 2
              WHEN 'normal' THEN 3
              WHEN 'difficult' THEN 4
              WHEN 'very difficult' THEN 5
            END
          ), 0
        ) AS global_avg_diff
      FROM task_areas ta
      LEFT JOIN user_task_data utd 
        ON ta.area_id = utd.task_area_id
      GROUP BY ta.area_id
    )
    SELECT
      p.area_id,
      p.area_name,
      p.personal_avg_diff,
      g.global_avg_diff
    FROM personal_average p
    LEFT JOIN global_avg g
      ON p.area_id = g.area_id
    ORDER BY p.area_id;
  `;

    const totalProcessingTimeResult = await pool.query(totalProcessingTimeQuery, [username]);
    const averageDifficultyResult = await pool.query(averageDifficultyQuery, [username]);
    res.json({
      totalProcessingTime: totalProcessingTimeResult.rows,
      averageDifficulty: averageDifficultyResult.rows
    });

  } catch (error) {
    console.error('Error fetching task analytics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});