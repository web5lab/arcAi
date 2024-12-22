import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowDownUp, Wallet, Info, Settings, Bot, ChevronDown, ArrowDown, Coins, Lock } from 'lucide-react';
import { TradeSuccessModal } from '../dex/TradeSuccessModal';
import { ApprovalModal } from './ApprovalModal';
import { SlippageSettings } from './SlippageSettings';
import { Loader } from '../common/Loader';
import { TokenSelectModal } from './TokenSelectModal';



export function SwapPanel({ network, token, themeColor, radius }) {
  const { theme } = useTheme();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSlippage, setShowSlippage] = useState(false);
  const [showFromTokenSelect, setShowFromTokenSelect] = useState(false);
  const [showToTokenSelect, setShowToTokenSelect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [showApproval, setShowApproval] = useState(false);
  const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem('wallet_connected') === 'true';
  });
  const [fromToken, setFromToken] = useState({ 
    symbol: 'ETH', 
    name: 'Ethereum',
    balance: '0.0542',
    icon: <Coins className="w-6 h-6 text-blue-500" />
  });
  const [toToken, setToToken] = useState({ 
    symbol: 'ARC', 
    name: 'arcAi',
    balance: '1,234.56',
    icon: <Bot className="w-6 h-6 text-blue-500" />
  });

  const handleConnect = () => {
    setIsConnected(true);
    localStorage.setItem('wallet_connected', 'true');
  };

  const handleTrade = () => {
    setIsLoading(true);
    // Simulate trade execution
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 500);
  };

  const handleApprovalSuccess = () => {
    setShowApproval(false);
    setNeedsApproval(false);
    setIsApproving(false);
  };

  const handleApprove = () => {
    setShowApproval(true);
    setIsApproving(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Reset form
    setFromAmount('');
    setToAmount('');
    setSlippage(0.5);
    setShowSlippage(false);
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
    `}>
      <div className="space-y-4">
        {/* From Token */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">You Pay</span>
            <span className="text-sm text-slate-500">Balance: {fromToken.balance}</span>
          </div>
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className={`
              w-full px-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50
            `}
            style={{ borderRadius: radius }}
          />
          <button
            onClick={() => setShowFromTokenSelect(true)}
            className="flex items-center justify-between mt-3 w-full"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-${themeColor}-500/10 flex items-center justify-center`}>
                {fromToken.icon}
              </div>
              <span className="font-medium">{fromToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        </div>

        {/* Swap Icon */}
        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed opacity-20" />
          <button 
            onClick={handleSwapTokens}
            className={`
              relative z-10 p-2 rounded-lg
              ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              hover:scale-110 transition-transform duration-200
            `}
          >
            <ArrowDown className={`w-4 h-4 text-${themeColor}-500`} />
          </button>
        </div>

        {/* To Token */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">You Receive</span>
            <span className="text-sm text-slate-500">Balance: {toToken.balance}</span>
          </div>
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0.0"
            className={`
              w-full px-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50
            `}
            style={{ borderRadius: radius }}
          />
          <button
            onClick={() => setShowToTokenSelect(true)}
            className="flex items-center justify-between mt-3 w-full"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-${themeColor}-500/10 flex items-center justify-center`}>
                {toToken.icon}
              </div>
              <span className="font-medium">{toToken.symbol}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        </div>

        {/* Slippage Settings */}
        {showSlippage && (
          <SlippageSettings
            slippage={slippage}
            onSlippageChange={setSlippage}
            themeColor={themeColor}
            radius={radius}
          />
        )}

        {/* Info */}
        <div className={`
          p-3 rounded-xl text-sm
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Slippage Tolerance</span>
            <button
              onClick={() => setShowSlippage(!showSlippage)}
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
            >
              <span>{slippage}%</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Rate</span>
            <span>1 {fromToken.symbol} = {toToken.symbol === 'ARC' ? '149,629.18' : '0.000006682'} {toToken.symbol}</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Route</span>
            <div className="flex items-center gap-1">
              <span>{fromToken.symbol}</span>
              <ArrowDownUp className="w-3 h-3" />
              <span>{toToken.symbol}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Network Fee</span>
            <div className="flex items-center gap-1">
              <span>~$0.5</span>
              <Info className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={isConnected ? (needsApproval ? handleApprove : handleTrade) : handleConnect}
          className={`
            w-full py-3 rounded-xl font-medium
            bg-${themeColor}-500 text-white
            hover:bg-${themeColor}-600 transition-colors
            flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isConnected && (!fromAmount || !toAmount)}
          style={{ borderRadius: radius }}
        >
          {!isConnected ? (
            <>
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </>
          ) : isApproving ? (
            <>
              <Loader size="sm" color="white" />
              <span>Approving...</span>
            </>
          ) : isLoading ? (
            <>
              <Loader size="sm" color={themeColor} />
              <span>Processing...</span>
            </>
          ) : needsApproval ? (
            <>
              <Lock className="w-4 h-4" />
              Approve {fromToken.symbol}
            </>
          ) : (
            <>
              <ArrowDownUp className="w-4 h-4" />
              Swap Tokens
            </>
          )}
        </button>

        {/* Powered by arcAi */}
        <div className="text-center text-sm text-slate-500">
          <a
            href="https://arcai.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 hover:text-slate-400"
          >
            <Bot className="w-4 h-4" />
            Powered by arcAi
          </a>
        </div>
      </div>

      <TokenSelectModal
        isOpen={showFromTokenSelect}
        onClose={() => setShowFromTokenSelect(false)}
        onSelect={setFromToken}
        selectedToken={fromToken}
        otherToken={toToken}
      />

      <TokenSelectModal
        isOpen={showToTokenSelect}
        onClose={() => setShowToTokenSelect(false)}
        onSelect={setToToken}
        selectedToken={toToken}
        otherToken={fromToken}
      />

      <ApprovalModal
        isOpen={showApproval}
        onClose={() => setShowApproval(false)}
        onSuccess={handleApprovalSuccess}
        token={fromToken}
        spender="arcAi Router"
      />

      {showSuccess && (
        <TradeSuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          trade={{
            type: 'buy',
            amount: Number(fromAmount),
            price: 0.85,
            total: Number(fromAmount) * 0.85,
            tokenSymbol: toToken.symbol,
            txHash: '0x1234567890abcdef1234567890abcdef12345678'
          }}
        />
      )}
    </div>
  );
}