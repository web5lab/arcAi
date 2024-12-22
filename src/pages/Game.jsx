import React from 'react';
import { useTheme } from '../components/ThemeProvider';
import { GameHeader } from '../components/game/GameHeader';
import { GameStats } from '../components/game/GameStats';
import { MinerProfile } from '../components/game/MinerProfile';
import { GameNavigation } from '../components/game/GameNavigation';
import { TrendingTokens } from '../components/game/TrendingTokens';
import { MiningCards } from '../components/game/MiningCards';
import { WalletScreen } from '../components/game/WalletScreen';
import { TaskScreen } from '../components/game/TaskScreen';
import { FriendsScreen } from '../components/game/FriendsScreen';
import { CreateTokenScreen } from '../components/game/CreateTokenScreen';
import { EnergyBar } from '../components/game/EnergyBar';
import { SwapScreen } from '../components/game/SwapScreen';
import { PoolScreen } from '../components/game/PoolScreen';
import { TradeScreen } from '../components/game/TradeScreen';
import { SecretVaultDrawer } from '../components/game/SecretVaultDrawer';
import { LevelUpDrawer } from '../components/game/LevelUpDrawer';
import { ClaimButton } from '../components/game/ClaimButton';
import { useState } from 'react';

export function Game() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('train');
  const [mode, setMode] = useState('game');
  const [showVault, setShowVault] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  return (
    <div className={`${theme} min-h-screen cursor-auto`}>
      <div className="max-w-md mx-auto relative pb-20">
        <GameHeader mode={mode} />
        <main className="px-4 pt-4">
          {activeTab === 'train' && <ClaimButton onClick={() => setShowVault(true)} />}
          {mode === 'game' ? (
            <>
              {activeTab === 'train' && (
                <>
                  <GameStats />
                  <MinerProfile />
                  <EnergyBar />
                </>
              )}
              {activeTab === 'mine' && <MiningCards />}
              {activeTab === 'task' && <TaskScreen />}
              {activeTab === 'friend' && <FriendsScreen />}
              {activeTab === 'wallet' && <WalletScreen mode="game" />}
            </>
          ) : (
            <>
              {activeTab === 'create' && <CreateTokenScreen />}
              {activeTab === 'swap' && <SwapScreen />}
              {activeTab === 'trending' && <TrendingTokens />}
              {activeTab === 'pool' && <PoolScreen />}
              {activeTab === 'trade' && <TradeScreen />}
              {activeTab === 'wallet' && <WalletScreen mode="dapp" />}
            </>
          )}
        </main>
        <GameNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mode={mode}
          onModeChange={setMode}
        />
        <SecretVaultDrawer isOpen={showVault} onClose={() => setShowVault(false)} />
        <LevelUpDrawer isOpen={showLevelUp} onClose={() => setShowLevelUp(false)} />
      </div>
    </div>
  );
}