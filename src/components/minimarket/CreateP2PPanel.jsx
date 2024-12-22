import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Bot, Coins, ChevronDown } from 'lucide-react';
import { OrderTypeSelector } from './order/OrderTypeSelector';
import { OrderInputs } from './order/OrderInputs';
import { OrderSettings } from './order/OrderSettings';
import { OrderSummary } from './order/OrderSummary';
import { OrderButton } from './order/OrderButton';
import { ApprovalModal } from './ApprovalModal';
import { TokenSelectModal } from './TokenSelectModal';
import { TradeSuccessModal } from '../dex/TradeSuccessModal';
import { Wallet } from 'lucide-react';



export function CreateP2PPanel({ network, token, themeColor, radius }) {
  const { theme } = useTheme();
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowPartialFill, setAllowPartialFill] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem('wallet_connected') === 'true';
  });
  const [needsApproval, setNeedsApproval] = useState(true);
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [selectedToken, setSelectedToken] = useState({ 
    symbol: 'ETH', 
    name: 'Ethereum',
    balance: '0.0542',
    icon: <Coins className="w-6 h-6 text-blue-500" />
  });
  const [oppositeToken, setOppositeToken] = useState({ 
    symbol: 'ARC', 
    name: 'arcAi',
    balance: '1,234.56',
    icon: <Bot className="w-6 h-6 text-blue-500" />
  });

  const total = Number(amount) * Number(price);
  const marketPrice = 0.85; // Example market price
  const priceImpact = marketPrice > 0 ? ((Number(price) - marketPrice) / marketPrice) * 100 : 0;
  const balance = 10000; // Example balance

  const handleConnect = () => {
    setIsConnected(true);
    localStorage.setItem('wallet_connected', 'true');
  };

  const handleApprovalSuccess = () => {
    setShowApproval(false);
    setNeedsApproval(false);
  };

  const handleCreateOrder = () => {
    if (!isConnected) {
      handleConnect();
      return;
    }

    if (needsApproval) {
      setShowApproval(true);
      return;
    }

    // Show success modal
    setShowSuccess(true);
  };

  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="space-y-4">
        {/* Token Selection */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowTokenSelect(true)}
            className="flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full bg-${themeColor}-500/10 flex items-center justify-center`}>
              {selectedToken.icon}
            </div>
            <span className="font-medium">{selectedToken.symbol}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">for</span>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-${themeColor}-500/10 flex items-center justify-center`}>
                {oppositeToken.icon}
              </div>
              <span className="font-medium">{oppositeToken.symbol}</span>
            </div>
          </div>
        </div>
        <OrderTypeSelector
          orderType={orderType}
          onOrderTypeChange={setOrderType}
          themeColor={themeColor}
          radius={radius}
        />

        <OrderInputs
          amount={amount}
          price={price}
          onAmountChange={setAmount}
          onPriceChange={setPrice}
          themeColor={themeColor}
          radius={radius}
        />

        <OrderSummary
          total={total}
          priceImpact={priceImpact}
          marketPrice={marketPrice}
        />

        <OrderSettings
          isPrivate={isPrivate}
          allowPartialFill={allowPartialFill}
          onPrivateChange={setIsPrivate}
          onPartialFillChange={setAllowPartialFill}
          themeColor={themeColor}
        />

        <button
          onClick={handleCreateOrder}
          disabled={!amount || !price}
          className={`
            w-full py-3 rounded-xl font-medium
            ${!isConnected
              ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
              : needsApproval
              ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
              : orderType === 'buy'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
            }
            text-white transition-colors
            flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{ borderRadius: radius }}
        >
          {!isConnected ? (
            <>
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </>
          ) : needsApproval ? (
            <>
              <Bot className="w-4 h-4" />
              Approve ARC
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              Create {orderType} Order
            </>
          )}
        </button>
      </div>

      <ApprovalModal
        isOpen={showApproval}
        onClose={() => setShowApproval(false)}
        onSuccess={handleApprovalSuccess}
        token={{
          symbol: 'ARC',
          name: 'arcAi',
          icon: <Bot className="w-6 h-6 text-blue-500" />
        }}
        spender="arcAi P2P"
      />

      {showSuccess && (
        <TradeSuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          trade={{
            type: orderType,
            amount: Number(amount),
            price: Number(price),
            total,
            tokenSymbol: 'ARC',
            txHash: '0x1234567890abcdef1234567890abcdef12345678'
          }}
        />
      )}
      
      <TokenSelectModal
        isOpen={showTokenSelect}
        onClose={() => setShowTokenSelect(false)}
        onSelect={(token) => {
          setSelectedToken(token);
          setShowTokenSelect(false);
        }}
        selectedToken={selectedToken}
        otherToken={oppositeToken}
      />
    </div>
  );
}