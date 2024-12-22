import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Bot, ArrowUpRight, Moon, Sun, User, Wallet } from 'lucide-react';
import { ProfileModal } from './ProfileModal';

interface GameHeaderProps {
  mode?: 'game' | 'dapp';
}

export function GameHeader({ mode = 'game' }: GameHeaderProps) {
  const { theme } = useTheme();
  const { toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = React.useState(false);
  
  return (
    <>
    <div className={`
      px-4 py-4 flex items-center justify-between
      ${theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'}
      backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="flex items-center gap-2">
        <Bot className="w-8 h-8 text-blue-500" />
        <span className="font-bold text-lg">arcAi</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-blue-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>

        {mode === 'game' ? (
          <button
            onClick={() => setShowProfile(true)}
            className={`
              px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
              ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}
              hover:opacity-80 transition-opacity
            `}>
            <User className="w-4 h-4" />
            <span>Neural Master #1234</span>
          </button>
        ) : (
          <button className={`
            px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
            ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}
            hover:opacity-80 transition-opacity
          `}>
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        )}
      </div>
    </div>
    <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}