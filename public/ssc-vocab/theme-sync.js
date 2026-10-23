(function() {
  function applyWebsiteTheme(themeName) {
    var root = document.documentElement;
    var isDark = themeName === 'dark';
    var targetTheme = isDark ? 'dark' : 'warm-cream';

    root.setAttribute('data-theme', targetTheme);
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('warm-cream', 'light');
    } else {
      root.classList.add('warm-cream', 'light');
      root.classList.remove('dark');
    }

    // Update internal theme toggle button if present
    var icon = document.getElementById('themeIcon');
    var text = document.getElementById('themeText');
    if (icon && text) {
      if (isDark) {
        icon.setAttribute('data-lucide', 'moon');
        text.textContent = 'Dark';
      } else {
        icon.setAttribute('data-lucide', 'sun');
        text.textContent = 'Warm Cream';
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  function detectAndApply() {
    var detectedTheme = 'warm-cream';
    try {
      if (window.parent && window.parent !== window && window.parent.document) {
        var parentDoc = window.parent.document.documentElement;
        if (parentDoc.classList.contains('dark')) {
          detectedTheme = 'dark';
        } else {
          detectedTheme = 'warm-cream';
        }
      } else {
        var saved = localStorage.getItem('syllabus3d_theme');
        if (saved === 'dark') {
          detectedTheme = 'dark';
        } else {
          detectedTheme = 'warm-cream';
        }
      }
    } catch (e) {
      try {
        var saved = localStorage.getItem('syllabus3d_theme');
        detectedTheme = (saved === 'dark') ? 'dark' : 'warm-cream';
      } catch (err) {}
    }

    applyWebsiteTheme(detectedTheme);
  }

  // Run immediately
  detectAndApply();

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectAndApply);
  }

  // Listen to message from parent window (SscSpecialVocabView)
  window.addEventListener('message', function(event) {
    if (event.data && (event.data.type === 'THEME_SYNC' || event.data.type === 'THEME_CHANGE')) {
      var nextTheme = event.data.theme === 'dark' ? 'dark' : 'warm-cream';
      applyWebsiteTheme(nextTheme);
    }
  });

  // Listen to localStorage theme changes from other tabs/windows
  window.addEventListener('storage', function(e) {
    if (e.key === 'syllabus3d_theme') {
      applyWebsiteTheme(e.newValue === 'dark' ? 'dark' : 'warm-cream');
    }
  });

  // Expose global for manual toggle
  window.__applyWebsiteTheme = applyWebsiteTheme;

  // Intercept or provide toggleTheme
  window.toggleTheme = function() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'warm-cream' : 'dark';
    applyWebsiteTheme(next);
    try {
      localStorage.setItem('syllabus3d_theme', next);
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'THEME_SYNC', theme: next }, '*');
      }
    } catch (e) {}
  };
})();
