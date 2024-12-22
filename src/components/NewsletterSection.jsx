import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function NewsletterSection() {
  const { theme } = useTheme();

  return (
    <div className={`p-6 sm:p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 px-4 py-2 rounded-full mb-4">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} font-medium`}>
              Newsletter
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay in the Loop</h3>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Get the latest updates about arcAi features, token launches, and community events.
          </p>
        </div>
        <div>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`
                w-full px-4 py-3 rounded-xl text-sm sm:text-base
                ${theme === 'dark' ? 'bg-slate-900/50 text-white' : 'bg-white text-slate-900'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 hover:scale-105 sm:w-auto w-full"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-3 text-xs sm:text-sm text-slate-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}