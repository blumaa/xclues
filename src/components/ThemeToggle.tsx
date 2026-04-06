import { useThemeContext } from '../providers/useThemeContext';
import { trackEvent, EVENTS } from '../services/analytics';
import { IconButton } from './IconButton';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    trackEvent(EVENTS.THEME_TOGGLED, { newTheme });
  };

  return (
    <IconButton
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
}
