import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.99]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-fine",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-ink-950 text-white hover:bg-ink-800 shadow-fine",
        clay: "bg-clay-600 text-white hover:bg-clay-700 shadow-fine",
        archival: "border border-ink-200 bg-surface-muted text-ink-800 hover:border-ink-400 font-mono text-[10px] uppercase tracking-archival",
      },
      size: {
        default: "h-9 px-3.5 text-xs gap-2",
        sm: "h-7 px-2.5 text-2xs gap-1.5 rounded-xs",
        md: "h-9 px-3.5 text-xs gap-2 rounded-sm",
        lg: "h-11 px-5 text-sm gap-2.5 rounded-md",
        icon: "h-8 w-8 p-0 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-1.5">
            <svg
              className="animate-spin h-3.5 w-3.5 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-2xs font-mono">Loading...</span>
          </span>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className="w-3.5 h-3.5 shrink-0" />
            )}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon className="w-3.5 h-3.5 shrink-0" />
            )}
          </>
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
