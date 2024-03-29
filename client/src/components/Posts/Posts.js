import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))


  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map(
        post =>
          (user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Grid key={post._id} item xs={12} sm={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          )
      )}
      </Grid>
    ))};

export default Posts;
