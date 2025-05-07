import React from 'react';
import { Button } from '@mui/material';

const LoginButton = ({ isLoggedIn }) => {
  const handleClick = event => {
    if (isLoggedIn) {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      window.location.reload();
    } else {
      window.location.href = 'https://playcation.store/auth/fitbit/login';
    }
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
    </Button>
  );
};

export default LoginButton;
