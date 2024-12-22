import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Gift, Star, Users, Brain, Copy, ExternalLink } from 'lucide-react';

interface InviteReward {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  reward: number;
  isSpecial?: boolean;
}

const inviteRewards: InviteReward[] = [
  {
    id: 1,
    title: 'First Friend Bonus',
    description: 'Invite your first friend',
    icon: <Gift className="w-5 h-5" />,
    reward: 5000
  },
  {
    id: 2,
    title: 'Active Miner',
    description: 'Friend reaches Level 10',
    icon: <Star className="w-5 h-5" />,
    reward: 10000
  },
  {
    id: 3,
    title: 'Network Growth',
    description: 'Invite 5 friends',
    icon: <Users className="w-5 h-5" />,
    reward: 25000,
    isSpecial: true
  }
];

export function InviteDetails() {
  const { theme } = useTheme();
  const inviteCode = 'NEURAL2024';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent('Join me on Neural Miner! Use my invite code NEURAL2024 to get bonus rewards 🎮✨');
    window.open(`https://t.me/share/url?url=https://neuralminer.app&text=${text}`);
  };

  return (
    <div className="space-y-6">
      {/* Invite Code Section */}
      <div className={`
        p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'}
        backdrop-blur-sm
      `}>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10">
            <Gift className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500 font-medium">Invite & Earn</span>
          </div>
          
          <div>
            <div className="text-2xl font-bold mb-1">{inviteCode}</div>
            <div className="text-sm text-slate-500">Your Invite Code</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopyCode}
              className={`
                p-3 rounded-xl flex items-center justify-center gap-2 font-medium
                ${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-600'}
                hover:opacity-80 transition-opacity
              `}
            >
              <Copy className="w-5 h-5" />
              Copy Code
            </button>
            
            <button
              onClick={handleShareTelegram}
              className={`
                p-3 rounded-xl flex items-center justify-center gap-2 font-medium
                ${theme === 'dark' ? 'bg-purple-500/10 text-purple-500' : 'bg-purple-100 text-purple-600'}
                hover:opacity-80 transition-opacity
              `}
            >
              <ExternalLink className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        <h3 className="font-medium">Invite Rewards</h3>
        {inviteRewards.map((reward) => (
          <div
            key={reward.id}
            className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
              ${reward.isSpecial ? 'ring-2 ring-blue-500/50' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${reward.isSpecial ? 'bg-blue-500/10' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}
              `}>
                <div className={reward.isSpecial ? 'text-blue-500' : 'text-slate-500'}>
                  {reward.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{reward.title}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span>+{reward.reward.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500">{reward.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <h3 className="font-medium mb-3">How It Works</h3>
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            <span>Share your invite code with friends</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            <span>Friends enter your code during signup</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            <span>Both you and your friend receive rewards</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            <span>Earn additional rewards as your friends progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}