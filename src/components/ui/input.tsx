import * as React from "react";
import { cn } from "../../utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const baseClasses =
  "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(baseClasses, className)}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
