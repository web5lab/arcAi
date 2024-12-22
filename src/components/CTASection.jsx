import React from 'react';
import { Coins } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function CTASection() {
  const { theme } = useTheme();
  
  return (
    <div className="mt-32 text-center">
      <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-8">
        <Coins className="w-5 h-5 text-blue-500" />
        <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
          Start with just $10
        </span>
      </div>
      <h2 className="text-4xl font-bold mb-8">Ready to start your crypto journey?</h2>
      <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-medium text-lg transition-all transform hover:scale-105">
        Join arcAi Today
      </button>
    </div>
  );
}