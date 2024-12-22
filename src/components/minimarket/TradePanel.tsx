import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowDownUp, Wallet } from 'lucide-react';

interface TradePanelProps {
  network: string;
  token: string;
  themeColor: string;
  radius: number;
}

export function TradePanel({ network, token, themeColor, radius }: TradePanelProps) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState('');
  
  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">You Pay</span>
            <span className="text-sm text-slate-500">Balance: 0.0</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className={`
              w-full px-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50
            `}
            style={{ borderRadius: radius }}
          />
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed opacity-20" />
          <button className={`
            relative z-10 p-2 rounded-lg
            ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            hover:scale-110 transition-transform duration-200
          `}>
            <ArrowDownUp className={`w-4 h-4 text-${themeColor}-500`} />
          </button>
        </div>

        <button className={`
          w-full py-3 rounded-xl font-medium
          bg-${themeColor}-500 text-white
          hover:bg-${themeColor}-600 transition-colors
          flex items-center justify-center gap-2
        `}
          style={{ borderRadius: radius }}
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
}