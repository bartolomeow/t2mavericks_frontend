import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

function AboutPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        We are a team of developers dedicated to creating high-quality software
        for our clients.
      </Typography>
    </Paper>
  );
}

export default AboutPage;
