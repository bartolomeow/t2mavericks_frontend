import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { MavContext } from '../../context/MavContext';

const Header = () => {
  const { cleanContext } = React.useContext(MavContext);
  const navigate = useNavigate();

  const handleLandingClick = () => {
    cleanContext();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          T2Mavericks
        </Typography>
        <Button color="inherit" onClick={() => handleLandingClick()}>
          Inicio
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
