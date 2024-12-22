import React from 'react';
import { Bot, ChevronRight, Moon, Sun, Wallet } from 'lucide-react';
import { useTheme } from './ThemeProvider';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      className={`${theme === 'dark' ? 'hover:text-slate-200' : 'hover:text-slate-900'} transition-colors`}
    >
      {children}
    </a>
  );
}

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">arcAi</span>
          </div>
          
          {/* Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#tokenomics">Tokenomics</NavLink>
            <NavLink href="#roadmap">Roadmap</NavLink>
            <NavLink href="#partnerships">Partners</NavLink>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-blue-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
            </button>
            
            <button 
              className={`
                hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl
                border transition-all
                ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-50 border-slate-200'}
              `}
            >
              <Wallet className="w-4 h-4 text-blue-500" />
              <span>Connect</span>
            </button>

            
          </div>
        </div>
      </div>
    </nav>
  );
}