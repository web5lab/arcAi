import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { KeyRound, Brain, Lock, Check, Gift, Timer, History } from 'lucide-react';



const recentRewards = [
  { code: 'NEURAL2024', tokens: 15000, claimed: true, timestamp: Date.now() - 3600000 },
  { code: 'LAUNCH100', tokens: 10000, claimed: true, timestamp: Date.now() - 86400000 },
  { code: 'WINTER50', tokens: 5000, claimed: true, timestamp: Date.now() - 172800000 },
];

export function SecretVault() {
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextReward, setNextReward] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setNextReward(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatTimestamp = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Mock validation - in production this would check against backend
    if (code.toLowerCase() === 'arcai2024') {
      setStatus('success');
      setMessage('Success! +10,000 Neural Tokens claimed');
      
      // Add to recent rewards
      recentRewards.unshift({
        code: code.toUpperCase(),
        tokens: 10000,
        claimed: true,
        timestamp: Date.now()
      });
    } else {
      setStatus('error');
      setMessage('Invalid code. Try again!');
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      setStatus('idle');
      setMessage('');
      setCode('');
    }, 3000);
  };

  return (
    <div className={`
      p-6 rounded-xl
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm
    `}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${isAnimating ? 'animate-pulse' : ''}
            bg-gradient-to-br from-purple-500/20 to-blue-500/20
          `}>
          <KeyRound className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-medium">Secret Vault</h3>
            <p className="text-sm text-slate-500">Enter daily code to claim rewards</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`
            p-2 rounded-lg
            ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
            transition-colors relative
          `}
        >
          <History className="w-5 h-5" />
          {recentRewards.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500" />
          )}
        </button>
      </div>

      {/* Next Reward Timer */}
      <div className={`
        mb-6 p-4 rounded-xl flex items-center justify-between
        ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
      `}>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-sm">Next Code Available</span>
        </div>
        <div className="font-medium">{formatTime(nextReward)}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter secret code"
            className={`
              w-full px-4 py-3 rounded-xl
              ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              ${status === 'error' ? 'border-red-500' : ''}
              ${status === 'success' ? 'border-green-500' : ''}
              focus:outline-none focus:ring-2 focus:ring-purple-500/50
              uppercase tracking-wider
            `}
          />
          {status !== 'idle' && (
            <div className={`
              absolute right-3 top-1/2 -translate-y-1/2
              ${status === 'success' ? 'text-green-500' : 'text-red-500'}
            `}>
              {status === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
          )}
        </div>

        {message && (
          <div className={`
            text-sm px-3 py-2 rounded-lg flex items-center gap-2
            ${status === 'success' 
              ? `${theme === 'dark' ? 'bg-green-500/10 text-green-500' : 'bg-green-100 text-green-600'}`
              : `${theme === 'dark' ? 'bg-red-500/10 text-red-500' : 'bg-red-100 text-red-600'}`
            }
          `}>
            {status === 'success' && <Brain className="w-4 h-4" />}
            {message}
          </div>
        )}

        <button
          type="submit"
          className={`
            w-full py-3 rounded-xl font-medium
            bg-gradient-to-r from-purple-500 to-blue-500 relative
            overflow-hidden
            text-white flex items-center justify-center gap-2
            hover:opacity-90 transition-opacity
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          <KeyRound className="w-4 h-4" />
          Claim Reward
          {isAnimating && (
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          )}
        </button>
      </form>

      {/* Recent Claims */}
      {showHistory && (
        <div className="mt-6 space-y-3">
          <div className="text-sm text-slate-500">Recent Claims</div>
          {recentRewards.map((reward, index) => (
            <div
              key={index}
              className={`
                p-3 rounded-lg flex items-center justify-between
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
              `}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="font-medium">{reward.code}</div>
                  <div className="text-xs text-slate-500">
                    {formatTimestamp(reward.timestamp)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Brain className="w-4 h-4 text-blue-500" />
                <span>+{reward.tokens.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}