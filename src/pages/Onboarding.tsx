import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { LanguageScreen } from '@/components/onboarding/LanguageScreen';
import { ModeScreen } from '@/components/onboarding/ModeScreen';
import { useApp, AudioLanguage, AppMode } from '@/contexts/AppContext';

type OnboardingStep = 'welcome' | 'language' | 'mode';

export default function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const { setAudioLanguage, setMode, completeOnboarding } = useApp();
  const navigate = useNavigate();

  const handleWelcomeNext = () => {
    setStep('language');
  };

  const handleLanguageNext = (language: AudioLanguage) => {
    setAudioLanguage(language);
    setStep('mode');
  };

  const handleModeNext = (mode: AppMode) => {
    setMode(mode);
    completeOnboarding();
    navigate('/', { replace: true });
  };

  switch (step) {
    case 'welcome':
      return <WelcomeScreen onNext={handleWelcomeNext} />;
    case 'language':
      return <LanguageScreen onNext={handleLanguageNext} />;
    case 'mode':
      return <ModeScreen onNext={handleModeNext} />;
    default:
      return <WelcomeScreen onNext={handleWelcomeNext} />;
  }
}
