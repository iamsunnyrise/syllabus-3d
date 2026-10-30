import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Keyboard,
  X,
  Search,
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  RotateCw,
  AlertTriangle,
  BrainCircuit,
  BarChart3,
  Globe,
  Settings,
  Plus,
  Timer,
  Moon,
  Printer,
  FileText,
  Video,
  ShieldAlert,
  ArrowLeftRight,
  Save,
  Check,
  Clock,
  Menu,
  Zap,
  Compass,
  CornerDownLeft,
  Command
} from 'lucide-react';
import { AppView } from '../layout/Sidebar';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onOpenSearch: () => void;
  onOpenAddTopic: () => void;
  onOpenFocus: () => void;
  onToggleTheme: () => void;
  onTriggerPrint: () => void;
}

export type ShortcutCategory = 'all' | 'navigation' | 'actions' | 'drawer';

interface ShortcutItem {
  id: string;
  keys: string[]; // e.g. ['Ctrl', 'B'] or ['1']
  secondaryKeys?: string[]; // e.g. ['/'] or ['Shift', '/']
  label: string;
  description: string;
  icon: React.ElementType;
  category: 'navigation' | 'actions' | 'drawer';
  badge?: string;
  action?: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSearch,
  onOpenAddTopic,
  onOpenFocus,
  onToggleTheme,
  onTriggerPrint
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ShortcutCategory>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      soundManager.playClick();
      haptics.medium();
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
      setSelectedCategory('all');
      setHighlightedId(null);
    }
  }, [isOpen]);

  // Handle global Esc and keyboard trigger inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes modal or clears search
      if (e.key === 'Escape') {
        e.preventDefault();
        if (searchQuery.trim()) {
          setSearchQuery('');
        } else {
          onClose();
        }
        return;
      }

      // If user is actively typing in the search input, do not hijack normal letters
      if (document.activeElement === searchInputRef.current) {
        if (e.key === 'Enter') {
          // If search has filtered results, trigger the first matching action
          if (filteredShortcuts.length > 0 && filteredShortcuts[0].action) {
            e.preventDefault();
            soundManager.playClick();
            haptics.selection();
            filteredShortcuts[0].action!();
          }
        }
        return;
      }

      // Single-key direct triggers when focus is outside the input box
      const key = e.key.toUpperCase();
      const matched = shortcuts.find(
        s => s.keys.length === 1 && s.keys[0].toUpperCase() === key && s.action
      );

      if (matched && matched.action) {
        e.preventDefault();
        setHighlightedId(matched.id);
        soundManager.playClick();
        haptics.selection();
        setTimeout(() => {
          matched.action!();
        }, 120);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchQuery, onClose]);

  // Master shortcut definitions
  const shortcuts: ShortcutItem[] = useMemo(() => [
    // 🧭 Quick View Navigation
    {
      id: 'nav_dashboard',
      keys: ['1'],
      label: 'Dashboard (Overview)',
      description: 'Main progress dashboard, daily milestones & targets',
      icon: LayoutDashboard,
      category: 'navigation',
      action: () => {
        onNavigate('overview');
        onClose();
      }
    },
    {
      id: 'nav_syllabus',
      keys: ['2'],
      label: 'Syllabus Explorer',
      description: 'Explore subjects, chapters & topics hierarchy',
      icon: BookOpen,
      category: 'navigation',
      action: () => {
        onNavigate('syllabus');
        onClose();
      }
    },
    {
      id: 'nav_planner',
      keys: ['3'],
      label: 'Study Planner',
      description: 'Weekly study schedule & personalized task manager',
      icon: CalendarCheck,
      category: 'navigation',
      action: () => {
        onNavigate('planner');
        onClose();
      }
    },
    {
      id: 'nav_revision',
      keys: ['4'],
      label: 'Spaced Revision',
      description: 'Active recall spaced repetition & Leitner box review',
      icon: RotateCw,
      category: 'navigation',
      action: () => {
        onNavigate('revision');
        onClose();
      }
    },
    {
      id: 'nav_weak',
      keys: ['5'],
      label: 'Weak Topics & Traps',
      description: 'Diagnose exam traps, low-confidence areas & error log',
      icon: AlertTriangle,
      category: 'navigation',
      action: () => {
        onNavigate('weak');
        onClose();
      }
    },
    {
      id: 'nav_mindmap',
      keys: ['6'],
      label: 'Knowledge Mindmap',
      description: 'Interactive visual concept graphs & knowledge node links',
      icon: BrainCircuit,
      category: 'navigation',
      action: () => {
        onNavigate('mindmap');
        onClose();
      }
    },
    {
      id: 'nav_analytics',
      keys: ['7'],
      label: 'Analytics & Heatmap',
      description: 'Track mastery velocity, study streaks & completion stats',
      icon: BarChart3,
      category: 'navigation',
      action: () => {
        onNavigate('analytics');
        onClose();
      }
    },
    {
      id: 'nav_platforms',
      keys: ['8'],
      label: 'Study Station & Hub',
      description: 'External study portals, test series & YouTube hubs',
      icon: Globe,
      category: 'navigation',
      action: () => {
        onNavigate('platforms');
        onClose();
      }
    },
    {
      id: 'nav_settings',
      keys: ['9'],
      label: 'App Settings',
      description: 'Audio preferences, target exams & profile options',
      icon: Settings,
      category: 'navigation',
      action: () => {
        onNavigate('settings');
        onClose();
      }
    },
    {
      id: 'nav_pacing',
      keys: ['T'],
      label: 'Target Pacing & Forecast',
      description: 'Calculate target exam velocity, buffer & finish date',
      icon: Clock,
      category: 'navigation',
      action: () => {
        onNavigate('pacing');
        onClose();
      }
    },

    // ⚡ Global Commands
    {
      id: 'act_search',
      keys: ['Ctrl', 'K'],
      secondaryKeys: ['/'],
      label: 'Search Palette',
      description: 'Universal instant search across topics, formulas & notes',
      icon: Search,
      category: 'actions',
      badge: 'UNIVERSAL',
      action: () => {
        onClose();
        setTimeout(onOpenSearch, 60);
      }
    },
    {
      id: 'act_sidebar',
      keys: ['Ctrl', 'B'],
      label: 'Toggle Sidebar',
      description: 'Expand or collapse navigation dock for focus mode',
      icon: Menu,
      category: 'actions'
    },
    {
      id: 'act_focus',
      keys: ['F'],
      label: '3D Focus Chamber',
      description: 'Launch Pomodoro timer with immersive ambient soundscapes',
      icon: Timer,
      category: 'actions',
      badge: 'AUDIO',
      action: () => {
        onClose();
        setTimeout(onOpenFocus, 60);
      }
    },
    {
      id: 'act_add_topic',
      keys: ['N'],
      label: 'Add Custom Topic',
      description: 'Create new syllabus subjects, chapters & topics',
      icon: Plus,
      category: 'actions',
      badge: 'FAST',
      action: () => {
        onClose();
        setTimeout(onOpenAddTopic, 60);
      }
    },
    {
      id: 'act_theme',
      keys: ['D'],
      label: 'Toggle Theme',
      description: 'Switch between Dark, Warm Parchment & Clean Light modes',
      icon: Moon,
      category: 'actions',
      action: () => {
        onToggleTheme();
      }
    },
    {
      id: 'act_print',
      keys: ['Ctrl', 'P'],
      secondaryKeys: ['P'],
      label: 'Print Desk Cheatsheet',
      description: 'Generate clean ink-friendly printable study sheet',
      icon: Printer,
      category: 'actions',
      action: () => {
        onClose();
        setTimeout(onTriggerPrint, 100);
      }
    },
    {
      id: 'act_shortcuts',
      keys: ['?'],
      secondaryKeys: ['Shift', '/'],
      label: 'Shortcuts Cheatsheet',
      description: 'Open or close this interactive keyboard control center',
      icon: Keyboard,
      category: 'actions'
    },
    {
      id: 'act_close_modal',
      keys: ['Esc'],
      label: 'Close Active Modal',
      description: 'Dismiss open drawers, search dialogs & popups',
      icon: X,
      category: 'actions',
      action: () => onClose()
    },

    // 📖 Topic Detail Drawer & Study Mode
    {
      id: 'drawer_overview',
      keys: ['1'],
      label: 'Drawer: Overview Tab',
      description: 'Concept checkpoints, weightage marks & mastery rating',
      icon: LayoutDashboard,
      category: 'drawer'
    },
    {
      id: 'drawer_lectures',
      keys: ['2'],
      label: 'Drawer: Lectures Tab',
      description: 'Curated YouTube video lectures & timestamped study notes',
      icon: Video,
      category: 'drawer'
    },
    {
      id: 'drawer_notes',
      keys: ['3'],
      label: 'Drawer: Notes Tab',
      description: 'Rich markdown notes, PDF attachments & key formulas',
      icon: FileText,
      category: 'drawer'
    },
    {
      id: 'drawer_mistakes',
      keys: ['4'],
      label: 'Drawer: Mistakes Tab',
      description: 'Active exam traps, error logs & concept clarification',
      icon: ShieldAlert,
      category: 'drawer'
    },
    {
      id: 'drawer_switch_tabs',
      keys: ['←', '→'],
      label: 'Switch Adjacent Tabs',
      description: 'Cycle sequentially through drawer study sections',
      icon: ArrowLeftRight,
      category: 'drawer'
    },
    {
      id: 'drawer_save_notes',
      keys: ['Ctrl', 'S'],
      label: 'Quick Save Notes',
      description: 'Instant auto-save topic markdown notes without clicking',
      icon: Save,
      category: 'drawer'
    }
  ], [onNavigate, onClose, onOpenSearch, onOpenFocus, onOpenAddTopic, onToggleTheme, onTriggerPrint]);

  // Filtering by category and search query
  const filteredShortcuts = useMemo(() => {
    let result = shortcuts;

    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(s => {
        const matchesLabel = s.label.toLowerCase().includes(q);
        const matchesDesc = s.description.toLowerCase().includes(q);
        const matchesKey = s.keys.some(k => k.toLowerCase().includes(q));
        const matchesSecondary = s.secondaryKeys?.some(k => k.toLowerCase().includes(q));
        const matchesCategory = s.category.toLowerCase().includes(q);
        return matchesLabel || matchesDesc || matchesKey || matchesSecondary || matchesCategory;
      });
    }

    return result;
  }, [shortcuts, selectedCategory, searchQuery]);

  // Counts for Category Tabs
  const counts = useMemo(() => {
    return {
      all: shortcuts.length,
      navigation: shortcuts.filter(s => s.category === 'navigation').length,
      actions: shortcuts.filter(s => s.category === 'actions').length,
      drawer: shortcuts.filter(s => s.category === 'drawer').length
    };
  }, [shortcuts]);

  // Helper to render physical 3D keycaps
  const renderKeycapGroup = (keys: string[], secondaryKeys?: string[]) => {
    return (
      <div className="flex items-center gap-1.5 shrink-0 select-none">
        <div className="flex items-center gap-1">
          {keys.map((k, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">+</span>}
              <kbd className="shortcut-keycap px-2 py-1 text-xs min-w-[24px] text-center">
                {k}
              </kbd>
            </React.Fragment>
          ))}
        </div>

        {secondaryKeys && secondaryKeys.length > 0 && (
          <>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-0.5">
              or
            </span>
            <div className="flex items-center gap-1">
              {secondaryKeys.map((k, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">+</span>}
                  <kbd className="shortcut-keycap px-2 py-1 text-xs min-w-[24px] text-center">
                    {k}
                  </kbd>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  if (!isOpen || (typeof window !== 'undefined' && window.innerWidth < 768)) return null;

  return createPortal(
    <div
      className="hidden md:flex fixed inset-0 z-[120] items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in select-none"
      onClick={() => {
        haptics.light();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-palette-title"
    >
      <div
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-[#12131D] border border-slate-200/90 dark:border-[#26283B] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] shortcuts-modal-card modal-container transition-all"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 dark:border-[#1E2030] bg-slate-50/70 dark:bg-[#161825]/90 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs shrink-0">
              <Keyboard className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="shortcuts-palette-title"
                  className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight"
                >
                  Keyboard Shortcuts
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 to-indigo-500/15 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  Speedrun
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Navigate views and execute study actions with lightning speed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex shortcut-keycap px-2 py-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Esc
            </kbd>
            <button
              onClick={() => {
                soundManager.playClick();
                haptics.light();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer active:scale-95"
              title="Close (Esc)"
              aria-label="Close shortcuts modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Command Search Bar & Category Filter Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-[#1E2030] bg-white dark:bg-[#12131D] space-y-3 shrink-0">
          {/* Search Input */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search shortcuts by action or key (e.g. '1', 'timer', 'theme', 'print')..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold bg-slate-50 dark:bg-[#171826] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200/80 dark:border-[#27293D] focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
            />
            <div className="absolute right-3 flex items-center gap-2">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  {filteredShortcuts.length} total
                </span>
              )}
            </div>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {[
              { id: 'all', label: 'All Shortcuts', count: counts.all, icon: Command },
              { id: 'navigation', label: '🧭 Views & Navigation', count: counts.navigation, icon: Compass },
              { id: 'actions', label: '⚡ Global Actions', count: counts.actions, icon: Zap },
              { id: 'drawer', label: '📖 Topic Study Drawer', count: counts.drawer, icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.selection();
                  setSelectedCategory(tab.id as ShortcutCategory);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  selectedCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/25'
                    : 'bg-slate-100/80 dark:bg-[#191B2A] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-[#202235]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    selectedCategory === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/80 dark:bg-[#25283D] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Shortcut List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 custom-scrollbar select-text">
          {filteredShortcuts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredShortcuts.map((item) => {
                const Icon = item.icon;
                const isNav = item.category === 'navigation';
                const isAct = item.category === 'actions';
                const isHighlighted = highlightedId === item.id;

                const iconBoxStyle = isNav
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-500/20'
                  : isAct
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20'
                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.action) {
                        soundManager.playClick();
                        haptics.selection();
                        setHighlightedId(item.id);
                        setTimeout(() => {
                          item.action!();
                        }, 80);
                      }
                    }}
                    className={`group flex items-center justify-between p-3 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                      item.action ? 'cursor-pointer' : 'cursor-default'
                    } ${
                      isHighlighted
                        ? 'ring-2 ring-indigo-500 bg-indigo-50/70 dark:bg-indigo-500/15 border-indigo-400'
                        : 'bg-slate-50/70 dark:bg-[#161726] border-slate-200/80 dark:border-[#232538] hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-[#1B1D2E] hover:shadow-sm'
                    }`}
                  >
                    {/* Left Icon & Text */}
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${iconBoxStyle}`}>
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Tactile Keycaps */}
                    {renderKeycapGroup(item.keys, item.secondaryKeys)}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-14 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#1B1D2C] border border-slate-200 dark:border-[#2A2C40] flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No shortcuts found for "{searchQuery}"
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for general terms like 'timer', 'topic', 'notes', or view names.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  searchInputRef.current?.focus();
                }}
                className="mt-3.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Reset Search Filter
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-[#1E2030] bg-slate-50/80 dark:bg-[#151624] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3] shrink-0" />
            <span className="font-medium">
              Shortcuts pause automatically while typing in note editors & search inputs.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px]">
            <span className="text-slate-400">Click any row or press key to run</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1">
              <kbd className="shortcut-keycap px-1.5 py-0.5 text-[10px]">Esc</kbd>
              <span>to dismiss</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
