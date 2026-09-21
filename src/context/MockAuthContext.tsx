import React, { createContext, useContext, useState, useCallback } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  targetExam?: string;
  isGuest?: boolean;
}

interface MockAuthContextType {
  user: UserProfile | null;
  isSyncing: boolean;
  setIsSyncing: (syncing: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const LOCAL_USER_KEY = 'syllabus3d_mocktracker_user';

const defaultProfile: UserProfile = {
  id: 'aspirant-local',
  name: 'Sunny Rise',
  targetExam: 'SSC CGL',
  isGuest: false
};

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return (
    <MockAuthContext.Provider
      value={{
        user,
        isSyncing,
        setIsSyncing,
        isAuthModalOpen,
        setIsAuthModalOpen,
        updateProfile,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    // Return a safe fallback so components work even if outside MockAuthProvider
    return {
      user: defaultProfile,
      isSyncing: false,
      setIsSyncing: () => {},
      isAuthModalOpen: false,
      setIsAuthModalOpen: () => {},
      updateProfile: () => {},
    };
  }
  return context;
};
