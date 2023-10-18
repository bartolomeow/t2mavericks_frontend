import React, { useEffect } from 'react';
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
  const { checkedItems, handlePrompts } = React.useContext(MavContext);
  const [promptItem, setPromptItem] = React.useState({});
  const [generalChanged, setGeneralChanged] = React.useState(false);

  useEffect(() => {
    let promptObj = {};
    checkedItems.forEach((item) => {
      promptObj = { ...promptObj, [item]: `Genérame un ${item}.` };
    });
    promptObj['general'] = '';

    setPromptItem(promptObj);
  }, [checkedItems]);

  const handleSubmit = () => {
    const newPromptItem = promptItem;
    checkedItems.map((item) => {
      const itemDescription = promptItem[item];
      newPromptItem[item] = `${promptItem.general}. ${itemDescription}`;
    });

    handlePrompts(promptItem);
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
        onChange={(e) => {
          setPromptItem({ ...promptItem, general: `Las características de mi proyecto son las siguientes: ${e.target.value}` });
          setGeneralChanged(true);
        }}
      />
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        className={classes.padding}
      >
        Especificaciones
      </Typography>
      {checkedItems.map((item, i) => (
        <Accordion className={classes.accordion} key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              id={`${item}-specifications`}
              label={`Escribe tus especificaciones sobre ${item}`}
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              onChange={(e) => {
                const newPromptItem = promptItem;
                newPromptItem[item] = `Genérame un ${item} con las siguientes especificaciones: ${e.target.value}`;
                setPromptItem(newPromptItem);
              }}
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
