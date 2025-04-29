import './Main.css';
import {Button} from "@mui/material";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import { useRef, useEffect, useState } from 'react';
import RaspberryCodeModal from "../modal/RaspberryCodeModal";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Card, CardContent, Typography } from "@mui/material";

const CaloriesPieChart = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const totalCalories = 2000;
  const burnedCalories = 600;
  const remainingCalories = totalCalories - burnedCalories;

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return (
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        {dimensions.width > 0 && dimensions.height > 0 && (
            <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: burnedCalories, label: '소모한 칼로리' },
                      { id: 1, value: remainingCalories, label: '남은 칼로리' },
                    ],
                    innerRadius: 50,
                    outerRadius: Math.min(dimensions.width, dimensions.height) / 2 - 20,
                    paddingAngle: 5,
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
        )}
      </div>
  );
};

const DailyCaloriesChart = () => {
  const data = [
    { date: '4/22', calories: 500 },
    { date: '4/23', calories: 1100 },
    { date: '4/24', calories: 1500 },
    { date: '4/25', calories: 2000 },
    { date: '4/26', calories: 2500 },
  ];

  return (
      <Card sx={{ width: '100%', maxWidth: 600, height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            일일 누적 칼로리 소모량
          </Typography>
          <LineChart
              xAxis={[{ dataKey: 'date', label: '날짜' }]}
              series={[{ dataKey: 'calories', label: '누적 소모 칼로리' }]}
              dataset={data}
              width={500}
              height={300}
          />
        </CardContent>
      </Card>
  );
};


const StartBtn = ({onClick}) => {
  return <>
    <Button className="box startBtn" onClick={onClick}>
      start
    </Button>
  </>
}

const DashBoard = () => {

  useEffect(() => {

  }, []);

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
        <Typography variant="h6">
          오늘 칼로리 소모 현황
        </Typography>
        <Card sx={{ width: '100%', height: 400 }}>

          <CardContent sx={{ height: '100%', p: 0 }}>
            <CaloriesPieChart />
          </CardContent>
        </Card>
      </Box>
  );
}

const TargetBoard = () => {

  useEffect(() => {

  }, []);

  return <>
    <div className="box targetBoard">
      <DailyCaloriesChart />
    </div>
  </>
}

export const Main = () =>{
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return <>
    <Navbar/>
    <Content>
      <div className="main-grid">
        <DashBoard/>
        <TargetBoard/>
        <StartBtn onClick={openModal} />
      </div>
    </Content>
    {modalOpen && <RaspberryCodeModal onClose={closeModal} />}
  </>
}

export default Main;
