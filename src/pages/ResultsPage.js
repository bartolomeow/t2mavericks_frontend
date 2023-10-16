import * as React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function MultiActionAreaCard() {
  const classes = useStyles();
  const handleCopyClick = content => {
    navigator.clipboard.writeText(content);
  };
  const handleRetryClick = () => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet("/apiendpoint").reply(200, {
        users: [{ id: 1, name: "John Smith" }],
      });

    axios
      .get('/apiendpoint')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Aquí van los resultados
      </Typography>
      <Card sx={{ maxWidth: 345 }} raised>
        <CardHeader title="Shrimp and Chorizo Paella" />
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/500/150"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleCopyClick('copy')}>
            Copiar en el portapapeles
          </Button>
          <Button size="small" color="primary" onClick={handleRetryClick}>
            Reintentar
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
