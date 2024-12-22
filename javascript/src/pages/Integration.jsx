import React, { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { ParticleBackground } from '../components/ParticleBackground';
import { CustomCursor } from '../components/CustomCursor';
import { DexHeader } from '../components/dex/DexHeader';
import { DexFooter } from '../components/dex/DexFooter';
import { Copy, MessageCircle, Globe, ChevronDown } from 'lucide-react';
import { ThemeSettings } from '../components/integration/ThemeSettings';

const NETWORKS = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
  { id: 'bsc', name: 'BSC', icon: '🟡' },
  { id: 'polygon', name: 'Polygon', icon: '🟣' },
];

export function Integration() {
  const { theme } = useTheme();
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [copied, setCopied] = useState<'iframe' | 'telegram' | null>(null);
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [borderRadius, setBorderRadius] = useState(12);
  const [transparentBg, setTransparentBg] = useState(false);

  const handleCopy = (type) => {
    const textToCopy = type === 'iframe' 
      ? `<iframe
  style={{ borderRadius: 24 }}
  width={350} height={540}
  allow="ethereum"
  src="https://arcai.finance/embed/p2p?network=${selectedNetwork.id}&token=${tokenAddress}"
/>`
      : `https://t.me/arcAiBot?start=${selectedNetwork.id}-${tokenAddress}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <DexHeader />
        <main className="flex-grow container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Configuration */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Configure Integration</h2>
              
              <div className={`
                p-6 rounded-2xl space-y-6
                ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
                backdrop-blur-sm border
                ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
              `}>
                {/* Network Selector */}
                <div>
                  <label className="text-sm text-slate-500 mb-2 block">Network</label>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <button
                        className={`
                          w-full px-4 py-3 rounded-xl flex items-center justify-between
                          ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                          border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{selectedNetwork.icon}</span>
                          <span>{selectedNetwork.name}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Token Address Input */}
                <div className="relative">
                  <label className="text-sm text-slate-500 mb-1 block">Token address</label>
                  <input
                    type="text"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    placeholder="0x..."
                    className={`
                      w-full px-4 py-3 rounded-xl
                      ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    `}
                  />
                </div>

                {/* Telegram Share */}
                <div className="mt-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                    <MessageCircle className="w-6 h-6" />
                    Share on Telegram
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Share the following link with anyone on Telegram. Enjoy your mini-market!
                  </p>
                  <div className="relative">
                    <div className={`
                      p-4 rounded-xl font-mono text-sm
                      ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                    `}>
                      {`https://t.me/arcAiBot?start=${selectedNetwork.id}-${tokenAddress}`}
                      <button
                        onClick={() => handleCopy('telegram')}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Copy className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Theme Settings */}
                <ThemeSettings
                  primaryColor={primaryColor}
                  onPrimaryColorChange={setPrimaryColor}
                  borderRadius={borderRadius}
                  onBorderRadiusChange={setBorderRadius}
                  transparentBg={transparentBg}
                  onTransparentBgChange={setTransparentBg}
                />

                {/* Website Share */}
                <div className="mt-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                    <Globe className="w-6 h-6" />
                    Share on your website
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Select your preferred markup language and simply copy the following code
                    and paste it into any page on your website. Enjoy your mini-market!
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <select
                      className={`
                        px-4 py-2 rounded-xl
                        ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                        border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                      `}
                    >
                      <option value="jsx">JSX</option>
                      <option value="html">HTML</option>
                    </select>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={transparentBg}
                        onChange={(e) => setTransparentBg(e.target.checked)}
                        className="rounded border-slate-300"
                      />
                      <span>Transparent Background</span>
                    </label>
                  </div>

                  <div className="relative">
                    <div className={`
                      p-4 rounded-xl font-mono text-sm
                      ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                      border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                    `}>
                      {`<iframe
  style={{ borderRadius: 24 }}
  width={350} height={540}
  allow="ethereum"
  src="https://arcai.finance/embed/p2p?network=${selectedNetwork.id}&token=${tokenAddress}&theme=${primaryColor}&radius=${borderRadius}${transparentBg ? '&transparent=1' : ''}"
/>`}
                      <button
                        onClick={() => handleCopy('iframe')}
                        className="absolute right-3 top-3"
                      >
                        <Copy className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div>
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              <div className={`
                sticky top-24 p-6 rounded-2xl
                ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
                backdrop-blur-sm border
                ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                ${transparentBg ? 'bg-opacity-0' : ''}
              `}>
                <iframe
                  style={{ borderRadius }}
                  width="100%"
                  height={540}
                  allow="ethereum"
                  src={`/p2p?network=${selectedNetwork.id}&token=${tokenAddress}&theme=${primaryColor}&radius=${borderRadius}${transparentBg ? '&transparent=1' : ''}`}
                  className={`
                    w-full border
                    ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                  `}
                />
              </div>
            </div>
          </div>
        </main>
        <DexFooter />
      </div>
    </div>
  );
}