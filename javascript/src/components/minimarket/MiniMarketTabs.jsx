import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ArrowLeftRight, Plus, Search } from 'lucide-react';
import { SwapPanel } from './SwapPanel';
import { CreateP2PPanel } from './CreateP2PPanel';
import { BrowseP2PPanel } from './BrowseP2PPanel';




export function MiniMarketTabs({ network, token, themeColor, radius }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('swap');

  const tabs = [
    { id: 'swap', label: 'Swap', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'create', label: 'Create P2P', icon: <Plus className="w-4 h-4" /> },
    { id: 'browse', label: 'Browse P2P', icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2
                transition-all
                ${activeTab === tab.id
                  ? `bg-${themeColor}-500 text-white`
                  : theme === 'dark'
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
                }
              `}
              style={{ borderRadius: radius }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'swap' && (
          <SwapPanel
            network={network}
            token={token}
            themeColor={themeColor}
            radius={radius}
          />
        )}

        {activeTab === 'create' && (
          <CreateP2PPanel
            network={network}
            token={token}
            themeColor={themeColor}
            radius={radius}
          />
        )}

        {activeTab === 'browse' && (
          <BrowseP2PPanel
            network={network}
            token={token}
            themeColor={themeColor}
            radius={radius}
          />
        )}
      </div>
    </div>
  );
}