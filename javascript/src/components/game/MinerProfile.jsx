import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { ChevronRight, Brain } from 'lucide-react';



export function MinerProfile({ onLevelClick }) {
  const { theme } = useTheme();
  const [ripples, setRipples] = useState([]);
  const [taps, setTaps] = useState(0);
  const [coins, setCoins] = useState(131532314);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Increment taps and coins
    setTaps(prev => prev + 1);
    setCoins(prev => prev + 19); // 19 coins per tap

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className={`
      p-6 rounded-2xl mb-4
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
    `}>
      <div className="flex justify-center mb-4">
        <div 
          className="relative w-32 h-32 cursor-pointer transform transition-transform active:scale-95"
          onClick={handleClick}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Brain className="w-16 h-16 text-blue-500" />
          </div>
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-blue-500/30 animate-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: '10px',
                height: '10px',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          {coins.toLocaleString()}
        </div>
        <div className="text-sm text-slate-500">Neural Tokens</div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Neural Master</span>
          <button
            onClick={onLevelClick}
            className="p-1 rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-slate-500">Rank 6/9</div>
      </div>

      <div className="h-2 rounded-full overflow-hidden bg-slate-200/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          style={{ width: '65%' }}
        />
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-500">
        Taps: {taps}
      </div>
    </div>
  );
}