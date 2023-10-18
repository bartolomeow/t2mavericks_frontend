import React from 'react';
import {
  TextField,
  makeStyles,
  Typography,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { MavContext } from '../context/MavContext';

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
  accordion: {
    width: '100%',
  },
  padding: {
    padding: theme.spacing(4),
  },
}));

const SpecificationsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { checkedItems } = React.useContext(MavContext);

  const handleSubmit = () => {
    navigate('/results');
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className={classes.padding}
      >
        Inception Deck
      </Typography>
      <TextField
        label="Detalla tus especificaciones generales"
        variant="outlined"
        fullWidth
        multiline
      />
      <Typography variant="h5" component="h1" gutterBottom className={classes.padding}>
        Especificaciones
      </Typography>
      {checkedItems.map((item) => (
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label={`Escribe tus especificaciones sobre ${item}`}
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
            />
          </AccordionDetails>
        </Accordion>
      ))}

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
