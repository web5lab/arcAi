import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Brain, Info, ArrowDownUp, ChevronDown, Lock, Users } from 'lucide-react';
import { TokenSearchModal } from './TokenSearchModal';
import { WhitelistModal } from './WhitelistModal';



export function CreateOrderModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showTokenSearch, setShowTokenSearch] = useState(false);
  const [showWhitelist, setShowWhitelist] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowPartialFill, setAllowPartialFill] = useState(false);
  const [whitelistAddresses, setWhitelistAddresses] = useState<string([]);
  const [marketPrice, setMarketPrice] = useState(0.85); // Example market price
  const [balance, setBalance] = useState(10000); // Example balance

  if (!isOpen) return null;

  const total = Number(amount) * Number(price);
  const priceImpact = marketPrice > 0 ? ((Number(price) - marketPrice) / marketPrice) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className={`
        w-full max-w-md rounded-t-3xl p-6
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
      `}>
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Create Order</h2>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Type Selection */}
            <div className="grid grid-cols-2 gap-2">
              {(['buy', 'sell'] ).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`
                    py-3 rounded-xl font-medium capitalize transition-all
                    ${orderType === type
                      ? type === 'buy'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : theme === 'dark'
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-slate-100 text-slate-700'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Token Selection */}
            <div
              onClick={() => setShowTokenSearch(true)}
              className={`
                p-4 rounded-xl flex items-center justify-between cursor-pointer
                ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                hover:opacity-80 transition-opacity
              `}
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                <span className="text-sm">
                  {selectedToken ? selectedToken.symbol : 'Select Token'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>

            {selectedToken && (
              <div className={`
                p-3 rounded-xl text-sm
                ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
              `}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Market Price</span>
                  <span>${marketPrice.toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Your Balance</span>
                  <span>{balance.toLocaleString()} {selectedToken.symbol}</span>
                </div>
              </div>
            )}
        
            {/* Amount and Price Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className={`
                    w-full px-4 py-3 rounded-xl
                    ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                    border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  `}
                />
              </div>

              <div>
                <label className="text-sm text-slate-500 mb-1 block">Price per token</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.0"
                  className={`
                    w-full px-4 py-3 rounded-xl
                    ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                    border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  `}
                />
              </div>

              <div className={`
                p-3 rounded-xl text-sm
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
                space-y-1
              `}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Total</span>
                  <span>${(Number(amount) * Number(price)).toFixed(2)}</span>
                </div>
                {price && marketPrice > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Price Impact</span>
                    <span className={priceImpact > 0 ? 'text-green-500' : 'text-red-500'}>
                      {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
                    </span>
                  </div>
                )}
                {orderType === 'buy' && total > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Required Balance</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Settings */}
            <div className={`
              p-4 rounded-xl space-y-4
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Allow Partial Fill</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowPartialFill(!allowPartialFill)}
                  className={`
                    w-11 h-6 rounded-full transition-colors relative
                    ${allowPartialFill ? 'bg-blue-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
                  `}
                >
                  <div className={`
                    w-4 h-4 rounded-full bg-white absolute top-1
                    transition-transform duration-200
                    ${allowPartialFill ? 'translate-x-6' : 'translate-x-1'}
                  `} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Private Order</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isPrivate && whitelistAddresses.length === 0) {
                        setShowWhitelist(true);
                        return;
                      }
                      setIsPrivate(!isPrivate);
                    }}
                    className={`
                      w-11 h-6 rounded-full transition-colors relative
                      ${isPrivate ? 'bg-blue-500' : whitelistAddresses.length === 0 ? 'bg-slate-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
                      ${!isPrivate && whitelistAddresses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded-full bg-white absolute top-1
                      transition-transform duration-200
                      ${isPrivate ? 'translate-x-6' : 'translate-x-1'}
                    `} />
                  </button>
                  {isPrivate && (
                    <button
                      type="button"
                      onClick={() => setShowWhitelist(true)}
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {isPrivate && whitelistAddresses.length > 0 && (
                <div className="text-sm text-slate-500">
                  {whitelistAddresses.length} address{whitelistAddresses.length !== 1 ? 'es' : ''} whitelisted
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedToken || !amount || !price}
              className={`
                w-full py-3 rounded-xl
                ${orderType === 'buy'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:opacity-80 transition-opacity
              `}
            >
              Create {orderType} Order
            </button>
          </div>
        </div>
      </div>

      <TokenSearchModal
        isOpen={showTokenSearch}
        onClose={() => {
          setShowTokenSearch(false);
        }} 
        onSelect={(token) => {
          setSelectedToken(token);
          setShowTokenSearch(false);
        }}
      />
      <WhitelistModal
        isOpen={showWhitelist}
        onClose={() => setShowWhitelist(false)}
        addresses={whitelistAddresses}
        onAddAddress={(address) => {
          setWhitelistAddresses([...whitelistAddresses, address]);
          setIsPrivate(true);
        }}
        onRemoveAddress={(address) => {
          const newAddresses = whitelistAddresses.filter(a => a !== address);
          setWhitelistAddresses(newAddresses);
          if (newAddresses.length === 0) {
            setIsPrivate(false);
          }
        }}
      />
   </div>
  );
}