import React from 'react';
import { Bot, Twitter, Github, MessageCircle, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'} transition-colors`}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm mt-32 py-12 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">arcAi</span>
            </div>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Building the future of decentralized AI gaming and token creation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><FooterLink href="#about">About</FooterLink></li>
              <li><FooterLink href="#tokenomics">Tokenomics</FooterLink></li>
              <li><FooterLink href="#roadmap">Roadmap</FooterLink></li>
              <li><FooterLink href="#partnerships">Partnerships</FooterLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><FooterLink href="#docs">Documentation</FooterLink></li>
              <li><FooterLink href="#whitepaper">Whitepaper</FooterLink></li>
              <li><FooterLink href="#audit">Audit Report</FooterLink></li>
              <li><FooterLink href="#faq">FAQ</FooterLink></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              <FooterLink href="https://twitter.com">
                <Twitter className="w-5 h-5" />
              </FooterLink>
              <FooterLink href="https://discord.com">
                <MessageCircle className="w-5 h-5" />
              </FooterLink>
              <FooterLink href="https://github.com">
                <Github className="w-5 h-5" />
              </FooterLink>
              <FooterLink href="https://arcdex.io">
                <Globe className="w-5 h-5" />
              </FooterLink>
            </div>
          </div>
        </div>

        <div className={`pt-8 mt-8 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>© {year} arcAi. All rights reserved.</div>
            <div className="flex space-x-6">
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#cookies">Cookie Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}