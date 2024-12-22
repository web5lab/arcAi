import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Brain, Trophy, Star, Clock, Bot, Copy, ArrowLeft } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText('Neural Master #1234');
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl
      `}>
        <div className="sticky top-0 p-6 border-b ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-t-3xl">
          <div className="flex items-center gap-3 justify-between">
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="w-7" /> {/* Spacer for alignment */}
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(85vh-5rem)] overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border-2 border-blue-500">
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Neural Master #1234</h3>
                <button
                  onClick={handleCopyId}
                  className={`p-1 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="text-sm text-slate-500">Joined 2 months ago</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-slate-500">Level</span>
              </div>
              <div className="text-2xl font-bold">42</div>
            </div>
            <div className={`
              p-4 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-slate-500">Rank</span>
              </div>
              <div className="text-2xl font-bold">6/9</div>
            </div>
          </div>

          {/* Mining Stats */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            backdrop-blur-sm
          `}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">Mining Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Mined</span>
                <span className="font-medium">131,532,314</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mining Rate</span>
                <span className="font-medium">+1.03M/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Cards</span>
                <span className="font-medium">3/7</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
            backdrop-blur-sm
          `}>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Completed Daily Tasks</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Upgraded Mining Card</span>
                <span>5 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Claimed Mining Rewards</span>
                <span>1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}