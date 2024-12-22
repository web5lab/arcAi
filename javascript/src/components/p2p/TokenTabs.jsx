import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Activity, Info, History } from 'lucide-react';
import { TokenSocials } from './TokenSocials';



const tabs = [
  { id: 'trades', label: 'Recent Trades', icon: <Activity className="w-4 h-4" /> },
  { id: 'info', label: 'Token Info', icon: <Info className="w-4 h-4" /> },
  { id: 'history', label: 'Your History', icon: <History className="w-4 h-4" /> },
];



const mockTrades = [
  { price: 0.0234, amount: 1500, total: 35.1, type: 'buy', time: '2 mins ago' },
  { price: 0.0232, amount: 2500, total: 58.0, type: 'sell', time: '5 mins ago' },
  { price: 0.0230, amount: 1800, total: 41.4, type: 'buy', time: '10 mins ago' },
];

export function TokenTabs() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('trades');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trades':
        return (
          <div className="space-y-2">
            {mockTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className={`${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                  ${trade.price.toFixed(4)}
                </div>
                <div>{trade.amount.toFixed(2)}</div>
                <div>${trade.total.toFixed(2)}</div>
                <div className="text-sm text-slate-500">{trade.time}</div>
              </div>
            ))}
          </div>
        );
      
      case 'info':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-slate-500 mb-2">Social Links</h3>
              <TokenSocials />
            </div>
            <div>
              <h3 className="text-sm text-slate-500 mb-1">Contract Address</h3>
              <div className="font-mono text-sm break-all">
                0x1234567890abcdef1234567890abcdef12345678
              </div>
            </div>
            <div>
              <h3 className="text-sm text-slate-500 mb-1">Token Standard</h3>
              <div>BEP-20</div>
            </div>
            <div>
              <h3 className="text-sm text-slate-500 mb-1">Total Supply</h3>
              <div>1,000,000,000</div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="text-center py-8">
            <p className="text-slate-500">Connect your wallet to view your trading history</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm rounded-xl border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
    `}>
      <div className="border-b border-slate-700/50">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium
                ${activeTab === tab.id
                  ? `${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} border-b-2 border-blue-500`
                  : `${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} hover:text-blue-500`
                }
                transition-colors
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  );
}