import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      // Screen readers announce what pressing the button will DO
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* aria-hidden: the icon is decoration, the label above does the talking */}
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
