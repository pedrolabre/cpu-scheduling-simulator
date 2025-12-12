import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    // Aplicar tema ao carregar
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      console.log('🌙 Dark mode ativado');
    } else {
      root.classList.remove('dark');
      console.log('☀️ Light mode ativado');
    }
    console.log('Classes do HTML:', root.className);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Aplicar tema inicial
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const root = document.documentElement;
    if (saved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
