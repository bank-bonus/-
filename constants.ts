import { Case, Item, Rarity } from './types';

export const INITIAL_CREDITS = 2000;
export const SPIN_DURATION_MS = 6000;
export const CARD_WIDTH = 128; // px
export const CARD_GAP = 8; // px

// Rarity Colors for Tailwind
export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.CONSUMER]: 'text-gray-400 border-gray-400 bg-gray-400/10',
  [Rarity.INDUSTRIAL]: 'text-blue-300 border-blue-300 bg-blue-300/10',
  [Rarity.MIL_SPEC]: 'text-blue-600 border-blue-600 bg-blue-600/10',
  [Rarity.RESTRICTED]: 'text-purple-500 border-purple-500 bg-purple-500/10',
  [Rarity.CLASSIFIED]: 'text-pink-500 border-pink-500 bg-pink-500/10',
  [Rarity.COVERT]: 'text-red-600 border-red-600 bg-red-600/10',
  [Rarity.GOLD]: 'text-yellow-400 border-yellow-400 bg-yellow-400/10',
};

export const RARITY_BG_COLORS: Record<Rarity, string> = {
  [Rarity.CONSUMER]: '#9ca3af',
  [Rarity.INDUSTRIAL]: '#93c5fd',
  [Rarity.MIL_SPEC]: '#2563eb',
  [Rarity.RESTRICTED]: '#a855f7',
  [Rarity.CLASSIFIED]: '#ec4899',
  [Rarity.COVERT]: '#dc2626',
  [Rarity.GOLD]: '#facc15',
};

// Mock Items generator
const generateItem = (id: string, name: string, rarity: Rarity, basePrice: number): Item => ({
  id,
  name,
  rarity,
  price: basePrice,
  imageColor: RARITY_BG_COLORS[rarity],
  imageUrl: `https://picsum.photos/seed/${id.replace(/\s/g, '')}/200`
});

// Pool of items
const ITEMS: Item[] = [
  // Low tier
  generateItem('p250_sand', 'P250 | Sand Dune', Rarity.CONSUMER, 0.5),
  generateItem('mag7_storm', 'MAG-7 | Storm', Rarity.CONSUMER, 0.5),
  generateItem('mp9_storm', 'MP9 | Storm', Rarity.INDUSTRIAL, 1.5),
  generateItem('aug_contractor', 'AUG | Contractor', Rarity.INDUSTRIAL, 1.5),
  
  // Mid tier
  generateItem('awp_worm', 'AWP | Worm God', Rarity.MIL_SPEC, 5),
  generateItem('glock_elemental', 'Glock-18 | Water', Rarity.MIL_SPEC, 6),
  generateItem('usp_cyrex', 'USP-S | Cyrex', Rarity.RESTRICTED, 15),
  generateItem('m4a1_basilisk', 'M4A1-S | Basilisk', Rarity.RESTRICTED, 18),
  
  // High tier
  generateItem('ak47_vulcan', 'AK-47 | Vulcan', Rarity.CLASSIFIED, 45),
  generateItem('m4a4_asiimov', 'M4A4 | Asiimov', Rarity.CLASSIFIED, 60),
  generateItem('awp_hyper', 'AWP | Hyper Beast', Rarity.COVERT, 120),
  generateItem('ak47_wild', 'AK-47 | Wild Lotus', Rarity.COVERT, 250),
  
  // Gold
  generateItem('kara_fade', 'Karambit | Fade', Rarity.GOLD, 1200),
  generateItem('m9_lore', 'M9 Bayonet | Lore', Rarity.GOLD, 1500),
];

// Helper to filter items for cases
const getItemsByRarity = (rarities: Rarity[]) => ITEMS.filter(i => rarities.includes(i.rarity));

export const CASES: Case[] = [
  {
    id: 'case_bravo',
    name: 'Кейс Операции Браво',
    price: 250,
    image: 'https://picsum.photos/seed/case1/300',
    contains: getItemsByRarity([Rarity.CONSUMER, Rarity.RESTRICTED, Rarity.CLASSIFIED, Rarity.COVERT, Rarity.GOLD])
  },
  {
    id: 'case_chroma',
    name: 'Хрома Кейс',
    price: 100,
    image: 'https://picsum.photos/seed/case2/300',
    contains: getItemsByRarity([Rarity.INDUSTRIAL, Rarity.MIL_SPEC, Rarity.RESTRICTED, Rarity.CLASSIFIED])
  },
  {
    id: 'case_lore',
    name: 'Кейс История',
    price: 500,
    image: 'https://picsum.photos/seed/case3/300',
    contains: getItemsByRarity([Rarity.RESTRICTED, Rarity.CLASSIFIED, Rarity.COVERT, Rarity.GOLD])
  }
];

// Weighted random logic
export const getRandomItem = (items: Item[]): Item => {
  const weights: Record<Rarity, number> = {
    [Rarity.CONSUMER]: 500,
    [Rarity.INDUSTRIAL]: 400,
    [Rarity.MIL_SPEC]: 300,
    [Rarity.RESTRICTED]: 150,
    [Rarity.CLASSIFIED]: 50,
    [Rarity.COVERT]: 15,
    [Rarity.GOLD]: 2,
  };

  const pool: Item[] = [];
  items.forEach(item => {
    const weight = weights[item.rarity] || 10;
    for(let i=0; i < weight; i++) {
      pool.push(item);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
};
