import React from 'react';
import { useTheme } from '../ThemeProvider';
import { KeyRound } from 'lucide-react';

interface ClaimButtonProps {
  onClick: () => void;
}

export function ClaimButton({ onClick }: ClaimButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-24 right-4 z-20
        w-12 h-12 rounded-full
        bg-gradient-to-r from-purple-500 to-blue-500
        flex items-center justify-center
        shadow-lg hover:scale-105 transition-transform
        ${theme === 'dark' ? 'shadow-purple-500/20' : 'shadow-purple-500/30'}
      `}
    >
      <KeyRound className="w-5 h-5 text-white" />
    </button>
  );
}