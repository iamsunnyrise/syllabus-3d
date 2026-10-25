import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'warm-cream';

interface ThemeContextType {
  theme: Theme;
  activeTheme: Theme;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
  setTheme: (theme: any, event?: React.MouseEvent | MouseEvent) => void;
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
        if (saved === 'dark' || saved === 'light' || saved === 'warm-cream') {
          return saved as Theme;
        }
        return 'warm-cream';
      } catch {
        return 'warm-cream';
      }
    }
    return 'warm-cream';
  });

  const [enable3D, setEnable3DState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('mocktracker_3d');
        return saved !== null ? saved === 'true' : true;
      } catch {
        return true;
      }
    }
    return true;
  });

  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('mocktracker_reduced_motion');
        return saved !== null ? saved === 'true' : false;
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    // Strip all obsolete legacy themes from html element
    root.classList.remove('oled', 'sepia', 'luxury', 'glass', 'dark', 'light', 'warm-cream');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'warm-cream') {
      root.classList.add('warm-cream');
    } else {
      root.classList.add('light');
    }
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('syllabus3d_theme', theme);
      }
    } catch {}
  }, [theme]);

  const applyAnimatedThemeChange = (nextTheme: Theme, event?: React.MouseEvent | MouseEvent) => {
    if (nextTheme === theme) return;
    const isGoingDark = nextTheme === 'dark';

    // Check user motion preferences
    const isReduced =
      reducedMotion ||
      (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (isReduced || typeof document === 'undefined') {
      setThemeState(nextTheme);
      return;
    }

    // Determine circular expansion epicenter coordinates (from mouse event or default to header toggle position)
    let x = typeof window !== 'undefined' ? window.innerWidth - 65 : 200;
    let y = 28;
    if (event && typeof event.clientX === 'number') {
      x = event.clientX;
      y = event.clientY;
    }

    const endRadius =
      typeof window !== 'undefined'
        ? Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          )
        : 1200;

    const anyDoc = document as any;
    const hasViewTransition = typeof anyDoc.startViewTransition === 'function';

    // 🌟 Strategy 1: Native View Transitions API (Modern Chromium, Edge, Safari 18+)
    if (hasViewTransition) {
      const root = anyDoc.documentElement;
      root.setAttribute('data-theme-anim', isGoingDark ? 'light-to-dark' : 'dark-to-light');

      const transition = anyDoc.startViewTransition(() => {
        setThemeState(nextTheme);
        root.classList.remove('oled', 'sepia', 'luxury', 'glass', 'dark', 'light', 'warm-cream');
        if (nextTheme === 'dark') {
          root.classList.add('dark');
        } else if (nextTheme === 'warm-cream') {
          root.classList.add('warm-cream');
        } else {
          root.classList.add('light');
        }
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ];

          const anim = root.animate(
            {
              clipPath: isGoingDark ? clipPath : [...clipPath].reverse()
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: isGoingDark
                ? '::view-transition-new(root)'
                : '::view-transition-old(root)'
            }
          );

          anim.onfinish = () => {
            root.removeAttribute('data-theme-anim');
          };
        })
        .catch(() => {
          root.removeAttribute('data-theme-anim');
        });
      return;
    }

    // 🌟 Strategy 2: High-Performance Fallback Circular Ripple for any browsers without View Transitions
    const overlay = anyDoc.createElement('div');
    overlay.className = 'theme-transition-ripple-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '999999';
    overlay.style.backgroundColor = isGoingDark
      ? '#090A12'
      : nextTheme === 'warm-cream'
      ? '#FFFDF8'
      : '#FFFFFF';
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.transition = 'clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease';
    anyDoc.body.appendChild(overlay);

    // Trigger reflow to start transition
    void overlay.offsetWidth;

    // Expand circular ripple outward
    overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;

    // Switch theme when ripple is halfway expanded
    setTimeout(() => {
      setThemeState(nextTheme);
    }, 250);

    // Fade out and remove
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
      }, 180);
    }, 500);
  };

  const setTheme = (newTheme: any, event?: React.MouseEvent | MouseEvent) => {
    let resolvedTheme: Theme = 'warm-cream';
    if (newTheme === 'dark') {
      resolvedTheme = 'dark';
    } else if (newTheme === 'light') {
      resolvedTheme = 'light';
    } else if (newTheme === 'warm-cream') {
      resolvedTheme = 'warm-cream';
    } else if (newTheme === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = isSysDark ? 'dark' : 'light';
      } else {
        resolvedTheme = 'light';
      }
    }
    applyAnimatedThemeChange(resolvedTheme, event);
  };

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : theme === 'light' ? 'warm-cream' : 'dark';
    applyAnimatedThemeChange(nextTheme, event);
  };

  const setEnable3D = (enable: boolean) => {
    setEnable3DState(enable);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mocktracker_3d', String(enable));
      }
    } catch {}
  };

  const setReducedMotion = (reduced: boolean) => {
    setReducedMotionState(reduced);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mocktracker_reduced_motion', String(reduced));
      }
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
