import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Map, HandHelping, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/manasik', label: 'Manasik', icon: BookOpen },
  { path: '/peta', label: 'Peta', icon: Map },
  { path: '/doa', label: 'Doa', icon: HandHelping },
  { path: '/lainnya', label: 'Lainnya', icon: MoreHorizontal },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50"
      role="navigation"
      aria-label="Menu utama"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center py-3 px-4 min-w-[64px] transition-colors duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <Icon
                className={cn(
                  'w-6 h-6 mb-1 transition-transform duration-200',
                  isActive && 'scale-110'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                'text-xs font-medium',
                isActive && 'font-semibold'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
