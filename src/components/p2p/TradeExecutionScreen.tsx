import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowDown, Info, Share2, Bot, ArrowLeftRight, Shield, Clock, ChevronRight } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { TradeSuccessScreen } from './TradeSuccessScreen';

interface TradeExecutionScreenProps {
  order: {
    tokenSymbol: string;
    amount: number;
    price: number;
    total: number;
    type: 'buy' | 'sell';
    maker: string;
  };
  onClose: () => void;
}

export function TradeExecutionScreen({ order, onClose }: TradeExecutionScreenProps) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState(order.amount.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [marketPrice] = useState(0.82); // Example market price

  const handleTrade = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <TradeSuccessScreen
        order={order}
        marketPrice={marketPrice}
        onClose={onClose}
      />
    );
  }

  const fee = Number(amount) * 0.01; // 1% fee
  const total = Number(amount) * order.price;
  const totalReceived = (Number(amount) / order.price) * (1 - 0.01); // After 1% fee

  return (
    <div className="space-y-6">
      {/* Trade Details */}
      <div className={`
        p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Execute Trade</h2>
              <div className="text-sm text-slate-500">Order by {order.maker}</div>
            </div>
          </div>
          <button
            onClick={() => setShowShare(true)}
            className={`
              p-2 rounded-lg
              ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
              transition-colors
            `}
          >
            <Share2 className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* From */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">You Pay</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-slate-500">Balance:</span>
                <span className="text-sm font-medium">10,000 USDC</span>
              </div>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className={`
                w-full px-4 py-3 rounded-xl text-2xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
            <div className="flex items-center gap-2 mt-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <span className="font-medium">USDC</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed opacity-20" />
            <div className="relative z-10 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* To */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">You Receive</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-slate-500">Rate:</span>
                <span className="text-sm font-medium">${order.price}</span>
              </div>
            </div>
            <div className={`
              px-4 py-3 rounded-xl text-2xl font-medium
              ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            `}>
              {totalReceived.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Bot className="w-6 h-6 text-blue-500" />
              <span className="font-medium">{order.tokenSymbol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Info */}
      <div className={`
        p-4 rounded-xl text-sm
        ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        space-y-2
      `}>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Network Fee</span>
          <div className="flex items-center gap-1">
            <span>~$2.50</span>
            <Info className="w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Platform Fee (1%)</span>
          <span>${fee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <span>Total Cost</span>
          <span>${(total + fee + 2.50).toFixed(2)}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleTrade}
        disabled={isLoading}
        className="
          w-full py-4 rounded-2xl font-medium text-lg
          bg-gradient-to-r from-blue-500 to-purple-500
          text-white flex items-center justify-center gap-2
          hover:opacity-90 transition-all transform hover:scale-[1.02]
          disabled:opacity-50
        "
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ArrowLeftRight className="w-5 h-5" />
            <span>Execute Trade</span>
          </>
        )}
      </button>
      
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        order={order}
      />
    </div>
  );
}