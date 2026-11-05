import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Menu, X, Terminal, Code2, BookOpen } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-theme bg-surface/85 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-primary-theme group"
        >
          <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-theme flex items-center justify-center text-primary-theme group-hover:border-theme-hover transition-colors shadow-xs">
            <Terminal className="w-4 h-4 accent-text" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">Jeric Bas</span>
            <span className="text-[10px] text-muted-theme tracking-wider uppercase font-mono mt-0.5">
              devlog & portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="/"
            className="text-secondary-theme hover:text-primary-theme transition-colors flex items-center gap-1.5"
          >
            Home
          </a>
          <a
            href="/blog"
            className="text-secondary-theme hover:text-primary-theme transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Devlog
          </a>
          <a
            href="/projects"
            className="text-secondary-theme hover:text-primary-theme transition-colors flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5" />
            Rust & npm Craft
          </a>
          <a
            href="https://github.com/jericbas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-theme hover:text-primary-theme transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
        </nav>

        {/* Right Controls: Theme Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-theme text-secondary-theme hover:text-primary-theme bg-surface"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-theme bg-surface px-4 py-4 space-y-3">
          <a
            href="/"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-secondary-theme hover:bg-surface-elevated hover:text-primary-theme"
          >
            Home
          </a>
          <a
            href="/blog"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-secondary-theme hover:bg-surface-elevated hover:text-primary-theme"
          >
            Devlog & Articles
          </a>
          <a
            href="/projects"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-secondary-theme hover:bg-surface-elevated hover:text-primary-theme"
          >
            Rust & npm Craft
          </a>
          <a
            href="https://github.com/jericbas"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-secondary-theme hover:bg-surface-elevated hover:text-primary-theme"
          >
            GitHub Profile
          </a>
        </div>
      )}
    </header>
  );
}
