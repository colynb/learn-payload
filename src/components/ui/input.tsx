import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md border px-3 py-1 border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      spread: {
        default: "h-9 px-3 py-1 text-base md:text-sm",
        lg: "h-11 px-4 py-2 text-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        xl: "h-[50px] rounded-md text-xl px-5 py-3",
      },
    },
    defaultVariants: {
      spread: "default",
    },
  }
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, spread, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ spread, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
