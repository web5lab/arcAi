import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Brain, Star, Trophy, Zap, Gift, ChevronRight } from 'lucide-react';
import { LevelUpSection } from './LevelUpSection';



export function LevelUpDrawer({ isOpen, onClose }) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6 transform transition-transform duration-300
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Level Progress</h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-lg
              ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
              transition-colors
            `}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <LevelUpSection />
      </div>
    </div>
  );
}