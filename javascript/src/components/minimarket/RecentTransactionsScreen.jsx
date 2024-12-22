import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { History, ArrowUpRight, ArrowDownLeft, ExternalLink, ArrowLeft } from 'lucide-react';




const mockTransactions = [
  {
    id: '1',
    type: 'receive',
    amount: 5000,
    tokenSymbol: 'ARC',
    timestamp: '2 mins ago',
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    type: 'send',
    amount: 2500,
    tokenSymbol: 'ARC',
    timestamp: '5 mins ago',
    txHash: '0x8765...4321'
  },
  {
    id: '3',
    type: 'receive',
    amount: 10000,
    tokenSymbol: 'ARC',
    timestamp: '1 hour ago',
    txHash: '0x9876...1234'
  }
];

export function RecentTransactionsScreen() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {tx.type === 'receive' ? (
                  <ArrowDownLeft className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <span className={`font-medium ${tx.type === 'receive' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.tokenSymbol}
                  </span>
                  <div className="text-sm text-slate-500">{tx.timestamp}</div>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  px-3 py-1.5 rounded-lg text-sm
                  ${theme === 'dark' ? 'bg-slate-900/50 hover:bg-slate-900' : 'bg-slate-100 hover:bg-slate-200'}
                  flex items-center gap-1 transition-colors
                `}
              >
                View
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}