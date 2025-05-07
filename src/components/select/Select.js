import './Select.css';
import { Button } from "@mui/material";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const Select = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleExerciseStart = async videoId => {
    const rspId = localStorage.getItem('rspId');

    if (!rspId) {
      alert("라즈베리 고유 코드를 먼저 입력해주세요.");
      return;
    }

    try {
      // localStorage.removeItem('RspId');
      navigate('/youtube', {
        state: { videoId },
      });
    } catch (err) {
      console.error("운동 시작 요청 실패:", err);
      alert("운동을 시작하는 데 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    if (userId && accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
      <>
        <Navbar isLoggedIn={isLoggedIn} />
        <Content>
          <div className="select-grid">
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("W-L_V7S5Zq8")}
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/W-L_V7S5Zq8/hqdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
            >
              ex1
            </Button>
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("HK5VQq836Tw")}
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/HK5VQq836Tw/hqdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
            >
              ex2
            </Button>
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("iD0L3TR8Uh8")}
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/iD0L3TR8Uh8/hqdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
            >
              ex3
            </Button>
          </div>
        </Content>
      </>
  );
};

export default Select;