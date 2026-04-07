import { useThemeContext } from '../../providers/useThemeContext';
import { BRAND_NAMES } from '../../hooks/useTheme';
import './BrandThemeSwitcher.css';

function PaletteIcon() {
  return (
    <svg
      className="brand-theme-switcher__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z" />
    </svg>
  );
}

export function BrandThemeSwitcher() {
  const { brandTheme, setBrandTheme } = useThemeContext();

  const handleToggle = () => {
    const currentIndex = BRAND_NAMES.indexOf(brandTheme);
    const nextIndex = (currentIndex + 1) % BRAND_NAMES.length;
    setBrandTheme(BRAND_NAMES[nextIndex]);
  };

  const currentIndex = BRAND_NAMES.indexOf(brandTheme);
  const nextIndex = (currentIndex + 1) % BRAND_NAMES.length;
  const nextName = BRAND_NAMES[nextIndex];
  const label = `Switch to ${nextName} theme`;

  return (
    <button
      className="brand-theme-switcher"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      type="button"
    >
      <PaletteIcon />
    </button>
  );
}
