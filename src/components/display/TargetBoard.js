import React from 'react';
import { Typography } from '@mui/material';
import ChartBtn from '../buttons/ChartBtn';

const TargetBoard = ({ isLoggedIn }) => {
  return (
    <div className="box targetBoard">
      {isLoggedIn ? (
        <ChartBtn />
      ) : (
        <Typography variant="h6">로그인을 먼저 해주세요</Typography>
      )}
    </div>
  );
};

export default TargetBoard;
