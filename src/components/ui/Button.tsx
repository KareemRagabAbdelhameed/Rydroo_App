import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-maincolor text-white hover:bg-[#D6903A] focus:ring-orange shadow-md hover:shadow-lg",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white focus:ring-black",
    ghost: "text-black hover:bg-black/5",
    white: "bg-white text-black hover:bg-gray-50 shadow-sm"
  };
  
  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}