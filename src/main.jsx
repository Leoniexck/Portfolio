if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // HIER importieren
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Der Router umschließt die GESAMTE App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);