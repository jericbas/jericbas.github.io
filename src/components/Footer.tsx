import React from 'react';
import { Rss, Heart, Terminal } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-theme bg-surface py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 font-bold text-primary-theme">
            <Terminal className="w-4 h-4 accent-text" />
            <span>Jeric Bas</span>
          </div>
          <p className="text-xs text-muted-theme mt-1 max-w-sm">
            Engineering tools, npm packages, and systems software in Rust & TypeScript.
            Living developer log & portfolio.
          </p>
        </div>

        {/* Links & Philippine Seasonal Note */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-secondary-theme">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jericbas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-theme flex items-center gap-1 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="/rss.xml"
              className="hover:text-primary-theme flex items-center gap-1 transition-colors"
            >
              <Rss className="w-3.5 h-3.5 text-amber-500" />
              RSS Feed
            </a>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-muted-theme mt-1">
            <span>Built with Astro & React</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with ☕ &amp; ⚡
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
