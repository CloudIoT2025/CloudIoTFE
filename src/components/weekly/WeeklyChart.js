import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { blue, orange } from '@mui/material/colors';
import Navbar from '../nav/Navbar';
import axiosInstance from '../api/api';
import WeeklyGoalForm from './WeeklyGoalForm';

const DailyCaloriesChart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchWeeklyData() {
    try {
      const response = await axiosInstance.get('/api/results/weekly', {
        headers: { 'x-user-id': localStorage.getItem('userId') },
      });
      setWeeklyData(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    if (userId && accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoaded) {
      fetchWeeklyData();
    }
  }, [isLoaded]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Card sx={{ width: '100%', maxWidth: 700, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            일일 누적 칼로리 소모량 (기초 활동량 + 운동량)
          </Typography>
          <BarChart
            dataset={weeklyData}
            xAxis={[
              { scaleType: 'band', dataKey: 'date', categoryGapRatio: 0.5 },
            ]}
            series={[
              {
                dataKey: 'caloriesBurnedOutside',
                label: '기초 활동량',
                stack: 'total',
                color: blue[500],
              },
              {
                dataKey: 'caloriesBurnedWithUs',
                label: '운동량',
                stack: 'total',
                color: orange[500],
              },
            ]}
            height={300}
            grid={{ horizontal: true }}
          />
          <WeeklyGoalForm />
        </CardContent>
      </Card>
    </>
  );
};

export default DailyCaloriesChart;
