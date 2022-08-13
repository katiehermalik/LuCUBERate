import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { CubeProvider } from './context/ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <CubeProvider>
      <Router>
        <App />
      </Router>
    </CubeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

