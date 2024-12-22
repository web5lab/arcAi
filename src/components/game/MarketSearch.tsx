import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Search, SlidersHorizontal } from 'lucide-react';

interface MarketSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
}

export function MarketSearch({ searchQuery, onSearchChange, onFilterClick }: MarketSearchProps) {
  const { theme } = useTheme();

  return (
    <div className="relative mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by token name or symbol..."
            className={`
              w-full pl-10 pr-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
            `}
          />
        </div>
        <button
          onClick={onFilterClick}
          className={`
            px-4 rounded-xl flex items-center justify-center
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            hover:border-blue-500/20 transition-all
          `}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}