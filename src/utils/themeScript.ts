/**
 * Returns an inline script string that runs before first paint to prevent theme flashes.
 *
 * Reads: cookie → localStorage → system preference
 * Sets: data-theme attribute, writes cookie for future SSR
 * Also migrates brand preference from localStorage to cookie for server access.
 */
export function getThemeInitScript(): string {
  return `(function(){try{var c=document.cookie.match(/(^| )xclues-theme=([^;]+)/);var t=c?c[2]:null;if(!t){try{t=localStorage.getItem('xclues-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.cookie='xclues-theme='+t+';path=/;max-age=31536000;SameSite=Lax'}document.documentElement.setAttribute('data-theme',t);var b=null;try{b=localStorage.getItem('xclues-brand-theme')}catch(e){}if(b&&!document.cookie.match(/(^| )xclues-brand-theme=/)){document.cookie='xclues-brand-theme='+b+';path=/;max-age=31536000;SameSite=Lax'}}catch(e){}})()`;
}
