import { IconButton, SunIcon, MoonIcon } from "../atoms";
import { useThemeContext } from "../../providers/useThemeContext";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} aria-label="Toggle theme">
      <div className="theme-icon-container">
        <div className="icon-light"><SunIcon /></div>
        <div className="icon-dark"><MoonIcon /></div>
      </div>
    </IconButton>
  );
}
