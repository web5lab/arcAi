import React from 'react';
import { useTheme } from '../../ThemeProvider';

interface OrderTypeSelectorProps {
  orderType: 'buy' | 'sell';
  onOrderTypeChange: (type: 'buy' | 'sell') => void;
  themeColor: string;
  radius: number;
}

export function OrderTypeSelector({ orderType, onOrderTypeChange, themeColor, radius }: OrderTypeSelectorProps) {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-2">
      {(['buy', 'sell'] as const).map((type) => (
        <button
          key={type}
          onClick={() => onOrderTypeChange(type)}
          className={`
            py-2.5 rounded-xl font-medium capitalize
            ${orderType === type
              ? type === 'buy'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : theme === 'dark'
              ? 'bg-slate-800 text-slate-300'
              : 'bg-slate-100 text-slate-700'
            }
          `}
          style={{ borderRadius: radius }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}