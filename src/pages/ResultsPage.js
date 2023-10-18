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
import Loading from '../components/Loading/Loading';

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

const ResultsPage = () => {
  const classes = useStyles();
  const { checkedItems, promptResponse } = React.useContext(MavContext);
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
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      {promptResponse ? (
        <>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Aquí van los resultados
          </Typography>
          <Grid container spacing={6} columns={12} justifyContent="center">
            {checkedItems.map((item, i) => (
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={i}>
                <Card raised>
                  <CardHeader title={item} />
                  <CardActionArea>
                    <CardContent
                      className={classes.codeblock}
                      onClick={openModal(item)}
                    >
                      <Typography variant="body" className={classes.whiteText}>
                        {promptResponse[item]}
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
                    <Button
                      size="small"
                      color="primary"
                      onClick={handleRetryClick}
                    >
                      Reintentar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Loading />
      )}
      <DialogComponent
        open={modal}
        onClose={() => setActiveModal(undefined)}
        item={modal}
        handleCopy={handleCopyClick}
      />
    </Container>
  );
};

export default ResultsPage;
