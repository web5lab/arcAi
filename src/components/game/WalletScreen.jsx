import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Brain, ArrowUpRight, ArrowDownLeft, Copy, QrCode, History, Send, ChevronRight, Search, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { ReceiveDrawer } from './ReceiveDrawer';



const mockTransactions= [
  {
    id: '1',
    type: 'receive',
    amount: 5000,
    address: 'Neural Master #1234',
    timestamp: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'send',
    amount: 2500,
    address: 'Neural Sage #5678',
    timestamp: '5 hours ago',
    status: 'completed'
  },
  {
    id: '3',
    type: 'receive',
    amount: 10000,
    address: 'Daily Reward',
    timestamp: '1 day ago',
    status: 'completed'
  }
];

function TransferModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleTransfer = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate transfer
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setAmount('');
          setRecipient('');
        }, 1500);
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute bottom-0 left-0 right-0 max-w-md mx-auto
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        rounded-t-3xl p-6
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Transfer Tokens</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Recipient ID</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter Neural ID or address"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className={`
                  w-full px-4 py-3 rounded-xl
                  ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
                  border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-500" />
                <button
                  type="button"
                  className="text-sm text-blue-500"
                  onClick={() => setAmount('1000')}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Transfer failed. Please try again.
            </div>
          )}

          {status === 'success' && (
            <div className="p-3 rounded-lg bg-green-500/10 text-green-500 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Transfer successful!
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`
              w-full py-3 rounded-xl font-medium
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white flex items-center justify-center gap-2
              hover:opacity-90 transition-opacity
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Tokens
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function TransactionItem({ transaction } ) {
  const { theme } = useTheme();
  const Icon = transaction.type === 'receive' ? ArrowDownLeft : ArrowUpRight;
  
  return (
    <div className={`
      p-4 rounded-xl flex items-center gap-4
      ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
      backdrop-blur-sm
    `}>
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center
        ${transaction.type === 'receive' ? 'bg-green-500/10' : 'bg-red-500/10'}
      `}>
        <Icon className={`
          w-5 h-5
          ${transaction.type === 'receive' ? 'text-green-500' : 'text-red-500'}
        `} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium truncate">{transaction.address}</span>
          <span className="text-sm text-slate-500">{transaction.timestamp}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`
            px-2 py-0.5 rounded-full text-xs
            ${transaction.status === 'completed' ? 'bg-green-500/10 text-green-500' :
              transaction.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-red-500/10 text-red-500'}
          `}>
            {transaction.status}
          </div>
        </div>
      </div>
      
      <div className={`
        text-right
        ${transaction.type === 'receive' ? 'text-green-500' : 'text-red-500'}
      `}>
        <div className="font-medium">
          {transaction.type === 'receive' ? '+' : '-'}{transaction.amount}
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Brain className="w-3 h-3" />
          <span>Neural</span>
        </div>
      </div>
    </div>
  );
}



export function WalletScreen({ mode = 'game' }) {
  const { theme } = useTheme();
  const [showTransfer, setShowTransfer] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const gameBalance = 131532314;
  const dexBalance = 25000;

  const gameTransactions = [
    {
      id: '1',
      type: 'receive',
      amount: 5000,
      address: 'Daily Reward',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'receive',
      amount: 2500,
      address: 'Task Completion',
      timestamp: '5 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'receive',
      amount: 10000,
      address: 'Mining Reward',
      timestamp: '1 day ago',
      status: 'completed'
    }
  ];

  const dexTransactions = [
    {
      id: '1',
      type: 'send',
      amount: 1000,
      address: '0x1234...5678',
      timestamp: '1 hour ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'receive',
      amount: 2500,
      address: 'P2P Trade',
      timestamp: '3 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'send',
      amount: 500,
      address: 'DEX Swap',
      timestamp: '1 day ago',
      status: 'completed'
    }
  ];

  const transactions = mode === 'game' ? gameTransactions : dexTransactions;
  const balance = mode === 'game' ? gameBalance : dexBalance;

  const filteredTransactions = mockTransactions.filter(tx =>
    tx.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Balance Card */}
      <div className={`
        p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'}
        backdrop-blur-sm
      `}>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500 font-medium">
              {mode === 'game' ? 'Neural Network' : 'Trading Balance'}
            </span>
          </div>
          
          <div>
            <div className="text-4xl font-bold mb-1">
              {balance.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">
              {mode === 'game' ? 'Neural Tokens' : 'ARC'}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowReceive(true)}
            className={`
              p-3 rounded-xl flex items-center justify-center gap-2 font-medium 
              ${theme === 'dark' ? 'bg-green-500/10 text-green-500' : 'bg-green-100 text-green-600'}
              hover:opacity-80 transition-opacity
            `}
          >
            <ArrowDownLeft className="w-5 h-5" />
            Receive
          </button>
          
          <button
            onClick={() => setShowTransfer(true)}
            className={`
              p-3 rounded-xl flex items-center justify-center gap-2 font-medium
              ${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-600'}
              hover:opacity-80 transition-opacity
          `}>
            <Send className="w-5 h-5" />
            Transfer
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`
          p-4 rounded-xl
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="text-sm text-slate-500 mb-1">24h Volume</div>
          <div className="text-xl font-bold">+25,420</div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12.5%</span>
          </div>
        </div>

        <div className={`
          p-4 rounded-xl
          ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
          backdrop-blur-sm
        `}>
          <div className="text-sm text-slate-500 mb-1">Pending</div>
          <div className="text-xl font-bold">2,500</div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>2 transfers</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">
            {mode === 'game' ? 'Game Activity' : 'Trading History'}
          </div>
          <button className="flex items-center gap-1 text-sm text-blue-500">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${mode === 'game' ? 'rewards' : 'transactions'}...`}
            className={`
              w-full pl-10 pr-4 py-2.5 rounded-xl
              ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
              border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
            `}
          />
        </div>

        <div className="space-y-3">
          {filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>

      <TransferModal isOpen={showTransfer} onClose={() => setShowTransfer(false)} />
      <ReceiveDrawer isOpen={showReceive} onClose={() => setShowReceive(false)} />
    </div>
  );
}