import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

const Header = () => {
  const navigate = useNavigate();

  const handleLandingClick = () => {
    navigate('/landing');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
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
