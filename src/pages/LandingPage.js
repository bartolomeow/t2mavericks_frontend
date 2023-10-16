import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  response: {
    marginTop: theme.spacing(4),
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    };
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      requestOptions
    );
    const data = await response.json();
    setResponse(data.choices[0].text);
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My App
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Prompt"
            variant="outlined"
            value={message}
            onChange={handleInputChange}
            className={classes.input}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        {response && (
          <Typography variant="h5" component="p" className={classes.response}>
            Response: {response}
          </Typography>
        )}
      </Container>
    </>
  );
}

export default LandingPage;
