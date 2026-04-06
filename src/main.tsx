import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAnalytics } from './services/analytics';
import { detectGenreFromDomain, setFavicon, setDocumentTitle } from './config/domainDetector';
import { getSeoConfig } from './config/seoConfig';
import { BRAND_THEMES, applyThemeTokens } from './themes';
import './index.css';

// Initialize with detected genre before rendering
const genre = detectGenreFromDomain();
const { storagePrefix } = getSeoConfig(genre);

// Apply theme tokens BEFORE first render to prevent flash of unstyled content
const savedBrand = localStorage.getItem('xclues-brand-theme') || 'claude';
const savedTheme = localStorage.getItem(`${storagePrefix}-theme`) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const brandDef = BRAND_THEMES[savedBrand] || BRAND_THEMES['claude'];
applyThemeTokens(savedTheme === 'dark' ? brandDef.dark : brandDef.light);
document.documentElement.setAttribute('data-theme', savedTheme);
initAnalytics(genre);
setFavicon(genre);
setDocumentTitle(genre);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
