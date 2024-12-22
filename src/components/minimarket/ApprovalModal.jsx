import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Lock, CheckCircle2, ExternalLink } from 'lucide-react';
import { Loader } from '../common/Loader';



export function ApprovalModal({ isOpen, onClose, onSuccess, token, spender }) {
  const { theme } = useTheme();
  const [status, setStatus] = useState('initial');

  if (!isOpen) return null;

  const handleApprove = () => {
    setStatus('pending');
    // Simulate approval transaction
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-full max-w-md p-6 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
        animate-fade-in-up
      `}>
        {status === 'success' ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Approval Successful!</h2>
            <p className="text-sm text-slate-500 mb-4">
              You can now proceed with the swap
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Approve {token.symbol}</h2>
                  <p className="text-sm text-slate-500">
                    Allow {spender} to spend your {token.symbol}
                  </p>
                </div>
              </div>
              {status === 'initial' && (
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className={`
              p-4 rounded-xl mb-6
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
            `}>
              <div className="flex items-center gap-3 mb-4">
                {token.icon}
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-slate-500">{token.symbol}</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">
                This transaction is required only once per token
              </div>
            </div>

            <button
              onClick={handleApprove}
              disabled={status === 'pending'}
              className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2"
            >
              {status === 'pending' ? (
                <>
                  <Loader size="sm" color="white" />
                  <span>Approving...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Approve {token.symbol}</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}