import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import UserProfile from './UserProfile';
import TaskCompletion from './TaskCompletion';
import TaskAnalytics from './TaskAnalytics';

const UserPerformanceComponent = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [taskCompletions, setTaskCompletions] = useState([]);
  const [taskAnalytics, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel using the fetch API
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
  }, [username]);

  if (loading) {
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
        <TaskAnalytics username={username} />
      </Paper>
    </Container>
  );
};

export default UserPerformanceComponent;
