import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Widgets from './components/Widgets/Widgets';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import ResetPassword from './components/Auth/ForgotPassword';
import ForgotPassword from './components/Auth/ForgotPassword';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Widgets />
        
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/forgotpassword"exact component={ForgotPassword}/>
          <Route exact path="/passwordreset/:resetToken" component={ResetPassword}/>
        </Switch>
        
      </Container>
    </BrowserRouter>
  );
};

export default App;
