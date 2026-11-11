import { api } from './api';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  category?: 'map' | 'vehicle' | 'heist' | 'tips' | 'intel';
}

export class AIServiceAdapter {
  async askCopilot(userQuery: string, history: AIMessage[] = []): Promise<string> {
    try {
      const apiHistory = history
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const { reply } = await api.aiChat(userQuery, apiHistory);
      return reply;
    } catch {
      return this.localFallback(userQuery);
    }
  }

  private localFallback(query: string): string {
    const q = query.toLowerCase();

    if (/car|vehicle|fast|supercar|speed/.test(q)) {
      return `🏎️ **V.I.C.E. Fleet Intel — Fastest Rides in Vice City:**
- **Pegassi Infernus GTS ($1,450,000):** 215 MPH top speed, AWD grip.
- **Grotti Cheetah Classic ($865,000):** Iconic mid-engine 80s supercar.
- **Pfister Comet S2 Cabrio ($1,780,000):** Superior launch control.

*Tactical Tip:* Head to the Chop Shop in Little Haiti for EMS Level 4 and Turbo tuning!`;
    }

    if (/heist|rob|bank|score|vault/.test(q)) {
      return `💼 **First Vice Federal Vault — Infiltration Assessment:**
1. Rooftop AC Approach at 03:15 AM during shift turnover.
2. Pick up thermite from Cal Hampton's salvage yard in Little Haiti.
3. Getaway: reinforced AWD vehicle in the subterranean garage.
4. Estimated Score: $2,400,000 in bearer bonds.`;
    }

    if (/safehouse|property|house|penthouse|mansion/.test(q)) {
      return `🌴 **Top Safehouse Recommendations:**
- **Ocean Beach Penthouse 42:** Highest view, 10-car garage.
- **Starfish Island Villa:** Deepwater dock, private helipad.
- **Pelican Reef Stilt Shack:** Zero police radar coverage.`;
    }

    if (/police|cop|escape|wanted|heat|star/.test(q)) {
      return `🚨 **Escaping 5-Star Heat:**
- Avoid MacArthur Causeway (roadblocks with spikes).
- Go aquatic — Jet Ski into Atlantic reef channels.
- Chop Shop respray in Little Haiti drops heat instantly.`;
    }

    return `⚡ **V.I.C.E. OS Dispatch:**
Analyzing Leonida satellite telemetry for: *"${query}"*...

- **Sector Status:** Clear across Vice Beach and Downtown.
- **Tactical Intel:** High-value weapon shipments arriving at Port Gellhorn tonight.
- **Recommended:** Check **Leonida Maps** for waypoints or tune up your ride in **Garage**!

Need coordinates, vehicle matchups, or heist prep? Just ask!`;
  }
}

export const aiService = new AIServiceAdapter();
