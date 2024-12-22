import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  tokenSymbol: string;
  timestamp: string;
  txHash: string;
}

const mockTrades: Trade[] = [
  {
    id: '1',
    type: 'buy',
    amount: 1000,
    price: 0.85,
    total: 850,
    tokenSymbol: 'ARC',
    timestamp: '2 mins ago',
    txHash: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    type: 'sell',
    amount: 500,
    price: 0.86,
    total: 430,
    tokenSymbol: 'ARC',
    timestamp: '5 mins ago',
    txHash: '0x1234567890abcdef1234567890abcdef12345678'
  }
];

interface RecentTradesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecentTrades({ isOpen, onClose }: RecentTradesProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Trades</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {mockTrades.map((trade) => (
            <div
              key={trade.id}
              className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {trade.type === 'buy' ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  )}
                  <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                    {trade.type.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-slate-500">{trade.timestamp}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm text-slate-500">Amount</div>
                  <div className="font-medium">{trade.amount} {trade.tokenSymbol}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Price</div>
                  <div className="font-medium">${trade.price}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Total</div>
                  <div className="font-medium">${trade.total}</div>
                </div>
              </div>

              <a
                href={`https://etherscan.io/tx/${trade.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  text-sm flex items-center gap-1 text-blue-500 hover:text-blue-600
                `}
              >
                View Transaction
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}