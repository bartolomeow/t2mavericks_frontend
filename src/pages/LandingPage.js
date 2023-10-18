import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MavContext } from '../context/MavContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  description: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  gradientText: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const { checkedItems, handleCheckedItems } = useContext(MavContext);
  const [selectedItems, setSelectedItems] = useState(checkedItems);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedItems((selectedItems) =>
      selectedItems.includes(value)
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value]
    );
  };

  const handleSubmit = () => {
    handleCheckedItems(selectedItems);
    navigate('/prompts');
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        className={classes.gradientText}
      >
        ¡Hola, soy Maverick! 🤖
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Soy tu asistente virtual para el desarrollo ágil de software. Selecciona
        las actividades que quieres que te ayude a realizar.
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes(
                  'Definición de historias de usuario'
                )}
                onChange={handleCheckboxChange}
                value="Definición de historias de usuario"
                color="primary"
              />
            }
            label="Definición de historias de usuario"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes('HLD')}
                onChange={handleCheckboxChange}
                value="HLD"
                color="primary"
              />
            }
            label="HLD"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes('LLD')}
                onChange={handleCheckboxChange}
                value="LLD"
                color="primary"
              />
            }
            label="LLD"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes('Definition of Ready')}
                onChange={handleCheckboxChange}
                value="Definition of Ready"
                color="primary"
              />
            }
            label="Definition of Ready"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes('Definition of Done')}
                onChange={handleCheckboxChange}
                value="Definition of Done"
                color="primary"
              />
            }
            label="Definition of Done"
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedItems.includes('Esquema conceptual')}
                onChange={handleCheckboxChange}
                value="Esquema conceptual"
                color="primary"
              />
            }
            label="Esquema conceptual"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={selectedItems.length === 0}
        >
          Continuar
        </Button>
      </form>
    </Container>
  );
};

export default LandingPage;
