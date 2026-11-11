export type AppId =
  | 'maps'
  | 'garage'
  | 'snapmatic'
  | 'social'
  | 'properties'
  | 'checklist'
  | 'contacts'
  | 'news'
  | 'ai'
  | 'settings';

export interface AppMetadata {
  id: AppId;
  name: string;
  subtitle: string;
  badge?: number | string;
  iconBg: string;
  accentColor: string;
  inDock?: boolean;
}

export type MapCategory =
  | 'all'
  | 'safehouse'
  | 'nightlife'
  | 'garage'
  | 'heist'
  | 'weapons'
  | 'activity'
  | 'collectible'
  | 'property'
  | 'nature'
  | 'transport'
  | 'police'
  | 'custom';

export type MapLayerMode = 'atlas' | 'satellite' | 'topographic' | '3d';

export interface MapLocation {
  id: string;
  name: string;
  category: MapCategory;
  district: string;
  region?: string;
  x: number; // 0-100% on map coordinate grid
  y: number; // 0-100%
  description?: string;
  image?: string;
  discovered?: boolean;
  isFavorite?: boolean;
  reward?: string;
  threatLevel?: 'Low' | 'Medium' | 'High' | 'Extreme';
  intel?: string;
  coordinates?: { x: number; y: number; z: number };
  elevation?: number;
  notes?: string;
  realWorldAddress?: string;
  inGameAddress?: string;
  tags?: string[];
  confidence?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  manufacturer: string;
  category: 'Super' | 'Sports Classic' | 'Muscle' | 'Tuners' | 'Boats' | 'Aviation';
  price: number;
  topSpeed: number; // mph
  acceleration: number; // 0-100 rating
  braking: number; // 0-100 rating
  handling: number; // 0-100 rating
  drivetrain: 'RWD' | 'AWD' | 'FWD';
  image: string;
  badge: string;
  owned: boolean;
  customPlate?: string;
  upgrades?: {
    engine: number;
    turbo: boolean;
    neon: boolean;
    tint: string;
  };
}

export interface BleeterPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  verified: boolean;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  tags?: string[];
  comments?: Array<{
    id: string;
    author: string;
    handle: string;
    avatar: string;
    text: string;
    time: string;
  }>;
}

export interface StoryItem {
  id: string;
  author: string;
  avatar: string;
  hasUnseen: boolean;
  media: string;
  caption: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  category: 'Residential' | 'Luxury Estate' | 'Commercial' | 'Safehouse';
  price: number;
  district: string;
  address: string;
  bedrooms: number;
  garageSpaces: number;
  features: string[];
  image: string;
  gallery: string[];
  description: string;
  owned: boolean;
  incomePerDay?: number;
}

export interface ChecklistItem {
  id: string;
  category: 'missions' | 'collectibles' | 'activities' | 'strangers' | 'custom';
  title: string;
  subtitle: string;
  progress: number;
  target: number;
  completed: boolean;
  reward?: string;
  district?: string;
}

export interface Contact {
  id: string;
  name: string;
  alias?: string;
  role: string;
  phone: string;
  avatar: string;
  status: 'Online' | 'Busy' | 'In Heist' | 'Offline';
  district: string;
  bio: string;
  messages: Array<{
    id: string;
    sender: 'user' | 'contact';
    text: string;
    time: string;
  }>;
  callDialogue: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Breaking' | 'Crime' | 'Luxury' | 'Florida Man' | 'Politics';
  summary: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  poll?: {
    question: string;
    options: string[];
    votes: number[];
  };
}

export interface PhotoCapture {
  id: string;
  title: string;
  location: string;
  url: string;
  timestamp: string;
  album: 'Vice Beach' | 'Nightlife' | 'Fleet' | 'Selfies' | 'Captures';
  iso: string;
  shutter: string;
  isFavorite: boolean;
}

export interface OSNotification {
  id: string;
  title: string;
  message: string;
  appId: AppId;
  time: string;
  icon?: string;
}
