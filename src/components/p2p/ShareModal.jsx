import React from 'react';
import { useTheme } from '../ThemeProvider';
import { X, Twitter, MessageCircle, Copy, Globe, QrCode } from 'lucide-react';



export function ShareModal({ isOpen, onClose, order }) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/p2p/trade/${order.tokenSymbol}`;
  const shareText = `Check out this ${order.type} order for ${order.amount} ${order.tokenSymbol} at $${order.price} on arcAi P2P! 🚀`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
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
          <h2 className="text-xl font-bold">Share Order</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className={`
              w-48 h-48 rounded-2xl
              ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
              flex items-center justify-center
            `}>
              <QrCode className="w-32 h-32 text-blue-500" />
            </div>
          </div>

          {/* Share URL */}
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}
          `}>
            <div className="text-sm text-slate-500 mb-2">Order URL</div>
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm truncate">{shareUrl}</div>
              <button
                onClick={handleCopyLink}
                className={`
                  p-2 rounded-lg
                  ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-white'}
                  transition-colors
                `}
              >
                <Copy className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleCopyLink}
              className={`
                p-4 rounded-xl flex flex-col items-center gap-2
                ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-white'}
                transition-colors
              `}
            >
              <Globe className="w-6 h-6 text-blue-500" />
              <span className="text-sm">Copy Link</span>
            </button>
            <button
              onClick={handleShareTwitter}
              className={`
                p-4 rounded-xl flex flex-col items-center gap-2
                ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-white'}
                transition-colors
              `}
            >
              <Twitter className="w-6 h-6 text-blue-500" />
              <span className="text-sm">Twitter</span>
            </button>
            <button
              onClick={handleShareTelegram}
              className={`
                p-4 rounded-xl flex flex-col items-center gap-2
                ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-white'}
                transition-colors
              `}
            >
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span className="text-sm">Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}