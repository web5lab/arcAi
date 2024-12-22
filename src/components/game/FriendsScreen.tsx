import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Users, Star, Copy, Brain, Search, UserPlus, Trophy, ArrowUpRight, Gift, ChevronRight, Sparkles } from 'lucide-react';
import { RankDetails } from './RankDetails';
import { InviteDetails } from './InviteDetails';

interface Friend {
  id: string;
  name: string;
  level: number;
  bonus: number;
  coins: number;
  isOnline: boolean;
  lastActive?: string;
  avatar?: string;
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Dipanshu Kumar', level: 42, bonus: 15000, coins: 104930, isOnline: true },
  { id: '2', name: 'Vikash Raj', level: 28, bonus: 8000, coins: 52481, isOnline: true },
  { id: '3', name: 'Asghar Ghasemi', level: 65, bonus: 25000, coins: 248102, isOnline: false, lastActive: '2h ago' },
  { id: '4', name: 'Venkatesh', level: 15, bonus: 5000, coins: 24892, isOnline: false, lastActive: '1d ago' }
];

function LeaderboardEntry({ position, friend }: { position: number; friend: Friend }) {
  const { theme } = useTheme();
  
  return (
    <div className={`
      flex items-center gap-4 p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm
    `}>
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center font-bold
        ${position === 1 ? 'bg-yellow-500/20 text-yellow-500' :
          position === 2 ? 'bg-slate-400/20 text-slate-400' :
          position === 3 ? 'bg-amber-500/20 text-amber-500' :
          'bg-slate-500/20 text-slate-500'}
      `}>
        {position}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{friend.name}</span>
        </div>
        <div className="text-sm text-slate-500">Level {friend.level}</div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center justify-end gap-1 font-medium">
          <Brain className="w-4 h-4 text-blue-500" />
          <span>{friend.coins.toLocaleString()}</span>
        </div>
        <div className="text-xs text-slate-500">Total Mined</div>
      </div>
    </div>
  );
}

export function FriendsScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard' | 'ranks' | 'invite'>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyInvite = () => {
    navigator.clipboard.writeText('https://t.me/arcAiBot?start=ref_123456');
  };

  const filteredFriends = mockFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`
          p-4 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="text-2xl font-bold text-blue-500">{mockFriends.length}</div>
          <div className="text-sm text-slate-500">Friends</div>
        </div>
        <div className={`
          p-4 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="text-2xl font-bold text-purple-500">53k</div>
          <div className="text-sm text-slate-500">Global Rank</div>
        </div>
        <div className={`
          p-4 rounded-xl text-center
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="text-2xl font-bold text-green-500">+25%</div>
          <div className="text-sm text-slate-500">Bonus</div>
        </div>
      </div>

      {/* Invite Card */}
      {activeTab !== 'invite' && (
        <div className={`
          rounded-2xl overflow-hidden
          ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'}
          backdrop-blur-sm
        `}>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Gift className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">Invite Friends</div>
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-500">+5,000 Neural Tokens</span>
                  <span className="text-slate-500">for you & your friend</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('invite')}
              className={`
                w-full py-3 rounded-xl font-medium
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white flex items-center justify-center gap-2
                hover:opacity-90 transition-opacity
              `}
            >
              <UserPlus className="w-4 h-4" />
              Invite Friends
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {(['friends', 'leaderboard', 'ranks', 'invite'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-2.5 rounded-xl font-medium capitalize flex items-center justify-center gap-1
              ${activeTab === tab
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-slate-800 text-slate-300'
                : 'bg-white text-slate-700'
              }
            `}
          >
            {tab === 'invite' && <Sparkles className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          `}
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'ranks' ? (
          <RankDetails currentRank={6} />
        ) : activeTab === 'invite' ? (
          <InviteDetails />
        ) : activeTab === 'friends' ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className={`
                flex items-center gap-4 p-4 rounded-xl
                ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
                backdrop-blur-sm
              `}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border-2 border-blue-500">
                <Brain className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-medium truncate">{friend.name}</div>
                  {friend.isOnline ? (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  ) : (
                    <div className="text-xs text-slate-500">{friend.lastActive}</div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Level {friend.level}</span>
                </div>
              </div>

              <button className={`
                px-3 py-1.5 rounded-lg text-sm font-medium
                ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}
                flex items-center gap-1
              `}>
                <span>Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          // Leaderboard
          mockFriends
            .sort((a, b) => b.coins - a.coins)
            .map((friend, index) => (
              <LeaderboardEntry
                key={friend.id}
                position={index + 1}
                friend={friend}
              />
            ))
        )}
      </div>
    </div>
  );
}