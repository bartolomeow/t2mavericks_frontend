import React from 'react';
import {
  TextField,
  makeStyles,
  Typography,
  Container,
  Button
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SpecificationsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/results');
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Especificaciones
      </Typography>
      <TextField
        label="Ideas generales"
        variant="outlined"
        fullWidth
        // InputProps={{
        //   className: classes.root,
        // }}
        multiline
      />
      <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          onClick={handleSubmit}
        >
          Continuar
        </Button>
    </Container>
  );
};

export default SpecificationsPage;
