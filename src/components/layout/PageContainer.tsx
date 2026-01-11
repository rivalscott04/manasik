import React, { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
}

export function PageContainer({ children, className, showNav = true }: PageContainerProps) {
  const { mode } = useApp();
  
  // Mode Lansia tidak menggunakan bottom navigation
  const shouldShowNav = showNav && mode !== 'lansia';

  return (
    <div className={cn(
      'min-h-screen bg-background',
      shouldShowNav && 'pb-20'
    )}>
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      {shouldShowNav && <BottomNavigation />}
    </div>
  );
}
