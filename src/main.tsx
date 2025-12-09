import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAnalytics } from './services/analytics';
import { detectGenreFromDomain, setFavicon, setDocumentTitle } from './config/domainDetector';
import './index.css';

// Initialize with detected genre before rendering
const genre = detectGenreFromDomain();
initAnalytics(genre);
setFavicon(genre);
setDocumentTitle(genre);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
