import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-2xl 
    transition-all duration-200 ease-out focus:outline-none focus:ring-2 
    focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed
    transform hover:scale-[1.02] active:scale-[0.98]
  `;
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 text-white 
      hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500
      shadow-soft hover:shadow-medium disabled:from-primary-300 disabled:to-primary-300
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600 text-white 
      hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500
      shadow-soft hover:shadow-medium disabled:from-secondary-300 disabled:to-secondary-300
    `,
    outline: `
      border-2 border-neutral-200 text-neutral-700 bg-white
      hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700
      focus:ring-primary-500 focus:border-primary-500
      shadow-soft hover:shadow-medium disabled:border-neutral-100 disabled:text-neutral-400
    `,
    ghost: `
      text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500
      hover:shadow-soft disabled:text-neutral-400
    `,
    success: `
      bg-gradient-to-r from-success-500 to-success-600 text-white 
      hover:from-success-600 hover:to-success-700 focus:ring-success-500
      shadow-soft hover:shadow-medium disabled:from-success-300 disabled:to-success-300
    `,
    warning: `
      bg-gradient-to-r from-warning-500 to-warning-600 text-white 
      hover:from-warning-600 hover:to-warning-700 focus:ring-warning-500
      shadow-soft hover:shadow-medium disabled:from-warning-300 disabled:to-warning-300
    `,
    error: `
      bg-gradient-to-r from-error-500 to-error-600 text-white 
      hover:from-error-600 hover:to-error-700 focus:ring-error-500
      shadow-soft hover:shadow-medium disabled:from-error-300 disabled:to-error-300
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-3',
    xl: 'px-10 py-5 text-lg gap-3',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;