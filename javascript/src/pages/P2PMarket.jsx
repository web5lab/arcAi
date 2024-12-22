import React, { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { ParticleBackground } from '../components/ParticleBackground';
import { CustomCursor } from '../components/CustomCursor';
import { DexHeader } from '../components/dex/DexHeader';
import { DexFooter } from '../components/dex/DexFooter';
import { MarketHeader } from '../components/p2p/MarketHeader';
import { TokenCard } from '../components/p2p/TokenCard';
import { Bot, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockTokens = [
  {
    symbol: '$ARC',
    name: 'ArcAi',
    description: 'The future of decentralized AI gaming and token creation platform.',
    price: 0.85,
    priceChange: 7.89,
    offered: 4.39,
    offeredPrice: 44.37,
    volume24h: 1200000,
    marketCap: 85000000
  },
  {
    symbol: '$GEM',
    name: 'Neural Gem',
    description: 'Revolutionary AI-powered gaming token with unique mining mechanics.',
    price: 1.25,
    priceChange: -2.34,
    offered: 25.67,
    offeredPrice: 35.14,
    volume24h: 950000,
    marketCap: 62500000
  }
];

export function P2PMarket() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'volume'>('newest');
  const [orderType, setOrderType] = useState<'all' | 'buy' | 'sell'>('all');

  const filteredTokens = mockTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <DexHeader />
        <main className="flex-grow container mx-auto px-6 py-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">P2P Market</h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Create and trade tokens directly with other users through secure peer-to-peer transactions
            </p>
          </div>

          <button
            onClick={() => navigate('/p2p/create')}
            className={`
              w-full mb-6 py-3 rounded-xl font-medium
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white flex items-center justify-center gap-2
              hover:opacity-90 transition-opacity
            `}
          >
            <Plus className="w-5 h-5" />
            <span>Create P2P Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <MarketHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            orderType={orderType}
            onOrderTypeChange={setOrderType}
          />

          {filteredTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTokens.map((token, index) => (
                <TokenCard
                  key={index}
                  {...token}
                />
              ))}
            </div>
          ) : (
            <div className={`
              p-12 rounded-2xl text-center
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm border
              ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
            `}>
              <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Orders Found</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-6`}>
                {searchQuery
                  ? `No orders match your search "${searchQuery}"`
                  : 'No active orders available at the moment'}
              </p>
              <button
                onClick={() => navigate('/p2p/create')}
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-gradient-to-r from-blue-500 to-purple-500
                  text-white font-medium hover:opacity-90 transition-opacity
                "
              >
                <Plus className="w-5 h-5" />
                Create First Order
              </button>
            </div>
          )}
        </main>
        <DexFooter />
      </div>
    </div>
  );
}