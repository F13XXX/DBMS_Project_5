import React from 'react';
import { 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  LinearProgress
} from '@mui/material';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const TimeSpent = ({ timeSpent }) => {
  if (!timeSpent || timeSpent.length === 0) {
    return (
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Time Spent on Tasks
        </Typography>
        <Typography variant="body1">No time tracking data available.</Typography>
      </Box>
    );
  }
  
  // Calculate max time for relative progress bars
  const maxTime = Math.max(...timeSpent.map(item => item.processing_time));
  
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Time Spent on Tasks
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Time Spent</TableCell>
              <TableCell>Relative Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSpent.map((task) => (
              <TableRow key={task.data_id}>
                <TableCell>{task.statement_text}</TableCell>
                <TableCell>{task.area_name}</TableCell>
                <TableCell>{formatTime(task.processing_time)}</TableCell>
                <TableCell width="30%">
                  <LinearProgress 
                    variant="determinate" 
                    value={(task.processing_time / maxTime) * 100} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeSpent;
