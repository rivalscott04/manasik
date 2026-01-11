import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppMode = 'lansia' | 'pendamping' | 'umum';
export type AudioLanguage = 'indonesia' | 'sasak' | 'samawa' | 'mbojo';

interface AppState {
  mode: AppMode | null;
  audioLanguage: AudioLanguage | null;
  onboardingComplete: boolean;
  currentStep: number;
  totalSteps: number;
}

interface AppContextType extends AppState {
  setMode: (mode: AppMode) => void;
  setAudioLanguage: (language: AudioLanguage) => void;
  completeOnboarding: () => void;
  setCurrentStep: (step: number) => void;
  resetApp: () => void;
}

const STORAGE_KEY = 'manasik-haji-app';

const defaultState: AppState = {
  mode: null,
  audioLanguage: null,
  onboardingComplete: false,
  currentStep: 1,
  totalSteps: 10,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultState, ...JSON.parse(saved) };
        } catch {
          return defaultState;
        }
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setMode = (mode: AppMode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const setAudioLanguage = (audioLanguage: AudioLanguage) => {
    setState(prev => ({ ...prev, audioLanguage }));
  };

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, onboardingComplete: true }));
  };

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: Math.max(1, Math.min(step, prev.totalSteps)) }));
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMode,
        setAudioLanguage,
        completeOnboarding,
        setCurrentStep,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
