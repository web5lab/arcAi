import React from 'react';
import { Wallet, Shield, Cpu, Globe, Gem, Lock, Banknote, Network, Layers, Radar, Boxes, Share2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

function PartnerCard({ icon, name }: { icon: React.ReactNode; name: string }) {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-slate-800/30' : 'bg-white/30'} backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-105`}>
      {icon}
      <span className="font-medium">{name}</span>
    </div>
  );
}

export function PartnershipSection() {
  const { theme } = useTheme();
  
  return (
    <div className="mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Trusted Integrations</h2>
        <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
          Seamlessly connected with leading blockchain networks and security providers
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <PartnerCard 
          icon={<Shield className="w-5 h-5 text-blue-500" />}
          name="CertiK Audited"
        />
        <PartnerCard 
          icon={<Wallet className="w-5 h-5 text-blue-500" />}
          name="MetaMask"
        />
        <PartnerCard 
          icon={<Cpu className="w-5 h-5 text-blue-500" />}
          name="Binance Chain"
        />
        <PartnerCard 
          icon={<Globe className="w-5 h-5 text-blue-500" />}
          name="Telegram API"
        />
        <PartnerCard 
          icon={<Gem className="w-5 h-5 text-blue-500" />}
          name="Polygon"
        />
        <PartnerCard 
          icon={<Lock className="w-5 h-5 text-blue-500" />}
          name="Chainlink"
        />
        <PartnerCard 
          icon={<Banknote className="w-5 h-5 text-blue-500" />}
          name="1inch DEX"
        />
        <PartnerCard 
          icon={<Network className="w-5 h-5 text-blue-500" />}
          name="Avalanche"
        />
        <PartnerCard 
          icon={<Layers className="w-5 h-5 text-blue-500" />}
          name="Layer Zero"
        />
        <PartnerCard 
          icon={<Radar className="w-5 h-5 text-blue-500" />}
          name="OpenAI"
        />
        <PartnerCard 
          icon={<Boxes className="w-5 h-5 text-blue-500" />}
          name="Arbitrum"
        />
        <PartnerCard 
          icon={<Share2 className="w-5 h-5 text-blue-500" />}
          name="WalletConnect"
        />
      </div>
    </div>
  );
}