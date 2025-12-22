import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121516] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#121516] text-white shadow-sm hover:bg-[#2A2D30] hover:shadow-md",
        secondary:
          "bg-[#6B7280] text-white shadow-sm hover:bg-[#4B5563] hover:shadow-md",
        outline:
          "border-2 border-[#E5E7EB] bg-white text-[#121516] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]",
        ghost: "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#121516]",
        link: "text-[#121516] underline-offset-4 hover:underline hover:text-[#374151]",
        primary: "bg-[#FF5A5F] text-white shadow-sm hover:bg-[#E8484D] hover:shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-base",
        xl: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
