import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Navbar.css';

function Navbar() {
  return (
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="logo">
            {/*Cloud IoT*/}
          </Typography>
          <div className="nav-buttons">
            <Button color="inherit">Home</Button>
            <Button color="inherit">Dashboard</Button>
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
