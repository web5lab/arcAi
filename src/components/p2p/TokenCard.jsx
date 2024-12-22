import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { TrendingDown, TrendingUp, ShoppingCart, Bot } from 'lucide-react';


export function TokenCard({
  symbol,
  name,
  description,
  price,
  priceChange,
  offered,
  offeredPrice,
  volume24h,
  marketCap
}) {
  const { theme } = useTheme();
  const isPriceUp = priceChange > 0;
  const navigate = useNavigate();
  
  const handleBuy = (e) => {
    e.preventDefault(); // Prevent navigation
    navigate(`/p2p/trade/${symbol}`, {
      state: {
        order: {
          tokenSymbol: symbol,
          amount: offered,
          price: offeredPrice,
          total: offered * offeredPrice,
          type: 'buy',
          maker: 'Neural Master #1234',
          transferFee: 2.5
        }
      }
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <Link
      to={`/p2p/${symbol}`}
      className={`
        block p-6 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
        hover:bg-blue-500/5 border border-transparent
        hover:border-blue-500/20 transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm text-slate-500 flex items-center gap-2">
              <span>{symbol}</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>BSC</span>
            </div>
          </div>
        </div>
        <div className={`
          px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1
          ${isPriceUp 
            ? theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'
            : theme === 'dark' ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
          }
        `}>
          {isPriceUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(priceChange).toFixed(2)}%</span>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-6 line-clamp-2">{description}</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Price</div>
            <div className="text-lg font-bold">${price.toFixed(3)}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Market Cap</div>
            <div className="font-medium">{formatNumber(marketCap)}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">24h Volume</div>
            <div className="font-medium">{formatNumber(volume24h)}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Offered Amount</div>
            <div className="font-medium">{offered.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'} pt-6">
        <div>
          <div className="text-sm text-slate-500">Offered Price</div>
          <div className="font-medium">${offeredPrice.toFixed(3)}</div>
        </div>
        <button
          onClick={handleBuy}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium
            bg-gradient-to-r from-blue-500 to-purple-500 text-white
            hover:opacity-90 transition-all transform hover:scale-[1.02]
          `}
        >
          <ShoppingCart className="w-4 h-4" />
          Trade Now
        </button>
       </div>
    </Link>
  );
}