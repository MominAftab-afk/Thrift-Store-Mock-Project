import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Card Primitive
 * Clean gallery white surfaces with crisp 1px borders and refined padding.
 */
export const Card = ({
  children,
  variant = 'surface', // 'surface' | 'elevated' | 'subtle' | 'archival'
  hoverEffect = false,
  className,
  ...props
}) => {
  const baseStyles = "rounded-md transition-all duration-200";

  const variants = {
    // Standard clean gallery surface
    surface: "bg-white border border-surface-border text-ink-900 shadow-fine",
    
    // Elevated card for active modals or focus blocks
    elevated: "bg-white border border-ink-200 text-ink-900 shadow-card",
    
    // Subtle grey container
    subtle: "bg-surface-muted border border-surface-border text-ink-900",
    
    // Archival blueprint specification box
    archival: "bg-surface-muted/60 border border-dashed border-ink-300 text-ink-900",
  };

  const hoverStyles = hoverEffect ? "hover:border-ink-400 hover:shadow-card cursor-pointer" : "";

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
