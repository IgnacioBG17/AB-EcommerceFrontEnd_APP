import { useState, useEffect, useCallback } from "react";

export const useTheme = () => {
  // Lee el tema almacenado o usa "light" por defecto
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  // Aplica el tema al body cada vez que cambia
  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre claro / oscuro
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Permite forzar un tema (opcional)
  const setDark = useCallback(() => setTheme("dark"), []);
  const setLight = useCallback(() => setTheme("light"), []);

  return { theme, toggleTheme, setDark, setLight };
};
