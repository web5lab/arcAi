import React from 'react';
import { useTheme } from '../ThemeProvider';
import { CheckCircle2, Coins, Share2, ArrowRight, Bot, ChevronRight } from 'lucide-react';
import { ShareModal } from './ShareModal';

interface TradeSuccessScreenProps {
  order: {
    tokenSymbol: string;
    amount: number;
    price: number;
    total: number;
    type: 'buy' | 'sell';
    maker: string;
  };
  marketPrice: number;
  onClose: () => void;
}

export function TradeSuccessScreen({ order, marketPrice, onClose }: TradeSuccessScreenProps) {
  const { theme } = useTheme();
  const [showShare, setShowShare] = React.useState(false);

  const savings = Math.abs(order.price - marketPrice) * order.amount;
  const savingsPercentage = Math.abs((order.price - marketPrice) / marketPrice * 100);

  return (
    <div className="space-y-6">
      {/* Success Card */}
      <div className={`
        p-6 rounded-2xl text-center
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Trade Successful!</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your {order.type} order has been executed successfully
        </p>

        {/* Trade Details */}
        <div className={`
          p-4 rounded-xl mb-6 text-left
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-blue-500" />
            <div>
              <div className="font-medium">{order.tokenSymbol}</div>
              <div className="text-sm text-slate-500">Token</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-500 mb-1">Amount</div>
              <div className="font-medium">{order.amount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">Price</div>
              <div className="font-medium">${order.price.toFixed(3)}</div>
            </div>
          </div>
        </div>

        {/* Savings Info */}
        <div className={`
          p-4 rounded-xl mb-6 text-left
          ${theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'}
        `}>
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-500">You Saved!</span>
          </div>
          <div className="text-2xl font-bold text-green-500 mb-1">
            ${savings.toFixed(2)}
          </div>
          <div className="text-sm text-green-500/80">
            {savingsPercentage.toFixed(1)}% better than market price
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowShare(true)}
            className={`
              py-3 rounded-xl font-medium flex items-center justify-center gap-2
              ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            `}
          >
            <Share2 className="w-4 h-4" />
            Share Trade
          </button>
          <button
            onClick={onClose}
            className="py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Continue
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        order={order}
      />
    </div>
  );
}