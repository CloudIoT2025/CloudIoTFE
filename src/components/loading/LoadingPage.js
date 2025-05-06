import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/api';

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [burnedCalories, setBurnedCalories] = useState(0);
  const [goalCalories, setGoalCalories] = useState(0);

  const videoId = location.state?.videoId || 1; // default videoId

  async function fetchResult() {
    try {
      setError(null);
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/exercise/end?videoId=${videoId}&rspId=${localStorage.getItem(
          'rspId'
        )}`,
        { headers: { 'x-user-id': localStorage.getItem('userId') } }
      );
      const { burned, goal } = res.data;
      setBurnedCalories(burned);
      setGoalCalories(goal);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('운동 결과를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }

    setLoading(false);
  }

  useEffect(() => {
    if (success) {
      // 결과 페이지로 이동하면서 데이터 전달
      navigate('/result', { state: { burnedCalories, goalCalories } });
    }
  }, [success, burnedCalories, goalCalories, navigate]);

  useEffect(() => {
    fetchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <CircularProgress size={80} thickness={5} />
        <Typography mt={2}>운동 결과 분석 중입니다...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
        textAlign="center"
      >
        <Typography color="error" variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchResult}>
          다시 시도하기
        </Button>
      </Box>
    );
  }

  return <></>;
};

export default LoadingPage;
