import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );

  // Whenever theme changes, update the attribute that the CSS reacts to
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      // Save only when the user actively chooses.
      // Until then, we follow their computer's setting.
      localStorage.setItem("theme", next);
    } catch {
      // localStorage can be blocked (e.g. some private modes). The toggle still works.
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// A small helper so components can write: const { theme, toggleTheme } = useTheme();
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}
