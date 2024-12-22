import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Plus, Brain, ArrowUpRight } from 'lucide-react';

const pools = [
  { name: 'ARC-USDT', tvl: '$1.2M', apr: '120%', myLiquidity: '$0' },
  { name: 'ARC-ETH', tvl: '$800K', apr: '85%', myLiquidity: '$0' },
  { name: 'ARC-BNB', tvl: '$500K', apr: '95%', myLiquidity: '$0' },
];

export function PoolScreen() {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-4">
      <button className={`
        w-full p-4 rounded-xl font-medium
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white flex items-center justify-center gap-2
      `}>
        <Plus className="w-5 h-5" />
        Create New Pool
      </button>

      <div className="space-y-3">
        {pools.map((pool, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-500" />
                <span className="font-medium">{pool.name}</span>
              </div>
              <button className={`
                px-3 py-1 rounded-lg text-sm
                ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}
                flex items-center gap-1
              `}>
                <span>Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-500 mb-1">TVL</div>
                <div className="font-medium">{pool.tvl}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">APR</div>
                <div className="font-medium text-green-500">{pool.apr}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">My Liquidity</div>
                <div className="font-medium">{pool.myLiquidity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}