import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Receipt } from 'lucide-react';

interface TokenFeesProps {
  buyFee: number;
  sellFee: number;
}

export function TokenFees({ buyFee, sellFee }: TokenFeesProps) {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm rounded-xl p-4 border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
    `}>
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold">Token Fees</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-slate-500 mb-1">Buy Fee</div>
          <div className="text-2xl font-semibold text-green-500">{buyFee}%</div>
        </div>
        <div>
          <div className="text-sm text-slate-500 mb-1">Sell Fee</div>
          <div className="text-2xl font-semibold text-red-500">{sellFee}%</div>
        </div>
      </div>
    </div>
  );
}