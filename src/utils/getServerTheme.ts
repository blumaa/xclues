type Theme = 'light' | 'dark';

export function getServerTheme(cookieValue: string | undefined): Theme {
  if (cookieValue === 'dark') return 'dark';
  return 'light';
}
