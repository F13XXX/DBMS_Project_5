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



// Get time spent on tasks
app.get('/api/users/:username/time-spent', async (req, res) => {
  try {
    const { username } = req.params;
    const query = `
      SELECT 
        utd.data_id,
        ts.statement_text,
        ta.area_name,
        utd.processing_time
      FROM 
        user_task_data utd
      JOIN 
        task_statements ts ON utd.statement_id = ts.statement_id
      JOIN 
        task_areas ta ON utd.task_area_id = ta.area_id
      WHERE 
        utd.username = $1
      ORDER BY 
        utd.processing_time DESC
    `;
    
    const result = await pool.query(query, [username]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching time spent data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
