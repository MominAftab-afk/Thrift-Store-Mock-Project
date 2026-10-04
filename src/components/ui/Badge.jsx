import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Badge Primitive
 * Sleek, micro-proportioned status and trust indicators.
 */
export const Badge = ({
  children,
  variant = 'default', // 'default' | 'verified' | 'condition' | 'clay' | 'deal' | 'archival'
  size = 'md',        // 'sm' | 'md'
  icon: Icon,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium select-none tracking-normal";

  const variants = {
    // Clean subtle grey
    default: "bg-surface-subtle text-ink-700 border border-surface-border",
    
    // Archival Verified Olive
    verified: "bg-olive-50 text-olive-700 border border-olive-100 font-mono tracking-wider",
    
    // Condition indicator
    condition: "bg-white text-ink-900 border border-ink-200 font-mono",
    
    // Clay / Terracotta highlight
    clay: "bg-clay-50 text-clay-700 border border-clay-100 font-mono",
    
    // Limited deal / countdown alert
    deal: "bg-ochre-50 text-ochre-700 border border-ochre-100 font-mono",
    
    // Archival specification tag (serial, SKU, age)
    archival: "bg-surface-muted text-ink-600 border border-ink-200 font-mono uppercase tracking-archival",
  };

  const sizes = {
    sm: "px-1.5 py-0.5 text-[9px] gap-1 rounded-xs",
    md: "px-2 py-0.5 text-[10px] gap-1 rounded-xs",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-2.5 h-2.5 shrink-0" />}
      {children}
    </span>
  );
};
