import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import CaloriesPieChart from './CaloriesPieChart';

const DashBoard = ({ isLoggedIn }) => {
  return (
    <Box
      className="box dashBoard"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        gap: 2,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6">오늘 칼로리 소모 현황</Typography>
      <Card sx={{ width: '100%', height: 400 }}>
        <CardContent sx={{ height: '100%', p: 0 }}>
          {isLoggedIn ? (
            <CaloriesPieChart />
          ) : (
            <Typography variant="h6">로그인을 먼저 해주세요</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashBoard;
