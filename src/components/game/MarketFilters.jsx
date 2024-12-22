import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Filter, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';



export function MarketFilters({ isOpen, onClose, onFilterChange }) {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = React.useState('newest');
  const [orderType, setOrderType] = React.useState('all');
  const [priceRange, setPriceRange] = React.useState('all');

  const handleApplyFilters = () => {
    onFilterChange({ sortBy, orderType, priceRange });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold">Market Filters</h2>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-500 mb-3">Sort By</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'price', label: 'Price', icon: <DollarSign className="w-4 h-4" /> },
              { value: 'volume', label: 'Volume', icon: <TrendingUp className="w-4 h-4" /> },
              { value: 'newest', label: 'Newest', icon: <Clock className="w-4 h-4" /> }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value )}
                className={`
                  p-3 rounded-xl flex flex-col items-center gap-2
                  ${sortBy === option.value
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {option.icon}
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Type */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-500 mb-3">Order Type</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'all', label: 'All Orders' },
              { value: 'buy', label: 'Buy Orders', color: 'green' },
              { value: 'sell', label: 'Sell Orders', color: 'red' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setOrderType(option.value )}
                className={`
                  py-2 rounded-xl text-sm
                  ${orderType === option.value
                    ? option.color === 'green'
                      ? 'bg-green-500 text-white'
                      : option.color === 'red'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-500 mb-3">Price Range</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'all', label: 'All Prices' },
              { value: 'above', label: 'Above Market', icon: <TrendingUp className="w-4 h-4" /> },
              { value: 'below', label: 'Below Market', icon: <TrendingDown className="w-4 h-4" /> }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPriceRange(option.value )}
                className={`
                  p-3 rounded-xl flex flex-col items-center gap-2
                  ${priceRange === option.value
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {option.icon}
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}