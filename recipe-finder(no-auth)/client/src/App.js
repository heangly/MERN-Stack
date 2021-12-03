import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Recipes from './components/Recipes';
import Navbar from './components/Navbar';
import Favorite from './components/Favorite';
import Footer from './components/Footer';
import Page404 from './components/Page404';


const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Recipes}/>
        <Route exact path='/recipes' component={Recipes}/>
        <Route exact path='/recipes/favorite' component={Favorite}/>
        <Route component={Page404}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
