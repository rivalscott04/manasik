import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { HomeLansia } from './home/HomeLansia';
import { HomePendamping } from './home/HomePendamping';
import { HomeUmum } from './home/HomeUmum';

export default function Index() {
  const { onboardingComplete, mode } = useApp();

  // Redirect to onboarding if not completed
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // Render appropriate home based on mode
  switch (mode) {
    case 'lansia':
      return <HomeLansia />;
    case 'pendamping':
      return <HomePendamping />;
    case 'umum':
      return <HomeUmum />;
    default:
      return <Navigate to="/onboarding" replace />;
  }
}
