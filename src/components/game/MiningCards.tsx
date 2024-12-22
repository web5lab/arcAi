import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Cpu, Zap, Brain, ChevronRight, Lock } from 'lucide-react';

interface MiningCard {
  id: number;
  name: string;
  level: number;
  maxLevel: number;
  baseRate: number;
  currentRate: number;
  upgradeCost: number;
  icon: React.ReactNode;
  color: string;
  isLocked?: boolean;
  unlockRequirement?: string;
}

const miningCards: MiningCard[] = [
  {
    id: 1,
    name: 'Neural Processor',
    level: 3,
    maxLevel: 10,
    baseRate: 100,
    currentRate: 450,
    upgradeCost: 5000,
    icon: <Cpu className="w-6 h-6" />,
    color: 'blue'
  },
  {
    id: 2,
    name: 'Quantum Miner',
    level: 2,
    maxLevel: 8,
    baseRate: 250,
    currentRate: 750,
    upgradeCost: 12000,
    icon: <Brain className="w-6 h-6" />,
    color: 'purple'
  },
  {
    id: 3,
    name: 'AI Accelerator',
    level: 1,
    maxLevel: 6,
    baseRate: 500,
    currentRate: 1000,
    upgradeCost: 25000,
    icon: <Zap className="w-6 h-6" />,
    color: 'cyan'
  },
  {
    id: 4,
    name: 'Deep Learning Core',
    level: 0,
    maxLevel: 5,
    baseRate: 1000,
    currentRate: 0,
    upgradeCost: 50000,
    icon: <Brain className="w-6 h-6" />,
    color: 'indigo',
    isLocked: true,
    unlockRequirement: 'Complete Neural Master Training'
  },
  {
    id: 5,
    name: 'Quantum Entangler',
    level: 0,
    maxLevel: 4,
    baseRate: 2500,
    currentRate: 0,
    upgradeCost: 100000,
    icon: <Cpu className="w-6 h-6" />,
    color: 'pink',
    isLocked: true,
    unlockRequirement: 'Reach Level 15'
  },
  {
    id: 6,
    name: 'Quantum Network',
    level: 0,
    maxLevel: 3,
    baseRate: 5000,
    currentRate: 0,
    upgradeCost: 250000,
    icon: <Zap className="w-6 h-6" />,
    color: 'rose',
    isLocked: true,
    unlockRequirement: 'Own 3 Maxed Cards'
  },
  {
    id: 7,
    name: 'Neural Singularity',
    level: 0,
    maxLevel: 1,
    baseRate: 10000,
    currentRate: 0,
    upgradeCost: 1000000,
    icon: <Lock className="w-6 h-6" />,
    color: 'amber',
    isLocked: true,
    unlockRequirement: 'Complete All Achievements'
  }
];

function MiningCardItem({ card }: { card: MiningCard }) {
  const { theme } = useTheme();
  
  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm border
      ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'}
      ${card.isLocked ? 'opacity-75' : ''}
    `}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-${card.color}-500/10
        `}>
          <div className={`text-${card.color}-500`}>{card.icon}</div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">{card.name}</div>
            {!card.isLocked && (
              <div className={`text-${card.color}-500 text-sm`}>
                Lv. {card.level}/{card.maxLevel}
              </div>
            )}
          </div>
          
          {card.isLocked ? (
            <div className="text-sm text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              {card.unlockRequirement}
            </div>
          ) : (
            <div className="text-sm text-slate-500">
              +{card.currentRate.toLocaleString()} tokens/hour
            </div>
          )}
        </div>
      </div>

      {!card.isLocked && (
        <>
          <div className="h-2 rounded-full overflow-hidden bg-slate-200/20 mb-4">
            <div
              className={`h-full bg-${card.color}-500`}
              style={{ width: `${(card.level / card.maxLevel) * 100}%` }}
            />
          </div>

          <button className={`
            w-full py-2 rounded-lg flex items-center justify-center gap-2
            ${theme === 'dark' ? `bg-${card.color}-500/10` : `bg-${card.color}-100`}
            ${theme === 'dark' ? `text-${card.color}-400` : `text-${card.color}-600`}
            hover:opacity-80 transition-opacity
          `}>
            <span>Upgrade • {card.upgradeCost.toLocaleString()}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

export function MiningCards() {
  const { theme } = useTheme();
  const totalRate = miningCards
    .filter(card => !card.isLocked)
    .reduce((sum, card) => sum + card.currentRate, 0);

  return (
    <div className="space-y-6">
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-500">Total Mining Rate</div>
          <div className="flex items-center gap-1 text-blue-500">
            <Cpu className="w-4 h-4" />
            <span>{totalRate.toLocaleString()}/hour</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {miningCards.map(card => (
          <MiningCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}