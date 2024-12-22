import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { Lock, Users } from 'lucide-react';

interface OrderSettingsProps {
  isPrivate: boolean;
  allowPartialFill: boolean;
  onPrivateChange: (value: boolean) => void;
  onPartialFillChange: (value: boolean) => void;
  themeColor: string;
}

export function OrderSettings({
  isPrivate,
  allowPartialFill,
  onPrivateChange,
  onPartialFillChange,
  themeColor
}: OrderSettingsProps) {
  const { theme } = useTheme();

  return (
    <div className={`
      p-4 rounded-xl space-y-4
      ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className={`w-4 h-4 text-${themeColor}-500`} />
          <span className="text-sm">Allow Partial Fill</span>
        </div>
        <button
          onClick={() => onPartialFillChange(!allowPartialFill)}
          className={`
            w-11 h-6 rounded-full transition-colors relative
            ${allowPartialFill ? `bg-${themeColor}-500` : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
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
          <Lock className={`w-4 h-4 text-${themeColor}-500`} />
          <span className="text-sm">Private Order</span>
        </div>
        <button
          onClick={() => onPrivateChange(!isPrivate)}
          className={`
            w-11 h-6 rounded-full transition-colors relative
            ${isPrivate ? `bg-${themeColor}-500` : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}
          `}
        >
          <div className={`
            w-4 h-4 rounded-full bg-white absolute top-1
            transition-transform duration-200
            ${isPrivate ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </button>
      </div>
    </div>
  );
}