import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';
import { AlertCircle, Inbox, Search } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * Preset icon variant
   */
  iconVariant?: 'default' | 'search' | 'inbox' | 'alert';
  
  /**
   * Title text
   */
  title: string;
  
  /**
   * Description text
   */
  description?: string;
  
  /**
   * Primary action button
   */
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
  
  /**
   * Secondary action button
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      iconVariant = 'default',
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    const iconVariants = {
      default: null,
      search: <Search className="h-12 w-12 text-muted-foreground" />,
      inbox: <Inbox className="h-12 w-12 text-muted-foreground" />,
      alert: <AlertCircle className="h-12 w-12 text-muted-foreground" />,
    };

    const displayIcon = icon || iconVariants[iconVariant];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center py-12 px-4 text-center',
          className
        )}
        {...props}
      >
        {displayIcon && (
          <div className="mb-4 flex items-center justify-center" aria-hidden="true">
            {displayIcon}
          </div>
        )}
        
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        
        {description && (
          <p className="mb-6 max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        {(action || secondaryAction) && (
          <div className="flex flex-col gap-2 sm:flex-row">
            {action && (
              <Button
                variant={action.variant || 'default'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || 'outline'}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
