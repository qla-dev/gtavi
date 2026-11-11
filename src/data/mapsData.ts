import { MapLocation, MapCategory } from '../types';
import realMarkersData from './realGtadbMarkers.json';

export const LEONIDA_REGIONS = [
  'All Regions',
  'Vice City Metro',
  'Port Gellhorn',
  'Ambrosia Heartland',
  'Leonida Keys',
  'Lake Leonida & Everglades',
  'Mount Kalaga / Chokoloskee'
];

export const REGION_CENTERS: Record<string, { x: number; y: number; zoom: number }> = {
  'All Regions': { x: 55, y: 50, zoom: 0.9 },
  'Vice City Metro': { x: 84, y: 50, zoom: 1.6 },
  'Port Gellhorn': { x: 42, y: 55, zoom: 1.6 },
  'Ambrosia Heartland': { x: 50, y: 35, zoom: 1.6 },
  'Leonida Keys': { x: 55, y: 88, zoom: 1.5 },
  'Lake Leonida & Everglades': { x: 52, y: 38, zoom: 1.5 },
  'Mount Kalaga / Chokoloskee': { x: 48, y: 20, zoom: 1.6 }
};

export const MAP_DISTRICTS = [
  'Vice Beach',
  'Downtown Vice',
  'Starfish Island',
  'Little Haiti',
  'Escobar International',
  'Vice Port',
  'Vice Point',
  'Port Gellhorn',
  'Ambrosia',
  'Leonida Keys',
  'Lake Leonida',
  'Mount Kalaga'
];

// Real community landmarks from GTADB Yanis v16 / navanem/gta6-leonida-atlas
export const REAL_GTADB_LANDMARKS: MapLocation[] = (realMarkersData as any[]).map((m) => ({
  id: m.id,
  name: m.name,
  category: m.category as MapCategory,
  district: m.district,
  region: m.region,
  x: m.x,
  y: m.y,
  description: m.realWorldAddress
    ? `GTA VI Community Landmark mapping to ${m.realWorldAddress}. Documented in GTADB atlas revision 7c3f8c2.`
    : `Leonida Point of Interest in ${m.district} (${m.inGameAddress}).`,
  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  discovered: false,
  isFavorite: false,
  coordinates: m.coordinates,
  realWorldAddress: m.realWorldAddress,
  inGameAddress: m.inGameAddress,
  tags: m.tags,
  confidence: m.confidence,
  threatLevel: 'Low' as const
}));

export const INITIAL_MAP_LOCATIONS: MapLocation[] = [
  // Real GTADB landmarks from repository
  ...REAL_GTADB_LANDMARKS,
  // ==========================================
  // --- FEATURED STORY SAFETHOUSES & VENUES ---
  // ==========================================
  {
    id: 'vc_ocean_penthouse',
    name: 'Ocean Beach Penthouse 42',
    category: 'safehouse',
    district: 'Vice Beach',
    region: 'Vice City Metro',
    x: 82,
    y: 42,
    coordinates: { x: 2840, y: -1240, z: 120 },
    elevation: 120,
    description: 'Ultra-luxury high-rise safehouse overlooking the neon Ocean Drive boardwalk. 10-car glass elevator showroom and private helipad.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    isFavorite: true,
    reward: 'Free Wardrobe & Exotic Supercar Delivery',
    threatLevel: 'Low',
    intel: 'Biometric elevator bypass installed by Lucia.'
  },
  {
    id: 'vc_malibu_club',
    name: 'The Malibu Club',
    category: 'nightlife',
    district: 'Vice Beach',
    region: 'Vice City Metro',
    x: 84,
    y: 48,
    coordinates: { x: 3120, y: -1480, z: 8 },
    elevation: 8,
    description: 'Legendary multi-tiered synthwave & tech-house nightclub. Hub for money laundering, VIP suites, and underworld deals.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    isFavorite: true,
    reward: '$8,500 Daily Clean Cash Take',
    threatLevel: 'Medium',
    intel: 'VIP backroom has hidden safe with keycard access.'
  },
  {
    id: 'vc_art_deco_strip',
    name: 'Ocean Drive Art Deco Strip',
    category: 'activity',
    district: 'Vice Beach',
    region: 'Vice City Metro',
    x: 83,
    y: 44,
    coordinates: { x: 2950, y: -1360, z: 6 },
    elevation: 6,
    description: 'Iconic neon boulevard lined with pastel hotels, convertibles, street racers, and beachside cocktail lounges.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Street Racing Series Unlock',
    threatLevel: 'Low'
  },
  {
    id: 'vc_boardwalk_pier',
    name: 'Washington Beach Pier & Ferris Wheel',
    category: 'activity',
    district: 'Vice Beach',
    region: 'Vice City Metro',
    x: 86,
    y: 52,
    coordinates: { x: 3340, y: -1680, z: 5 },
    elevation: 5,
    description: 'Historic wooden boardwalk jutting into the Atlantic. Arcade, street food stalls, and scenic sunset viewing platform.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    threatLevel: 'Low'
  },
  {
    id: 'vc_vice_armory',
    name: 'Vice Armory & Tactical Supply',
    category: 'weapons',
    district: 'Downtown Vice',
    region: 'Vice City Metro',
    x: 64,
    y: 34,
    coordinates: { x: 1940, y: -620, z: 14 },
    elevation: 14,
    description: 'Heavy tactical weapons depot: AP pistols, bullpup assault rifles, ballistic plates, and subterranean firing range.',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Heavy Combat Pistol & Tier 3 Armor Plates',
    threatLevel: 'Low',
    intel: 'Gunsmith offers 15% discount for high-rep syndicates.'
  },
  {
    id: 'vc_depository_vault',
    name: 'First Vice Federal Depository',
    category: 'heist',
    district: 'Downtown Vice',
    region: 'Vice City Metro',
    x: 66,
    y: 30,
    coordinates: { x: 2150, y: -450, z: 45 },
    elevation: 45,
    description: 'Central commercial vault holding millions in foreign bearer bonds, cash reserve pallets, and uncut diamond consignments.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Estimated Take: $2,400,000',
    threatLevel: 'Extreme',
    intel: 'Security shifts rotate at 03:15 AM. Rooftop AC duct is vulnerable.'
  },
  {
    id: 'vc_downtown_tower',
    name: 'Biscayne Financial Skyscraper',
    category: 'property',
    district: 'Downtown Vice',
    region: 'Vice City Metro',
    x: 67,
    y: 32,
    coordinates: { x: 2210, y: -510, z: 180 },
    elevation: 180,
    description: 'Tallest glass monolith in the city with executive boardroom, stock exchange terminal, and rooftop skybridge.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Corporate Executive Safehouse',
    threatLevel: 'Medium'
  },
  {
    id: 'vc_vcpd_metro',
    name: 'VCPD Metro Headquarters',
    category: 'police',
    district: 'Downtown Vice',
    region: 'Vice City Metro',
    x: 68,
    y: 36,
    coordinates: { x: 2280, y: -720, z: 22 },
    elevation: 22,
    description: 'Vice City Police Department main precinct, tactical swat garage, impound lot, and rooftop interceptor helipad.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'VCPD Cruiser & SWAT Riot Armor',
    threatLevel: 'Extreme',
    intel: 'Impounded vehicles stored in basement Yard 2.'
  },
  {
    id: 'vc_haiti_chop',
    name: 'Little Haiti Underground Tuners',
    category: 'garage',
    district: 'Little Haiti',
    region: 'Vice City Metro',
    x: 55,
    y: 44,
    coordinates: { x: 1420, y: -890, z: 6 },
    elevation: 6,
    description: 'Secret performance chop shop. ECU remaps, dual-turbo manifolds, NOS injection, and instant resprays to lose police heat.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    isFavorite: true,
    reward: 'Instant Heat Respray (-3 Wanted Stars)',
    threatLevel: 'Medium',
    intel: 'Accepts high-value exotic stolen vehicles.'
  },
  {
    id: 'vc_haiti_voodoo',
    name: 'Auntie Poulet Botanical Apothecary',
    category: 'activity',
    district: 'Little Haiti',
    region: 'Vice City Metro',
    x: 54,
    y: 46,
    coordinates: { x: 1350, y: -940, z: 8 },
    elevation: 8,
    description: 'Traditional herbs, specialized serums, and local rumors tucked away in a painted wooden shack.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Stamina Buff Potion',
    threatLevel: 'Low'
  },
  {
    id: 'vc_starfish_vercetti',
    name: 'Starfish Island Vercetti Estate',
    category: 'property',
    district: 'Starfish Island',
    region: 'Vice City Metro',
    x: 72,
    y: 50,
    coordinates: { x: 2480, y: -1120, z: 12 },
    elevation: 12,
    description: 'Historic neoclassical waterfront palace with private boat slip, hedge labyrinth, and private helipad.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    isFavorite: true,
    reward: 'Helipad Access & Maverick Spawner',
    threatLevel: 'Medium'
  },
  {
    id: 'vc_starfish_dock',
    name: 'Palm Island Marina & Yacht Basin',
    category: 'transport',
    district: 'Starfish Island',
    region: 'Vice City Metro',
    x: 74,
    y: 53,
    coordinates: { x: 2620, y: -1250, z: 4 },
    elevation: 4,
    description: 'Deepwater berths for multi-million dollar luxury motor yachts and cigarette speedboats.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Tropic Superyacht Docking Slip',
    threatLevel: 'Low'
  },
  {
    id: 'vc_escobar_terminal',
    name: 'Escobar International Airport (EIA)',
    category: 'transport',
    district: 'Escobar International',
    region: 'Vice City Metro',
    x: 60,
    y: 62,
    coordinates: { x: 1720, y: -1840, z: 5 },
    elevation: 5,
    description: 'Commercial air hub with intersecting runways, corporate jet hangars, cargo customs, and VIP helicopter pads.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Buckingham Swift Executive Helicopter',
    threatLevel: 'High'
  },
  {
    id: 'vc_escobar_hangar',
    name: 'Terminal Cargo Hangar 4',
    category: 'heist',
    district: 'Escobar International',
    region: 'Vice City Metro',
    x: 58,
    y: 65,
    coordinates: { x: 1580, y: -1980, z: 7 },
    elevation: 7,
    description: 'High-security customs warehouse holding impounded international shipments and luxury sports cars.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Pegassi Infernus GTS Smuggled Car',
    threatLevel: 'High'
  },
  {
    id: 'vc_vice_port_gantry',
    name: 'Vice Port Container Gantry Yard',
    category: 'transport',
    district: 'Vice Port',
    region: 'Vice City Metro',
    x: 76,
    y: 66,
    coordinates: { x: 2750, y: -2100, z: 6 },
    elevation: 6,
    description: 'Heavy naval shipping terminal with 80-meter cranes, cargo barges, and submarine drydocks.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Kraken Submersible Vehicle',
    threatLevel: 'Medium'
  },
  {
    id: 'vc_leaf_links',
    name: 'Leaf Links Golf Club & Resort',
    category: 'activity',
    district: 'Vice Point',
    region: 'Vice City Metro',
    x: 77,
    y: 38,
    coordinates: { x: 2680, y: -980, z: 10 },
    elevation: 10,
    description: 'Championship 18-hole golf course surrounded by water hazards. Frequented by politicians and syndicate bosses.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Caddy Golf Cart & Carbon Iron Club',
    threatLevel: 'Low'
  },

  // ==========================================
  // --- PORT GELLHORN & INDUSTRIAL COAST ---
  // ==========================================
  {
    id: 'pg_container_terminal',
    name: 'Port Gellhorn Container Terminal',
    category: 'heist',
    district: 'Port Gellhorn',
    region: 'Port Gellhorn',
    x: 24,
    y: 56,
    coordinates: { x: -2450, y: -820, z: 6 },
    elevation: 6,
    description: 'Industrial cargo port with automated rail gantry cranes, container freight yards, and international contraband.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Military Heavy Weapons Crate',
    threatLevel: 'High',
    intel: 'Security camera hub located in Yard Tower 4.'
  },
  {
    id: 'pg_speedway',
    name: 'Gator Coast Raceway & Dragway',
    category: 'activity',
    district: 'Port Gellhorn',
    region: 'Port Gellhorn',
    x: 28,
    y: 64,
    coordinates: { x: -2180, y: -1340, z: 9 },
    elevation: 9,
    description: 'High-speed quarter-mile asphalt drag strip and paved road course. Underground weekend pink-slip races.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: '$50,000 Drag Race Purse + Custom Engine Tune',
    threatLevel: 'Low'
  },
  {
    id: 'pg_rail_yard',
    name: 'Gellhorn Freight Rail Switchyard',
    category: 'transport',
    district: 'Port Gellhorn',
    region: 'Port Gellhorn',
    x: 22,
    y: 52,
    coordinates: { x: -2680, y: -640, z: 12 },
    elevation: 12,
    description: 'Sprawling diesel train locomotive maintenance depot with boxcars, fuel tankers, and repair roundhouse.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Heavy Industrial Hauler Truck',
    threatLevel: 'Medium'
  },
  {
    id: 'pg_smuggler_marsh',
    name: 'Gellhorn Marshland Smuggler Cove',
    category: 'safehouse',
    district: 'Port Gellhorn',
    region: 'Port Gellhorn',
    x: 18,
    y: 60,
    coordinates: { x: -2940, y: -1080, z: 3 },
    elevation: 3,
    description: 'Hidden tidal creek dock concealed by mangrove trees. Used for offloading offshore cigarette boats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Duffy Smuggling Speedboat',
    threatLevel: 'Medium'
  },

  // ==========================================
  // --- AMBROSIA HEARTLAND ---
  // ==========================================
  {
    id: 'amb_sugar_mill',
    name: 'Big Sugar Agro Refineries',
    category: 'activity',
    district: 'Ambrosia',
    region: 'Ambrosia Heartland',
    x: 39,
    y: 42,
    coordinates: { x: -940, y: -240, z: 28 },
    elevation: 28,
    description: 'Towering industrial sugarcane processing mills and rail silos dominating the flat rural agricultural landscape.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Stunt Jump Ramp + Smuggler Cache',
    threatLevel: 'Medium'
  },
  {
    id: 'amb_airstrip',
    name: 'Wapiti County Cropduster Strip',
    category: 'transport',
    district: 'Ambrosia',
    region: 'Ambrosia Heartland',
    x: 43,
    y: 36,
    coordinates: { x: -620, y: 120, z: 32 },
    elevation: 32,
    description: 'Unpaved dirt airstrip hidden between sugarcane fields. Frequented by low-flying smugglers and crop dusters.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Duster Biplane & Parachute',
    threatLevel: 'Low'
  },
  {
    id: 'amb_dirt_oval',
    name: 'Ambrosia Mud & Dirt Arena',
    category: 'activity',
    district: 'Ambrosia',
    region: 'Ambrosia Heartland',
    x: 36,
    y: 46,
    coordinates: { x: -1180, y: -450, z: 18 },
    elevation: 18,
    description: 'Demolition derby, 4x4 mud bogging pit, and monster truck dirt oval. Loud country music and fireworks.',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Vapid Sandstorm 4x4 Truck',
    threatLevel: 'Low'
  },

  // ==========================================
  // --- LAKE LEONIDA & EVERGLADES ---
  // ==========================================
  {
    id: 'lake_gator_pete',
    name: 'Gator Pete’s Swamp Sanctuary',
    category: 'nature',
    district: 'Lake Leonida',
    region: 'Lake Leonida & Everglades',
    x: 46,
    y: 24,
    coordinates: { x: -480, y: 840, z: 4 },
    elevation: 4,
    description: 'Muddy airboat depot, alligator wrestling arena, and wooden boardwalks winding through bull gator ponds.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Swamp Camo Airboat & Hunting Rifle',
    threatLevel: 'Medium',
    intel: '16-foot albino alligator spotted in northern marsh channels.'
  },
  {
    id: 'lake_moonshine',
    name: 'Cypress Creek Moonshine Shack',
    category: 'safehouse',
    district: 'Lake Leonida',
    region: 'Lake Leonida & Everglades',
    x: 52,
    y: 19,
    coordinates: { x: 220, y: 1180, z: 3 },
    elevation: 3,
    description: 'Concealed timber shack built on stilts over murky bayou water. Off-grid moonshine still and weapons cache.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'High-Proof Moonshine Molotovs',
    threatLevel: 'Medium'
  },
  {
    id: 'lake_bull_shark',
    name: 'Lake Leonida Bull Shark Lagoon',
    category: 'nature',
    district: 'Lake Leonida',
    region: 'Lake Leonida & Everglades',
    x: 42,
    y: 22,
    coordinates: { x: -740, y: 950, z: -8 },
    elevation: -8,
    description: 'Freshwater estuary where bull sharks migrate from the Gulf to hunt. Dangerously murky waters.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    threatLevel: 'Extreme'
  },
  {
    id: 'lake_native_camp',
    name: 'Miccosukee Tribal Trading Post',
    category: 'activity',
    district: 'Lake Leonida',
    region: 'Lake Leonida & Everglades',
    x: 48,
    y: 28,
    coordinates: { x: -280, y: 620, z: 5 },
    elevation: 5,
    description: 'Historic trading post selling native crafts, smoked alligator jerky, and specialized airboat repair kits.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    threatLevel: 'Low'
  },

  // ==========================================
  // --- LEONIDA KEYS (Island Chain) ---
  // ==========================================
  {
    id: 'keys_pelican_stilt',
    name: 'Pelican Key Stilt Hideaway',
    category: 'safehouse',
    district: 'Leonida Keys',
    region: 'Leonida Keys',
    x: 36,
    y: 80,
    coordinates: { x: -1450, y: -2640, z: 2 },
    elevation: 2,
    description: 'Off-grid stilt complex standing over translucent shallow emerald waters. Prime staging dock for offshore speedboats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Squalo III Cigarette Boat Spawner',
    threatLevel: 'Medium',
    intel: 'Coast Guard radar blindspot between 01:00 and 04:00 AM.'
  },
  {
    id: 'keys_galleon_reef',
    name: 'Spanish Galleon San Cristobal Reef',
    category: 'collectible',
    district: 'Leonida Keys',
    region: 'Leonida Keys',
    x: 28,
    y: 88,
    coordinates: { x: -2100, y: -3200, z: -35 },
    elevation: -35,
    description: '17th-century coral-encrusted sunken Spanish galleon resting 35 meters below surface with gold ingots.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Sunken Treasure Ingot + Scuba Gear',
    threatLevel: 'High'
  },
  {
    id: 'keys_seven_mile_bridge',
    name: 'Overseas Highway Viaduct Bridge',
    category: 'transport',
    district: 'Leonida Keys',
    region: 'Leonida Keys',
    x: 32,
    y: 84,
    coordinates: { x: -1780, y: -2900, z: 18 },
    elevation: 18,
    description: 'Long scenic concrete highway bridging the open ocean between mainland Leonida and the southernmost Keys.',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80',
    discovered: true,
    reward: 'Stunt Jump #24',
    threatLevel: 'Low'
  },
  {
    id: 'keys_sunset_pier',
    name: 'Key West Conchs Marina & Bar',
    category: 'nightlife',
    district: 'Leonida Keys',
    region: 'Leonida Keys',
    x: 22,
    y: 92,
    coordinates: { x: -2480, y: -3500, z: 3 },
    elevation: 3,
    description: 'Relaxed waterfront tiki bar at the southernmost tip of the United States. Live acoustic music and rum cocktails.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Tiki Rum Cocktail Recipe',
    threatLevel: 'Low'
  },

  // ==========================================
  // --- MOUNT KALAGA / CHOKOLOSKEE ---
  // ==========================================
  {
    id: 'mt_chokoloskee_radar',
    name: 'Mount Kalaga Radar Observatory Peak',
    category: 'nature',
    district: 'Mount Kalaga',
    region: 'Mount Kalaga / Chokoloskee',
    x: 32,
    y: 12,
    coordinates: { x: -1680, y: 1540, z: 310 },
    elevation: 310,
    description: 'Highest geological elevation in Leonida. Decommissioned Cold War radar domes offering sweeping views of the entire state.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Extreme Base Jump Parachute Point',
    threatLevel: 'Low'
  },
  {
    id: 'mt_abandoned_mine',
    name: 'Kalaga Silver & Quartz Mine',
    category: 'collectible',
    district: 'Mount Kalaga',
    region: 'Mount Kalaga / Chokoloskee',
    x: 27,
    y: 14,
    coordinates: { x: -2050, y: 1420, z: 220 },
    elevation: 220,
    description: 'Collapsed 19th-century underground mine shafts. Rumored to hold hidden contraband and rare minerals.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    reward: 'Antique Gold Miner Pickaxe',
    threatLevel: 'Medium'
  },
  {
    id: 'mt_timber_mill',
    name: 'Chokoloskee Logging & Sawmill',
    category: 'activity',
    district: 'Mount Kalaga',
    region: 'Mount Kalaga / Chokoloskee',
    x: 35,
    y: 16,
    coordinates: { x: -1380, y: 1280, z: 140 },
    elevation: 140,
    description: 'Active timber mill with log stacks, heavy bulldozers, and dangerous circular saw bays.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    discovered: false,
    threatLevel: 'Low'
  }
];

// Coordinate and distance calculation helpers for the Leonida Atlas
export function calculateAtlasDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): { miles: number; km: number; drivingMinutes: number } {
  // Approximate scale: 100 map units = 42 miles across Leonida
  const dx = (p2.x - p1.x) * 0.42;
  const dy = (p2.y - p1.y) * 0.42;
  const distanceMiles = Math.sqrt(dx * dx + dy * dy);
  const distanceKm = distanceMiles * 1.60934;
  const drivingMinutes = Math.max(1, Math.round((distanceMiles / 95) * 60));

  return {
    miles: Number(distanceMiles.toFixed(1)),
    km: Number(distanceKm.toFixed(1)),
    drivingMinutes
  };
}
