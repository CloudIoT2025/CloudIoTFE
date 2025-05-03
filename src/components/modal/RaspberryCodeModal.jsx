import './RaspberryCodeModal.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";
import { useState } from "react";

const RaspberryCodeModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const select = async () => {
    try {
      const response = await axiosInstance.post("/api/user/rsp/validate", { code }); // POST 요청
      if (response.data.valid) {
        localStorage.setItem("RspId", response.data.rspId)
        navigate('/select');
      } else {
        alert("유효하지 않은 코드입니다.");
      }
    } catch (err) {
      console.error("코드 확인 실패:", err);
      alert("코드 확인 중 오류가 발생했습니다.");
    }
  };

  return (
      <div className="modal-backdrop">
        <div className="modal-box">
          <p>라즈베리 고유 코드를 입력해주세요</p>
          <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
          />
          <button className="open-box" onClick={select}>확인</button>
          <button className="close-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
  );
};

export default RaspberryCodeModal;