'use client';

import * as React from 'react';
import { Button } from './button';
import { AlertCircle } from 'lucide-react';
import { EmptyState } from './empty-state';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <EmptyState
      iconVariant="alert"
      title="Something went wrong"
      description={error.message || 'An unexpected error occurred. Please try again.'}
      action={{
        label: 'Try again',
        onClick: resetError,
        variant: 'default',
      }}
    />
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
