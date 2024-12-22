import React, { useState } from 'react';
import { Coins, Users, Rocket, Wallet, Lock, Sparkles, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';


export function TokenomicsSection() {
  const { theme } = useTheme();
  const [activeAllocation, setActiveAllocation] = useState(1);

  const allocations = [
    {
      id: 1,
      name: "Community Rewards",
      percentage: 35,
      description: "Distributed through gaming rewards, staking incentives, and community initiatives.",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      name: "Development",
      percentage: 20,
      description: "Reserved for ongoing platform development, technical improvements, and new features.",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-400"
    },
    {
      id: 3,
      name: "Liquidity Pool",
      percentage: 15,
      description: "Locked in DEX liquidity pools to ensure stable trading and price discovery.",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-400"
    },
    {
      id: 4,
      name: "Team & Advisors",
      percentage: 15,
      description: "Vested over 24 months with a 6-month cliff period.",
      icon: <Lock className="w-6 h-6" />,
      color: "from-pink-500 to-purple-400"
    },
    {
      id: 5,
      name: "Marketing",
      percentage: 15,
      description: "Allocated for marketing campaigns, partnerships, and ecosystem growth.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-rose-500 to-pink-400"
    }
  ];

  const totalSupply = "1,000,000,000 ARC";

  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 px-4 py-2 rounded-full mb-4">
          <Coins className="w-5 h-5 text-blue-500" />
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
            Tokenomics
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          ARC Token Distribution
        </h2>
        <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Total Supply: {totalSupply}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allocations.map((allocation) => (
            <button
              key={allocation.id}
              onClick={() => setActiveAllocation(allocation.id)}
              className={`
                group relative overflow-hidden p-6 rounded-2xl transition-all duration-300
                ${theme === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-white/50'}
                ${activeAllocation === allocation.id ? (
                  theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
                ) : ''}
                backdrop-blur-sm border border-transparent hover:border-blue-500/20
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br ${allocation.color} opacity-5" />
              <div className="relative flex flex-col items-center text-center">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                  bg-gradient-to-br ${allocation.color}
                  ${theme === 'dark' ? 'opacity-90' : 'opacity-80'}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {allocation.icon}
                </div>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <h3 className="text-lg font-semibold">{allocation.name}</h3>
                  <ChevronRight className={`w-4 h-4 ${activeAllocation === allocation.id ? 'text-blue-500' : ''}`} />
                </div>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 mb-3">
                  {allocation.percentage}%
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {allocation.description}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className={`inline-block px-6 py-3 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Smart contract audited by CertiK • Vesting schedules enforced on-chain • LP tokens locked for 2 years
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}