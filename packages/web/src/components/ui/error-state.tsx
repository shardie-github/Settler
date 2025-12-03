/**
 * ErrorState Component
 * 
 * Reusable error state display component.
 */

'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';

export interface ErrorStateProps {
  /**
   * Error message to display
   */
  error?: Error | string | null;
  /**
   * Title for the error state
   */
  title?: string;
  /**
   * Callback when retry is clicked
   */
  onRetry?: () => void;
  /**
   * Show retry button
   */
  showRetry?: boolean;
  /**
   * Custom retry button text
   */
  retryText?: string;
}

export function ErrorState({
  error,
  title = 'Error loading data',
  onRetry,
  showRetry = true,
  retryText = 'Try again',
}: ErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : typeof error === 'string' ? error : 'An unexpected error occurred';

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-6 max-w-md">{errorMessage}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          {retryText}
        </Button>
      )}
    </div>
  );
}
