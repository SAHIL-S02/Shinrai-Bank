import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none";

    const variants = {
      default: "bg-white text-black hover:bg-gray-200",
      outline: "border border-zinc-700 text-white hover:bg-zinc-800",
    };

    return (
      <button
        className={cn(base, variants[variant], "h-10 px-4 py-2", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };