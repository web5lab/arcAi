import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { ArrowLeftRight } from 'lucide-react';
import { DexHeader } from '../components/dex/DexHeader';
import { DexFooter } from '../components/dex/DexFooter';
import { ParticleBackground } from '../components/ParticleBackground';
import { CustomCursor } from '../components/CustomCursor';
import { TradeExecutionScreen } from '../components/p2p/TradeExecutionScreen';

export function TradeExecution() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    navigate('/p2p');
    return null;
  }

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <DexHeader />
        <main className="flex-grow container mx-auto px-6 py-24">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <ArrowLeftRight className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Execute Trade</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Review and confirm your trade details
                </p>
              </div>
            </div>

            <TradeExecutionScreen
              order={order}
              onClose={() => navigate('/p2p')}
            />
          </div>
        </main>
        <DexFooter />
      </div>
    </div>
  );
}