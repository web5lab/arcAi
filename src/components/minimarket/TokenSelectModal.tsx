import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Search, Star, Bot, Coins, X, ChevronLeft } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  icon: React.ReactNode;
  isStarred?: boolean;
}

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
  otherToken?: Token;
}

const mockTokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '0.0542',
    icon: <Coins className="w-6 h-6 text-blue-500" />,
    isStarred: true
  },
  {
    symbol: 'ARC',
    name: 'arcAi',
    balance: '1,234.56',
    icon: <Bot className="w-6 h-6 text-blue-500" />,
    isStarred: true
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    balance: '100.00',
    icon: <Coins className="w-6 h-6 text-green-500" />
  }
];

export function TokenSelectModal({ isOpen, onClose, onSelect, selectedToken, otherToken }: TokenSelectModalProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!isOpen) return null;

  const filteredTokens = mockTokens.filter(token => 
    token.symbol !== otherToken?.symbol &&
    (token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">Select Token</h2>
          </div>
        </div>
          
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or symbol"
            className={`
              w-full pl-10 pr-4 py-3 rounded-xl text-sm
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
            `}
          />
        </div>

        {/* Common Tokens */}
        <div className="mb-4">
          <div className="text-sm text-slate-500 mb-2">Common tokens</div>
          <div className="flex flex-wrap gap-2">
            {mockTokens.filter(t => t.isStarred).map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onSelect(token);
                  onClose();
                }}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium
                  flex items-center gap-2
                  ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}
                  ${selectedToken?.symbol === token.symbol ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {token.icon}
                {token.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Token List */}
        <div className="space-y-2 max-h-[320px] overflow-y-auto">
          <div className="text-sm text-slate-500 mb-2">All tokens</div>
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className={`
                w-full p-3 rounded-xl flex items-center justify-between
                ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}
                ${selectedToken?.symbol === token.symbol ? 'ring-2 ring-blue-500' : ''}
                transition-colors
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white'}
                  border ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}
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
                <div className="text-sm text-slate-500">Balance</div>
              </div>
            </button>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-500">No tokens found</div>
          </div>
        )}
      </div>
    </div>
  );
}