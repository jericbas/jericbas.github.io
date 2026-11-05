import React, { useEffect, useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { getAutoSeason, SEASONS } from '../utils/theme';

export default function SeasonalBanner() {
  const [season, setSeason] = useState(getAutoSeason());

  useEffect(() => {
    const handleUpdate = () => {
      const activeAttr = document.documentElement.getAttribute('data-season');
      const found = SEASONS.find((s) => s.id === activeAttr) || getAutoSeason();
      setSeason(found);
    };

    handleUpdate();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-season'
        ) {
          handleUpdate();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-2 px-4 bg-surface-elevated/70 border-b border-theme text-xs text-secondary-theme flex items-center justify-center gap-2">
      <span className="text-sm">{season.emoji}</span>
      <span className="font-semibold text-primary-theme">{season.name} Edition:</span>
      <span className="hidden sm:inline text-muted-theme">{season.description}</span>
      <span className="sm:hidden text-muted-theme">{season.subtitle}</span>
      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-theme bg-surface text-secondary-theme">
        <Sparkles className="w-2.5 h-2.5 accent-text" />
        Seasonal ✨
      </span>
    </div>
  );
}
