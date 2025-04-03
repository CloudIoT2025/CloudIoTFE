import './Main.css';
import {Button} from "@mui/material";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import {useEffect, useState} from "react";
import RaspberryCodeModal from "../modal/RaspberryCodeModal";

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

  return <>
    <div className="box dashBoard">
      오늘 칼로리 소모 종합
    </div>
  </>
}

const TargetBoard = () => {

  useEffect(() => {

  }, []);

  return <>
    <div className="box targetBoard">
      칼로리 소모 목표량
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
