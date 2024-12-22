import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Lock, Users } from 'lucide-react';



export function OrderSettings({ 
  allowPartialFill, 
  onPartialFillChange,
  isPrivate,
  whitelistAddresses,
  onPrivateChange,
  onOpenWhitelist
}) {
  const { theme } = useTheme();

  return (
    <div className={`
      p-4 rounded-xl text-sm space-y-4
      ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-50'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span>Allow Partial Fill</span>
        </div>
        <button
          onClick={() => onPartialFillChange(!allowPartialFill)}
          className={`
            w-11 h-6 rounded-full transition-colors relative
            ${allowPartialFill ? 'bg-blue-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
          `}
        >
          <div className={`
            w-4 h-4 rounded-full bg-white absolute top-1
            transition-transform duration-200
            ${allowPartialFill ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-500" />
          <span>Private Order</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!isPrivate && whitelistAddresses.length === 0) {
                onOpenWhitelist();
                return;
              }
              const newValue = !isPrivate;
              onPrivateChange(newValue);
            }}
            className={`
              w-11 h-6 rounded-full transition-colors relative
              ${isPrivate ? 'bg-blue-500' : whitelistAddresses.length === 0 ? 'bg-slate-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
              ${!isPrivate && whitelistAddresses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className={`
              w-4 h-4 rounded-full bg-white absolute top-1
              transition-transform duration-200
              ${isPrivate ? 'translate-x-6' : 'translate-x-1'}
            `} />
          </button>
          {isPrivate && (
            <button
              onClick={onOpenWhitelist}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}