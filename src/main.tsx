import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import App from './App.tsx';
import { Dex } from './pages/Dex.tsx';
import { P2PMarket } from './pages/P2PMarket.tsx';
import { Game } from './pages/Game.tsx';
import { TokenDetail } from './pages/TokenDetail.tsx';
import { CreateP2POrder } from './pages/CreateP2POrder.tsx';
import { RecentTransactionsScreen } from './components/minimarket/RecentTransactionsScreen.tsx';
import { MiniMarket } from './pages/MiniMarket.tsx';
import { Integration } from './pages/Integration.tsx';
import { TradeExecution } from './pages/TradeExecution.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dex',
    element: <Dex />,
  },
  {
    path: '/p2p',
    element: <P2PMarket />,
  },
  {
    path: '/p2p/:symbol',
    element: <TokenDetail />,
  },
  {
    path: '/p2p/create',
    element: <CreateP2POrder />,
  },
  {
    path: '/p2p/trade/:symbol',
    element: <TradeExecution />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/integration',
    element: <Integration />,
  },
  {
    path: '/embed/p2p',
    element: <MiniMarket />,
  },
  {
    path: '/transactions',
    element: <RecentTransactionsScreen />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
