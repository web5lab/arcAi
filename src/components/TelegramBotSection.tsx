import React from 'react';
import { useTheme } from './ThemeProvider';
import { MessageCircle, Bot, ArrowLeftRight, Rocket, Zap } from 'lucide-react';

interface BotFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: BotFeature[] = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Token Creation",
    description: "Create and launch tokens directly through Telegram commands with custom tokenomics and settings.",
    color: "blue"
  },
  {
    icon: <ArrowLeftRight className="w-6 h-6" />,
    title: "P2P Trading",
    description: "Trade tokens securely with other users through our escrow-protected P2P marketplace.",
    color: "green"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Gaming",
    description: "Play games, earn rewards, and trade tokens - all within your Telegram chat.",
    color: "purple"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Twitter Raids",
    description: "Coordinate and participate in Twitter raids directly through Telegram commands.",
    color: "orange"
  }
];

export function TelegramBotSection() {
  const { theme } = useTheme();
  
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 px-4 py-2 rounded-full mb-4">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
            Telegram Bot
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Trade & Earn Through Telegram
        </h2>
        <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Access all platform features directly through our Telegram bot - no website needed
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
            <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-400/20 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-4
                bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-400/20
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

      <div className="mt-12 text-center">
        <a
          href="https://t.me/arcAiBot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          Start Trading on Telegram
        </a>
      </div>
    </div>
  );
}