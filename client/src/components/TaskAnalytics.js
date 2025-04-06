import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  Grid, 
  Paper, 
  Typography, 
  CircularProgress,
  Box
} from '@mui/material';

const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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

  const processedData = analyticsData
    ? analyticsData.map(item => ({
        ...item,
        total_time: Number(item.total_time), // Convert to number
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
  console.log(processedData)
  if (!processedData) {
    return (
      <Box mt={4}>
        <Typography variant="body1">No analytics data available</Typography>
      </Box>
    );
  }
  return (
<Grid container spacing={3} sx={{ mt: 2 }}>
  <Grid item xs={12} md={6}>
    <Paper sx={{ p: 2, height: 400 }}>
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {processedData && processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="area_name" 
                label={{ value: 'Task Area', position: 'bottom', fontSize: '20px', fontFamily: 'arial' }} 
                tick={{ fontSize: '12px' }} 
              />
              <YAxis 
                domain={[0, 'auto']} 
                label={{ value: 'Total Processing Time (Minutes)', angle: -90, position: 'center', fontSize: '20px', fontFamily: 'arial', dx: -15 }} 
                tick={{ fontSize: '12px' }}
              />
              <Tooltip formatter={(value) => [`${value} minutes`, 'Total Time']} />
              <Bar dataKey="total_time" name="Total Time Spent (Minutes)" fill={CHART_COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2">No processing time data available</Typography>
        )}
      </Box>
    </Paper>
  </Grid>
  
      {/* Second Box */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Second Graph Title
          </Typography>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Replace with actual graph */}
            <Typography variant="body2">Graph Placeholder</Typography>
          </Box>
        </Paper>
      </Grid>
  
      {/* Third Box */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Third Graph Title
          </Typography>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Replace with actual graph */}
            <Typography variant="body2">Graph Placeholder</Typography>
          </Box>
        </Paper>
      </Grid>
  
      {/* Fourth Box */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Fourth Graph Title
          </Typography>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Replace with actual graph */}
            <Typography variant="body2">Graph Placeholder</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  ); 
};

export default TaskAnalytics;
