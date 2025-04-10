import React, { useState } from 'react';
import {
  Box, Typography, LinearProgress, Grid, Collapse, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, TableSortLabel
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const TaskCompletion = ({taskCompletions}) => {
  const [expandedAreas, setExpandedAreas] = useState({}); // State that tracks which areas are expanded
  const [sortConfig, setSortConfig] = useState({ // state to manage sorting
    key: null,
    direction: 'asc',
    areaName: null
  });

  // Group tasks by area and collect area_ids
  const areaMap = {};

  taskCompletions.forEach(task => {
    const areaName = task.area_name;

    // Init area data if does not exist
    if (!areaMap[areaName]) {
      areaMap[areaName] = {
        name: areaName,
        area_id: parseInt(task.area_id),
        completed: 0,
        total: 0,
        tasks: []
      };
    };

    areaMap[areaName].total += 1; // Total task-count

    // Task counts as completed, if solution or partial solution has been submitted 
    if (task.query_text || task.partial_solution) {
      areaMap[areaName].completed += 1;
    };
    
    // Get difficulty if available
    let difficulty = null;
    if (task.difficulty_level !== undefined) difficulty = task.difficulty_level;
    

    // Add task to arear's array of tasks
    areaMap[areaName].tasks.push({
      id: task.statement_id,
      name: task.statement_text,
      isCompleted: Boolean(task.query_text) || Boolean(task.partial_solution),
      difficulty: difficulty,
      time_spent: task.processing_time
    });
  });
  
  // Special All Tasks area that aggregates all tasks across areas
  const allTasksArea = {
    name: 'All Tasks',
    area_id: 0, // All tasks is first to be rendered. Do not zero-index existing area_id s
    completed: Object.values(areaMap).reduce((sum, area) => sum + area.completed, 0),
    total: Object.values(areaMap).reduce((sum, area) => sum + area.total, 0),
    tasks: Object.values(areaMap).flatMap(area => area.tasks)
  };

  let areas = Object.values(areaMap); // Convert to array and sort by area_id
  areas.push(allTasksArea); // Add to existing areas

  areas.sort((a, b) => a.area_id - b.area_id); // sort by area_id

  // Toggles if tasks are expanded or not for area
  const toggleAreaExpansion = (areaName) => {
    setExpandedAreas((prev) => ({
      ...prev,
      [areaName]: !prev[areaName]
    }));
  };

  // Format time spent in minutes to readable format
  const formatTimeSpent = (minutes) => {
    if (!minutes) return "-";
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  };

  // Use ordinal values instead of strings for sorting
  const difficultyMapping = {
    'Very Easy': 1,
    'Easy': 2,
    'Normal': 3,
    'Difficult': 4,
    'Very Difficult': 5
  };

  // Handle sorting requests for specific columns in area table
  const requestSort = (key, areaName) => {
    let direction = 'asc'; // set sort to ascending first
    
    // Change to descending
    if (sortConfig.key === key && sortConfig.direction === 'asc' && sortConfig.areaName === areaName) {
      direction = 'desc';
    }
    
    setSortConfig({key, direction, areaName});
  };

  // Sort tasks in area table based on current sort configuration
  const getSortedTasks = (tasks, areaName) => {
    // If no sorting key specified or area doesn't match, sort by task_id by default
    if (sortConfig.key === null || sortConfig.areaName !== areaName) {
    return [...tasks].sort((a, b) => a.id - b.id);
    }
    
    return [...tasks].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Special handling for specific fields
      if (sortConfig.key === 'isCompleted') {
        aValue = a.isCompleted ? 1 : 0;
        bValue = b.isCompleted ? 1 : 0;
      } else if (sortConfig.key === 'time_spent') {
        aValue = a.time_spent || 0;
        bValue = b.time_spent || 0;
      } else if (sortConfig.key === 'difficulty') {
        aValue = difficultyMapping[a.difficulty] || 0;
        bValue = difficultyMapping[b.difficulty] || 0;
    }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0; // For equal values return original order
    });
  };
  
  return (
    <Box>
      <Grid container spacing={3} direction="column">
        {areas.map((area) => {
          const progress = area.total > 0 ? (area.completed / area.total) * 100 : 0;
          const sortedTasks = getSortedTasks(area.tasks, area.name);

          return (
            <Grid item xs={12} key={area.name}>
              <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: area.name === 'All Tasks' ? '#F0E3FD' : '#E3F2FD',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                  }}
              >
                {/* Main area display */}
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Typography
                  variant="h5"
                  sx={{color: area.name === 'All Tasks' ? '#6A15C0' : '#1565C0',
                  mb: 1,}}
                  >
                    {area.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      width: '100%',
                      height: '10px',
                      borderRadius: '5px',
                      backgroundColor: area.name === 'All Tasks' ? '#DABBFB' : '#BBDEFB',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: area.name === 'All Tasks' ? '#8921F2' : '#2196F3',
                      },
                    }}
                  />
                  <Typography
                  variant="body1" sx={{
                    color: area.name === 'All Tasks' ? '#6A15C0' : '#1565C0',
                    mt: 1,
                    }}
                  >
                    {area.completed} / {area.total} tasks completed
                  </Typography>
                  {/* Dropdown button */}
                  <IconButton 
                    size="small" 
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => toggleAreaExpansion(area.name)}
                  >
                    {expandedAreas[area.name] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Box>

                {/* Dropdown content */}
                <Collapse in={expandedAreas[area.name]}>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{fontWeight: 'bold'}}>
                            <TableSortLabel
                              active={sortConfig.key === 'id' && sortConfig.areaName === area.name}
                              direction={sortConfig.key === 'id' ? sortConfig.direction : 'asc'}
                              onClick={() => requestSort('id', area.name)}
                            >
                              <span style={{marginRight: '24px'}}></span>
                              Task ID
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="left" sx={{fontWeight: 'bold'}}>
                            <TableSortLabel
                              active={sortConfig.key === 'name' && sortConfig.areaName === area.name}
                              direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                              onClick={() => requestSort('name', area.name)}
                            >
                              Task
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="center" sx={{fontWeight: 'bold'}}>
                            <TableSortLabel
                              active={sortConfig.key === 'isCompleted' && sortConfig.areaName === area.name}
                              direction={sortConfig.key === 'isCompleted' ? sortConfig.direction : 'asc'}
                              onClick={() => requestSort('isCompleted', area.name)}
                            >
                               <span style={{marginRight: '24px'}}></span>
                              Status
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="center" sx={{fontWeight: 'bold'}}>
                            <TableSortLabel
                              active={sortConfig.key === 'difficulty' && sortConfig.areaName === area.name}
                              direction={sortConfig.key === 'difficulty' ? sortConfig.direction : 'asc'}
                              onClick={() => requestSort('difficulty', area.name)}
                            >
                               <span style={{marginRight: '24px'}}></span>
                              Difficulty
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="center" sx={{fontWeight: 'bold'}}>
                            <TableSortLabel
                              active={sortConfig.key === 'time_spent' && sortConfig.areaName === area.name}
                              direction={sortConfig.key === 'time_spent' ? sortConfig.direction : 'asc'}
                              onClick={() => requestSort('time_spent', area.name)}
                            >
                               <span style={{marginRight: '24px'}}></span>
                              Time Spent
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell align="center">{task.id}</TableCell>
                            <TableCell align="left">{task.name}</TableCell>
                            <TableCell align="center">
                              {task.isCompleted ? (
                                <CheckIcon sx={{color: 'green'}} />
                              ) : (
                                <CloseIcon sx={{color: 'red'}} />
                              )}
                            </TableCell>
                            <TableCell align="center">{task.isCompleted ? (task.difficulty || 'N/A') : '-'}</TableCell>
                            <TableCell align="center">{formatTimeSpent(task.time_spent)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TaskCompletion;

