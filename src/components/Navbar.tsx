import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Terminal } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-theme bg-surface/85 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & WIP tag */}
        <a
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-primary-theme group"
        >
          <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-theme flex items-center justify-center text-primary-theme group-hover:border-theme-hover transition-colors shadow-xs">
            <Terminal className="w-4 h-4 accent-text" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-none">Jeric Bas</span>
              <span className="text-[10px] text-muted-theme tracking-wider uppercase font-mono mt-0.5">
                devlog &amp; portfolio
              </span>
            </div>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              WIP
            </span>
          </div>
        </a>

        {/* Right Controls: GitHub Link & Theme Switcher */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/jericbas"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-theme bg-surface text-xs font-medium text-secondary-theme hover:text-primary-theme transition-colors shadow-xs"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {/* Fully Functional Theme Switcher (3 modes + 12 seasons) */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
