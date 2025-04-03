import './RaspberryCodeModal.css';

const RaspberryCodeModal = ({ onClose }) => {
  return (
      <div className="modal-backdrop">
        <div className="modal-box">
          <p>라즈베리 고유 코드를 입력해주세요</p>
          <input/>
          <button className="close-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
  );
};

export default RaspberryCodeModal;
