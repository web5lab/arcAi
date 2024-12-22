import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X } from 'lucide-react';
import { TradeExecutionScreen } from './TradeExecutionScreen';



export function TradeModal({ isOpen, onClose, order }) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <TradeExecutionScreen order={order} onClose={onClose} />
      </div>
    </div>
  );
}