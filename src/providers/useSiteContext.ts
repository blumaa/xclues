"use client";

/**
 * Site Context
 *
 * React context for accessing site configuration throughout the app.
 * Provides genre, siteName, and other configuration based on domain.
 */

import { createContext } from 'react';
import { type SiteConfig } from '../config';

export type SiteContextValue = SiteConfig;

// Create context with undefined initial value
export const SiteContext = createContext<SiteContextValue | undefined>(undefined);
