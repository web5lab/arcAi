import React from 'react';
import { useTheme } from '../ThemeProvider';



export function Loader({ size = 'md', color = 'blue', className = '' }) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-6 h-6 border-3'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        border-${color}-500/30 border-t-${color}-500
        rounded-full animate-spin
        ${className}
      `}
    />
  );
}