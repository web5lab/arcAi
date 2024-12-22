import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { MiniMarket } from './pages/MiniMarket.tsx';
import './index.css';

const router = createBrowserRouter([
 
  {
    path: '/',
    element: <MiniMarket />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
