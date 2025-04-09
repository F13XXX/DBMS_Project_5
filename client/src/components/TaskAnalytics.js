import React, { useEffect, useState } from 'react';
import { 
  ComposedChart, 
  Bar,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  Grid, 
  Paper, 
  Typography, 
  CircularProgress,
  Box
} from '@mui/material';

const CHART_COLORS = ['#0088FE', '#FE7600', '#FFBB28', '#FF8042', '#8884d8'];

const TaskAnalytics = ({ username }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${username}/task-analytics`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setAnalyticsData(data);
        setError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [username]);

  const processedTimeData = analyticsData
    ? analyticsData.totalProcessingTime.map(item => ({
        ...item,
        total_time: Number(item.total_time), // Convert to number
        global_avg: Number(item.global_avg),
      }))
    : [];

    const processedDifficultyData = analyticsData && analyticsData.averageDifficulty
    ? analyticsData.averageDifficulty.map(item => ({
        ...item,
        personal_avg_diff: parseFloat(item.personal_avg_diff),
        global_avg_diff: parseFloat(item.global_avg_diff),
      }))
    : [];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} p={2} bgcolor="error.light" color="error.contrastText">
        <Typography variant="body1">Error loading analytics: {error}</Typography>
      </Box>
    );
  }
  
  return (
<Box>
  <Grid container spacing={3}>
    {/* First Box/Graph */}
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, height: 400 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ textAlign: 'center', fontFamily: 'Arial', mb: 1 }}
        >
          Time Spent on Assignments by User vs Average
        </Typography>

        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {processedTimeData && processedTimeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={processedTimeData}
                margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="area_name" 
                  label={{ value: '', position: 'bottom', fontSize: '20px', fontFamily: 'Arial' }} 
                  tick={{ fontSize: '16px' }} 
                />
                <YAxis 
                  domain={[0, 'auto']}
                  label={{
                    value: 'Time Spent (Minutes)',
                    angle: -90,
                    position: 'center',
                    fontSize: '20px',
                    fontFamily: 'Arial',
                    dx: -20
                  }} 
                  tick={{ fontSize: '14px' }}
                />
                <Tooltip formatter={(value) => [`${value} minutes`, 'Total Time']} />
                <Bar dataKey="total_time" name="User Time Spent" fill={CHART_COLORS[0]} />
                <Line type="monotone" dataKey="global_avg" name="Average Time Spent" stroke={CHART_COLORS[2]} strokeWidth={2} />
                <Legend 
                  wrapperStyle={{
                    bottom: 25,
                    left: 125,
                    padding: '5px',
                    width: 'auto',
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2">No processing time data available</Typography>
          )}
        </Box>
      </Paper>
    </Grid>

    {/* Second Box/Graph */}
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, height: 400 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ textAlign: 'center', fontFamily: 'Arial', mb: 1 }}
        >
          Average Difficulty Rating by User vs Average
        </Typography>

        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {processedDifficultyData && processedDifficultyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={processedDifficultyData}
                margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="area_name" 
                  label={{ value: '', position: 'bottom', fontSize: '20px', fontFamily: 'Arial' }} 
                  tick={{ fontSize: '16px' }} 
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  label={{
                    value: 'Difficulty',
                    angle: -90,
                    position: 'center',
                    fontSize: '20px',
                    fontFamily: 'Arial',
                    dx: -20
                  }} 
                  tick={{ fontSize: '14px' }}
                />
                <Tooltip formatter={(value) => [`${value}`, 'Rating']} />
                <Bar dataKey="personal_avg_diff" name="User Rating" fill={CHART_COLORS[0]} />
                <Line type="monotone" dataKey="global_avg_diff" name="Average Rating" stroke={CHART_COLORS[2]} strokeWidth={2} />
                <Legend 
                  wrapperStyle={{
                    bottom: 25,
                    left: 125,
                    padding: '5px',
                    width: 'auto',
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2">No processing time data available</Typography>
          )}
        </Box>
      </Paper>
    </Grid>
  </Grid>
</Box>
    );
};

export default TaskAnalytics;
