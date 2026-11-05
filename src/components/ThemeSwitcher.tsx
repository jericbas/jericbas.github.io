import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles, ChevronDown, Check } from 'lucide-react';
import { SEASONS, getAutoSeason, type ColorMode, type SeasonInfo } from '../utils/theme';

export default function ThemeSwitcher() {
  const [mode, setMode] = useState<ColorMode>('dim');
  const [seasonId, setSeasonId] = useState<string>('auto');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = (localStorage.getItem('jb-mode') as ColorMode) || 'dim';
    const savedSeason = localStorage.getItem('jb-season') || 'auto';

    applyTheme(savedMode, savedSeason);
    setMode(savedMode);
    setSeasonId(savedSeason);
  }, []);

  const applyTheme = (newMode: ColorMode, newSeason: string) => {
    const root = document.documentElement;

    // Apply 3-mode selection
    root.setAttribute('data-mode', newMode);
    localStorage.setItem('jb-mode', newMode);

    // Apply seasonal selection
    let activeSeasonId = newSeason;
    if (newSeason === 'auto') {
      activeSeasonId = getAutoSeason().id;
    }
    root.setAttribute('data-season', activeSeasonId);
    localStorage.setItem('jb-season', newSeason);
  };

  const handleModeChange = (newMode: ColorMode) => {
    setMode(newMode);
    applyTheme(newMode, seasonId);
  };

  const handleSeasonChange = (newSeason: string) => {
    setSeasonId(newSeason);
    applyTheme(mode, newSeason);
    setIsDropdownOpen(false);
  };

  const activeSeasonObj =
    seasonId === 'auto'
      ? getAutoSeason()
      : SEASONS.find((s) => s.id === seasonId) || getAutoSeason();

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-xs opacity-50">
        <span>Loading themes...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* 3 Color Mode Segmented Control: Light | Dim (Twilight) | Dark */}
      <div
        className="flex items-center p-1 rounded-full border border-theme bg-surface text-xs shadow-xs"
        role="group"
        aria-label="Color Mode Switcher"
      >
        {/* Mode 1: Light */}
        <button
          onClick={() => handleModeChange('light')}
          title="Light Mode (Crisp Paper)"
          aria-pressed={mode === 'light'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
            mode === 'light'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-secondary-theme hover:text-primary-theme'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Light</span>
        </button>

        {/* Mode 2: Dim (The light version of dark mode - twilight charcoal) */}
        <button
          onClick={() => handleModeChange('dim')}
          title="Dim Mode (Twilight / Soft Dark)"
          aria-pressed={mode === 'dim'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
            mode === 'dim'
              ? 'bg-slate-700 text-slate-100 shadow-xs'
              : 'text-secondary-theme hover:text-primary-theme'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full border border-sky-400 bg-sky-950/70 inline-block" />
          <span className="hidden sm:inline">Dim</span>
        </button>

        {/* Mode 3: Dark (Pitch Deep Dark) */}
        <button
          onClick={() => handleModeChange('dark')}
          title="Dark Mode (Pitch Obsidian)"
          aria-pressed={mode === 'dark'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
            mode === 'dark'
              ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
              : 'text-secondary-theme hover:text-primary-theme'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Dark</span>
        </button>
      </div>

      {/* Philippine Seasonal Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-theme bg-surface text-xs font-medium text-secondary-theme hover:text-primary-theme transition-colors shadow-xs"
          title="Philippine Seasonal Theme"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span className="text-sm">{activeSeasonObj.emoji}</span>
          <span className="hidden md:inline font-medium">
            {seasonId === 'auto' ? `Auto: ${activeSeasonObj.name}` : activeSeasonObj.name}
          </span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-72 rounded-2xl border border-theme bg-surface shadow-xl z-50 p-2 text-xs overflow-hidden"
            style={{ maxHeight: '380px', overflowY: 'auto' }}
          >
            <div className="px-3 py-2 border-b border-theme mb-1">
              <div className="font-semibold text-primary-theme flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Philippine Seasons
              </div>
              <p className="text-[11px] text-muted-theme mt-0.5">
                Automatically syncs with the calendar or pick any season.
              </p>
            </div>

            {/* Auto Option */}
            <button
              onClick={() => handleSeasonChange('auto')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                seasonId === 'auto'
                  ? 'bg-surface-elevated font-semibold text-primary-theme'
                  : 'hover:bg-surface-elevated text-secondary-theme'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{getAutoSeason().emoji}</span>
                <div>
                  <div className="text-primary-theme font-medium">Auto (Current Month)</div>
                  <div className="text-[10px] text-muted-theme">
                    Currently: {getAutoSeason().name} ({getAutoSeason().subtitle})
                  </div>
                </div>
              </div>
              {seasonId === 'auto' && <Check className="w-3.5 h-3.5 accent-text" />}
            </button>

            <div className="my-1 border-t border-theme" />

            {/* Month-by-Month Philippine Seasons */}
            {SEASONS.map((season) => (
              <button
                key={season.id}
                onClick={() => handleSeasonChange(season.id)}
                className={`w-full text-left px-3 py-1.5 rounded-xl flex items-center justify-between transition-colors ${
                  seasonId === season.id
                    ? 'bg-surface-elevated font-semibold text-primary-theme'
                    : 'hover:bg-surface-elevated text-secondary-theme'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{season.emoji}</span>
                  <div>
                    <div className="text-primary-theme font-medium">
                      Month {season.month}: {season.name}
                    </div>
                    <div className="text-[10px] text-muted-theme">{season.subtitle}</div>
                  </div>
                </div>
                {seasonId === season.id && <Check className="w-3.5 h-3.5 accent-text" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
