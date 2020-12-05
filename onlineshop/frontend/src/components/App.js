import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
//
import Header from './Header';
import Footer from './Footer';
import HomeScreen from '../screens/HomeScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
