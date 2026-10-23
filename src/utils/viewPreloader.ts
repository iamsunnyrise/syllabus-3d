/**
 * ═══════════════════════════════════════════════════════════════
 * SYLLABUS 3D — INSTANT VIEW PRELOADER ENGINE
 * ═══════════════════════════════════════════════════════════════
 * Provides intelligent, non-blocking preloading of views and heavy
 * modules to ensure zero-delay, instant page opens across mobile & desktop.
 * ═══════════════════════════════════════════════════════════════
 */

import { AppView } from '../components/layout/Sidebar';

// Map of view ids to their dynamic import promises
const viewLoaders: Record<string, () => Promise<unknown>> = {
  overview: () => Promise.resolve(),
  targets: () => import('../components/views/DailyTargetsView'),
  planner: () => import('../components/views/PlannerView'),
  routine: () => import('../components/views/PlannerView'),
  syllabus: () => import('../components/views/SyllabusView'),
  subjects: () => import('../components/views/SubjectsView'),
  revision: () => import('../components/views/RevisionView'),
  weak: () => import('../components/views/WeakTopicsView'),
  mindmap: () => import('../components/views/MindMapView'),
  analytics: () => import('../components/views/AnalyticsView'),
  heatmap: () => import('../components/views/HeatmapView'),
  platforms: () => import('../components/views/PlatformsView'),
  pacing: () => import('../components/views/PacingView'),
  settings: () => import('../components/views/SettingsView'),
  'youtube-notes': () => import('../components/views/YouTubeNotesView'),
  'mock-tracker': () => import('../components/views/MockTrackerView'),
  'study-tools': () => import('../components/views/StudyToolsView'),
  'study-tools-vocab': () => import('../components/views/StudyToolsView'),
  'study-tools-vocab-ssc': () => import('../components/views/StudyToolsView'),
  'study-tools-maths': () => import('../components/views/StudyToolsView'),
  'study-tools-calc-booster': () => import('../components/views/StudyToolsView'),
  'study-tools-ga': () => import('../components/views/StudyToolsView'),
  landing: () => import('../components/landing/LandingPage')
};

// Track preloaded views to avoid redundant network triggers
const preloadedViews = new Set<string>();

/**
 * Preloads a specific view bundle immediately on hover, touchstart, or focus.
 */
export function preloadView(view: AppView | string): void {
  if (!view || preloadedViews.has(view)) return;
  const loader = viewLoaders[view];
  if (loader) {
    preloadedViews.add(view);
    loader().catch(() => {
      // Allow retry if network failed
      preloadedViews.delete(view);
    });
  }
}

/**
 * Preloads high-priority core views gently during idle phase after app mount.
 * Delayed to 2.5s so initial dashboard render and critical assets have 100% bandwidth.
 */
export function preloadHighPriorityViews(): void {
  const priorityList: AppView[] = [
    'syllabus',
    'planner',
    'targets',
    'revision',
    'mock-tracker'
  ];

  priorityList.forEach((view, index) => {
    setTimeout(() => {
      preloadView(view);
    }, 2500 + index * 600);
  });
}

/**
 * Preloads remaining secondary views sequentially when CPU/network is completely idle.
 */
export function preloadRemainingViews(): void {
  const secondaryList: AppView[] = [
    'study-tools',
    'subjects',
    'weak',
    'mindmap',
    'analytics',
    'heatmap',
    'settings',
    'platforms',
    'pacing',
    'youtube-notes'
  ];

  secondaryList.forEach((view, index) => {
    setTimeout(() => {
      preloadView(view);
    }, 6500 + index * 800);
  });
}
