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

      const sanitizedData = response.data.map(item => ({
        ...item,
        caloriesBurnedOutside: item.caloriesBurnedOutside ?? 0,
        caloriesBurnedWithUs: item.caloriesBurnedWithUs ?? 0,
      }));

      setWeeklyData(sanitizedData);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  }

  // 주간 칼로리 데이터 불러오기
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
        <Card sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              일일 누적 칼로리 소모량 (기초 활동량 + 운동량)
            </Typography>

            <BarChart
                dataset={weeklyData}
                xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
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
                width={500}
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