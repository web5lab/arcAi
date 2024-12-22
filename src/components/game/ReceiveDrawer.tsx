import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Copy, QrCode, Brain } from 'lucide-react';

interface ReceiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiveDrawer({ isOpen, onClose }: ReceiveDrawerProps) {
  const { theme } = useTheme();
  const address = 'Neural Master #1234';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Receive Tokens</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className={`
              w-48 h-48 mx-auto mb-4 rounded-2xl
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              flex items-center justify-center
            `}>
              <QrCode className="w-32 h-32 text-blue-500" />
            </div>
            <div className="text-sm text-slate-500">Scan to receive tokens</div>
          </div>

          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
          `}>
            <div className="text-sm text-slate-500 mb-2">Your Neural ID</div>
            <div className="flex items-center justify-between">
              <div className="font-medium">{address}</div>
              <button
                onClick={handleCopy}
                className={`
                  p-2 rounded-lg
                  ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-white'}
                  transition-colors
                `}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={`
            p-4 rounded-xl text-sm
            ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}
            text-blue-500 flex items-center gap-2
          `}>
            <Brain className="w-4 h-4" />
            <span>Only send Neural Tokens to this address</span>
          </div>
        </div>
      </div>
    </div>
  );
}