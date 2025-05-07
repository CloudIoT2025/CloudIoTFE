// import { useState } from 'react';
// import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { blue, orange } from "@mui/material/colors";
// import Navbar from "../nav/Navbar";
// import axiosInstance from "../api/api";
//
// // 원본 데이터 → base 값 생성
// const rawData = [
//   { date: '4/22', calories: 500, exercise: 300 },
//   { date: '4/23', calories: 1100, exercise: 200 },
//   { date: '4/24', calories: 1500, exercise: 400 },
//   { date: '4/25', calories: 2000, exercise: 300 },
//   { date: '4/26', calories: 2500, exercise: 500 },
//   { date: '4/27', calories: 0, exercise: 0 },
//   { date: '4/28', calories: 2000, exercise: 100 },
// ];
//
// const data = rawData.map((d) => ({
//   ...d,
//   base: d.calories - d.exercise,
// }));
//
// const DailyCaloriesChart = () => {
//   const [goal, setGoal] = useState('');
//   const [currentGoal, setCurrentGoal] = useState(2000);
//
//   const handleChange = (e) => setGoal(e.target.value);
//
//   const handleSetGoal = () => {
//     if (!goal || isNaN(goal)) return;
//     setCurrentGoal(Number(goal));
//     axiosInstance.put('/api/results/goal', { goal: goal }, {
//     })
//     .then(res => alert(`목표 칼로리가 ${res.data.goal}으로 설정되었습니다.`))
//     .catch(err => console.error(err));
//     setGoal('');
//   };
//
//   return (
//       <>
//       <Navbar/>
//       <Card sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             일일 누적 칼로리 소모량 (기초 활동량 + 운동량)
//           </Typography>
//
//           <BarChart
//               dataset={data}
//               xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
//               series={[
//                 {
//                   dataKey: 'base',
//                   label: '기초 활동량',
//                   stack: 'total',
//                   color: blue[500],
//                 },
//                 {
//                   dataKey: 'exercise',
//                   label: '운동량',
//                   stack: 'total',
//                   color: orange[500],
//                 },
//               ]}
//               width={500}
//               height={300}
//               grid={{ horizontal: true }}
//           />
//
//           <Box mt={4} display="flex" flexDirection="column" gap={2}>
//             <Typography>현재 목표 칼로리: {currentGoal} kcal</Typography>
//             <Box display="flex" gap={2} alignItems="center">
//               <TextField
//                   label="목표 칼로리 입력"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={goal}
//                   onChange={handleChange}
//                   sx={{ width: 200 }}
//               />
//               <Button variant="contained" onClick={handleSetGoal}>
//                 설정
//               </Button>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//       </>
//   );
// };
//
// export default DailyCaloriesChart;

import { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { blue, orange } from '@mui/material/colors';
import Navbar from '../nav/Navbar';
import axiosInstance from '../api/api';

const DailyCaloriesChart = () => {
  const [goal, setGoal] = useState('');
  const [currentGoal, setCurrentGoal] = useState(2000);
  const [weeklyData, setWeeklyData] = useState([]);

  // 주간 칼로리 데이터 불러오기
  useEffect(() => {
    axiosInstance.get('/api/results/weekly')
    .then(res => {
      const formatted = res.data.map(d => ({
        ...d,
        base: d.calroies - 100, // 예시용 운동량 계산
        exercise: 100
      }));
      setWeeklyData(formatted);
    })
    .catch(err => console.error('주간 데이터 오류:', err));
  }, []);

  const handleChange = (e) => setGoal(e.target.value);

  const handleSetGoal = () => {
    if (!goal || isNaN(goal)) return;
    axiosInstance.put('/api/results/goal', { goal })
    .then(res => {
      setCurrentGoal(res.data.goal);
      setGoal('');
      alert(`목표 칼로리가 ${res.data.goal}으로 설정되었습니다.`);
    })
    .catch(err => console.error('목표 설정 오류:', err));
  };

  return (
      <>
        <Navbar />
        <Card sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              일일 누적 칼로리 소모량 (기초 활동량 + 운동량)
            </Typography>

            <BarChart
                dataset={weeklyData}
                xAxis={[{ scaleType: 'band', dataKey: 'createdAt' }]}
                series={[
                  {
                    dataKey: 'base',
                    label: '기초 활동량',
                    stack: 'total',
                    color: blue[500],
                  },
                  {
                    dataKey: 'exercise',
                    label: '운동량',
                    stack: 'total',
                    color: orange[500],
                  },
                ]}
                width={500}
                height={300}
                grid={{ horizontal: true }}
            />

            <Box mt={4} display="flex" flexDirection="column" gap={2}>
              <Typography>현재 목표 칼로리: {currentGoal} kcal</Typography>
              <Box display="flex" gap={2} alignItems="center">
                <TextField
                    label="목표 칼로리 입력"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={goal}
                    onChange={handleChange}
                    sx={{ width: 200 }}
                />
                <Button variant="contained" onClick={handleSetGoal}>
                  설정
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
  );
};

export default DailyCaloriesChart;