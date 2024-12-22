import React from 'react';
import { useTheme } from '../ThemeProvider';
import { CheckCircle2, ArrowRight, Copy } from 'lucide-react';



export function TradeSuccessModal({ isOpen, onClose, trade }) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-full max-w-md p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        animate-fade-in-up
      `}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Trade Successful!</h2>
          <p className="text-sm text-slate-500 mb-6">
            Your {trade.type} order has been executed successfully
          </p>

          <div className={`
            p-4 rounded-xl mb-6 text-left
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
          `}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Amount</div>
                <div className="font-medium">{trade.amount} {trade.tokenSymbol}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Price</div>
                <div className="font-medium">${trade.price}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Total</div>
                <div className="font-medium">${trade.total}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Type</div>
                <div className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                  {trade.type.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className={`
            p-4 rounded-xl mb-6
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
          `}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-500">Transaction Hash</span>
              <button
                onClick={() => navigator.clipboard.writeText(trade.txHash)}
                className={`p-1 rounded hover:bg-slate-700`}
              >
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="font-mono text-sm break-all">
              {trade.txHash}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2"
          >
            Continue Trading
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}