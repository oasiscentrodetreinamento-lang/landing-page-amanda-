import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-amanda-accent text-white hover:bg-rose-700 shadow-rose-200",
    secondary: "bg-white text-amanda-accent hover:bg-rose-50 border border-amanda-accent",
    outline: "border-2 border-white text-white hover:bg-white hover:text-amanda-dark"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};