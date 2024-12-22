import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Bot, Wallet, ChevronDown } from 'lucide-react';
import { WalletMenu } from './WalletMenu';



export function MiniMarketHeader({ network, token, themeColor }) {
  const { theme } = useTheme();
  const [isConnected, setIsConnected] = React.useState(() => {
    return localStorage.getItem('wallet_connected') === 'true';
  });
  const [showWalletMenu, setShowWalletMenu] = React.useState(false);
  const balance = 10000; // Example balance
  const price = 0.85; // Example price

  const handleConnect = () => {
    setIsConnected(true);
    localStorage.setItem('wallet_connected', 'true');
  };

  const handleLogout = () => {
    setIsConnected(false);
    localStorage.removeItem('wallet_connected');
    setShowWalletMenu(false);
  };
  
  const handleWalletClick = () => {
    if (!isConnected) {
      handleConnect();
    } else {
      setShowWalletMenu(!showWalletMenu);
    }
  };

  return (
    <div className={`
      p-4 border-b
      ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className={`w-6 h-6 text-${themeColor}-500`} />
          <div className="flex items-center gap-2">
            <h1 className="font-bold">arcAi</h1>
            <div className="text-sm text-slate-500">$ARC</div>
            <div className="text-sm font-medium">${price}</div>
          </div>
        </div>
        
        <button
          onClick={handleWalletClick}
          className={`
            px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
            ${isConnected 
              ? `${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`
              : `bg-${themeColor}-500 text-white`
            }
            transition-colors
          `}
        >
          {isConnected ? (
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span>{balance.toLocaleString()} ARC</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              <span>Connect</span>
            </>
          )}
        </button>

        {isConnected && (
          <WalletMenu
            isOpen={showWalletMenu}
            onClose={() => setShowWalletMenu(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}