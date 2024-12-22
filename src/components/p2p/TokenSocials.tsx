import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Twitter, Globe, MessageCircle, FileText, Github } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Globe className="w-4 h-4" />,
    label: 'Website',
    href: 'https://arcai.finance'
  },
  {
    icon: <Twitter className="w-4 h-4" />,
    label: 'Twitter',
    href: 'https://twitter.com/arcaifinance'
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    label: 'Telegram',
    href: 'https://t.me/arcaifinance'
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: 'Whitepaper',
    href: 'https://docs.arcai.finance'
  },
  {
    icon: <Github className="w-4 h-4" />,
    label: 'Github',
    href: 'https://github.com/arcaifinance'
  }
];

export function TokenSocials() {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg
            ${theme === 'dark' ? 'bg-slate-900/50 hover:bg-slate-800' : 'bg-slate-100/50 hover:bg-slate-200/50'}
            transition-colors
          `}
        >
          <span className="text-blue-500">{link.icon}</span>
          <span className="text-sm">{link.label}</span>
        </a>
      ))}
    </div>
  );
}