import { create } from 'zustand';
import { AppId, BleeterPost, ChecklistItem, Contact, MapCategory, MapLayerMode, MapLocation, OSNotification, PhotoCapture, PropertyListing, Vehicle } from '../types';
import { INITIAL_MAP_LOCATIONS } from '../data/mapsData';
import { INITIAL_VEHICLES } from '../data/vehiclesData';
import { INITIAL_PROPERTIES } from '../data/propertiesData';
import { INITIAL_CHECKLIST } from '../data/checklistData';
import { INITIAL_CONTACTS } from '../data/contactsData';
import { INITIAL_POSTS } from '../data/socialData';
import { INITIAL_CAPTURES } from '../data/snapmaticData';
import { storageAdapter } from '../services/storageAdapter';
import { audioService } from '../services/audioService';

export const WALLPAPERS = [
  {
    id: 'vice_sunset',
    name: 'Vice Sunset Palms',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ocean_drive_neon',
    name: 'Neon Ocean Drive',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sports_car_night',
    name: 'Midnight Supercar',
    url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'everglades_haze',
    name: 'Leonida Everglades Haze',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'club_malibu_laser',
    name: 'Malibu Laser Glow',
    url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'starfish_aerial',
    name: 'Starfish Island Luxury',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
];

interface OSState {
  activeApp: AppId | null;
  appHistory: AppId[];
  isLocked: boolean;
  wallpaper: string;
  soundEnabled: boolean;
  activeCall: Contact | null;
  callDuration: number;
  activeChatContact: Contact | null;
  activeWaypoint: MapLocation | null;
  bankBalance: number;
  wantedLevel: number;
  notifications: OSNotification[];
  activeNotification: OSNotification | null;

  // Apps data
  mapLocations: MapLocation[];
  vehicles: Vehicle[];
  properties: PropertyListing[];
  checklist: ChecklistItem[];
  posts: BleeterPost[];
  contacts: Contact[];
  captures: PhotoCapture[];

  // Actions
  unlockPhone: () => void;
  lockPhone: () => void;
  launchApp: (id: AppId) => void;
  closeApp: () => void;
  goBack: () => void;
  setWallpaper: (url: string) => void;
  toggleSound: () => void;
  setWantedLevel: (level: number) => void;

  // Map state & actions
  mapLayerMode: MapLayerMode;
  setMapLayerMode: (mode: MapLayerMode) => void;
  setWaypoint: (loc: MapLocation | null) => void;
  toggleFavoriteLocation: (id: string) => void;
  markLocationDiscovered: (id: string) => void;
  addCustomLocation: (name: string, description: string, category: MapCategory, x: number, y: number, notes?: string) => void;
  deleteLocation: (id: string) => void;

  // Vehicle actions
  buyVehicle: (id: string) => boolean;
  toggleVehicleOwned: (id: string) => void;

  // Property actions
  buyProperty: (id: string) => boolean;

  // Checklist actions
  toggleChecklist: (id: string) => void;
  addChecklistItem: (title: string, subtitle: string, category: ChecklistItem['category']) => void;

  // Social actions
  likePost: (id: string) => void;
  addBleetPost: (content: string, image?: string) => void;
  addCommentToPost: (postId: string, text: string) => void;

  // Contacts & Phone actions
  startCall: (contact: Contact) => void;
  endCall: () => void;
  setActiveChatContact: (contact: Contact | null) => void;
  sendSMS: (contactId: string, text: string) => void;

  // Camera / Snapmatic actions
  saveCapture: (capture: PhotoCapture) => void;
  deleteCapture: (id: string) => void;

  // Notification actions
  pushNotification: (notif: { title: string; message: string; appId: AppId; icon?: string }) => void;
  dismissNotification: () => void;

  // Reset
  resetToDefaults: () => void;
}

export const useOSStore = create<OSState>((set, get) => {
  const savedWallpaper = storageAdapter.get<string>('wallpaper', WALLPAPERS[0].url);
  const savedSound = storageAdapter.get<boolean>('sound_enabled', true);
  const savedBalance = storageAdapter.get<number>('bank_balance', 3450000);
  const storedLocations = storageAdapter.get<MapLocation[]>('map_locations', INITIAL_MAP_LOCATIONS);
  const savedLocations = storedLocations.length < INITIAL_MAP_LOCATIONS.length ? INITIAL_MAP_LOCATIONS : storedLocations;
  const savedVehicles = storageAdapter.get<Vehicle[]>('vehicles', INITIAL_VEHICLES);
  const savedProperties = storageAdapter.get<PropertyListing[]>('properties', INITIAL_PROPERTIES);
  const savedChecklist = storageAdapter.get<ChecklistItem[]>('checklist', INITIAL_CHECKLIST);
  const savedPosts = storageAdapter.get<BleeterPost[]>('posts', INITIAL_POSTS);
  const savedContacts = storageAdapter.get<Contact[]>('contacts', INITIAL_CONTACTS);
  const savedCaptures = storageAdapter.get<PhotoCapture[]>('captures', INITIAL_CAPTURES);

  audioService.enabled = savedSound;

  return {
    activeApp: null,
    appHistory: [],
    isLocked: false,
    wallpaper: savedWallpaper,
    soundEnabled: savedSound,
    activeCall: null,
    callDuration: 0,
    activeChatContact: null,
    activeWaypoint: null,
    bankBalance: savedBalance,
    wantedLevel: 0,
    notifications: [
      {
        id: 'init_notif_1',
        title: 'Lucia Caminos',
        message: 'Meet me at Ocean Beach when you check the map. We got a score.',
        appId: 'contacts',
        time: 'Just now'
      }
    ],
    activeNotification: null,

    mapLocations: savedLocations,
    vehicles: savedVehicles,
    properties: savedProperties,
    checklist: savedChecklist,
    posts: savedPosts,
    contacts: savedContacts,
    captures: savedCaptures,

    unlockPhone: () => {
      audioService.playTap();
      set({ isLocked: false });
    },

    lockPhone: () => {
      audioService.playTap();
      set({ isLocked: true, activeApp: null, appHistory: [] });
    },

    launchApp: (id: AppId) => {
      audioService.playAppLaunch();
      set((state) => ({
        activeApp: id,
        appHistory: state.activeApp ? [...state.appHistory, state.activeApp] : state.appHistory
      }));
    },

    closeApp: () => {
      audioService.playTap();
      set({ activeApp: null, appHistory: [] });
    },

    goBack: () => {
      audioService.playTap();
      const { appHistory } = get();
      if (appHistory.length > 0) {
        const nextApp = appHistory[appHistory.length - 1];
        set({
          activeApp: nextApp,
          appHistory: appHistory.slice(0, -1)
        });
      } else {
        set({ activeApp: null });
      }
    },

    setWallpaper: (url: string) => {
      audioService.playTap();
      storageAdapter.set('wallpaper', url);
      set({ wallpaper: url });
      get().pushNotification({
        title: 'Settings',
        message: 'Wallpaper updated successfully.',
        appId: 'settings'
      });
    },

    toggleSound: () => {
      const next = !get().soundEnabled;
      audioService.enabled = next;
      storageAdapter.set('sound_enabled', next);
      set({ soundEnabled: next });
      if (next) audioService.playTap();
    },

    setWantedLevel: (level: number) => {
      audioService.playNotification();
      set({ wantedLevel: Math.max(0, Math.min(5, level)) });
    },

    setWaypoint: (loc: MapLocation | null) => {
      if (loc) {
        audioService.playWaypoint();
        get().pushNotification({
          title: 'GPS Waypoint Set',
          message: `Navigating to ${loc.name} (${loc.district})`,
          appId: 'maps'
        });
      }
      set({ activeWaypoint: loc });
    },

    mapLayerMode: 'atlas' as MapLayerMode,

    setMapLayerMode: (mode: MapLayerMode) => {
      audioService.playTap();
      set({ mapLayerMode: mode });
    },

    toggleFavoriteLocation: (id: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.mapLocations.map((l) =>
          l.id === id ? { ...l, isFavorite: !l.isFavorite } : l
        );
        storageAdapter.set('map_locations', updated);
        return { mapLocations: updated };
      });
    },

    markLocationDiscovered: (id: string) => {
      set((state) => {
        const updated = state.mapLocations.map((l) =>
          l.id === id ? { ...l, discovered: true } : l
        );
        storageAdapter.set('map_locations', updated);
        return { mapLocations: updated };
      });
    },

    addCustomLocation: (name: string, description: string, category: MapCategory, x: number, y: number, notes?: string) => {
      audioService.playWaypoint();
      const newLoc: MapLocation = {
        id: `custom_loc_${Date.now()}`,
        name,
        category,
        district: 'Custom Waypoint',
        region: 'Personal Atlas Notes',
        x,
        y,
        description: description || 'User custom marked waypoint.',
        notes: notes || undefined,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        discovered: true,
        isFavorite: true,
        threatLevel: 'Low',
        coordinates: { x: Math.round((x - 50) * 80), y: Math.round((50 - y) * 80), z: 10 }
      };

      set((state) => {
        const updated = [newLoc, ...state.mapLocations];
        storageAdapter.set('map_locations', updated);
        return { mapLocations: updated };
      });

      get().pushNotification({
        title: 'Leonida Atlas Pin Added',
        message: `Saved custom marker "${name}" to personal atlas.`,
        appId: 'maps'
      });
    },

    deleteLocation: (id: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.mapLocations.filter((l) => l.id !== id);
        storageAdapter.set('map_locations', updated);
        return { mapLocations: updated };
      });
    },

    buyVehicle: (id: string) => {
      const { vehicles, bankBalance } = get();
      const veh = vehicles.find((v) => v.id === id);
      if (!veh || veh.owned) return false;
      if (bankBalance < veh.price) {
        get().pushNotification({
          title: 'Dynasty Motorsports',
          message: 'Insufficient bank balance for transaction.',
          appId: 'garage'
        });
        return false;
      }

      audioService.playPurchase();
      const newBalance = bankBalance - veh.price;
      const updated = vehicles.map((v) =>
        v.id === id ? { ...v, owned: true, customPlate: 'VICE OS' } : v
      );

      storageAdapter.set('vehicles', updated);
      storageAdapter.set('bank_balance', newBalance);
      set({ vehicles: updated, bankBalance: newBalance });

      get().pushNotification({
        title: 'Vehicle Acquired',
        message: `${veh.manufacturer} ${veh.name} delivered to your garage.`,
        appId: 'garage'
      });
      return true;
    },

    toggleVehicleOwned: (id: string) => {
      set((state) => {
        const updated = state.vehicles.map((v) =>
          v.id === id ? { ...v, owned: !v.owned } : v
        );
        storageAdapter.set('vehicles', updated);
        return { vehicles: updated };
      });
    },

    buyProperty: (id: string) => {
      const { properties, bankBalance } = get();
      const prop = properties.find((p) => p.id === id);
      if (!prop || prop.owned) return false;
      if (bankBalance < prop.price) {
        get().pushNotification({
          title: 'Dynasty 8 Real Estate',
          message: 'Mortgage rejected: Insufficient funds.',
          appId: 'properties'
        });
        return false;
      }

      audioService.playPurchase();
      const newBalance = bankBalance - prop.price;
      const updated = properties.map((p) =>
        p.id === id ? { ...p, owned: true } : p
      );

      storageAdapter.set('properties', updated);
      storageAdapter.set('bank_balance', newBalance);
      set({ properties: updated, bankBalance: newBalance });

      get().pushNotification({
        title: 'Deed Transferred!',
        message: `Welcome to ${prop.title}. Keys available immediately.`,
        appId: 'properties'
      });
      return true;
    },

    toggleChecklist: (id: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.checklist.map((item) => {
          if (item.id === id) {
            const nextCompleted = !item.completed;
            return {
              ...item,
              completed: nextCompleted,
              progress: nextCompleted ? item.target : 0
            };
          }
          return item;
        });
        storageAdapter.set('checklist', updated);
        return { checklist: updated };
      });
    },

    addChecklistItem: (title: string, subtitle: string, category: ChecklistItem['category']) => {
      audioService.playTap();
      const newItem: ChecklistItem = {
        id: `chk_custom_${Date.now()}`,
        category,
        title,
        subtitle: subtitle || 'Custom Leonida to-do item',
        progress: 0,
        target: 1,
        completed: false
      };
      set((state) => {
        const updated = [newItem, ...state.checklist];
        storageAdapter.set('checklist', updated);
        return { checklist: updated };
      });
    },

    likePost: (id: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.posts.map((post) => {
          if (post.id === id) {
            const isLiked = !post.isLiked;
            return {
              ...post,
              isLiked,
              likes: post.likes + (isLiked ? 1 : -1)
            };
          }
          return post;
        });
        storageAdapter.set('posts', updated);
        return { posts: updated };
      });
    },

    addBleetPost: (content: string, image?: string) => {
      audioService.playTap();
      const newPost: BleeterPost = {
        id: `post_${Date.now()}`,
        author: 'Jason Duval',
        handle: '@J_Duval',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        verified: true,
        content,
        image: image || undefined,
        timestamp: 'Just now',
        likes: 1,
        commentsCount: 0,
        isLiked: true,
        tags: ['#ViceCity', '#LeonidaOS']
      };
      set((state) => {
        const updated = [newPost, ...state.posts];
        storageAdapter.set('posts', updated);
        return { posts: updated };
      });
      get().pushNotification({
        title: 'Bleeter',
        message: 'Your bleet has been published to the feed.',
        appId: 'social'
      });
    },

    addCommentToPost: (postId: string, text: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.posts.map((post) => {
          if (post.id === postId) {
            const newComment = {
              id: `c_${Date.now()}`,
              author: 'Jason Duval',
              handle: '@J_Duval',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
              text,
              time: 'Just now'
            };
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
              comments: [...(post.comments || []), newComment]
            };
          }
          return post;
        });
        storageAdapter.set('posts', updated);
        return { posts: updated };
      });
    },

    startCall: (contact: Contact) => {
      audioService.playPhoneRing();
      set({ activeCall: contact, callDuration: 0 });
    },

    endCall: () => {
      audioService.stopPhoneRing();
      audioService.playTap();
      set({ activeCall: null, callDuration: 0 });
    },

    setActiveChatContact: (contact: Contact | null) => {
      audioService.playTap();
      set({ activeChatContact: contact });
    },

    sendSMS: (contactId: string, text: string) => {
      audioService.playTap();
      const newMessage = {
        id: `msg_${Date.now()}`,
        sender: 'user' as const,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set((state) => {
        const updated = state.contacts.map((c) => {
          if (c.id === contactId) {
            return {
              ...c,
              messages: [...c.messages, newMessage]
            };
          }
          return c;
        });
        storageAdapter.set('contacts', updated);
        return { contacts: updated };
      });

      // Simulate contact reply after a moment!
      setTimeout(() => {
        const currentContact = get().contacts.find((c) => c.id === contactId);
        if (!currentContact) return;
        const replies = [
          "Got it. Don't leave any paper trails.",
          "I'm on my way. Watch your back.",
          "Deal. I'll ping you as soon as the package clears customs.",
          "Meet me at the Marina slip in 20 minutes."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyMsg = {
          id: `reply_${Date.now()}`,
          sender: 'contact' as const,
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        set((state) => {
          const updated = state.contacts.map((c) => {
            if (c.id === contactId) {
              return {
                ...c,
                messages: [...c.messages, replyMsg]
              };
            }
            return c;
          });
          storageAdapter.set('contacts', updated);
          return { contacts: updated };
        });

        audioService.playNotification();
        get().pushNotification({
          title: currentContact.name,
          message: randomReply,
          appId: 'contacts'
        });
      }, 1800);
    },

    saveCapture: (capture: PhotoCapture) => {
      audioService.playCameraShutter();
      set((state) => {
        const updated = [capture, ...state.captures];
        storageAdapter.set('captures', updated);
        return { captures: updated };
      });
      get().pushNotification({
        title: 'Snapmatic',
        message: `Photo saved to album "${capture.album}"`,
        appId: 'snapmatic'
      });
    },

    deleteCapture: (id: string) => {
      audioService.playTap();
      set((state) => {
        const updated = state.captures.filter((c) => c.id !== id);
        storageAdapter.set('captures', updated);
        return { captures: updated };
      });
    },

    pushNotification: (notif) => {
      audioService.playNotification();
      const newNotif: OSNotification = {
        id: `notif_${Date.now()}`,
        time: 'Just now',
        ...notif
      };
      set((state) => ({
        notifications: [newNotif, ...state.notifications],
        activeNotification: newNotif
      }));

      // Automatically hide the dynamic island notification banner after 4.5 seconds
      setTimeout(() => {
        set((state) =>
          state.activeNotification?.id === newNotif.id ? { activeNotification: null } : {}
        );
      }, 4500);
    },

    dismissNotification: () => {
      set({ activeNotification: null });
    },

    resetToDefaults: () => {
      storageAdapter.clearAll();
      set({
        wallpaper: WALLPAPERS[0].url,
        soundEnabled: true,
        bankBalance: 3450000,
        mapLocations: INITIAL_MAP_LOCATIONS,
        vehicles: INITIAL_VEHICLES,
        properties: INITIAL_PROPERTIES,
        checklist: INITIAL_CHECKLIST,
        posts: INITIAL_POSTS,
        contacts: INITIAL_CONTACTS,
        captures: INITIAL_CAPTURES,
        activeApp: null,
        appHistory: [],
        activeWaypoint: null,
        wantedLevel: 0
      });
      audioService.playTap();
    }
  };
});
