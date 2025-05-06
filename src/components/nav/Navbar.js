import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginButton from '../buttons/LoginButton';

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

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

          <LoginButton isLoggedIn={isLoggedIn} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
