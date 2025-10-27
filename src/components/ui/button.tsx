import * as React from "react";
import { cn } from "../../utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:pointer-events-none disabled:opacity-50";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClasses, className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
