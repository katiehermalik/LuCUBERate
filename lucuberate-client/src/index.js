import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

