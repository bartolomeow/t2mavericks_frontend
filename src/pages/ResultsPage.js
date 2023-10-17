import * as React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MavContext } from '../context/MavContext';
import DialogComponent from '../components/Dialog/Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  codeblock: {
    margin: '10px',
    borderRadius: '5px',
    border: 'solid 1px black',
    backgroundColor: '#000',
  },
  whiteText: {
    color: '#fff',
  },
}));

export default function ResultsPage() {
  const classes = useStyles();
  const { checkedItems } = React.useContext(MavContext);
  const [modal, setActiveModal] = React.useState(undefined);
  const handleCopyClick = (content) => {
    navigator.clipboard.writeText(content);
  };
  const handleRetryClick = () => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet('/apiendpoint').reply(200, {
      users: [{ id: 1, name: 'John Smith' }],
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

  const openModal = (item) => () => {
    setActiveModal(item);
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Aquí van los resultados
      </Typography>
      <Grid container spacing={6} columns={12} justifyContent="center">
        {checkedItems.map((item, i) => (
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={i}>
            <Card raised>
              <CardHeader title={item} />
              <CardActionArea>
                <CardContent className={classes.codeblock} onClick={openModal(item)}>
                  <Typography variant="body" className={classes.whiteText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum vitae quam nibh. Cras venenatis pharetra porta.
                    Vivamus nisl magna, sodales at tempus sed, vestibulum sed
                    magna. Sed elementum elit sed libero ultricies, a egestas
                    dolor laoreet. Vivamus placerat luctus justo non
                    ullamcorper. Nulla a aliquam lacus. Sed vehicula enim in mi
                    tempor, sed porttitor ligula gravida. Vestibulum aliquet,
                    orci rutrum tincidunt elementum, nulla mauris pellentesque
                    felis, quis posuere quam lectus at dolor. Quisque eget massa
                    lectus. Nulla dictum nisi a lorem sollicitudin commodo.
                    Quisque aliquam mi quis tincidunt molestie. Sed tincidunt,
                    purus sit amet convallis ultricies, est dui sodales felis,
                    quis mollis tortor elit in mauris. Phasellus nec est
                    suscipit, congue est non, ullamcorper libero. Duis id sem
                    tellus.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleCopyClick('copy')}
                >
                  Copiar en el portapapeles
                </Button>
                <Button size="small" color="primary" onClick={handleRetryClick}>
                  Reintentar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DialogComponent open={modal} onClose={() => setActiveModal(undefined)} item={modal}/>
    </Container>
  );
}
