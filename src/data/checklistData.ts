import { ChecklistItem } from '../types';

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Missions
  {
    id: 'chk_mis_1',
    category: 'missions',
    title: 'The Vice City Arrival',
    subtitle: 'Reunite with Lucia at the Ocean Beach motel and secure your initial burner ride.',
    progress: 1,
    target: 1,
    completed: true,
    reward: '$15,000 + Grotti Cheetah Classic',
    district: 'Vice Beach'
  },
  {
    id: 'chk_mis_2',
    category: 'missions',
    title: 'Port Gellhorn Container Heist',
    subtitle: 'Infiltrate terminal yard 4 and intercept the smuggled weapons manifest.',
    progress: 1,
    target: 1,
    completed: true,
    reward: '$280,000 + Military Suppressor',
    district: 'Port Gellhorn'
  },
  {
    id: 'chk_mis_3',
    category: 'missions',
    title: 'Keys Offshore Smuggling Run',
    subtitle: 'Outrun the coast guard patrol cutters in the Squalo III under heavy thunderstorm.',
    progress: 0,
    target: 1,
    completed: false,
    reward: '$450,000 + Pelican Key Safehouse',
    district: 'Leonida Keys'
  },
  {
    id: 'chk_mis_4',
    category: 'missions',
    title: 'The Grand Royale Depository Vault',
    subtitle: 'The big score: crack the underground biometric vault in Downtown Vice.',
    progress: 0,
    target: 1,
    completed: false,
    reward: '$2,500,000 + Gold Weapon Finish',
    district: 'Downtown Vice'
  },
  // Collectibles
  {
    id: 'chk_col_packages',
    category: 'collectibles',
    title: 'Hidden Contraband Packages',
    subtitle: 'Recover sunken and buried duffel caches hidden across the Leonida shoreline.',
    progress: 32,
    target: 50,
    completed: false,
    reward: 'Special Armor Buff + $100,000 Bonus'
  },
  {
    id: 'chk_col_murals',
    category: 'collectibles',
    title: 'Art Deco Neon Murals',
    subtitle: 'Photograph iconic satirical street murals in Vice Beach and Little Haiti.',
    progress: 18,
    target: 20,
    completed: false,
    reward: 'Exclusive Snapmatic Neon Filters'
  },
  {
    id: 'chk_col_stunt_jumps',
    category: 'collectibles',
    title: 'Stunt Jumps of Leonida',
    subtitle: 'Launch across bridges, rooftop ramps, and construction cranes at 140+ MPH.',
    progress: 15,
    target: 30,
    completed: false,
    reward: 'Infernus GTS Extreme Aero Kit'
  },
  // Activities
  {
    id: 'chk_act_street_races',
    category: 'activities',
    title: 'Underground Midnight Street Races',
    subtitle: 'Win all 8 sanctioned pink-slip circuit races through neon alleyways.',
    progress: 6,
    target: 8,
    completed: false,
    reward: 'Ambrosia Speedway Custom Engine Tune'
  },
  {
    id: 'chk_act_airboat_safari',
    category: 'activities',
    title: 'Lake Leonida Airboat Hunt',
    subtitle: 'Guide Gator Pete through deep mangroves while avoiding territorial bull sharks.',
    progress: 3,
    target: 3,
    completed: true,
    reward: 'Swamp Camo Airboat'
  },
  // Strangers & Freaks
  {
    id: 'chk_str_leonida_man',
    category: 'strangers',
    title: 'The Legend of Leonida Man',
    subtitle: 'Encounter the infamous highway vagrant fighting garden flamingos at 3 AM.',
    progress: 1,
    target: 1,
    completed: true,
    reward: 'Pet Alligator Charm'
  },
  {
    id: 'chk_str_ghost_ship',
    category: 'strangers',
    title: 'Ghost of the Spanish Galleon',
    subtitle: 'Investigate the glowing phantom schooner off the southern barrier reef at midnight.',
    progress: 0,
    target: 1,
    completed: false,
    reward: 'Antique Gold Cutlass Melee Weapon'
  }
];
