import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currencySymbol?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value = '', currencySymbol, onChange, ...props }, ref) => {
    // Handle currency input formatting
    const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      let value = e.target.value;
      
      // Remove all non-digits
      value = value.replace(/[^\d]/g, '');
      
      // Convert to number and format with commas
      if (value) {
        const number = parseInt(value, 10);
        value = number.toLocaleString('en-IN');
      }

      // Create a new event with the formatted value
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value
        }
      };

      onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
    };

    // Format display value
    const displayValue = type === 'currency' && value 
      ? value.toString()
      : value;

    return (
      <div className="relative">
        {currencySymbol && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {currencySymbol}
          </span>
        )}
        <input
          type={type === 'currency' ? 'text' : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            currencySymbol && "pl-7",
            className
          )}
          ref={ref}
          value={displayValue}
          onChange={type === 'currency' ? handleCurrencyInput : onChange}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };