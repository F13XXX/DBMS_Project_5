import React from 'react';
import { Typography, Avatar, Box, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = ({ userData }) => {
  if (!userData) return null;
  
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        User Profile
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
          <PersonIcon />
        </Avatar>
        <Box>
          <Typography variant="h5">{userData.user_name}</Typography>
          <Chip 
            label={userData.role} 
            color="primary" 
            size="small" 
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
