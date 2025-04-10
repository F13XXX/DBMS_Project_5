import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import UserProfile from './UserProfile';
import TaskCompletion from './TaskCompletion';
import TaskAnalytics from './TaskAnalytics';

const UserPerformanceComponent = ({username}) => {
  const [userData, setUserData] = useState(null); // Stores state of user profile data
  const [taskCompletions, setTaskCompletions] = useState([]); // Stores state of task completions
  const [taskAnalytics, setAnalyticsData] = useState(null); // Stores state of task-analytics
  const [loading, setLoading] = useState(true); // State to track if data is loading
  const [error, setError] = useState(null); // State handle errors while fetching data

  const API_BASE_URL = 'http://localhost:5000/api'; // Change this for implementation in nosqlconceptstool

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [userResponse, taskCompletionsResponse, taskAnalyticsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/users/${username}`),
          fetch(`${API_BASE_URL}/users/${username}/task-completions`),
          fetch(`${API_BASE_URL}/users/${username}/task-analytics`)
        ]);
        
        // Check for HTTP errors
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        if (!taskCompletionsResponse.ok) throw new Error('Failed to fetch task completions');
        if (!taskAnalyticsResponse.ok) throw new Error('Failed to fetch task analytics');
        
        // Parse JSON responses
        const userData = await userResponse.json();
        const taskCompletions = await taskCompletionsResponse.json();
        const taskAnalytics = await taskAnalyticsResponse.json();
        
        // Update state
        setUserData(userData);
        setTaskCompletions(taskCompletions);
        setAnalyticsData(taskAnalytics);
        setError(null);

      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load user performance data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [username]); // Rerun when component mounts or username changes

  if (loading) { // S
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <UserProfile userData={userData} />
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <TaskCompletion taskCompletions={taskCompletions} />
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <TaskAnalytics taskAnalytics={taskAnalytics} />
      </Paper>
    </Container>
  );
};

export default UserPerformanceComponent;
