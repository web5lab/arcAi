import React from 'react';
import { useTheme } from '../../ThemeProvider';

interface OrderSummaryProps {
  total: number;
  priceImpact: number;
  marketPrice: number;
}

export function OrderSummary({ total, priceImpact, marketPrice }: OrderSummaryProps) {
  const { theme } = useTheme();

  return (
    <div className={`
      p-4 rounded-xl text-sm
      ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
    `}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-slate-500">Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-slate-500">Market Price</span>
        <span>${marketPrice}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Price Impact</span>
        <span className={priceImpact > 0 ? 'text-green-500' : 'text-red-500'}>
          {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}