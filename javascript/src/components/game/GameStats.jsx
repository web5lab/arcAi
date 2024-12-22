import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Zap, Brain, Cpu } from 'lucide-react';



function StatCard({ title, value, icon, color }) {
  const { theme } = useTheme();
  
  return (
    <div className={`
      flex-1 p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
      hover:border-${color}-500/50 transition-colors
    `}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-slate-500">{title}</span>
      </div>
      <div className={`font-bold text-xl text-${color}-500`}>{value}</div>
    </div>
  );
}

export function GameStats() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <StatCard
        title="Earn Per Tap"
        value="+19"
        icon={<Zap className="w-4 h-4 text-blue-500" />}
        color="blue"
      />
      <StatCard
        title="For Level Up"
        value="+250m"
        icon={<Brain className="w-4 h-4 text-purple-500" />}
        color="purple"
      />
      <StatCard
        title="Mining per hour"
        value="+1.03m"
        icon={<Cpu className="w-4 h-4 text-cyan-500" />}
        color="cyan"
      />
    </div>
  );
}