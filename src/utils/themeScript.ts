import { BRAND_THEMES, BRAND_STORAGE_KEY, DEFAULT_BRAND } from '../themes';

/**
 * Returns an inline script string that runs before first paint to prevent theme flashes.
 *
 * Theme (light/dark): reads cookie → localStorage → system preference, sets
 * data-theme, writes the cookie for future SSR.
 * Brand: reads localStorage (whitelist-validated), falls back to DEFAULT_BRAND,
 * sets data-brand — the generated brands.css does the rest, same pattern as
 * data-theme. Also mirrors the brand to a cookie for server access.
 */
export function getThemeInitScript(): string {
  const validBrands = JSON.stringify(Object.keys(BRAND_THEMES));
  return `(function(){try{var c=document.cookie.match(/(^| )xclues-theme=([^;]+)/);var t=c?c[2]:null;if(!t){try{t=localStorage.getItem('xclues-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.cookie='xclues-theme='+t+';path=/;max-age=31536000;SameSite=Lax'}document.documentElement.setAttribute('data-theme',t);var b=null;try{b=localStorage.getItem('${BRAND_STORAGE_KEY}')}catch(e){}if(${validBrands}.indexOf(b)===-1){b='${DEFAULT_BRAND}'}document.documentElement.setAttribute('data-brand',b);if(!document.cookie.match(/(^| )${BRAND_STORAGE_KEY}=/)){document.cookie='${BRAND_STORAGE_KEY}='+b+';path=/;max-age=31536000;SameSite=Lax'}}catch(e){}})()`;
}
