import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Brain, Star, Trophy, Zap, Gift, ChevronRight, Lock } from 'lucide-react';



const currentLevel = 42;
const targetLevel = 43;
const currentXP = 7800;
const requiredXP = 10000;

const levelRewards = [
  {
    id: 1,
    name: 'Neural Boost',
    description: 'Mining speed increased by 5%',
    icon: <Zap className="w-5 h-5" />,
    color: 'purple',
    tokens: 5000
  },
  {
    id: 2,
    name: 'Card Slot',
    description: 'Unlock new mining card slot',
    icon: <Star className="w-5 h-5" />,
    color: 'yellow',
    tokens: 10000
  },
  {
    id: 3,
    name: 'Energy Boost',
    description: '+500 max Neural Energy',
    icon: <Brain className="w-5 h-5" />,
    color: 'blue',
    tokens: 7500
  }
];

export function LevelUpSection() {
  const { theme } = useTheme();
  const progress = (currentXP / requiredXP) * 100;

  return (
    <div className="space-y-6">
      {/* Current Level Card */}
      <div className={`
        p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">Level {currentLevel}</div>
              <div className="text-sm text-slate-500">Neural Master</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Next Level</div>
            <div className="font-bold text-blue-500">{targetLevel}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Progress</span>
            <span>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP</span>
          </div>
          <div className="h-3 rounded-full bg-slate-200/20 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Level Rewards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Level {targetLevel} Rewards</h3>
          <div className="flex items-center gap-1 text-sm text-blue-500">
            <Gift className="w-4 h-4" />
            <span>{levelRewards.reduce((sum, reward) => sum + reward.tokens, 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3">
          {levelRewards.map((reward) => (
            <div
              key={reward.id}
              className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
                backdrop-blur-sm
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-${reward.color}-500/10
                `}>
                  <div className={`text-${reward.color}-500`}>{reward.icon}</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{reward.name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Brain className="w-4 h-4 text-blue-500" />
                      <span>+{reward.tokens.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{reward.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className={`
          p-4 rounded-xl flex items-center justify-center gap-2
          ${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-600'}
          font-medium
        `}>
          <Brain className="w-5 h-5" />
          Train AI
        </button>
        <button className={`
          p-4 rounded-xl flex items-center justify-center gap-2
          ${theme === 'dark' ? 'bg-purple-500/10 text-purple-500' : 'bg-purple-100 text-purple-600'}
          font-medium
        `}>
          <Star className="w-5 h-5" />
          View Ranks
        </button>
      </div>
    </div>
  );
}