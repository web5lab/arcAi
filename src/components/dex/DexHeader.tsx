import React from 'react';
import { Bot, ArrowLeft } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { ProfileButton } from './ProfileButton';
import { ThemeToggle } from './ThemeToggle';


const WALLET_KEY = 'wallet_connected';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      className={`${theme === 'dark' ? 'hover:text-slate-200' : 'hover:text-slate-900'} transition-colors`}
    >
      {children}
    </a>
  );
}

export function DexHeader() {
  const { theme } = useTheme();
  const [isConnected, setIsConnected] = React.useState(() => {
    return localStorage.getItem(WALLET_KEY) === 'true';
  });

  const handleConnect = () => {
    setIsConnected(true);
    localStorage.setItem(WALLET_KEY, 'true');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem(WALLET_KEY);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 text-blue-500 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#trade">Trade</NavLink>
              <NavLink href="#orders">Orders</NavLink>
              <NavLink href="#history">History</NavLink>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ProfileButton
              isConnected={isConnected}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}