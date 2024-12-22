import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Info } from 'lucide-react';




const PRESET_VALUES = [0.1, 0.5, 1.0];

export function SlippageSettings({ slippage, onSlippageChange, isOpen }) {
  const { theme } = useTheme();
  const [customValue, setCustomValue] = useState('');

  if (!isOpen) return null;

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
      onSlippageChange(numValue);
    }
  };

  return (
    <div className={`
      p-4 rounded-xl mb-4
      ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Slippage Tolerance</span>
          <div className="group relative">
            <Info className="w-4 h-4 text-slate-400" />
            <div className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg text-xs w-48 text-center
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200
            `}>
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </div>
          </div>
        </div>
        <span className="text-sm font-medium text-blue-500">{slippage}%</span>
      </div>

      <div className="flex items-center space-x-2">
        {PRESET_VALUES.map((value) => (
          <button
            key={value}
            onClick={() => {
              setCustomValue('');
              onSlippageChange(value);
            }}
            className={`
              flex-1 py-1.5 rounded-lg text-sm font-medium transition-all
              ${slippage === value
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
            `}
          >
            {value}%
          </button>
        ))}
        <div className="flex-1 relative">
          <input
            type="number"
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Custom"
            className={`
              w-full py-1.5 px-3 rounded-lg text-sm
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:border-blue-500
            `}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
        </div>
      </div>

      {parseFloat(customValue) > 5 && (
        <div className="mt-2 text-xs text-yellow-500 flex items-center space-x-1">
          <Info className="w-3 h-3" />
          <span>High slippage tolerance may result in unfavorable rates</span>
        </div>
      )}
    </div>
  );
}