import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Plus, Trash2, AlertCircle } from 'lucide-react';



export function WhitelistModal({
  isOpen,
  onClose,
  addresses,
  onAddAddress,
  onRemoveAddress
}) {
  const { theme } = useTheme();
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateAddress = (address) => {
    if (!address) return 'Address is required';
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return 'Invalid address format';
    }
    if (addresses.includes(address)) {
      return 'Address already added';
    }
    return '';
  };

  const handleAddAddress = () => {
    const validationError = validateAddress(newAddress);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onAddAddress(newAddress);
    setNewAddress('');
    setError('');
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
          <h2 className="text-xl font-bold">Manage Whitelist</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Address Input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAddress}
                onChange={(e) => {
                  setNewAddress(e.target.value);
                  setError('');
                }}
                placeholder="Enter wallet address (0x...)"
                className={`
                  flex-1 px-4 py-3 rounded-xl text-sm
                  ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                  border ${error ? 'border-red-500' : theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              />
              <button
                onClick={handleAddAddress}
                className={`
                  px-4 rounded-xl flex items-center justify-center
                  ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-500 text-white'}
                  hover:opacity-80 transition-opacity
                `}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Address List */}
          <div className="space-y-2">
            <div className="text-sm text-slate-500">
              {addresses.length} address{addresses.length !== 1 ? 'es' : ''} whitelisted
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {addresses.map((address) => (
                <div
                  key={address}
                  className={`
                    flex items-center justify-between p-3 rounded-xl
                    ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                  `}
                >
                  <span className="text-sm font-mono truncate">{address}</span>
                  <button
                    onClick={() => onRemoveAddress(address)}
                    className={`
                      p-2 rounded-lg text-red-500
                      ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}
                      transition-colors
                    `}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {addresses.length === 0 && (
            <div className={`
              p-8 rounded-xl text-center
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}
            `}>
              <div className="text-slate-500">No addresses added yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}