import { PieChart } from '@mui/x-charts/PieChart';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/api';

const CaloriesPieChart = () => {
  const containerRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [caloriesToBurn, setcaloriesToBurn] = useState(0);
  const [caloriesBurnedOutside, setcaloriesBurnedOutside] = useState(0);
  const [caloriesBurnedWithUs, setCaloriesBurnedWithUs] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  async function fetchcaloriesToBurn() {
    try {
      const response = await axiosInstance.get('/api/user/today', {
        headers: { 'x-user-id': localStorage.getItem('userId') },
      });
      const { caloriesToBurn, caloriesBurnedOutside, caloriesBurnedWithUs } =
        response.data;
      setcaloriesToBurn(caloriesToBurn);
      setcaloriesBurnedOutside(caloriesBurnedOutside);
      setCaloriesBurnedWithUs(caloriesBurnedWithUs);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching burned calories:', error);
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      fetchcaloriesToBurn();
    }
  }, [isLoaded]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {dimensions.width > 0 && dimensions.height > 0 && isLoaded ? (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: caloriesBurnedOutside,
                  label: `외부에서 소모한 칼로리: ${caloriesBurnedOutside}kcal`,
                },
                {
                  id: 1,
                  value: caloriesBurnedWithUs,
                  label: `운동으로 소모한 칼로리: ${caloriesBurnedWithUs}kcal`,
                },
                {
                  id: 2,
                  value: Math.max(
                    0,
                    caloriesToBurn -
                      (caloriesBurnedOutside + caloriesBurnedWithUs)
                  ),
                  label: `(목표 칼로리 ${caloriesToBurn}kcal)`,
                  color: 'grey',
                },
              ],
              innerRadius: 50,
              outerRadius:
                Math.min(dimensions.width, dimensions.height) / 2 - 20,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              cx: dimensions.width / 2,
              cy: dimensions.height / 2,
            },
          ]}
          width={dimensions.width}
          height={dimensions.height}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100vh"
        >
          <CircularProgress size={80} thickness={5} />
          <Typography mt={2}>소모 현황 로딩 중입니다...</Typography>
        </Box>
      )}
    </div>
  );
};

export default CaloriesPieChart;
