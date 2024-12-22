import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Search, ArrowUpRight, TrendingUp, TrendingDown, Activity, Clock, Bot } from 'lucide-react';
import { TradeNowScreen } from './TradeNowScreen';

interface P2POrder {
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  profitPercentage: number;
  volume24h: number;
  timeLeft?: string;
  tokenSymbol: string;
}

interface BrowseP2PPanelProps {
  network: string;
  token: string;
  themeColor: string;
  radius: number;
}

export function BrowseP2PPanel({ network, token, themeColor, radius }: BrowseP2PPanelProps) {
  const { theme } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState<P2POrder | null>(null);
  const marketPrice = 0.85; // Example market price

  if (selectedOrder) {
    return (
      <TradeNowScreen
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  const orders: P2POrder[] = [
    {
      type: 'buy',
      price: 0.85,
      amount: 1000,
      tokenSymbol: 'ARC',
      profitPercentage: 2.5,
      volume24h: 25000,
      timeLeft: '2h 15m'
    },
    {
      type: 'sell',
      price: 0.86,
      amount: 2500,
      tokenSymbol: 'ARC',
      profitPercentage: -1.8,
      volume24h: 15000
    },
    {
      type: 'buy',
      price: 0.84,
      amount: 1500,
      tokenSymbol: 'ARC',
      profitPercentage: 3.2,
      volume24h: 18000,
      timeLeft: '45m'
    }
  ];


  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search orders..."
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50
          `}
          style={{ borderRadius: radius }}
        />
      </div>

      {/* Orders */}
      <div className="space-y-2">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white/50 hover:bg-white'}
              border ${theme === 'dark' ? 'border-slate-700 hover:border-blue-500/20' : 'border-slate-200 hover:border-blue-500/20'}
              transition-all duration-200 cursor-pointer
            `}
            style={{ borderRadius: radius }}
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <div className={`
                  px-2 py-1 rounded-lg text-sm font-medium
                  ${order.type === 'buy'
                    ? theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'
                    : theme === 'dark' ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
                  }
                `}>
                  {order.type.toUpperCase()}
                </div>
              </div>
              {order.timeLeft && (
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{order.timeLeft}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="space-y-1">
                <div className="text-sm text-slate-500">Price</div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">${order.price}</div>
                  <div className={`
                    flex items-center gap-1 text-xs
                    ${order.profitPercentage > 0 ? 'text-green-500' : 'text-red-500'}
                  `}>
                    {order.profitPercentage > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{Math.abs(order.profitPercentage)}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-500">Amount</div>
                <div className="font-medium">{order.amount.toLocaleString()} {order.tokenSymbol}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Activity className="w-3 h-3" />
                  <span>24h: {(order.volume24h / 1000).toFixed(1)}k</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Total Value</div>
              <div className="font-medium">${(order.amount * order.price).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}