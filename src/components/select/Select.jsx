import './Select.css';
import {Button} from "@mui/material";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import {useEffect, useState} from "react";
import RaspberryCodeModal from "../modal/RaspberryCodeModal";
import {useNavigate} from "react-router-dom";

const Ex1Btn = ({onClick}) => {
  return <>
    <Button className="select-box ex1" variant="outlined" onClick={onClick}>
      ex1
    </Button>
  </>
}

const Ex2Btn = ({onClick}) => {
  return <>
    <Button className="select-box ex1" variant="outlined" onClick={onClick}>
      ex2
    </Button>
  </>
}

const Ex3Btn = ({onClick}) => {
  return <>
    <Button className="select-box ex1" variant="outlined" onClick={onClick}>
      ex3
    </Button>
  </>
}

export const Select = () =>{
  const navigate = useNavigate();
  useEffect(() => {

  }, []);


  return <>
    <Navbar/>
    <Content>
      <div className="select-grid">
        <Ex1Btn onClick = {() => navigate("/youtube", {
          state: { videoId: "W-L_V7S5Zq8" }
        })}>ex1</Ex1Btn>
        <Ex2Btn onClick={() =>navigate("/youtube", {
          state : {videoId : "HK5VQq836Tw"}
        })}>ex2</Ex2Btn>
        <Ex3Btn onClick = {() => navigate("/youtube", {
          state: { videoId: "iD0L3TR8Uh8" }
        })}>ex3</Ex3Btn>
      </div>
    </Content>
  </>
}

export default Select;
