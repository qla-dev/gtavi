import { Contact } from '../types';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'contact_lucia',
    name: 'Lucia Caminos',
    alias: 'Lucia',
    role: 'Partner in Crime',
    phone: '555-0199',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Online',
    district: 'Vice Beach',
    bio: 'Fierce, calculating, and ride-or-die. Keeps the crew focused on the big scores while managing our underground ties.',
    messages: [
      {
        id: 'm1',
        sender: 'contact',
        text: 'Jason, I scoped out the security cams at the Port Gellhorn marina.',
        time: '14:20'
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Did they upgrade the patrol boats?',
        time: '14:22'
      },
      {
        id: 'm3',
        sender: 'contact',
        text: 'Yeah, dual outboards. We will need the Cheetah or the offshore speedboat to slip past the coast guard radar. Meet me at Ocean Beach.',
        time: '14:23'
      }
    ],
    callDialogue: [
      '“Jason! Good timing. I just reviewed the floor plans for the depository.”',
      '“Make sure your vehicle has armor plating installed at the chop shop.”',
      '“Don’t do anything reckless without me. Watch your six out there.”'
    ]
  },
  {
    id: 'contact_jason',
    name: 'Jason Duval',
    alias: 'Jason',
    role: 'Partner / Driver',
    phone: '555-0144',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Online',
    district: 'Downtown Vice',
    bio: 'Ex-military tactician and getaway specialist. Can push any wheel past its redline.',
    messages: [
      {
        id: 'jm1',
        sender: 'contact',
        text: 'Just got the suspension tuned on the Banshee. She handles like butter.',
        time: '11:05'
      },
      {
        id: 'jm2',
        sender: 'user',
        text: 'Ready for the drag strip tonight?',
        time: '11:10'
      },
      {
        id: 'jm3',
        sender: 'contact',
        text: 'Always ready. Bring cash. The Ambrosia crowd doesn’t play games.',
        time: '11:12'
      }
    ],
    callDialogue: [
      '“Hey! Engine is warm and the tank is full. What’s our target?”',
      '“If VCPD starts flashing sirens, take the freeway ramp across the causeway.”',
      '“Talk soon, gotta change this oil filter.”'
    ]
  },
  {
    id: 'contact_cal',
    name: 'Cal Hampton',
    alias: 'The Quartermaster',
    role: 'Black Market Arms Dealer',
    phone: '555-0182',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Online',
    district: 'Little Haiti',
    bio: 'Distributes military hardware and custom suppressors from an unmarked auto salvage yard in Little Haiti.',
    messages: [
      {
        id: 'cm1',
        sender: 'contact',
        text: 'New crate arrived from the port. AP pistols and ceramic body armor.',
        time: '09:15'
      },
      {
        id: 'cm2',
        sender: 'user',
        text: 'Save me a set with thermal scopes.',
        time: '09:30'
      }
    ],
    callDialogue: [
      '“Keep it brief, this burner line is on a 5-minute timer.”',
      '“I got military surplus coming in tonight. If you got clean cash, I got firepower.”',
      '“Come by the salvage yard through the rear gate. Don’t bring company.”'
    ]
  },
  {
    id: 'contact_gator_dan',
    name: 'Gator Dan',
    alias: 'The Swamp King',
    role: 'Airboat Guide & Smuggler',
    phone: '555-0133',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'Busy',
    district: 'Lake Leonida',
    bio: 'Born in the mangroves. Knows every submerged sandbar, moonshine hideout, and alligator nest between Vice City and the Keys.',
    messages: [
      {
        id: 'gm1',
        sender: 'contact',
        text: 'Gator jumped clean into my boat yesterday. Still got all my fingers though!',
        time: 'Yesterday'
      }
    ],
    callDialogue: [
      '“Y’ello! Can barely hear you over the fan blades! You need a ride across the swamp?”',
      '“No police cruiser can follow us into the cypress trees, buddy!”'
    ]
  },
  {
    id: 'contact_mors',
    name: 'Mors Mutual Insurance',
    alias: 'Claims Dept',
    role: 'Vehicle Replacement',
    phone: '555-0190',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    status: 'Online',
    district: 'Downtown Vice',
    bio: 'Leonida’s premier asset insurance provider. We expect the unexpected so you can drive dangerously.',
    messages: [
      {
        id: 'mm1',
        sender: 'contact',
        text: 'Your Grotti Cheetah Classic claim has been settled. Replacement delivered to your garage.',
        time: 'Yesterday'
      }
    ],
    callDialogue: [
      '“Mors Mutual, we make it like it never happened. All insured fleet vehicles are currently active.”',
      '“Have an accident? File your claim now or contact your local depot.”'
    ]
  },
  {
    id: 'contact_cabs',
    name: 'Vice City Cabs & Limo',
    alias: 'Dispatcher',
    role: 'Fast Travel & Chauffeur',
    phone: '555-0100',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    status: 'Online',
    district: 'All Districts',
    bio: 'Yellow sedans and sleek executive limousines stationed at every major nightclub, casino, and airport.',
    messages: [
      {
        id: 'vc1',
        sender: 'contact',
        text: 'Your driver is en route in a black Albany Cavalcade.',
        time: '3 days ago'
      }
    ],
    callDialogue: [
      '“Vice City Cabs dispatcher! Where are you stranded at, chief?”',
      '“Driver dispatched to your nearest cross street. Don’t get blood on the upholstery.”'
    ]
  }
];
