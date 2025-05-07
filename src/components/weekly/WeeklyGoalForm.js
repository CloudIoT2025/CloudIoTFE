import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import axiosInstance from '../api/api';

const WeeklyGoalForm = () => {
  const [goal, setGoal] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = event => {
    setCurrentGoal(event.target.value);
  };

  const handleSetGoal = async () => {
    if (currentGoal && !isNaN(currentGoal) && currentGoal > 0) {
      console.log('submit');
      try {
        const result = await axiosInstance.put(
          '/api/user/goal',
          { goal: currentGoal },
          {
            headers: { 'x-user-id': localStorage.getItem('userId') },
          }
        );
        const { goal } = result.data;
        setGoal(goal);
        setCurrentGoal(goal);
      } catch (error) {
        console.error('Error setting goal:', error);
      }
    }
  };

  async function fetchGoal() {
    try {
      const response = await axiosInstance.get('/api/user/goal', {
        headers: { 'x-user-id': localStorage.getItem('userId') },
      });
      setGoal(response.data.goal);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching goal:', error);
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      fetchGoal();
    }
  }, [isLoaded]);

  return (
    <Box mt={4} display="flex" flexDirection="column" gap={2}>
      <Typography>현재 목표 칼로리: {goal} kcal</Typography>
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="목표 칼로리 입력"
          variant="outlined"
          size="small"
          type="number"
          value={currentGoal}
          onChange={handleChange}
          sx={{ width: 200 }}
        />
        <Button variant="contained" onClick={handleSetGoal}>
          설정
        </Button>
      </Box>
    </Box>
  );
};

export default WeeklyGoalForm;
