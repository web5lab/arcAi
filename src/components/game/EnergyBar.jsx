import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Cpu, Zap } from 'lucide-react';
import { AmplifyDrawer } from './AmplifyDrawer';

export function EnergyBar() {
  const { theme } = useTheme();
  const [showAmplify, setShowAmplify] = useState(false);

  return (
    <>
    <div className={`
      p-4 rounded-xl mb-4 flex items-center justify-between
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
    `}>
      <div className="flex items-center gap-2">
        <Cpu className="w-5 h-5 text-purple-500" />
        <div className="font-bold">Neural Energy: 4000 / 4000</div>
      </div>
      
      <button className={`
        px-4 py-2 rounded-xl flex items-center gap-2
        ${theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}
        hover:opacity-80 transition-opacity
      `}
        onClick={() => setShowAmplify(true)}
      >
        <Zap className="w-4 h-4" />
        <span>Amplify</span>
      </button>
    </div>
    <AmplifyDrawer isOpen={showAmplify} onClose={() => setShowAmplify(false)} />
    </>
  );
}