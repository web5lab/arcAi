import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Search, X, Star, ExternalLink, Bot, Coins, DollarSign, Wallet } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  isStarred?: boolean;
  icon: React.ReactNode;
}

interface TokenSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

const mockTokens: Token[] = [
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    balance: '0.0', 
    price: 2000, 
    isStarred: true,
    icon: <Wallet className="w-8 h-8 text-blue-500" />
  },
  { 
    symbol: 'ARC', 
    name: 'ArcAi', 
    balance: '0.0', 
    price: 0.85, 
    isStarred: true,
    icon: <Bot className="w-8 h-8 text-blue-500" />
  },
  { 
    symbol: 'USDT', 
    name: 'Tether', 
    balance: '0.0', 
    price: 1,
    icon: <DollarSign className="w-8 h-8 text-green-500" />
  },
  { 
    symbol: 'BNB', 
    name: 'BNB', 
    balance: '0.0', 
    price: 300,
    icon: <Coins className="w-8 h-8 text-yellow-500" />
  },
];

export function TokenSearchModal({ isOpen, onClose, onSelect }: TokenSearchModalProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState(mockTokens);

  if (!isOpen) return null;

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (symbol: string) => {
    setTokens(tokens.map(token =>
      token.symbol === symbol
        ? { ...token, isStarred: !token.isStarred }
        : token
    ));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Select Token</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or paste address"
            className={`
              w-full pl-10 pr-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
            `}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => onSelect(token)}
              className={`
                w-full p-3 rounded-xl flex items-center justify-between
                ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                transition-colors relative
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
                `}>
                  {token.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-slate-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{token.balance}</div>
                <div className="text-sm text-slate-500">${token.price}</div>
              </div>
            </button>
          ))}
        </div>

        <div className={`
          mt-4 p-3 rounded-xl text-sm flex items-center justify-center gap-2
          ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
          text-slate-500
        `}>
          <ExternalLink className="w-4 h-4" />
          <span>View token list</span>
        </div>
      </div>
    </div>
  );
}