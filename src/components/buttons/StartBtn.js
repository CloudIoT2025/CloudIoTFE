import { Button } from '@mui/material';

const StartBtn = ({ onClick }) => {
  return (
    <Button className="box startBtn" onClick={onClick}>
      start
    </Button>
  );
};

export default StartBtn;
