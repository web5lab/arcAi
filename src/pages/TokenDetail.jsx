import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { ParticleBackground } from '../components/ParticleBackground';
import { CustomCursor } from '../components/CustomCursor';
import { DexHeader } from '../components/dex/DexHeader';
import { DexFooter } from '../components/dex/DexFooter';
import { TokenStats } from '../components/p2p/TokenStats';
import { TokenFees } from '../components/p2p/TokenFees';
import { OrderBook } from '../components/p2p/OrderBook';
import { CreateOrderForm } from '../components/p2p/CreateOrderForm';
import { TokenTabs } from '../components/p2p/TokenTabs';
import { Bot } from 'lucide-react';

const mockOrders = [
  { price: 0.0234, amount: 1500, total: 35.1, type: 'sell' },
  { price: 0.0232, amount: 2500, total: 58.0, type: 'sell' },
  { price: 0.0230, amount: 1800, total: 41.4, type: 'sell' },
  { price: 0.0228, amount: 3200, total: 72.96, type: 'buy' },
  { price: 0.0226, amount: 4100, total: 92.66, type: 'buy' },
];

export function TokenDetail() {
  const { theme } = useTheme();
  const { symbol } = useParams();

  const handleCreateOrder = (order) => {
    // Here you would typically send the order to your backend
    console.log('New order:', order);
  };

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <DexHeader />
        <main className="flex-grow container mx-auto px-6 py-24">
          <div className="flex items-center space-x-4 mb-8">
            <Bot className="w-12 h-12 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold">{symbol}</h1>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                BSC Testnet
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className={`
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm rounded-xl p-6 border
              ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
            `}>
              <h2 className="text-xl font-bold mb-4">Create Order</h2>
              <CreateOrderForm
                symbol={symbol || ''}
                currentPrice={0.0234}
                onSubmit={handleCreateOrder}
              />
            </div>
            <OrderBook orders={mockOrders} />
          </div>

          <TokenStats
            price={0.0234}
            priceChange={7.89}
            volume24h={156789}
            marketCap={2345678}
            holders={1234}
            liquidity={87.65}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TokenFees buyFee={5} sellFee={5} />
            <div className="md:col-span-2">
              <TokenTabs />
            </div>
          </div>
        </main>
        <DexFooter />
      </div>
    </div>
  );
}