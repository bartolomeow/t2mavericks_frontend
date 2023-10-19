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
  ListItem,
  List,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    backgroundColor: '#fff',
  },
  whiteText: {
    color: '#fff',
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const FeaturesPage = () => {
  const classes = useStyles();
  const {
    documentJSON,
    loading,
    addFeatures,
    handleFeatures,
    handleConflu,
    rallyZip,
    confluZip,
  } = React.useContext(MavContext);
  const [modal, setActiveModal] = React.useState(undefined);

  const openModal = (item) => () => {
    setActiveModal(item);
  };

  const downloadRallyZip = () => {
    const url = window.URL.createObjectURL(rallyZip);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rally.zip');
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadConfluZip = () => {
    const url = window.URL.createObjectURL(confluZip);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'confluence.zip');
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      {!loading ? (
        <>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Épicas
          </Typography>
          <Grid
            container
            spacing={4}
            columns={12}
            justifyContent="center"
            className={classes.margin}
          >
            {documentJSON.features.map((item, i) => (
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={'grid' + i}>
                <Card raised>
                  <CardHeader title={'Feature: ' + item.name} />
                  <CardActionArea>
                    <CardContent onClick={openModal(item)}>
                      <Typography variant="body1">
                        {item.description}
                      </Typography>
                      <List
                        sx={{
                          width: '100%',
                          bgcolor: 'background.paper',
                          display: 'list-item',
                        }}
                      >
                        {item.userStories.map((us, i) => (
                          <>
                            <Divider
                              className={classes.margin}
                              key={'features' + i}
                            />
                            <ListItem key={'list' + i} disableGutters>
                              <Typography variant="h6">
                                {'US: ' + us.name}
                              </Typography>
                            </ListItem>
                          </>
                        ))}
                      </List>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          {documentJSON.aiFeatures.length > 0 && (
            <Typography variant="h3" component="h2" gutterBottom align="center">
              ¿Quieres añadir alguna épica recomendada por la IA?
            </Typography>
          )}
          <Grid
            container
            spacing={4}
            columns={12}
            justifyContent="center"
            className={classes.margin}
          >
            {documentJSON.aiFeatures.length > 0 &&
              documentJSON.aiFeatures.map((item, i) => (
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  key={'gridai' + i}
                >
                  <Card raised>
                    <CardHeader
                      title={'Feature: ' + item.name}
                      className={classes.bold}
                    />
                    <CardActionArea>
                      <CardContent onClick={openModal(item)}>
                        <Typography variant="body1">
                          {item.description}
                        </Typography>
                        <List
                          sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            display: 'list-item',
                          }}
                        >
                          {item.userStories.map((us, i) => (
                            <>
                              <Divider
                                className={classes.margin}
                                key={'featuresai' + i}
                              />
                              <ListItem key={'listitem' + i} disableGutters>
                                <Typography variant="h6">
                                  {'US: ' + us.name}
                                </Typography>
                              </ListItem>
                            </>
                          ))}
                        </List>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addFeatures(item)}
                      >
                        Añadir feature
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
      {modal && (
        <DialogComponent
          open={!!modal}
          onClose={() => setActiveModal(undefined)}
          item={modal}
        />
      )}
      {!rallyZip && !confluZip && (
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          disabled={!documentJSON}
          onClick={() => {
            handleFeatures(documentJSON);
            handleConflu(documentJSON);
          }}
        >
          Continuar
        </Button>
      )}
      {rallyZip && (
        <Button
          variant="contained"
          color="primary"
          onClick={downloadRallyZip}
          className={classes.margin}
        >
          Descargar ZIP de Rally
        </Button>
      )}
      {confluZip && (
        <Button
          variant="contained"
          color="primary"
          onClick={downloadConfluZip}
          className={classes.margin}
        >
          Descargar ZIP de Confluence
        </Button>
      )}
    </Container>
  );
};

export default FeaturesPage;
