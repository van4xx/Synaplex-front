import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Определяем начальную тему
  const getInitialTheme = (): Theme => {
    // Проверяем, есть ли сохраненная тема (приоритет у выбора пользователя)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Если нет сохраненной темы, берем из Telegram
    if (window.Telegram?.WebApp?.colorScheme) {
      const tgTheme = window.Telegram.WebApp.colorScheme;
      return tgTheme === 'light' ? 'light' : 'dark';
    }

    // По умолчанию темная тема
    return 'dark';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Применяем тему
    document.documentElement.setAttribute('data-theme', theme);

    // Подписываемся на изменение темы в Telegram
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      // Только если пользователь не выбрал тему вручную
      if (!savedTheme && window.Telegram?.WebApp?.colorScheme) {
        const tgTheme = window.Telegram.WebApp.colorScheme;
        const newTheme = tgTheme === 'light' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    // Telegram WebApp может отправлять событие изменения темы
    window.Telegram?.WebApp?.onEvent?.('themeChanged', handleThemeChange);

    return () => {
      window.Telegram?.WebApp?.offEvent?.('themeChanged', handleThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
