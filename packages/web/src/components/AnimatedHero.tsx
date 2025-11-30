'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

import { ReactNode } from 'react';

interface AnimatedHeroProps {
  badge?: string;
  title: string | ReactNode;
  description: string;
  className?: string;
}

/**
 * Animated hero section component
 * Consistent hero animations across all pages
 */
export function AnimatedHero({
  badge,
  title,
  description,
  className = '',
}: AnimatedHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationClass = prefersReducedMotion
    ? 'opacity-100 translate-y-0'
    : mounted
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-4';

  return (
    <section
      className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto text-center">
        {badge && (
          <Badge
            className={`mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 transition-all duration-700 ${animationClass}`}
            aria-label="Page category badge"
          >
            {badge}
          </Badge>
        )}
        <h1
          id="hero-heading"
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${animationClass}`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '200ms' }}
        >
          {title}
        </h1>
        <p
          className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 ${animationClass}`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '400ms' }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
