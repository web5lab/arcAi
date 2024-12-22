import React from 'react';
import { MessageCircle, Bot, ArrowLeftRight, Share2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Token Creation via Telegram",
    description: "Create and launch tokens directly through Telegram commands. Set tokenomics, manage liquidity, and coordinate Twitter raids seamlessly.",
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Trading & Gaming",
    description: "Trade tokens through Telegram P2P marketplace, play AI-powered games, and earn rewards while competing on global leaderboards.",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <ArrowLeftRight className="w-6 h-6" />,
    title: "P2P Marketplace",
    description: "Create and trade tokens with escrow protection, instant settlement, and cross-platform support between Telegram and web interface.",
    color: "indigo",
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Cross-Platform",
    description: "Integrate our features into your website or Telegram bot. Create tokens, manage trades, and engage users across platforms.",
    color: "yellow",
    gradient: "from-yellow-500/20 to-orange-500/20"
  }
];

export function AboutSection() {
  const { theme } = useTheme();

  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 px-4 py-2 rounded-full mb-4">
          <Bot className="w-5 h-5 text-blue-500" />
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
            Features
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          All-in-One Platform
        </h2>
        <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Create tokens, engage communities, and trade assets across Telegram and web platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`
              group relative overflow-hidden p-6 rounded-2xl transition-all duration-300
              ${theme === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-white/50'}
              backdrop-blur-sm border border-transparent hover:border-blue-500/20
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-4
                bg-gradient-to-br ${feature.gradient}
                group-hover:scale-110 transition-transform duration-300
              `}>
                <div className={`text-${feature.color}-500`}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}