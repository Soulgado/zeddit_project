import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App.js';
import configureStore from '../redux/configureStore';

function Root(props) {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

export default Root;

