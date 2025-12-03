/**
 * Site Context
 *
 * React context for accessing site configuration throughout the app.
 * Provides genre, siteName, and other configuration based on domain.
 */

import { createContext } from 'react';
import { detectGenreFromDomain, getSiteConfig, type SiteConfig } from '../config';

// Detect genre from domain and get initial config
const initialGenre = detectGenreFromDomain();
const initialConfig = getSiteConfig(initialGenre);

// Create context with the initial config
export const SiteContext = createContext<SiteConfig>(initialConfig);
