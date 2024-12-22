import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import {
  ArrowLeftRight,
  Shield,
  Bot,
  Code,
  ArrowRight,
  Wallet,
  Zap,
  Signal,
  Battery,
  Wifi,
  ChevronLeft,
  Bell,
  Star,
  Users,
  TrendingUp,
  Lock,
  ChevronRight
} from 'lucide-react';



const statistics = [
  { label: 'Total Volume', value: '$2.5M', icon: <TrendingUp className="w-4 h-4" />, color: 'blue' },
  { label: 'Active Users', value: '12.5K', icon: <Users className="w-4 h-4" />, color: 'green' },
  { label: 'Trades Today', value: '1,234', icon: <ArrowLeftRight className="w-4 h-4" />, color: 'purple' },
  { label: 'Tokens Listed', value: '156', icon: <Star className="w-4 h-4" />, color: 'orange' }
];

export function P2PFeaturesSection() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="mt-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 px-4 py-2 rounded-full mb-4">
          <ArrowLeftRight className="w-5 h-5 text-blue-500" />
          <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
            P2P Platform
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Trade Tokens Directly
        </h2>
        <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Secure peer-to-peer trading with smart contracts and instant Telegram alerts
        </p>
      </div>

      {/* Main Feature Card */}
      <div className={`
        max-w-5xl mx-auto rounded-3xl overflow-hidden
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm border-2 border-blue-500/20
      `}>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stats Row - Mobile Only */}
          <div className="lg:hidden px-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-xl
                    ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
                    backdrop-blur-sm border border-${stat.color}-500/20
                  `}
                >
                  <div className={`text-${stat.color}-500 mb-2`}>{stat.icon}</div>
                  <div className="font-bold">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column - Preview */}
          <div className="p-6 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
            <div className="relative w-full max-w-[280px] mx-auto">
              {/* Phone Frame */}
              <div className={`
                aspect-[9/19] rounded-[2.5rem] overflow-hidden
                ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}
                border-[14px] ${theme === 'dark' ? 'border-slate-800' : 'border-slate-300'}
                relative shadow-2xl
              `}>
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-3xl z-20" />
                
                {/* Status Bar */}
                <div className="h-12 relative">
                  <div className="absolute top-2 left-5 text-xs font-medium">9:41</div>
                  <div className="absolute top-2 right-5 flex items-center gap-1.5">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* App Content */}
                <div className="px-4">
                  {/* App Header */}
                  <div className="flex items-center justify-between py-2 mb-4">
                    <button className="flex items-center gap-1">
                      <ChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back</span>
                    </button>
                    <h1 className="font-semibold">P2P Market</h1>
                    <button>
                      <Bell className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex gap-2 mb-4">
                    {['Market', 'Orders', 'History'].map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(index)}
                        className={`
                          flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                          ${activeTab === index
                            ? 'bg-blue-500 text-white'
                            : theme === 'dark'
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-100 text-slate-700'
                          }
                        `}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Token Card */}
                  <div className={`
                    p-4 rounded-xl mb-4
                    ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                    shadow-lg
                  `}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-semibold">ARC Token</div>
                        <div className="text-sm text-green-500">+12.5% • $0.85</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium shadow-lg shadow-green-500/20">Buy</button>
                      <button className="py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/20">Sell</button>
                      <div className="col-span-2 mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>24h Vol: $156K</span>
                        <span>+12.5%</span>
                      </div>
                    </div>
                  </div>

                  {/* Order List */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`
                          p-4 rounded-xl
                          ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                          shadow-lg
                        `}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">Buy Order #{i}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-500">$0.85</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>1,000 ARC</span>
                          <span>≈ $850</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs">
                            <Lock className="w-3 h-3 inline-block mr-1" />
                            Escrow
                          </div>
                          <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs">
                            Verified
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom Navigation Hint */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <div className="w-32 h-1 rounded-full bg-slate-600" />
                  </div>
                </div>
              </div>

              {/* Preview Label */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Live Preview</span>
                </div>
                <a
                  href="/embed/p2p"
                  className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors text-sm"
                >
                  Try Demo
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="px-6 py-8 md:p-8 flex flex-col">
            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Smart Contract Security</h3>
                  <p className="text-sm text-slate-400">All trades protected by audited escrow contracts</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Embed Anywhere</h3>
                  <p className="text-sm text-slate-400">Add P2P trading to your site with one line of code</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Zero Slippage</h3>
                  <p className="text-sm text-slate-400">Trade at fixed prices with no slippage or price impact</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Instant Settlement</h3>
                  <p className="text-sm text-slate-400">Trades settle immediately with on-chain verification</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="/p2p"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity"
              >
                <ArrowLeftRight className="w-5 h-5" />
                Start Trading
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/integration"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium border border-blue-500/20 hover:bg-blue-500/10 transition-all"
              >
                <Code className="w-5 h-5" />
                Integration Guide
              </a>
            </div>
          </div>

          {/* Stats Row - Desktop Only */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-4 px-8 py-6 border-t border-slate-200/10">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-${stat.color}-500 mb-1`}>{stat.icon}</div>
                  <div className="font-bold">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}