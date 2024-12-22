import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Book } from 'lucide-react';



export function OrderBook({ network, token, themeColor }) {
  const { theme } = useTheme();
  
  const orders = [
    { price: 0.85, amount: 1000, type: 'sell' },
    { price: 0.84, amount: 2500, type: 'sell' },
    { price: 0.83, amount: 1500, type: 'buy' },
    { price: 0.82, amount: 3000, type: 'buy' },
  ];

  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="flex items-center gap-2 mb-4">
        <Book className={`w-5 h-5 text-${themeColor}-500`} />
        <span className="font-medium">Order Book</span>
      </div>

      <div className="space-y-2">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg
              ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
              flex items-center justify-between
            `}
          >
            <div className={order.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
              ${order.price.toFixed(3)}
            </div>
            <div className="text-sm">{order.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}