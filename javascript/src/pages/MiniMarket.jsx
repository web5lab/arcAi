import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { MiniMarketHeader } from '../components/minimarket/MiniMarketHeader';
import { MiniMarketTabs } from '../components/minimarket/MiniMarketTabs';

export function MiniMarket() {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  
  const network = searchParams.get('network') || 'bsc';
  const token = searchParams.get('token') || '0x1234567890abcdef1234567890abcdef12345678';
  const themeColor = searchParams.get('theme') || 'blue';
  const radius = Number(searchParams.get('radius')) || 12;
  const transparent = searchParams.get('transparent') === '1';

  return (
    <div className={`${theme} h-screen flex flex-col`}>
      <div className={`
        flex-1 flex flex-col overflow-hidden
        ${transparent ? 'bg-transparent' : theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
      `}>
        <MiniMarketHeader
          network={network}
          token={token}
          themeColor={themeColor}
        />
        
        <div className="flex-1 overflow-hidden">
          <MiniMarketTabs
            network={network}
            token={token}
            themeColor={themeColor}
            radius={radius}
          />
        </div>
      </div>
    </div>
  );
}