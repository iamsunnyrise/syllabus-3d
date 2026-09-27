export type TimerMode = 'pomodoro' | 'break' | 'timer' | 'stopwatch';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';
export type TimerFontFamily = 'jetbrains' | 'roboto-mono' | 'orbitron';

export interface FocusSessionLog {
  id: string;
  date: string; // 'YYYY-MM-DD'
  startTime: number; // timestamp in ms
  endTime: number; // timestamp in ms
  formattedStartTime: string; // e.g. "10:15 AM"
  formattedEndTime: string; // e.g. "10:45 AM"
  durationMinutes: number;
  durationSeconds: number;
  mode: TimerMode;
  topicId?: string;
  topicName?: string;
  subjectName?: string;
  subjectColor?: string;
  chapterName?: string;
  status: 'completed' | 'interrupted' | 'stopped';
  loopsCompleted?: number;
  notes?: string;
}

export interface TimerSessionState {
  id: string;
  mode: TimerMode;
  topicId?: string;
  topicName?: string;
  subjectName?: string;
  subjectColor?: string;
  chapterName?: string;
  totalDurationSec: number;
  remainingSec: number;
  status: TimerStatus;
  startTimestamp: number | null;
  targetEndTimestamp: number | null;
  pausedTimestamp: number | null;
  accumulatedPausedMs: number;
  stopwatchElapsedSec: number;
  currentLoop?: number;
  targetLoops?: number;
  isLoopActive?: boolean;
}

export interface FloatingTimerSettings {
  enabled: boolean;
  showWhenBackgrounded: boolean;
  showPauseButton: boolean;
  rememberPosition: boolean;
  opacity: number; // 0.5 to 1.0
  size: 'compact' | 'standard';
  enablePiP: boolean;
  position: { x: number; y: number };
}

export interface AndroidFloatingTimerBridge {
  isOverlayPermissionGranted?: () => boolean;
  requestOverlayPermission?: () => void;
  startFloatingTimer?: (jsonState: string) => void;
  updateFloatingTimer?: (jsonState: string) => void;
  stopFloatingTimer?: () => void;
  hideFloatingTimer?: () => void;
  showFloatingTimer?: () => void;
}

declare global {
  interface Window {
    AndroidFloatingTimer?: AndroidFloatingTimerBridge;
    documentPictureInPicture?: {
      requestWindow: (options: { width: number; height: number }) => Promise<Window>;
      window: Window | null;
    };
  }
}
