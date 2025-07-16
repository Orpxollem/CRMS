import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2 animate-fade-in">
        {label && (
          <label className="block text-sm font-semibold text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-200">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full px-4 py-3 border-2 border-neutral-200 rounded-2xl
              bg-white/80 backdrop-blur-sm
              focus:ring-0 focus:border-primary-500 focus:bg-white
              placeholder-neutral-400 transition-all duration-200
              hover:border-neutral-300 hover:bg-white
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-error-500 focus:border-error-500' : ''}
              ${className}
            `}
            {...props}
          />
          {/* Focus ring effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary-500/20 ring-offset-2"></div>
          </div>
        </div>
        {helperText && !error && (
          <p className="text-xs text-neutral-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-error-600 animate-slide-down">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;