import React from 'react';
import { useTheme } from './ThemeProvider';
import { ArrowRight, Coins, GamepadIcon,  Users,  } from 'lucide-react';

export function Hero() {
  const { theme } = useTheme();
  
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "P2P Trading",
      description: "Trade directly with other users without affecting market price"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Token Creation",
      description: "Launch your own tokens with our intuitive platform"
    },
    {
      icon: <GamepadIcon className="w-6 h-6" />,
      title: "GameFi",
      description: "Earn while you play in our gaming ecosystem"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Traders" },
    { value: "$50M+", label: "Daily Volume" },
    { value: "99.9%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block animate-bounce mb-6">
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium">
            New: P2P Trading Features
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Your All-in-One Crypto Platform
        </h1>
        
        <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-8 max-w-2xl mx-auto`}>
          Trade P2P, create tokens, and earn rewards through gaming - all powered by arcAi's intelligent ecosystem.
        </p>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                {stat.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

       

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/10 hover:bg-slate-800' 
                  : 'bg-slate-50/10 hover:bg-slate-100'
              } transition-colors cursor-pointer backdrop-blur-sm`}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                }`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;