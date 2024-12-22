import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Brain, TrendingUp, TrendingDown, Filter, ArrowUpRight, Search, Plus, SlidersHorizontal, Bot } from 'lucide-react';
import { MarketSearch } from './MarketSearch';
import { CreateOrderModal } from './CreateOrderModal';
import { MarketFilters } from './MarketFilters';
import { TradeModal } from './TradeModal';

interface P2POrder {
  id: string;
  tokenSymbol: string;
  marketPrice: number;
  amount: number;
  price: number;
  total: number;
  type: 'buy' | 'sell';
  maker: string;
  timestamp: string;
  transferFee: number;
}

const mockOrders: P2POrder[] = [
  {
    id: '1',
    tokenSymbol: 'NEURAL',
    amount: 1000,
    marketPrice: 0.82,
    price: 0.85,
    total: 850,
    type: 'buy',
    maker: 'Neural Master #1234',
    timestamp: '2 mins ago',
    transferFee: 2.5
  },
  {
    id: '2',
    tokenSymbol: 'NEURAL',
    amount: 2500,
    marketPrice: 0.82,
    price: 0.82,
    total: 2050,
    type: 'sell',
    maker: 'Neural Sage #5678',
    timestamp: '5 mins ago',
    transferFee: 2.5
  }
];

export function TradeScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showCreateOrder, setShowCreateOrder] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<P2POrder | null>(null);
  const [filters, setFilters] = React.useState({
    sortBy: 'newest' as const,
    orderType: 'all' as const,
    priceRange: 'all' as const
  });

  const filteredOrders = mockOrders.filter(order =>
    order.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.maker.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(order => {
    if (filters.orderType !== 'all' && order.type !== filters.orderType) {
      return false;
    }
    return true;
  });

  const handleCreateOrder = (order: {
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    total: number;
  }) => {
    console.log('New order:', order);
    // Here you would typically send the order to your backend
  };

  return (
    <div className="space-y-6">
      {/* Create Order Button */}
      <button
        onClick={() => setShowCreateOrder(true)}
        className={`
          w-full py-3 rounded-xl font-medium
          bg-gradient-to-r from-blue-500 to-purple-500
          text-white flex items-center justify-center gap-2
          hover:opacity-90 transition-opacity
        `}
      >
        <Plus className="w-5 h-5" />
        Create P2P Order
      </button>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by token or address..."
          className={`
            flex-1 pl-10 pr-4 py-2.5 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          `}
        />
        <button
          onClick={() => setShowFilters(true)}
          className={`
            px-4 rounded-xl flex items-center justify-center
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            hover:border-blue-500/20 transition-all
          `}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            <span className="font-medium">Market Overview</span>
          </div>
          <div className="text-sm text-green-500">+12.5% 24h</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-500 mb-1">24h Volume</div>
            <div className="font-medium">$2.5M</div>
          </div>
          <div>
            <div className="text-slate-500 mb-1">Market Cap</div>
            <div className="font-medium">$85M</div>
          </div>
        </div>
      </div>

      {/* P2P Orders */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">{order.tokenSymbol}</div>
                  <div className="text-sm text-slate-500">{order.maker}</div>
                </div>
              </div>
              <div className={`
                px-3 py-1 rounded-lg text-sm
                ${order.type === 'buy'
                  ? theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'
                  : theme === 'dark' ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
                }
              `}>
                {order.type === 'buy' ? 'Buy' : 'Sell'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="text-sm text-slate-500 mb-1">Amount</div>
                <div className="font-medium">{order.amount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Price</div>
                <div className="font-medium">${order.price.toFixed(3)}</div>
                <div className={`text-xs ${order.price > order.marketPrice ? 'text-red-500' : 'text-green-500'}`}>
                  {order.price > order.marketPrice ? '+' : ''}{((order.price - order.marketPrice) / order.marketPrice * 100).toFixed(2)}% vs market
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Total</div>
                <div className="font-medium">${order.total.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{order.timestamp}</span>
              <button 
                onClick={() => setSelectedOrder(order)}
                className={`
                  flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
                  ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}
                  hover:opacity-80 transition-opacity
                `}>
                <span>Trade</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className={`
            p-8 rounded-xl text-center
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            backdrop-blur-sm
          `}>
            <div className="text-slate-500">No orders found</div>
          </div>
        )}
      </div>
      
      <CreateOrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        onSubmit={handleCreateOrder}
      />
      <MarketFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFilterChange={setFilters}
      />
      {selectedOrder && (
        <TradeModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}