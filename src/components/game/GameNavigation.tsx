import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Brain, Cpu, ListTodo, Users, Wallet, Bot, ArrowLeftRight, BarChart2, Dices, PlusCircle, TrendingUp } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

type NavigationMode = 'game' | 'dapp';

interface GameNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  mode?: NavigationMode;
  onModeChange?: (mode: NavigationMode) => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`
      flex flex-col items-center gap-1
      ${isActive ? 'text-blue-500' : theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}
    `}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

export function GameNavigation({ activeTab, onTabChange, mode = 'game', onModeChange }: GameNavigationProps & { mode?: NavigationMode; onModeChange?: (mode: NavigationMode) => void }) {
  const { theme } = useTheme();

  const gameMenus = [
    { id: 'train', label: 'Train', icon: <Brain className="w-6 h-6" /> },
    { id: 'mine', label: 'Mine', icon: <Cpu className="w-6 h-6" /> },
    { id: 'task', label: 'Task', icon: <ListTodo className="w-6 h-6" /> },
    { id: 'friend', label: 'Friend', icon: <Users className="w-6 h-6" /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-6 h-6" /> },
  ];

  const dappMenus = [
    { id: 'create', label: 'Create', icon: <PlusCircle className="w-6 h-6" /> },
    { id: 'swap', label: 'Swap', icon: <ArrowLeftRight className="w-6 h-6" /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-6 h-6" /> },
    { id: 'trade', label: 'Market', icon: <BarChart2 className="w-6 h-6" /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-6 h-6" /> },
  ];

  const menus = mode === 'game' ? gameMenus : dappMenus;

  const handleModeChange = () => {
    const newMode = mode === 'game' ? 'dapp' : 'game';
    onModeChange?.(newMode);
    // Reset to first tab of the new mode
    onTabChange(newMode === 'game' ? 'train' : 'create');
  };

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 max-w-md mx-auto
      ${theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'}
      backdrop-blur-sm border-t
      ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
      px-4 py-4
    `}>
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={handleModeChange}
          className={`
            absolute -top-12 right-4 z-20
            w-12 h-12 rounded-full
            bg-gradient-to-r from-blue-500 to-purple-500
            flex items-center justify-center
            shadow-lg hover:scale-105 transition-transform
            ${theme === 'dark' ? 'shadow-blue-500/20' : 'shadow-blue-500/30'}
          `}
        >
          {mode === 'game' ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <Dices className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Navigation Items */}
        <div className="flex justify-between items-center">
          {menus.map((menu) => (
            <NavItem
              key={menu.id}
              icon={menu.icon}
              label={menu.label}
              isActive={activeTab === menu.id}
              onClick={() => onTabChange(menu.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}