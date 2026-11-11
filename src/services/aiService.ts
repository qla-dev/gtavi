import { GoogleGenAI } from '@google/genai';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  category?: 'map' | 'vehicle' | 'heist' | 'tips' | 'intel';
}

const SYSTEM_PROMPT = `
You are V.I.C.E. (Virtual Intelligence Crime Engine), the built-in AI copilot for the fictional LeonidaOS smartphone in GTA VI (Grand Theft Auto VI).
You operate inside the neon-lit, satirical, sunny, and dangerous universe of Vice City and the state of Leonida.
Your personality is street-smart, tactical, slightly sarcastic, highly knowledgeable about criminal getaways, exotic supercars, underground chop shops, waterfront penthouses, Everglades alligators, and police evasion tactics.
Always stay in character as a fictional in-game operating system assistant.
Give crisp, exciting, helpful answers formatted with bullet points or quick tactical summaries when helpful.
`;

const LOCAL_KNOWLEDGE: Record<string, string> = {
  supercars: `🏎️ **V.I.C.E. Fleet Intel — Fastest Rides in Vice City:**
- **Pegassi Infernus GTS ($1,450,000):** 215 MPH top speed, AWD grip. Found cruising outside The Malibu Club or Biscayne Financial Plaza.
- **Grotti Cheetah Classic ($865,000):** Iconic mid-engine 80s supercar. Supreme acceleration, twitchy RWD. Perfect for causeway getaways.
- **Pfister Comet S2 Cabrio ($1,780,000):** Superior launch control and handling through tight Ocean Drive corners.

*Tactical Tip:* Head to the Chop Shop in Little Haiti to install EMS Level 4 and Turbo tuning before attempting any police evasion past 3 stars!`,

  heist: `💼 **First Vice Federal Vault — Infiltration Assessment:**
1. **Rooftop AC Approach:** Land the Maverick helicopter on the southern rooftop tier at 03:15 AM during security shift turnover.
2. **Thermal Drill Requirements:** Pick up the industrial thermite canister from Cal Hampton's salvage yard in Little Haiti.
3. **Getaway Vehicle:** Park a reinforced AWD vehicle (like the Karin Sultan RS or Albany Cavalcade) in the subterranean parking garage across from the canal.
4. **Estimated Score:** $2,400,000 in bearer bonds and untraceable bullion.`,

  safehouse: `🌴 **Top Safehouse Recommendations:**
- **Ocean Beach Penthouse 42:** Highest view in the city, 10-car glass elevator garage, directly above Ocean Drive.
- **Starfish Island Venetian Villa:** Complete seclusion, deepwater dock for the Squalo III speedboat, and private helipad.
- **Pelican Reef Stilt Shack:** Off-the-grid solar compound in the Leonida Keys. Zero police radar coverage.`,

  police: `🚨 **V.I.C.E. Tactical Guide: Escaping 5-Star Heat:**
- **Avoid Highways:** VCPD sets up heavy roadblock barricades with spikes on MacArthur Causeway.
- **Go Aquatic:** Grab a Squalo III or Jet Ski and gun it into the Atlantic reef channels. Police cruisers can't swim, and chopper spotlight loses you in heavy swells.
- **Chop Shop Respray:** Little Haiti Tuners can respray your chassis in 3 seconds flat to drop heat instantly.`,

  florida_man: `🐊 **Leonida Man Sightings Tracker:**
- Last spotted: Highway 17 gas station near Lake Leonida attempting to tame a 14-foot bull alligator with beef jerky.
- Local warning: Do NOT accept moonshine from anyone named "Swampy Dale".
- Myth confirmed: There is indeed an albino gator lurking in the mangrove canals near Gator Pete's Safari.`
};

export class AIServiceAdapter {
  private client: GoogleGenAI | null = null;

  constructor() {
    const apiKey = typeof window !== 'undefined'
      ? (import.meta.env.VITE_GEMINI_API_KEY || '')
      : '';
    if (apiKey) {
      try {
        this.client = new GoogleGenAI({ apiKey });
      } catch {
        this.client = null;
      }
    }
  }

  async askCopilot(userQuery: string, history: AIMessage[] = []): Promise<string> {
    const qLower = userQuery.toLowerCase();

    // Check if real Gemini client is ready
    if (this.client) {
      try {
        const response = await this.client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userQuery}` }] }
          ]
        });
        if (response && response.text) {
          return response.text;
        }
      } catch (err) {
        console.warn('Gemini request failed, falling back to local GTA VI OS engine:', err);
      }
    }

    // Rich in-universe simulation fallback with delay for realistic typing feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (qLower.includes('car') || qLower.includes('vehicle') || qLower.includes('fast') || qLower.includes('supercar') || qLower.includes('speed')) {
      return LOCAL_KNOWLEDGE.supercars;
    }
    if (qLower.includes('heist') || qLower.includes('rob') || qLower.includes('bank') || qLower.includes('score') || qLower.includes('vault')) {
      return LOCAL_KNOWLEDGE.heist;
    }
    if (qLower.includes('safehouse') || qLower.includes('property') || qLower.includes('house') || qLower.includes('penthouse') || qLower.includes('mansion')) {
      return LOCAL_KNOWLEDGE.safehouse;
    }
    if (qLower.includes('police') || qLower.includes('cop') || qLower.includes('escape') || qLower.includes('wanted') || qLower.includes('heat') || qLower.includes('star')) {
      return LOCAL_KNOWLEDGE.police;
    }
    if (qLower.includes('alligator') || qLower.includes('gator') || qLower.includes('florida') || qLower.includes('leonida man') || qLower.includes('swamp')) {
      return LOCAL_KNOWLEDGE.florida_man;
    }

    // General dynamic response
    return `⚡ **V.I.C.E. OS Dispatch:**
Analyzing Leonida satellite telemetry for: *"${userQuery}"*...

- **Sector Status:** Clear across Vice Beach and Downtown. Heavy marine traffic near Port Gellhorn.
- **Tactical Intel:** Lucia and Jason have flagged high-value weapon shipments arriving at the docks tonight.
- **Recommended Next Move:** Check your **Leonida Maps** app to set a waypoint, or tune up your ride in **Garage** before starting the next mission!

Need specific coordinates, vehicle matchups, or heist preparation steps? Just ask!`;
  }
}

export const aiService = new AIServiceAdapter();
