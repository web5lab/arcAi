import React from 'react';
import { DexHeader } from '../components/dex/DexHeader';
import { DexFooter } from '../components/dex/DexFooter';
import { TradingInterface } from '../components/dex/TradingInterface';
import { ParticleBackground } from '../components/ParticleBackground';
import { CustomCursor } from '../components/CustomCursor';
import { useTheme } from '../components/ThemeProvider';

export function Dex() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <DexHeader />
        <main className="flex-grow container mx-auto px-6 py-24">
          <TradingInterface />
        </main>
        <DexFooter />
      </div>
    </div>
  );
}