import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { Bot, Coins } from 'lucide-react';


export function OrderInputs({ amount, price, onAmountChange, onPriceChange, themeColor, radius }) {
  const { theme } = useTheme();
  const ethPrice = 2000; // Example ETH price in USD
  const priceInETH = Number(price) / ethPrice;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-slate-500 mb-1 block">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
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

      <div>
        <label className="text-sm text-slate-500 mb-1 block">Price per token</label>
        <input
          type="number"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
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
    </div>
  );
}