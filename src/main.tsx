import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ServerContext } from './context/ServerContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServerContext.Provider value={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServerContext.Provider>
  </React.StrictMode>
);
