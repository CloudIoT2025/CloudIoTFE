import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/api";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const videoId = location.state?.videoId || 1; // default videoId

  const fetchResult = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await axiosInstance.get('/api/exercise/end', {
        params: { videoId },
      });

      const { score: similarity, calroies: burned, goal } = response.data;

      // 결과 페이지로 이동하면서 데이터 전달
      navigate('/result', { state: { similarity, burned, goal } });
    } catch (err) {
      console.error(err);
      setError('운동 결과를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
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

  return null;
};

export default LoadingPage;