import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { burned = 0, goal = 0 } = location.state || {};

  return (
      <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            width: '90%',
            maxWidth: 600,
            mx: 'auto',
            mt: 5,
            textAlign: 'center',
            border: '4px solid grey',
          }}
      >
        <Typography variant="h5" gutterBottom>
          운동 결과
        </Typography>

        <Box my={4}>
          <Typography variant="body1">
            이번 운동으로 소비한 칼로리: {burned} kcal / 목표 칼로리: {goal} kcal
          </Typography>
        </Box>

        <Box mt={6} display="flex" flexDirection="column" gap={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            메인 페이지로 돌아가기
          </Button>
          <Button variant="outlined" onClick={() => navigate('/select')}>
            운동 페이지로 돌아가기
          </Button>
        </Box>
      </Paper>
  );
};

export default ResultPage;