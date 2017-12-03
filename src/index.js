import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './component/App';

import './styles/main.scss';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
