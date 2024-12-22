import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Info, X } from 'lucide-react';

interface SlippagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  slippage: number;
  onSlippageChange: (value: number) => void;
}

const PRESET_VALUES = [0.1, 0.5, 1.0];

export function SlippagePopup({
  isOpen,
  onClose,
  slippage,
  onSlippageChange
}: SlippagePopupProps) {
  const { theme } = useTheme();
  const [customValue, setCustomValue] = useState('');

  if (!isOpen) return null;

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
      onSlippageChange(numValue);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        relative w-full max-w-sm rounded-2xl p-6
        ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
        border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Slippage Tolerance</h3>
            <div className="group relative">
              <Info className="w-4 h-4 text-slate-400" />
              <div className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg text-xs w-48 text-center
                ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200
              `}>
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            {PRESET_VALUES.map((value) => (
              <button
                key={value}
                onClick={() => {
                  setCustomValue('');
                  onSlippageChange(value);
                }}
                className={`
                  flex-1 py-2 rounded-xl text-sm font-medium transition-all
                  ${slippage === value
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                `}
              >
                {value}%
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              value={customValue}
              onChange={handleCustomChange}
              placeholder="Custom"
              className={`
                w-full py-2 px-4 rounded-xl text-sm
                ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}
                border ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}
                focus:outline-none focus:border-blue-500
              `}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
          </div>

          {parseFloat(customValue) > 5 && (
            <div className="text-xs text-yellow-500 flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>High slippage tolerance may result in unfavorable rates</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}