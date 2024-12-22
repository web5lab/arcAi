import React, { useState } from 'react';
import { ArrowDownUp, Wallet, ArrowDown, Info, Settings } from 'lucide-react';
import { useTheme } from '../ThemeProvider'; 
import { SlippagePopup } from './SlippagePopup';
import { OrderSettings } from './OrderSettings';
import { WhitelistModal } from './WhitelistModal';


export function CreateOrderForm({ symbol, currentPrice, onSubmit } ) {
  const { theme } = useTheme();
  const [orderType, setOrderType] = useState('buy');
  const [isDirectSwap, setIsDirectSwap] = useState(false);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [slippage, setSlippage] = useState(0.5);
  const [showSlippagePopup, setShowSlippagePopup] = useState(false);
  const [allowPartialFill, setAllowPartialFill] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showWhitelist, setShowWhitelist] = useState(false);
  const [whitelistAddresses, setWhitelistAddresses] = useState([]);
  const [errors, setErrors] = useState({});

  const total = Number(amount) * Number(price);

  const handleDirectSwap = () => {
    if (validate()) {
      onSubmit({
        type: orderType,
        amount: Number(amount),
        price: currentPrice,
        total: Number(amount) * currentPrice
      });
      
      // Reset form
      setAmount('');
      setPrice(currentPrice.toString());
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!amount || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!price || Number(price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        type: orderType,
        amount: Number(amount),
        price: Number(price),
        total
      });
      
      // Reset form
      setAmount('');
      setPrice(currentPrice.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-6">
        {(['buy', 'sell'] ).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setOrderType(type);
              setIsDirectSwap(false);
            }}
            className={`
              flex-1 py-2.5 rounded-xl font-medium capitalize transition-all
              ${orderType === type && !isDirectSwap
                ? type === 'buy'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-700 text-slate-300'
                : 'bg-slate-200 text-slate-700'
              }
              ${isDirectSwap ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'}
              transform duration-200
            `}
          >
            {type}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setIsDirectSwap(true)}
          className={`
            flex-1 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2
            transform duration-200 hover:scale-[1.02]
            ${isDirectSwap
              ? 'bg-blue-500 text-white'
              : theme === 'dark'
              ? 'bg-slate-700 text-slate-300'
              : 'bg-slate-200 text-slate-700'
            }
          `}
        >
          <ArrowDownUp className="w-4 h-4" />
          Swap
        </button>
      </div>
      
      <div className="relative space-y-2">
        <div className={`
          p-4 rounded-xl transition-all duration-200
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
          ${theme === 'dark' ? 'hover:bg-slate-900/70' : 'hover:bg-slate-50'}
          border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
          ${errors.amount ? 'border-red-500' : ''}
        `}>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-500">From</span>
            <span className="text-sm text-slate-500">Balance: 0.00</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="any"
            className={`
              w-full bg-transparent text-2xl outline-none
            `}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <span className="font-medium">{symbol}</span>
            </div>
            <button className="text-sm text-blue-500 hover:text-blue-600">Max</button>
          </div>
        </div>

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

        <div className={`
          p-4 rounded-xl transition-all duration-200
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
          ${theme === 'dark' ? 'hover:bg-slate-900/70' : 'hover:bg-slate-50'}
          border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
          ${errors.price ? 'border-red-500' : ''}
        `}>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-slate-500">To (estimated)</span>
            <span className="text-sm text-slate-500">Balance: 0.00</span>
          </div>
          <input
            disabled={isDirectSwap}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="any"
            className={`
              w-full bg-transparent text-2xl outline-none
              ${isDirectSwap ? 'opacity-75' : ''}
            `}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <span className="font-medium">USD</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`
        p-3 rounded-xl text-sm
        ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-50'}
      `}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-500">Rate</span>
          <span>1 {symbol} = ${currentPrice}</span>
        </div>
        {isDirectSwap && (
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500">Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Network Fee</span>
          <span className="flex items-center gap-1">
            ~$2.50
            <Info className="w-4 h-4 text-slate-400" />
          </span>
        </div>
      </div>

      {(errors.amount || errors.price) && (
        <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-xl">
          {errors.amount || errors.price}
        </div>
      )}
      
      {isDirectSwap && (
        <div className={`
          p-3 rounded-xl flex items-center justify-between
          ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-50'}
          transition-all duration-300 ease-in-out
        `}>
          <span className="text-sm text-slate-500">Slippage Tolerance</span>
          <button
            onClick={() => setShowSlippagePopup(true)}
            className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
          >
            <span>{slippage}%</span>
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {!isDirectSwap && (
        <OrderSettings
          allowPartialFill={allowPartialFill}
          onPartialFillChange={setAllowPartialFill}
          isPrivate={isPrivate}
          whitelistAddresses={whitelistAddresses}
          onPrivateChange={setIsPrivate}
          onOpenWhitelist={() => setShowWhitelist(true)}
        />
      )}

      {isDirectSwap ? (
        <button
          type="button"
          onClick={handleDirectSwap}
          className={`
            w-full py-3.5 rounded-xl font-medium transition-all
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            text-white flex items-center justify-center gap-2
            transform hover:scale-[1.02] duration-200
          `}
        >
          <Wallet className="w-4 h-4" />
          Swap Now at Market Price
        </button>
      ) : (
        <button
          type="submit"
          className={`
            w-full py-3.5 rounded-xl font-medium transition-all
            transform hover:scale-[1.02] duration-200
            ${orderType === 'buy'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
            }
            text-white
          `}
        >
          Create {orderType} Order
        </button>
      )}

      <WhitelistModal
        isOpen={showWhitelist}
        onClose={() => setShowWhitelist(false)}
        addresses={whitelistAddresses}
        onAddAddress={(address) => setWhitelistAddresses([...whitelistAddresses, address])}
        onRemoveAddress={(address) => setWhitelistAddresses(whitelistAddresses.filter(a => a !== address))}
      />
      
      <SlippagePopup
        isOpen={showSlippagePopup}
        onClose={() => setShowSlippagePopup(false)}
        slippage={slippage}
        onSlippageChange={setSlippage}
      />
    </form>
  );
}