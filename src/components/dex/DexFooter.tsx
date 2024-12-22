import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'} transition-colors flex items-center space-x-1`}
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

export function DexFooter() {
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm py-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Audited by CertiK
            </span>
          </div>
          <div className="flex space-x-6 text-sm">
            <FooterLink href="#docs">Documentation</FooterLink>
            <FooterLink href="#support">Support</FooterLink>
            <FooterLink href="#terms">Terms</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}