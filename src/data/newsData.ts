import { NewsArticle } from '../types';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news_1',
    title: 'Leonida Man Arrested Trying To Pay For Toll Booth With Live 6-Foot Alligator',
    category: 'Florida Man',
    summary: 'Highway patrol officers on the Sunshine Parkway were left stunned after a local driver presented an agitated reptile through the driver window as legal tender.',
    content: [
      'PORT GELLHORN — A standard commute on the Sunshine Parkway turned into an impromptu reptile exhibition early Tuesday morning when a driver, identified by police as 38-year-old Dale “Swampy” Higgins, arrived at the toll booth without cash or an electronic transponder.',
      'According to highway patrol dashcam footage, Higgins leaned out of his modified 1991 Declasse pickup truck and thrust a hissing six-foot American alligator towards the collection booth attendant, stating: “He’s worth at least twenty-five dollars in raw leather alone, just let me across the bridge.”',
      'The toll attendant immediately sealed the security window and initiated protocol Alpha-9. The alligator, named “Mr. Snappy”, was temporarily placed in custody of the Leonida Wildlife Commission and is reported to be in good spirits.',
      'Higgins has been charged with improper payment methods, reckless reptile endangerment, and resisting without common sense.'
    ],
    author: 'Frankie Vance / Weazel News',
    date: 'Today, 08:30 AM',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    poll: {
      question: 'Should wildlife be accepted as legal tender in Leonida tolls?',
      options: ['Yes, support local currency', 'No, strictly cash or card', 'Only if it fits in the basket'],
      votes: [4310, 890, 2140]
    }
  },
  {
    id: 'news_2',
    title: 'Ocean Beach Penthouse Sells For Record $52 Million in Unmarked Crypto Tokens',
    category: 'Luxury',
    summary: 'The top three floors of the prestigious Solstice Towers were snapped up by an anonymous offshore LLC amidst a surging real estate frenzy across Vice City.',
    content: [
      'VICE BEACH — Despite heightened federal scrutiny into cross-border capital flows, the Vice City luxury condominium market continues its stratospheric ascent.',
      'Yesterday, deed transfers registered with the Leonida Department of Revenue confirmed the purchase of Penthouse Suite 42 at Solstice Towers for a breathtaking $52.4 million equivalent.',
      'The property features an Olympic-length cantilevered infinity pool hanging 50 stories over the Atlantic waves, a private subterranean bunker with biometric armory doors, and an FAA-certified twin-rotor helipad.',
      'Local real estate analysts note that demand for properties with high-security perimeters and private boat docks has increased 240% year-over-year.'
    ],
    author: 'Chantal DuBois / Vice Inquirer',
    date: 'Yesterday, 04:15 PM',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news_3',
    title: 'Nightclub Syndicate Raids: Malibu Club Maintains Innocence Following VCPD Audit',
    category: 'Crime',
    summary: 'Authorities seized accounting hard drives during midnight checks, but club management insists all proceeds stem strictly from artisanal $45 cocktail sales.',
    content: [
      'DOWNTOWN VICE — In a coordinated inter-agency operation dubbed “Operation Neon Sweep,” detectives from the Vice City Organized Crime Division executed search warrants across three premier Ocean Beach nightclubs on Saturday night.',
      'Patrons dancing to a headline set by international DJs were briefly instructed to keep hands visible as officers inspected VIP bottle service suites and underground cellar passages.',
      'A spokesperson for the ownership group stated: “The Malibu Club complies with all state regulations. The three cash-counting machines in the basement are simply used for calculating daily citrus garnish expenses.”'
    ],
    author: 'Marcus Cole / Crime Watch Leonida',
    date: '2 days ago',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news_4',
    title: 'Governor Proposes Replacing Speed Cameras With Drag Racing Grandstands',
    category: 'Politics',
    summary: '“If they’re going to do 190 MPH down Biscayne Boulevard anyway, the state might as well sell tickets and hot dogs,” stated the Leonida state governor during a press rally.',
    content: [
      'CAPITOL DISTRICT — Facing mounting infrastructure deficits, state lawmakers are considering a revolutionary approach to combating street racing across Vice City and Ambrosia.',
      'Under the proposed “Leonida Velocity Accord,” traditional speed enforcement cameras along MacArthur Causeway would be replaced with tiered stadium seating, food truck concessions, and mobile betting kiosks.',
      'The proposal has drawn sharp criticism from highway safety advocates, but poll numbers in Ambrosia have reached an all-time 82% approval rating.'
    ],
    author: 'Samantha Cruz / Political Pulse',
    date: '3 days ago',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
  }
];
