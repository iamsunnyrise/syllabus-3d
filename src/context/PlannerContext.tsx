import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { PlannerTask, PlannerColumnStatus } from '../types/syllabus';
import { getTodayDateString } from '../utils/spacedRepetition';
import { soundManager } from '../utils/soundEffects';
import { haptics } from '../utils/haptics';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PLANNER = 'syllabus3d_planner_tasks_v1';

export const INITIAL_PLANNER_TASKS: PlannerTask[] = [
  {
    id: 'plan_1',
    topicName: 'Percentage & Fractional Conversions',
    subjectName: 'Quantitative Aptitude',
    subjectColor: '#3b82f6',
    status: 'today',
    scheduledDate: getTodayDateString(),
    estimatedMinutes: 45,
    isCustom: false,
    priority: 'high',
    category: 'concept'
  },
  {
    id: 'plan_2',
    topicName: 'Syllogism & Venn Diagrams',
    subjectName: 'Reasoning Ability',
    subjectColor: '#8b5cf6',
    status: 'today',
    scheduledDate: getTodayDateString(),
    estimatedMinutes: 30,
    isCustom: false,
    priority: 'medium',
    category: 'practice'
  },
  {
    id: 'plan_3',
    topicName: 'Error Spotting & Subject-Verb Rules',
    subjectName: 'English Language',
    subjectColor: '#10b981',
    status: 'in_progress',
    scheduledDate: getTodayDateString(),
    estimatedMinutes: 40,
    isCustom: false,
    priority: 'high',
    category: 'revision'
  },
  {
    id: 'plan_4',
    topicName: 'Full Mock Test Analysis & Mistake Log',
    subjectName: 'Custom Target',
    subjectColor: '#ec4899',
    status: 'upcoming',
    scheduledDate: getTodayDateString(),
    estimatedMinutes: 60,
    isCustom: true,
    priority: 'high',
    category: 'mock'
  }
];

export interface PlannerContextType {
  plannerTasks: PlannerTask[];
  addPlannerTask: (taskData: Omit<PlannerTask, 'id'>) => void;
  togglePlannerTask: (taskId: string) => void;
  movePlannerTask: (taskId: string, newStatus: PlannerColumnStatus) => void;
  deletePlannerTask: (taskId: string) => void;
  clearCompletedPlannerTasks: () => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_PLANNER);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {}
    }
    return INITIAL_PLANNER_TASKS;
  });

  const persistTasks = useCallback((tasks: PlannerTask[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PLANNER, JSON.stringify(tasks));
      } catch {}
    }
  }, []);

  const addPlannerTask = useCallback((taskData: Omit<PlannerTask, 'id'>) => {
    const newTask: PlannerTask = {
      ...taskData,
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9)
    };
    setPlannerTasks(prev => {
      const updated = [newTask, ...(prev || [])];
      persistTasks(updated);
      return updated;
    });
    soundManager.playClick();
  }, [persistTasks]);

  const togglePlannerTask = useCallback((taskId: string) => {
    setPlannerTasks(prev => {
      let isComp = false;
      const updated = (prev || []).map(t => {
        if (!t || t.id !== taskId) return t;
        isComp = t.status === 'completed';
        const nextStatus: PlannerColumnStatus = isComp ? 'today' : 'completed';
        return {
          ...t,
          status: nextStatus,
          completedAt: !isComp ? getTodayDateString() : undefined
        };
      });
      if (!isComp) {
        soundManager.playCompleteChime();
        haptics.success();
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      } else {
        soundManager.playClick();
        haptics.light();
      }
      persistTasks(updated);
      return updated;
    });
  }, [persistTasks]);

  const movePlannerTask = useCallback((taskId: string, newStatus: PlannerColumnStatus) => {
    setPlannerTasks(prev => {
      const updated = (prev || []).map(t => {
        if (!t || t.id !== taskId) return t;
        return {
          ...t,
          status: newStatus,
          completedAt: newStatus === 'completed' ? getTodayDateString() : undefined
        };
      });
      if (newStatus === 'completed') {
        soundManager.playCompleteChime();
        haptics.success();
        confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
      } else {
        soundManager.playClick();
        haptics.light();
      }
      persistTasks(updated);
      return updated;
    });
  }, [persistTasks]);

  const deletePlannerTask = useCallback((taskId: string) => {
    setPlannerTasks(prev => {
      const updated = (prev || []).filter(t => t && t.id !== taskId);
      persistTasks(updated);
      return updated;
    });
    soundManager.playClick();
  }, [persistTasks]);

  const clearCompletedPlannerTasks = useCallback(() => {
    setPlannerTasks(prev => {
      const updated = (prev || []).filter(t => t && t.status !== 'completed');
      persistTasks(updated);
      return updated;
    });
    soundManager.playClick();
  }, [persistTasks]);

  const value = useMemo(
    () => ({
      plannerTasks,
      addPlannerTask,
      togglePlannerTask,
      movePlannerTask,
      deletePlannerTask,
      clearCompletedPlannerTasks
    }),
    [
      plannerTasks,
      addPlannerTask,
      togglePlannerTask,
      movePlannerTask,
      deletePlannerTask,
      clearCompletedPlannerTasks
    ]
  );

  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
