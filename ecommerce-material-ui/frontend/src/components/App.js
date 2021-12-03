import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Typography } from '@material-ui/core';
//
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Typography variant='h4'>Welcome to Ecommerce</Typography>
        <Switch>
          <Route></Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
