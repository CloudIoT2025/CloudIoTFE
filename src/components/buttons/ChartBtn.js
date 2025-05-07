import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChartBtn = () => {
  const navigate = useNavigate();
  const setting = () => {
    // 입력 후 확인
    navigate('/weekly');
  };

  return <button onClick={setting}>목표량 설정하기</button>;
};

export default ChartBtn;
