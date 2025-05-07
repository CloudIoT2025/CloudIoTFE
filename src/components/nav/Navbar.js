import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axiosInstance from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleOAuthLogin = () => {
    console.log('OAuth 로그인 시도 (더미)');
    // window.location.href = 'http://ec2-43-201-68-3.ap-northeast-2.compute.amazonaws.com:3000/login';
    window.location.href = 'http://localhost:8080/login';
  };

  return (
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="logo">
            {/*Cloud IoT*/}
          </Typography>

          <div className="nav-buttons">
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>

             {/*<Button color="inherit">Dashboard</Button> */}

            <Button color="inherit" onClick={handleOAuthLogin}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;