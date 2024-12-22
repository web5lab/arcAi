import React from 'react';
import { useTheme } from '../ThemeProvider';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TokenInfoProps {
  network: string;
  token: string;
  themeColor: string;
}

export function TokenInfo({ network, token, themeColor }: TokenInfoProps) {
  const { theme } = useTheme();
  const priceChange = 7.5; // Example data
  
  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 text-${themeColor}-500`} />
          <span className="font-medium">Market Overview</span>
        </div>
        <div className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'}>
          {priceChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-slate-500 mb-1">Price</div>
          <div className="font-medium">$0.85</div>
          <div className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange}%
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-500 mb-1">24h Volume</div>
          <div className="font-medium">$1.2M</div>
        </div>
      </div>
    </div>
  );
}