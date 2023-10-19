import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLandingClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          T2Mavericks
        </Typography>
        <Button color="inherit" onClick={handleLandingClick}>
          Inicio
        </Button>
        <Button color="inherit" onClick={handleAboutClick}>
          Sobre nosotros
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
