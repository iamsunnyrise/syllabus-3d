import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'warm-cream';

interface ThemeContextType {
  theme: Theme;
  activeTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: any) => void;
  isDark: boolean;
  enable3D: boolean;
  setEnable3D: (enable: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('syllabus3d_theme');
        if (saved === 'light' || saved === 'dark' || saved === 'warm-cream') {
          return saved as Theme;
        }
        return 'light';
      } catch {
        return 'light';
      }
    }
    return 'light';
  });

  const [enable3D, setEnable3DState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mocktracker_3d');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mocktracker_reduced_motion');
      return saved !== null ? saved === 'true' : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    // Strip all obsolete legacy themes from html element
    root.classList.remove('oled', 'sepia', 'luxury', 'glass', 'dark', 'light', 'warm-cream');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'warm-cream') {
      root.classList.add('warm-cream');
      root.classList.add('light');
    } else {
      root.classList.add('light');
    }
    try {
      localStorage.setItem('syllabus3d_theme', theme);
    } catch {}
  }, [theme]);

  const setTheme = (newTheme: any) => {
    if (newTheme === 'dark' || newTheme === 'light' || newTheme === 'warm-cream') {
      setThemeState(newTheme);
    } else if (newTheme === 'system') {
      const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(isSysDark ? 'dark' : 'light');
    }
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : prev === 'light' ? 'warm-cream' : 'dark'));
  };

  const setEnable3D = (enable: boolean) => {
    setEnable3DState(enable);
    try {
      localStorage.setItem('mocktracker_3d', String(enable));
    } catch {}
  };

  const setReducedMotion = (reduced: boolean) => {
    setReducedMotionState(reduced);
    try {
      localStorage.setItem('mocktracker_reduced_motion', String(reduced));
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      activeTheme: theme,
      toggleTheme,
      setTheme,
      isDark: theme === 'dark',
      enable3D,
      setEnable3D,
      reducedMotion,
      setReducedMotion,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

