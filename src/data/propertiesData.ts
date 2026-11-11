import { PropertyListing } from '../types';

export const INITIAL_PROPERTIES: PropertyListing[] = [
  {
    id: 'prop_beach_penthouse',
    title: 'Solstice Towers Penthouse 42',
    category: 'Luxury Estate',
    price: 4850000,
    district: 'Vice Beach',
    address: '1100 Ocean Drive, Vice Beach',
    bedrooms: 4,
    garageSpaces: 10,
    features: ['Rooftop Infinity Pool', 'Private Helipad', '10-Car Under-Glass Showroom', 'Bulletproof Glass', 'Heist Planning War-Room'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The pinnacle of decadent Vice City living. Panoramic floor-to-ceiling glass wrapping the Atlantic Ocean, private biometric elevator, and dual helipad access.',
    owned: true,
    incomePerDay: 12000
  },
  {
    id: 'prop_starfish_villa',
    title: 'Starfish Island Venetian Villa',
    category: 'Luxury Estate',
    price: 13500000,
    district: 'Starfish Island',
    address: '4 Palm Island Way, Starfish Island',
    bedrooms: 7,
    garageSpaces: 12,
    features: ['Private Deepwater Yacht Slip', 'Guard Gate & Security Perimeter', 'Wine Cellar Vault', 'Tennis Court', 'Submersible Dock'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Historic neo-classical palace once rumored to belong to a legendary 1980s drug lord. Completely renovated with reinforced titanium vault and deepwater marina.',
    owned: false,
    incomePerDay: 28000
  },
  {
    id: 'prop_keys_stilt',
    title: 'Pelican Key Stilt Hideaway',
    category: 'Safehouse',
    price: 1850000,
    district: 'Leonida Keys',
    address: 'Stilt Mile Marker 14, Keys',
    bedrooms: 2,
    garageSpaces: 2,
    features: ['Off-Grid Solar & Satellite', 'High-Speed Cigarette Boat Slip', 'Concealed Weapon Cache', 'Sonar Jammer'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Completely disconnected from public municipal grids. The ideal clandestine hideout for high-profile outlaws lying low after major scores.',
    owned: false,
    incomePerDay: 4500
  },
  {
    id: 'prop_port_hangar',
    title: 'Port Gellhorn Customs Warehouse',
    category: 'Commercial',
    price: 2750000,
    district: 'Port Gellhorn',
    address: 'Terminal 7B, Port Gellhorn Docks',
    bedrooms: 1,
    garageSpaces: 16,
    features: ['Overhead Gantry Crane', 'Smuggling Storage Containers', 'Vehicle Armor Bay', 'Direct Ocean Access'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Spacious industrial staging complex. Perfect for running multi-vehicle import/export rackets and storing modified trucks.',
    owned: false,
    incomePerDay: 18500
  },
  {
    id: 'prop_downtown_loft',
    title: 'Neon Heights Executive Loft',
    category: 'Residential',
    price: 3200000,
    district: 'Downtown Vice',
    address: '88 Biscayne Boulevard, Downtown',
    bedrooms: 3,
    garageSpaces: 6,
    features: ['Central City Views', 'Bespoke Bar', 'Smart Home Matrix', 'Helipad Access'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek glass high-rise loft in the corporate heartbeat of Vice City. Walking distance to nightclubs, luxury retailers, and federal banks.',
    owned: false,
    incomePerDay: 8900
  }
];
