import React from 'react';
import { useTheme } from '../ThemeProvider';
import { History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WalletMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function WalletMenu({ isOpen, onClose, onLogout }: WalletMenuProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const menuRef = React.useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`
        absolute right-0 mt-2 w-48 rounded-xl z-50
        ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
        border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
        shadow-lg divide-y ${theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200'}
      `}
    >
      <div>
        <button
          onClick={() => {
            navigate('/transactions');
            onClose();
          }}
          className={`
            w-full px-4 py-3 flex items-center gap-2 text-sm
            ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
          `}
        >
          <History className="w-4 h-4" />
          Transactions
        </button>
      </div>

      <div>
        <button
          onClick={onLogout}
          className={`
            w-full px-4 py-3 flex items-center gap-2 text-sm text-red-500
            ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
          `}
        >
          <LogOut className="w-4 h-4" />
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
}