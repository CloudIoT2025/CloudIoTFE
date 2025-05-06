import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginCompleted = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userId', searchParams.get('id'));
    localStorage.setItem('accessToken', searchParams.get('access'));
    navigate('/');
  }, [navigate, searchParams]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <CircularProgress size={80} thickness={5} />
      <Typography mt={2}>로그인 중입니다...</Typography>
    </Box>
  );
};

export default LoginCompleted;
