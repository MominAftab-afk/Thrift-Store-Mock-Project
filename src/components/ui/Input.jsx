import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Input Primitive
 * Minimalist, crisp gallery inputs with precision typography.
 */
export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className,
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-2xs font-mono uppercase tracking-archival text-ink-500"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full h-9 rounded-sm border border-surface-border bg-white px-3 text-xs text-ink-900 placeholder:text-ink-400 transition-colors",
            "focus:border-ink-900 focus:outline-none focus:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-8",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-2xs text-red-600 font-mono">{error}</p>
      ) : helperText ? (
        <p className="text-2xs text-ink-400">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
