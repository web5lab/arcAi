import React, { useState } from 'react';
import { Search, ChevronDown, ArrowDownUp, ArrowUpRight, Clock } from 'lucide-react';
import { useTheme } from '../ThemeProvider';


export function MarketHeader({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  orderType,
  onOrderTypeChange
}) {
  const { theme } = useTheme();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-grow relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, symbol, or description"
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50 text-white' : 'bg-white/50 text-slate-900'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          `}
        />
      </div>

      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className={`
              px-4 py-2.5 rounded-xl flex items-center justify-between min-w-[120px]
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              hover:border-blue-500/20 transition-all
            `}
          >
            <span className="capitalize">{sortBy}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showSortDropdown && (
            <div className={`
              absolute top-full mt-1 right-0 w-40 z-50
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
              rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              py-1 shadow-lg
            `}>
              {[
                { id: 'newest', label: 'Newest First', icon: <Clock className="w-4 h-4" /> },
                { id: 'price', label: 'Price', icon: <ArrowDownUp className="w-4 h-4" /> },
                { id: 'volume', label: 'Volume', icon: <ArrowUpRight className="w-4 h-4" /> }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSortChange(option.id );
                    setShowSortDropdown(false);
                  }}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    ${sortBy === option.id
                      ? 'text-blue-500'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-slate-200'
                      : 'text-slate-700 hover:text-slate-900'
                    }
                    hover:bg-blue-500/5 transition-colors
                  `}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={`
              px-4 py-2.5 rounded-xl flex items-center justify-between min-w-[100px]
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              hover:border-blue-500/20 transition-all
            `}
          >
            <span className="capitalize">{orderType}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showTypeDropdown && (
            <div className={`
              absolute top-full mt-1 right-0 w-32 z-50
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
              rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              py-1 shadow-lg
            `}>
              {['all', 'buy', 'sell'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    onOrderTypeChange(type );
                    setShowTypeDropdown(false);
                  }}
                  className={`
                    w-full px-4 py-2 text-left capitalize
                    ${orderType === type
                      ? type === 'buy'
                        ? 'text-green-500'
                        : type === 'sell'
                        ? 'text-red-500'
                        : 'text-blue-500'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-slate-200'
                      : 'text-slate-700 hover:text-slate-900'
                    }
                    hover:bg-blue-500/5 transition-colors
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}