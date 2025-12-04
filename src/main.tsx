import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAnalytics } from './services/analytics';
import { detectGenreFromDomain } from './config/domainDetector';
import './index.css';

// Initialize analytics with detected genre before rendering
const genre = detectGenreFromDomain();
initAnalytics(genre);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
