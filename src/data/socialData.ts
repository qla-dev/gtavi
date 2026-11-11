import { BleeterPost, StoryItem } from '../types';

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story_lucia',
    author: 'Lucia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    media: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Sunset in Ocean Beach. The city is ours tonight. 🌅🌴'
  },
  {
    id: 'story_jason',
    author: 'Jason',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    media: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
    caption: 'Fresh set of tires on the Cheetah. Track day in Ambrosia.'
  },
  {
    id: 'story_malibu',
    author: 'Club Malibu',
    avatar: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=200&q=80',
    hasUnseen: true,
    media: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    caption: 'DJ Solomun live until 6 AM! Bottles glowing. 🍾⚡'
  },
  {
    id: 'story_gator',
    author: 'Gator Dan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    hasUnseen: false,
    media: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    caption: 'Fed Barnaby the gator two whole rotisserie chickens today. Good boy.'
  },
  {
    id: 'story_dynasty8',
    author: 'Dynasty 8',
    avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
    hasUnseen: false,
    media: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Starfish Island Mega-Villa back on market! $14.5M cash only.'
  }
];

export const INITIAL_POSTS: BleeterPost[] = [
  {
    id: 'post_1',
    author: 'Vice City Police Dept',
    handle: '@VCPD_Official',
    avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=200&q=80',
    verified: true,
    content: 'ALERT: Be on the lookout for a neon pink sports car exceeding 180 MPH on the MacArthur Causeway. Officers dispatched. Please do NOT challenge driver to a drag race.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    timestamp: '12m ago',
    likes: 4210,
    commentsCount: 382,
    isLiked: false,
    tags: ['#VCPD', '#LeonidaTraffic', '#SpeedDemon'],
    comments: [
      {
        id: 'c1',
        author: 'Jason',
        handle: '@J_Duval',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'Too late officer, he already gapped you by three exits 🏎️💨',
        time: '9m ago'
      },
      {
        id: 'c2',
        author: 'OceanDriveGirl',
        handle: '@BeachBabe_VC',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        text: 'The engine sound was angelic though lol',
        time: '5m ago'
      }
    ]
  },
  {
    id: 'post_2',
    author: 'Leonida Man News',
    handle: '@LeonidaManDaily',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: true,
    content: 'BREAKING: Local resident attempts to pay for 12 cases of Pisswasser using a pet python and an unsigned 1994 lottery ticket at 7-11 in Port Gellhorn.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    timestamp: '45m ago',
    likes: 18450,
    commentsCount: 1290,
    isLiked: true,
    tags: ['#LeonidaMan', '#PortGellhorn', '#ClassicFlorida']
  },
  {
    id: 'post_3',
    author: 'Lucia Caminos',
    handle: '@Lucia_Leonida',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true,
    content: 'Trust only the ones who bleed with you. Vice City never sleeps and neither do we. 💋🌴',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    timestamp: '2h ago',
    likes: 29800,
    commentsCount: 940,
    isLiked: true,
    tags: ['#ViceCityVibes', '#DayOne', '#Leonida']
  },
  {
    id: 'post_4',
    author: 'Weazel News Live',
    handle: '@WeazelNewsLeonida',
    avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80',
    verified: true,
    content: 'ECONOMY: Luxury mega-yacht sales in Ocean Beach spike 340% as cryptocurrency barons flee international maritime taxes.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80',
    timestamp: '4h ago',
    likes: 6720,
    commentsCount: 412,
    isLiked: false,
    tags: ['#WeazelNews', '#Crypto', '#ViceYachts']
  }
];
