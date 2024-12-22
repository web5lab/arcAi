import React from 'react';
import { useTheme } from '../ThemeProvider';

interface Order {
  price: number;
  amount: number;
  total: number;
  type: 'buy' | 'sell';
}

interface OrderBookProps {
  orders: Order[];
}

export function OrderBook({ orders }: OrderBookProps) {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm rounded-xl border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
    `}>
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="font-semibold">Order Book</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 text-sm text-slate-500 mb-2">
          <div>Price</div>
          <div>Amount</div>
          <div>Total</div>
        </div>
        <div className="space-y-2">
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-sm">
              <div className={order.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                ${order.price.toFixed(4)}
              </div>
              <div>{order.amount.toFixed(4)}</div>
              <div>${order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}