import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowDownUp, Brain, Info, Settings, ArrowDown } from 'lucide-react';
import { TokenSearchModal } from './TokenSearchModal';
import { SlippageSettings } from './SlippageSettings';


export function SwapScreen() {
  const { theme } = useTheme();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [showFromTokenSearch, setShowFromTokenSearch] = useState(false);
  const [showToTokenSearch, setShowToTokenSearch] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [showSlippage, setShowSlippage] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className={`
        p-6 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="space-y-4">
          {/* From */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
          `}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">From</span>
              <span className="text-sm text-slate-500">Balance: 0.0</span>
            </div>
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl outline-none"
            />
            <button
              onClick={() => setShowFromTokenSearch(true)}
              className={`
                px-3 py-1 mt-2 rounded-lg text-sm
                ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                flex items-center gap-2
              `}
            >
              {fromToken ? (
                <>
                  <Brain className="w-4 h-4 text-blue-500" />
                  {fromToken.symbol}
                </>
              ) : (
                'Select Token'
              )}
            </button>
          </div>

          {/* Swap Icon */}
          <div className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed opacity-20" />
            <button className={`
              relative z-10 p-2 rounded-lg
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              hover:scale-110 transition-transform duration-200
            `}>
              <ArrowDown className="w-4 h-4 text-blue-500" />
            </button>
          </div>

          {/* To */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
          `}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">To</span>
              <span className="text-sm text-slate-500">Balance: {toToken?.balance || '0.0'}</span>
            </div>
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl outline-none"
            />
            <button
              onClick={() => setShowToTokenSearch(true)}
              className={`
                px-3 py-1 mt-2 rounded-lg text-sm
                ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                flex items-center gap-2
              `}
            >
              {toToken ? (
                <>
                  <Brain className="w-4 h-4 text-blue-500" />
                  {toToken.symbol}
                </>
              ) : (
                'Select Token'
              )}
            </button>
          </div>

          {/* Slippage Settings */}
          <div className={`
            p-3 rounded-xl flex items-center justify-between
            ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
            transition-all duration-300 ease-in-out
          `}>
            <span className="text-sm text-slate-500">Slippage Tolerance</span>
            <button
              onClick={() => setShowSlippage(!showSlippage)}
              className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
            >
              <span>{slippage}%</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <SlippageSettings
            slippage={slippage}
            onSlippageChange={setSlippage}
            isOpen={showSlippage}
          />

          {/* Info */}
          <div className={`
            p-3 rounded-xl text-sm
            ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
          `}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-500">Price Impact</span>
              <span className="text-green-500">&lt;0.01%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Network Fee</span>
              <div className="flex items-center gap-1">
                <span>~$0.5</span>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white">
            Connect Wallet
          </button>
        </div>
      </div>

      <TokenSearchModal
        isOpen={showFromTokenSearch}
        onClose={() => setShowFromTokenSearch(false)}
        onSelect={(token) => {
          setFromToken(token);
          setShowFromTokenSearch(false);
        }}
      />

      <TokenSearchModal
        isOpen={showToTokenSearch}
        onClose={() => setShowToTokenSearch(false)}
        onSelect={(token) => {
          setToToken(token);
          setShowToTokenSearch(false);
        }}
      />
    </div>
  );
}