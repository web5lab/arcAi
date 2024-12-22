import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Zap, Brain, Clock, Sparkles, Lock } from 'lucide-react';



const amplifyOptions = [
  {
    id: 1,
    duration: 1,
    multiplier: 2,
    cost: 5000
  },
  {
    id: 2,
    duration: 4,
    multiplier: 3,
    cost: 15000
  },
  {
    id: 3,
    duration: 8,
    multiplier: 4,
    cost: 25000
  },
  {
    id: 4,
    duration: 24,
    multiplier: 5,
    cost: 50000,
    isLocked: true,
    requiredRank: 5
  }
];

export function AmplifySection() {
  const { theme } = useTheme();
  const [activeBoost, setActiveBoost] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  const formatDuration = (hours) => {
    return hours === 1 ? '1 hour' : `${hours} hours`;
  };

  const handleAmplify = (option) => {
    if (option.isLocked) return;
    setActiveBoost(option.id);
    setTimeLeft(formatDuration(option.duration));
  };

  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm
    `}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-medium">Neural Amplifier</h3>
            <p className="text-sm text-slate-500">Boost your mining power</p>
          </div>
        </div>

        {activeBoost && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{timeLeft} left</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {amplifyOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAmplify(option)}
            disabled={option.isLocked || activeBoost !== null}
            className={`
              p-4 rounded-xl text-left relative
              ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'}
              ${option.isLocked ? 'opacity-50' : 'hover:border-purple-500/50'}
              ${activeBoost === option.id ? 'ring-2 ring-purple-500' : ''}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              transition-all duration-200
            `}
          >
            {option.isLocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-slate-500" />
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={`w-5 h-5 ${option.isLocked ? 'text-slate-500' : 'text-purple-500'}`} />
              <span className="font-medium">{option.multiplier}x Boost</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">Duration</div>
              <div className="text-sm">{formatDuration(option.duration)}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Cost</div>
              <div className="flex items-center gap-1 text-sm">
                <Brain className="w-4 h-4 text-blue-500" />
                <span>{option.cost.toLocaleString()}</span>
              </div>
            </div>

            {option.isLocked && (
              <div className="mt-2 text-xs text-slate-500">
                Unlocks at Rank {option.requiredRank}
              </div>
            )}
          </button>
        ))}
      </div>

      {activeBoost && (
        <div className={`
          mt-4 p-3 rounded-lg text-sm
          ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-50'}
          text-purple-500 flex items-center justify-center gap-2
        `}>
          <Zap className="w-4 h-4" />
          Mining power amplified!
        </div>
      )}
    </div>
  );
}