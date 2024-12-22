import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import App from './App.jsx';
import { Dex } from './pages/Dex.jsx';
import { P2PMarket } from './pages/P2PMarket.jsx';
import { Game } from './pages/Game.jsx';
import { TokenDetail } from './pages/TokenDetail.jsx';
import { CreateP2POrder } from './pages/CreateP2POrder.jsx';
import { RecentTransactionsScreen } from './components/minimarket/RecentTransactionsScreen.jsx';
import { MiniMarket } from './pages/MiniMarket.jsx';
import { Integration } from './pages/Integration.jsx';
import { TradeExecution } from './pages/TradeExecution.jsx';
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
