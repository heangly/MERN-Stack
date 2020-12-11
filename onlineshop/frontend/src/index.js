import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//
import App from './components/App';
import store from './store';
//
import './styles/bootstrap.min.css';
import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector('#root')
);
