import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  /**
   * Size variant
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  
  /**
   * Whether to render as child element (for composition)
   * @default false
   */
  asChild?: boolean;
  
  /**
   * Whether button takes full width of container
   * @default false
   */
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center',
      'rounded-md text-sm font-medium',
      'ring-offset-background',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-[0.98]',
    ];
    
    const variants = {
      default: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary-600 underline-offset-4 hover:underline',
    };

    const sizes = {
      sm: 'h-9 rounded-md px-3 text-sm',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8 text-base',
      icon: 'h-10 w-10',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(classes, (children.props as { className?: string })?.className),
        ...props,
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        type={props.type || 'button'}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
