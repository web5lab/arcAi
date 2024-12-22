import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Brain, Twitter, MessageCircle, Gift, Star, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AmplifySection } from './AmplifySection';



const tasks = [
  {
    id: '1',
    title: 'Daily Login',
    description: 'Log in to the game',
    reward: 1000,
    icon: <Gift className="w-5 h-5" />,
    status: 'completed',
    type: 'daily',
    expiresIn: '23h 45m'
  },
  {
    id: '2',
    title: 'Follow on Twitter',
    description: 'Follow @arcAi on Twitter',
    reward: 5000,
    icon: <Twitter className="w-5 h-5" />,
    status: 'available',
    type: 'social'
  },
  {
    id: '3',
    title: 'Join Telegram',
    description: 'Join our Telegram community',
    reward: 5000,
    icon: <MessageCircle className="w-5 h-5" />,
    status: 'available',
    type: 'social'
  },
  {
    id: '4',
    title: 'Mining Master',
    description: 'Own 3 mining cards',
    reward: 10000,
    icon: <Star className="w-5 h-5" />,
    status: 'available',
    type: 'achievement',
    progress: {
      current: 2,
      total: 3
    }
  }
];

function TaskCard({ task }) {
  const { theme } = useTheme();
  
  return (
    <div className={`
      p-4 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm
      ${task.status === 'locked' ? 'opacity-50' : ''}
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${task.type === 'daily' ? 'bg-green-500/10' : 
            task.type === 'social' ? 'bg-blue-500/10' : 'bg-purple-500/10'}
        `}>
          <div className={`
            ${task.type === 'daily' ? 'text-green-500' : 
              task.type === 'social' ? 'text-blue-500' : 'text-purple-500'}
          `}>
            {task.icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium truncate">{task.title}</div>
            <div className="flex items-center gap-1 text-sm">
              <Brain className="w-4 h-4 text-blue-500" />
              <span>{task.reward.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="text-sm text-slate-500">{task.description}</div>
          
          {task.progress && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{task.progress.current}/{task.progress.total}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200/20">
                <div 
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {task.expiresIn && (
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{task.expiresIn}</span>
          </div>
        )}
        
        <button className={`
          px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
          ${task.status === 'completed' 
            ? `${theme === 'dark' ? 'bg-green-500/10 text-green-500' : 'bg-green-100 text-green-600'}`
            : task.status === 'available'
            ? `${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-600'}`
            : `${theme === 'dark' ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-600'}`
          }
          ${task.status === 'available' ? 'hover:opacity-80' : 'cursor-not-allowed'}
          transition-opacity
        `}>
          {task.status === 'completed' ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </>
          ) : task.status === 'available' ? (
            <span>Claim Reward</span>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              <span>Locked</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function TaskScreen() {
  const { theme } = useTheme();
  const totalRewards = tasks.reduce((sum, task) => sum + task.reward, 0);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-500">Total Available Rewards</div>
          <div className="flex items-center gap-1 text-blue-500">
            <Brain className="w-4 h-4" />
            <span>{totalRewards.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}