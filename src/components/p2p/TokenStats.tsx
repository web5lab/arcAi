import React from 'react';
import { useTheme } from '../ThemeProvider';
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, BarChart3 } from 'lucide-react';

interface TokenStatsProps {
  price: number;
  priceChange: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  liquidity: number;
}

export function TokenStats({ price, priceChange, volume24h, marketCap, holders, liquidity }: TokenStatsProps) {
  const { theme } = useTheme();
  const isPriceUp = priceChange > 0;

  const stats = [
    {
      label: 'Price',
      value: `$${price.toFixed(4)}`,
      change: priceChange,
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      label: '24h Volume',
      value: `$${volume24h.toLocaleString()}`,
      icon: <Activity className="w-5 h-5" />
    },
    {
      label: 'Market Cap',
      value: `$${marketCap.toLocaleString()}`,
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      label: 'Holders',
      value: holders.toLocaleString(),
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            backdrop-blur-sm rounded-xl p-4 border
            ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
          `}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-blue-500">{stat.icon}</div>
            <span className="text-sm text-slate-500">{stat.label}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-semibold">{stat.value}</div>
            {stat.change !== undefined && (
              <div className={`flex items-center space-x-1 text-sm ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
                {isPriceUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}