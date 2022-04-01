import React from 'react';
import { Card, CardContent, Typography, Paper } from '@material-ui/core/';



import useStyles from './styles';
import data from '../Data/data.json';

export default function Qotd() {
  const classes = useStyles({
    white: '#ffffff'
  });
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const random = [data[Math.floor(Math.random() * data.length )]];
  

 


  return (
    <Card className={classes.card} style={{backgroundColor: "transparent"}}sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography>
          
            
            { random.map(quote => {
              return(
                <React.Fragment key={quote.id}>
                  <Typography component={'span'} style={{ color: "#fff" }} sx={{ fontSize: 30 }}>"{ quote.quote }" </Typography> 
                  <Typography component={'span'} style={{ color: "#fff" }}>- { quote.author } </Typography>
                </React.Fragment>
              )
            })}
          
        </Typography>
      </CardContent>
    </Card>
    
  )};




    



