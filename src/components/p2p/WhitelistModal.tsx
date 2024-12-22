import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Plus, Trash2 } from 'lucide-react';

interface WhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: string[];
  onAddAddress: (address: string) => void;
  onRemoveAddress: (address: string) => void;
}

export function WhitelistModal({
  isOpen,
  onClose,
  addresses,
  onAddAddress,
  onRemoveAddress
}: WhitelistModalProps) {
  const { theme } = useTheme();
  const [newAddress, setNewAddress] = useState('');

  if (!isOpen) return null;

  const handleAddAddress = () => {
    if (newAddress && /^0x[a-fA-F0-9]{40}$/.test(newAddress)) {
      onAddAddress(newAddress);
      setNewAddress('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        relative w-full max-w-md rounded-2xl p-6 space-y-4
        ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
        border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
      `}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Whitelist Addresses</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            className={`
              flex-1 px-3 py-2 rounded-lg text-sm
              ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:border-blue-500
            `}
          />
          <button
            onClick={handleAddAddress}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {addresses.map((address) => (
            <div
              key={address}
              className={`
                flex items-center justify-between p-3 rounded-lg
                ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
              `}
            >
              <span className="text-sm font-mono truncate">{address}</span>
              <button
                onClick={() => onRemoveAddress(address)}
                className="p-1 rounded hover:bg-red-500/10 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No addresses added yet
          </div>
        )}
      </div>
    </div>
  );
}