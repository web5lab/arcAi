import React, { useState } from 'react';
import { Rocket, Zap, Users, Globe, Cpu } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface RoadmapPhase {
  id: number;
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
}

export function RoadmapSection() {
  const { theme } = useTheme();
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases: RoadmapPhase[] = [
    {
      id: 1,
      phase: "Q1 2024",
      title: "Platform Launch",
      description: "Initial release of token creation tools and P2P exchange functionality with basic AI integration.",
      icon: <Rocket className="w-6 h-6" />,
      isCompleted: true
    },
    {
      id: 2,
      phase: "Q2 2024",
      title: "Gaming Integration",
      description: "Launch of Telegram-based AI gaming platform with token rewards and training mechanics.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 3,
      phase: "Q3 2024",
      title: "Community Expansion",
      description: "Introduction of governance features and enhanced community-driven development initiatives.",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 4,
      phase: "Q4 2024",
      title: "Cross-Chain Integration",
      description: "Expansion to multiple blockchain networks and implementation of cross-chain token bridges.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 5,
      phase: "Q1 2025",
      title: "Advanced AI Features",
      description: "Enhanced AI capabilities for trading predictions and automated portfolio management.",
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Development Roadmap</h2>
        <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Our journey to revolutionize the crypto ecosystem
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Hexagon Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`group relative h-32 transition-all duration-300 ${
                activePhase === phase.id ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <div className={`
                absolute inset-0 hexagon ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                ${activePhase === phase.id ? 'border-2 border-blue-500' : 'border border-blue-500/20'}
                backdrop-blur-sm transition-all duration-300
                ${phase.isCompleted ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' : ''}
              `} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2
                  ${activePhase === phase.id ? 'bg-blue-500 text-white' : `${theme === 'dark' ? 'bg-slate-700 text-blue-400' : 'bg-blue-100 text-blue-500'}`}
                  transition-all duration-300
                `}>
                  {phase.icon}
                </div>
                <div className="text-sm font-medium text-blue-500">{phase.phase}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase Details */}
        <div className={`
          ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'}
          backdrop-blur-sm rounded-2xl p-8 transition-all duration-500
          border border-blue-500/20
        `}>
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`transition-all duration-500 ${
                activePhase === phase.id ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                {phase.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-lg`}>
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}