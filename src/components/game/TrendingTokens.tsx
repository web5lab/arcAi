import React from 'react';
import { useTheme } from '../ThemeProvider';
import { TrendingUp, Bot, Gem, DollarSign, Coins, ChevronRight, BarChart2, Activity, Globe, Twitter, MessageCircle } from 'lucide-react';

interface TrendingToken {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  icon: React.ReactNode;
  socials: {
    website?: string;
    twitter?: string;
    telegram?: string;
  };
}

const trendingTokens: TrendingToken[] = [
  {
    symbol: 'ARC',
    name: 'ArcAi',
    price: 0.85,
    priceChange: 12.5,
    volume: 1200000,
    marketCap: 85000000,
    icon: <Bot className="w-5 h-5 text-blue-500" />,
    socials: {
      website: 'https://arcai.finance',
      twitter: 'https://twitter.com/arcaifinance',
      telegram: 'https://t.me/arcaifinance'
    }
  },
  {
    symbol: 'GEM',
    name: 'Neural Gem',
    price: 1.25,
    priceChange: 8.7,
    volume: 950000,
    marketCap: 62500000,
    icon: <Gem className="w-5 h-5 text-purple-500" />,
    socials: {
      website: 'https://neuralgem.finance',
      twitter: 'https://twitter.com/neuralgem',
      telegram: 'https://t.me/neuralgem'
    }
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 1.00,
    priceChange: 0.1,
    volume: 2500000,
    marketCap: 100000000,
    icon: <DollarSign className="w-5 h-5 text-green-500" />,
    socials: {
      website: 'https://tether.to',
      twitter: 'https://twitter.com/Tether_to',
      telegram: 'https://t.me/tether'
    }
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 300.50,
    priceChange: -2.1,
    volume: 1800000,
    marketCap: 75000000,
    icon: <Coins className="w-5 h-5 text-yellow-500" />,
    socials: {
      website: 'https://www.binance.com',
      twitter: 'https://twitter.com/binance',
      telegram: 'https://t.me/binanceexchange'
    }
  }
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  }
  return `$${num.toFixed(2)}`;
}

export function TrendingTokens() {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      {/* Market Overview */}
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-blue-500" />
            <span className="font-medium">Market Overview</span>
          </div>
          <div className="text-sm text-green-500">+12.5% 24h</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-500 mb-1">24h Volume</div>
            <div className="font-medium">$2.5M</div>
          </div>
          <div>
            <div className="text-slate-500 mb-1">Market Cap</div>
            <div className="font-medium">$85M</div>
          </div>
        </div>
      </div>

      {/* Trending Tokens */}
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Trending Tokens</h3>
          </div>
          <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {trendingTokens.map((token) => (
          <button
            key={token.symbol}
            className={`
              w-full p-4 rounded-xl text-left mb-2 last:mb-0
              ${theme === 'dark' ? 'bg-slate-900/50 hover:bg-slate-900' : 'bg-slate-50 hover:bg-white'}
              transition-colors
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                `}>
                  {token.icon}
                </div>
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-slate-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.price.toFixed(3)}</div>
                <div className={`text-sm ${token.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.priceChange >= 0 ? '+' : ''}{token.priceChange}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                <div className="text-sm text-slate-500">
                  Vol: {formatNumber(token.volume)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <div className="text-sm text-slate-500">
                  MCap: {formatNumber(token.marketCap)}
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200/10">
              {token.socials.website && (
                <a
                  href={token.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                    transition-colors text-slate-400 hover:text-blue-500
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {token.socials.twitter && (
                <a
                  href={token.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                    transition-colors text-slate-400 hover:text-blue-500
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {token.socials.telegram && (
                <a
                  href={token.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                    transition-colors text-slate-400 hover:text-blue-500
                  `}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}