import React from 'react';
import { useTheme } from './ThemeProvider';

export function Hero() {
  const { theme } = useTheme();
  
  return (
    <div className="max-w-4xl mt-[80px] mx-auto text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
        Your All-in-One Crypto Platform
      </h1>
      <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-8`}>
        Create tokens, trade assets, and earn rewards through gaming - all powered by arcAi's intelligent ecosystem.
      </p>
    </div>
  );
}