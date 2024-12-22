import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Trophy, Brain, Star, Crown, Shield, Target, Zap, Diamond, Award, Rocket } from 'lucide-react';

interface Rank {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  requiredLevel: number;
  miningBonus: number;
  dailyReward: number;
  maxMiningCards: number;
  specialPerks: string[];
}

const ranks: Rank[] = [
  {
    id: 1,
    name: 'Neural Initiate',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-slate-400 to-slate-600',
    requiredLevel: 1,
    miningBonus: 0,
    dailyReward: 1000,
    maxMiningCards: 2,
    specialPerks: ['Basic mining capabilities', 'Daily rewards access']
  },
  {
    id: 2,
    name: 'Neural Apprentice',
    icon: <Star className="w-6 h-6" />,
    color: 'from-green-400 to-green-600',
    requiredLevel: 10,
    miningBonus: 5,
    dailyReward: 2000,
    maxMiningCards: 3,
    specialPerks: ['5% Mining speed bonus', 'Access to achievement rewards']
  },
  {
    id: 3,
    name: 'Neural Adept',
    icon: <Target className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
    requiredLevel: 25,
    miningBonus: 10,
    dailyReward: 3500,
    maxMiningCards: 4,
    specialPerks: ['10% Mining speed bonus', 'Unlock special daily tasks']
  },
  {
    id: 4,
    name: 'Neural Expert',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600',
    requiredLevel: 50,
    miningBonus: 15,
    dailyReward: 5000,
    maxMiningCards: 5,
    specialPerks: ['15% Mining speed bonus', 'Access to expert mining cards']
  },
  {
    id: 5,
    name: 'Neural Master',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-400 to-yellow-600',
    requiredLevel: 75,
    miningBonus: 25,
    dailyReward: 7500,
    maxMiningCards: 6,
    specialPerks: ['25% Mining speed bonus', 'Unlock master daily rewards']
  },
  {
    id: 6,
    name: 'Neural Sage',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-orange-400 to-orange-600',
    requiredLevel: 100,
    miningBonus: 35,
    dailyReward: 10000,
    maxMiningCards: 7,
    specialPerks: ['35% Mining speed bonus', 'Access to sage-only events']
  },
  {
    id: 7,
    name: 'Neural Elite',
    icon: <Diamond className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
    requiredLevel: 150,
    miningBonus: 50,
    dailyReward: 15000,
    maxMiningCards: 8,
    specialPerks: ['50% Mining speed bonus', 'Elite mining card slots']
  },
  {
    id: 8,
    name: 'Neural Legend',
    icon: <Award className="w-6 h-6" />,
    color: 'from-red-400 to-red-600',
    requiredLevel: 200,
    miningBonus: 75,
    dailyReward: 25000,
    maxMiningCards: 9,
    specialPerks: ['75% Mining speed bonus', 'Legendary rewards multiplier']
  },
  {
    id: 9,
    name: 'Neural Transcendent',
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-indigo-400 to-indigo-600',
    requiredLevel: 300,
    miningBonus: 100,
    dailyReward: 50000,
    maxMiningCards: 10,
    specialPerks: ['100% Mining speed bonus', 'Exclusive transcendent perks']
  }
];

export function RankDetails({ currentRank = 6 }: { currentRank?: number }) {
  const { theme } = useTheme();

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Current Rank Card */}
      <div className={`
        p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center
            bg-gradient-to-br ${ranks[currentRank - 1].color}
          `}>
            {ranks[currentRank - 1].icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{ranks[currentRank - 1].name}</h2>
            <div className="flex items-center gap-2 text-slate-500">
              <Trophy className="w-4 h-4" />
              <span>Rank {currentRank}/9</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
            <div className="text-sm text-slate-500 mb-1">Mining Bonus</div>
            <div className="text-2xl font-bold text-green-500">
              +{ranks[currentRank - 1].miningBonus}%
            </div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
            <div className="text-sm text-slate-500 mb-1">Daily Reward</div>
            <div className="text-2xl font-bold text-blue-500">
              {ranks[currentRank - 1].dailyReward.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ranks[currentRank - 1].specialPerks.map((perk, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress to Next Rank */}
      {currentRank < 9 && (
        <div className={`
          p-4 rounded-xl
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-500">Next Rank</div>
            <div className="text-sm font-medium">{ranks[currentRank].name}</div>
          </div>
          <div className="h-2 rounded-full bg-slate-200/20 mb-2">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: '45%' }}
            />
          </div>
          <div className="text-xs text-slate-500">
            Required Level: {ranks[currentRank].requiredLevel}
          </div>
        </div>
      )}

      {/* All Ranks */}
      <div className="grid gap-4">
        {ranks.map((rank) => (
          <div
            key={rank.id}
            className={`
              flex items-center gap-4 p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
              ${rank.id === currentRank ? 'ring-2 ring-blue-500' : ''}
              ${rank.id > currentRank ? 'opacity-50' : ''}
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${rank.color}
            `}>
              {rank.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-medium">{rank.name}</div>
                <div className="text-xs text-slate-500">Level {rank.requiredLevel}+</div>
              </div>
              <div className="text-sm text-slate-500">
                {rank.miningBonus}% Mining Bonus
              </div>
            </div>

            {rank.id === currentRank && (
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}