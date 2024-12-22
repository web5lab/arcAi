import React from 'react';
import { ArrowDownUp } from 'lucide-react';

interface OrderButtonProps {
  orderType: 'buy' | 'sell';
  amount: string;
  price: string;
  onClick: () => void;
  radius: number;
}

export function OrderButton({ orderType, amount, price, onClick, radius }: OrderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!amount || !price}
      className={`
        w-full py-3 rounded-xl font-medium
        ${orderType === 'buy'
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-red-500 hover:bg-red-600'
        }
        text-white transition-colors
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={{ borderRadius: radius }}
    >
      <ArrowDownUp className="w-4 h-4" />
      Create {orderType} Order
    </button>
  );
}