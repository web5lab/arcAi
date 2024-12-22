import React from 'react';
import { Bot } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function FloatingBot() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className={`
          group relative w-14 h-14 rounded-full
          bg-gradient-to-r from-blue-500 to-cyan-400
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          hover:scale-110 active:scale-95
          transition-all duration-200
          animate-bounce-slow
        `}
      >
        <Bot className="w-7 h-7 text-white" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20" />
      </button>
    </div>
  );
}