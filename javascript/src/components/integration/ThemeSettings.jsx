import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Palette, Moon, Sun } from 'lucide-react';



const THEME_COLORS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
];

export function ThemeSettings({
  primaryColor,
  onPrimaryColorChange,
  borderRadius,
  onBorderRadiusChange,
  transparentBg,
  onTransparentBgChange,
}) {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold">
        <Palette className="w-6 h-6" />
        Theme Settings
      </h3>

      {/* Color Selection */}
      <div>
        <label className="text-sm text-slate-500 mb-3 block">Primary Color</label>
        <div className="grid grid-cols-5 gap-3">
          {THEME_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => onPrimaryColorChange(color.value)}
              className={`
                w-full aspect-square rounded-xl relative
                ${color.class}
                transition-transform hover:scale-105
                ${primaryColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                ${theme === 'dark' ? 'ring-offset-slate-900' : 'ring-offset-white'}
              `}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="text-sm text-slate-500 mb-3 block">Border Radius</label>
        <input
          type="range"
          min="0"
          max="24"
          value={borderRadius}
          onChange={(e) => onBorderRadiusChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-slate-500 mt-1">
          <span>Square</span>
          <span>Rounded</span>
        </div>
      </div>

      {/* Background Options */}
      <div>
        <label className="text-sm text-slate-500 mb-3 block">Background</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onTransparentBgChange(false)}
            className={`
              flex-1 p-3 rounded-xl flex items-center justify-center gap-2
              ${!transparentBg
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-800'
                : 'bg-white border border-slate-200'
              }
            `}
          >
            <Moon className="w-4 h-4" />
            <span>Default</span>
          </button>
          <button
            onClick={() => onTransparentBgChange(true)}
            className={`
              flex-1 p-3 rounded-xl flex items-center justify-center gap-2
              ${transparentBg
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-800'
                : 'bg-white border border-slate-200'
              }
            `}
          >
            <Sun className="w-4 h-4" />
            <span>Transparent</span>
          </button>
        </div>
      </div>
    </div>
  );
}