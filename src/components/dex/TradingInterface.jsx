import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info, Wallet } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { SlippageSettings } from '../p2p/SlippageSettings';

export function TradingInterface() {
  const { theme } = useTheme();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="max-w-lg mx-auto">
      <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-6 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">P2P Swap</h2>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`
              p-2 rounded-lg transition-all
              ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
              ${showSettings ? 'text-blue-500' : ''}
            `}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <SlippageSettings
          slippage={slippage}
          onSlippageChange={setSlippage}
          isOpen={showSettings}
        />

        {/* From Token */}
        <div className={`p-4 rounded-xl mb-2 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">From</span>
            <span className="text-sm text-slate-500">Balance: 0.0</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl outline-none"
            />
            <button className={`px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'} transition-colors`}>
              ETH
            </button>
          </div>
        </div>

        {/* Swap Button */}
        <div className="relative h-10 my-2">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'} transition-colors border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <ArrowDownUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* To Token */}
        <div className={`p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-500">To</span>
            <span className="text-sm text-slate-500">Balance: 0.0</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl outline-none"
            />
            <button className={`px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'} transition-colors`}>
              Select
            </button>
          </div>
        </div>

        {/* Info */}
        <div className={`p-3 rounded-xl mb-6 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Rate</span>
            <span>1 ETH = $1,800</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Network Fee</span>
            <span className="text-sm text-slate-500">Estimated Gas: 0.0023 ETH</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2">
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
}