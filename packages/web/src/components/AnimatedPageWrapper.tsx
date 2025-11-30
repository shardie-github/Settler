'use client';

import { ReactNode, useEffect, useState } from 'react';

interface AnimatedPageWrapperProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Reusable animated page wrapper
 * Provides consistent animations, accessibility, and performance optimizations
 */
export function AnimatedPageWrapper({
  children,
  className = '',
  'aria-label': ariaLabel,
}: AnimatedPageWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="skip-to-main"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <div 
        id="main-content"
        className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}
        role="main"
        aria-label={ariaLabel || 'Page content'}
      >
        {children}
      </div>
    </>
  );
}
