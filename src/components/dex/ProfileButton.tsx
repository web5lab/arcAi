import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { User, ChevronDown, History, LogOut } from 'lucide-react';
import { RecentTrades } from './RecentTrades';

interface ProfileButtonProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ProfileButton({ isConnected, onConnect, onDisconnect }: ProfileButtonProps) {
  const { theme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrades, setShowTrades] = useState(false);

  if (!isConnected) {
    return (
      <button
        onClick={onConnect}
        className={`
          px-4 py-2 rounded-xl flex items-center gap-2
          bg-blue-500 text-white
          hover:bg-blue-600 transition-colors
        `}
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`
            px-4 py-2 rounded-xl flex items-center gap-2
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
          `}
        >
          <User className="w-4 h-4 text-blue-500" />
          <span className="text-sm">0x1234...5678</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDropdown && (
          <div className={`
            absolute right-0 mt-2 w-48 rounded-xl overflow-hidden
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            shadow-lg
          `}>
            <button
              onClick={() => {
                setShowTrades(true);
                setShowDropdown(false);
              }}
              className={`
                w-full px-4 py-2 text-left flex items-center gap-2
                ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
              `}
            >
              <History className="w-4 h-4" />
              Recent Trades
            </button>
            <button
              onClick={() => {
                onDisconnect();
                setShowDropdown(false);
              }}
              className={`
                w-full px-4 py-2 text-left flex items-center gap-2 text-red-500
                ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
              `}
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      <RecentTrades
        isOpen={showTrades}
        onClose={() => setShowTrades(false)}
      />
    </>
  );
}