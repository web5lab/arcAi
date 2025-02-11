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
  marketCap,
  progress = 75
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
      <div className=" grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-sm text-slate-500 mb-1">Price</div>
          <div className="text-lg font-bold">${price.toFixed(3)}</div>
        </div>
        <div className=' ml-auto'>
          <div className="text-sm text-slate-500 mb-1">Price</div>
          <div className="text-lg font-bold">${price.toFixed(3)}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-1">Progress</div>
        <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundColor: theme === 'dark' ? '#3b82f6' : '#60a5fa'
            }}
          />
        </div>
        <div className="text-right text-xs text-slate-500 mt-1">{progress}%</div>
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
          Buy Order
        </button>
      </div>
    </Link>
  );
}