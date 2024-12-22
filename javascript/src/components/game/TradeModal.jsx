import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Bot, Info, ArrowDownUp } from 'lucide-react';



export function TradeModal({ isOpen, onClose, order }) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState(order.amount.toString());
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleTrade = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {order.type === 'buy' ? 'Sell' : 'Buy'} {order.tokenSymbol}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
          `}>
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-6 h-6 text-blue-500" />
              <div>
                <div className="font-medium">{order.maker}</div>
                <div className="text-sm text-slate-500">Maker</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Amount</div>
                <div className="font-medium">{order.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Price</div>
                <div className="font-medium">${order.price.toFixed(3)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Total</div>
                <div className="font-medium">${order.total.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
          `}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">Amount to trade</span>
              <span className="text-sm text-slate-500">Max: {order.amount}</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* Transfer Fee */}
          <div className={`
            p-3 rounded-xl text-sm
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
          `}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500">Transfer Fee</span>
              <span>{order.transferFee}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">You will receive</span>
              <span>{(Number(amount) * (1 - order.transferFee / 100)).toFixed(2)} {order.tokenSymbol}</span>
            </div>
          </div>

          {/* Warning */}
          <div className={`
            p-3 rounded-xl text-sm flex items-start gap-2
            ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50'}
            text-yellow-500
          `}>
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Make sure to review the trade details carefully. All trades are final and cannot be reversed.
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTrade}
            disabled={isLoading}
            className={`
              w-full py-3 rounded-xl font-medium
              ${order.type === 'buy' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
              }
              text-white flex items-center justify-center gap-2
              disabled:opacity-50
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ArrowDownUp className="w-5 h-5" />
                <span>{order.type === 'buy' ? 'Sell' : 'Buy'} {order.tokenSymbol}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}