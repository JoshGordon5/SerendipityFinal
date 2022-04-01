import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Paper } from '@material-ui/core/';



import useStyles from './styles';
// import './styles.css';

import Feed from './Feed';

export default function Reddit() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('GetMotivated');
  const classes = useStyles();
  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit +".json").then(
      res => {
        if (res.status !== 200) {
          console.warn("Warning: Something is wrong with the api.");
          return;
        }
        res.json().then(data => {
          if (data != null)
            setArticles(data.data.children);
        });
      }
    )
  }, [subreddit]);

  return (
    <Card className={classes.card} style={{backgroundColor: "transparent"}}sx={{ minWidth: 200 }}>
    <CardContent>
      <Typography>
        <div className="App">
        <header>
            <input className="subreddit_input" onChange={e => setSubreddit(e.target.value)} value={subreddit} />
        </header>
        <div className="articles">
            {(articles != null) ? articles.map((article, index) => <Feed key={index} article={article.data} />) : ''}
        </div>
        </div>
    );
        </Typography>
      </CardContent>
    </Card>
    
    )};

