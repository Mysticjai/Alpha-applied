import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm sm:text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 gap-2',
    lg: 'text-[15px] sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-accent hover:bg-accent-hover text-white shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/30 focus-visible:ring-accent active:translate-y-px',
    secondary:
      'bg-primary hover:bg-primary-dark text-white shadow-sm shadow-primary/20 hover:shadow-md focus-visible:ring-primary active:translate-y-px',
    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary active:translate-y-px bg-transparent',
    ghost:
      'text-primary hover:bg-primary/5 focus-visible:ring-primary',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} role="button">
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
