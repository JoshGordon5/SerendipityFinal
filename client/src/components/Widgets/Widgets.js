import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core/';

import Weather from '../Weather/Weather';
import FetchQuote from '../QOTD/Qotd';

import useStyles from './styles';

const Widgets = ({  }) => {
  
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));


  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          
        </Typography>
      </Paper>
    );
  }

  return (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        <Grid item xs={6}>
            <Weather />
        </Grid>
        <Grid item xs={6}>
            <FetchQuote />
        </Grid>
      </Grid>
  );
};

export default Widgets;
