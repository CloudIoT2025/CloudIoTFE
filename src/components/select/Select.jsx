import './Select.css';
import { Button } from "@mui/material";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";

const Select = () => {
  const navigate = useNavigate();

  const handleExerciseStart = async (videoId) => {
    const rspId = localStorage.getItem("RspId");

    if (!rspId) {
      alert("라즈베리 고유 코드를 먼저 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post("/api/exercise/start", {
        videoId,
        rspId,
      });

      localStorage.removeItem("RspId");
      navigate("/youtube", {
        state: { videoId },
      });
    } catch (err) {
      console.error("운동 시작 요청 실패:", err);
      alert("운동을 시작하는 데 문제가 발생했습니다.");
    }
  };

  return (
      <>
        <Navbar />
        <Content>
          <div className="select-grid">
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("W-L_V7S5Zq8")}
            >
              ex1
            </Button>
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("HK5VQq836Tw")}
            >
              ex2
            </Button>
            <Button
                className="select-box ex1"
                variant="outlined"
                onClick={() => handleExerciseStart("iD0L3TR8Uh8")}
            >
              ex3
            </Button>
          </div>
        </Content>
      </>
  );
};

export default Select;