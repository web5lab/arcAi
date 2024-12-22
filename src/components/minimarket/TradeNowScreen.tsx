import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowLeft, Bot, Shield, Clock, Info, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../common/Loader';

interface TradeNowScreenProps {
  order: {
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    total: number;
    tokenSymbol: string;
    maker: string;
  };
  onBack: () => void;
}

export function TradeNowScreen({ order, onBack }: TradeNowScreenProps) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState(order.amount.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const marketPrice = 0.85; // Example market price
  const priceImpact = ((order.price - marketPrice) / marketPrice) * 100;

  const handleTrade = () => {
    setIsLoading(true);
    // Simulate trade execution
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Trade Successful!</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your {order.type} order has been executed successfully
        </p>

        <div className={`
          p-4 rounded-xl mb-6
          ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
        `}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-500 mb-1">Amount</div>
              <div className="font-medium">{amount} {order.tokenSymbol}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Price</div>
              <div className="font-medium">${order.price}</div>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white"
        >
          Continue Trading
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Execute Trade</h2>
        <div className="w-9" /> {/* Spacer for alignment */}
      </div>

      {/* Maker Info */}
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
      `}>
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-6 h-6 text-blue-500" />
          <div>
            <div className="font-medium">{order.maker}</div>
            <div className="text-sm text-slate-500">Verified Trader</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-500 mb-1">Amount</div>
            <div className="font-medium">{order.amount} {order.tokenSymbol}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Price</div>
            <div className="font-medium">${order.price}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Total</div>
            <div className="font-medium">${order.total}</div>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Amount to trade</span>
          <span className="text-sm text-slate-500">Max: {order.amount}</span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className={`
            w-full px-4 py-3 rounded-xl
            ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          `}
        />
      </div>

      {/* Trade Info */}
      <div className={`
        p-4 rounded-xl text-sm
        ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
      `}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-500">Price Impact</span>
          <span className={priceImpact > 0 ? 'text-green-500' : 'text-red-500'}>
            {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-500">Network Fee</span>
          <div className="flex items-center gap-1">
            <span>~$0.5</span>
            <Info className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Trade Benefits */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`
          p-3 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <Shield className="w-5 h-5 text-green-500 mx-auto mb-2" />
          <div className="text-sm font-medium">Secure</div>
          <div className="text-xs text-slate-500">Escrow Protected</div>
        </div>
        <div className={`
          p-3 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <Clock className="w-5 h-5 text-blue-500 mx-auto mb-2" />
          <div className="text-sm font-medium">Fast</div>
          <div className="text-xs text-slate-500">Instant Settlement</div>
        </div>
        <div className={`
          p-3 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <Info className="w-5 h-5 text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-medium">Fixed Price</div>
          <div className="text-xs text-slate-500">No Slippage</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleTrade}
        disabled={isLoading || !amount}
        className={`
          w-full py-3 rounded-xl font-medium
          ${order.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}
          text-white flex items-center justify-center gap-2
          disabled:opacity-50
        `}
      >
        {isLoading ? (
          <>
            <Loader size="sm" color="white" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ArrowLeftRight className="w-4 h-4" />
            <span>{order.type === 'buy' ? 'Buy' : 'Sell'} {order.tokenSymbol}</span>
          </>
        )}
      </button>
    </div>
  );
}