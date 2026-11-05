export type ColorMode = 'light' | 'dim' | 'dark';

export interface SeasonInfo {
  id: string;
  name: string;
  month: number;
  subtitle: string;
  emoji: string;
  description: string;
}

export const SEASONS: SeasonInfo[] = [
  {
    id: 'bagong-taon',
    name: 'Bagong Taon',
    month: 1,
    subtitle: 'New Year Dawn',
    emoji: '🎆',
    description: 'Clean slate & frost cyan celebrating fresh beginnings.',
  },
  {
    id: 'harana',
    name: 'Harana',
    month: 2,
    subtitle: 'Serenade & Hearts',
    emoji: '💐',
    description: 'Warm rose quartz and velvet crimson accents.',
  },
  {
    id: 'tag-araw',
    name: 'Tag-araw',
    month: 3,
    subtitle: 'Summer Sunlight',
    emoji: '☀️',
    description: 'Bright tropical amber and golden sunbeams.',
  },
  {
    id: 'horizon',
    name: 'Quiet Horizon',
    month: 4,
    subtitle: 'Semana Santa Reflection',
    emoji: '🌿',
    description: 'Calm earth tones, sage green, and warm linen.',
  },
  {
    id: 'flores-de-mayo',
    name: 'Flores de Mayo',
    month: 5,
    subtitle: 'Santacruzan Bloom',
    emoji: '🌸',
    description: 'Vibrant botanical fuchsia and festive emerald.',
  },
  {
    id: 'kalayaan',
    name: 'Araw ng Kalayaan',
    month: 6,
    subtitle: 'Independence & Freedom',
    emoji: '🕊️',
    description: 'Heritage indigo, coral red, and sunburst gold.',
  },
  {
    id: 'habagat',
    name: 'Habagat',
    month: 7,
    subtitle: 'Monsoon Mist',
    emoji: '🌧️',
    description: 'Cool ocean teal, deep slate, and refreshing rain tones.',
  },
  {
    id: 'buwan-ng-wika',
    name: 'Buwan ng Wika',
    month: 8,
    subtitle: 'National Heritage',
    emoji: '📜',
    description: 'Warm terracotta, natural bamboo, and golden pearl.',
  },
  {
    id: 'paskong-pinoy-prelude',
    name: 'Ber Months Kickoff',
    month: 9,
    subtitle: 'Early Christmas Countdown',
    emoji: '✨',
    description: 'Early parol glow, warm pine, and holiday anticipation.',
  },
  {
    id: 'undas-dusk',
    name: 'Undas & Dusk',
    month: 10,
    subtitle: 'Candlelight & Memory',
    emoji: '🕯️',
    description: 'Amethyst twilight, ember gold, and peaceful remembrance.',
  },
  {
    id: 'paskong-pinoy-festive',
    name: 'Paskong Pinoy Festive',
    month: 11,
    subtitle: 'Parol Lights & Simbang Gabi',
    emoji: '🌟',
    description: 'Glowing star lanterns, emerald pine, and festive red.',
  },
  {
    id: 'noche-buena-grand',
    name: 'Noche Buena Grand',
    month: 12,
    subtitle: 'Christmas Joy & Pista',
    emoji: '🎄',
    description: 'Rich velvet crimson, yuletide gold, and celebration pine.',
  },
];

export function getAutoSeason(): SeasonInfo {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const found = SEASONS.find((s) => s.month === currentMonth);
  return found || SEASONS[10]; // Default to Paskong Pinoy Festive (Nov)
}
