import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Lock, Sparkles, Navigation } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSStatusBar } from '../components/GTAOSStatusBar';
import { GTAOSDynamicIsland } from '../components/GTAOSDynamicIsland';
import { GTAOSAppIcon } from '../components/GTAOSAppIcon';
import { AppId } from '../../types';

export const Launcher: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const launchApp = useOSStore((s) => s.launchApp);
  const wallpaper = useOSStore((s) => s.wallpaper);
  const lockPhone = useOSStore((s) => s.lockPhone);
  const bankBalance = useOSStore((s) => s.bankBalance);
  const activeWaypoint = useOSStore((s) => s.activeWaypoint);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Primary 10 OS applications
  const mainApps: Array<{ id: AppId; name: string; badge?: number | string }> = [
    { id: 'maps', name: 'Maps' },
    { id: 'garage', name: 'Garage' },
    { id: 'snapmatic', name: 'Snapmatic' },
    { id: 'social', name: 'Bleeter', badge: 3 },
    { id: 'properties', name: 'Dynasty 8' },
    { id: 'checklist', name: 'Checklist' },
    { id: 'contacts', name: 'Messages', badge: 2 },
    { id: 'news', name: 'Weazel News', badge: 'LIVE' },
    { id: 'ai', name: 'V.I.C.E. AI' },
    { id: 'settings', name: 'Settings' }
  ];

  // Dock items
  const dockApps: Array<{ id: AppId; name: string; badge?: number | string }> = [
    { id: 'contacts', name: 'Messages', badge: 2 },
    { id: 'social', name: 'Bleeter', badge: 3 },
    { id: 'maps', name: 'Maps' },
    { id: 'snapmatic', name: 'Camera' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {/* Atmospheric Vice City Sunset / Midnight Mesh Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101025]/50 via-transparent to-[#101025]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,79,145,0.15),transparent_60%)] pointer-events-none" />

      {/* Dynamic Island and Status Bar */}
      <GTAOSStatusBar />
      <GTAOSDynamicIsland />

      {/* Main Home Screen Scrollable Area */}
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-3 pb-2 overflow-y-auto no-scrollbar space-y-4">
        {/* Top Header Widget: Clock & Quick Account Pill */}
        <div className="flex items-start justify-between px-2 pt-1">
          <div>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-4xl font-extrabold font-mono text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {time || '19:86'}
              </h2>
              <span className="text-xs font-semibold text-pink-300 tracking-wide uppercase font-mono">
                {dateStr}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">
                Vice City, Leonida
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <button
              onClick={lockPhone}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-colors"
              title="Lock Device"
            >
              <Lock size={13} />
            </button>
            <div className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
              ${bankBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Vice City Weather & Waypoint Widget */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Weather Widget */}
          <div className="bg-[#191433]/75 backdrop-blur-xl border border-pink-500/20 hover:border-pink-500/40 rounded-2xl p-3 shadow-lg flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                Vice Beach
              </span>
              <Sun size={16} className="text-amber-400 animate-spin-slow" />
            </div>
            <div className="my-1">
              <span className="text-2xl font-bold font-mono text-white">86°F</span>
              <p className="text-[10px] text-white/70">Partly Sunny • 82% Humid</p>
            </div>
            <div className="flex items-center space-x-1 text-[9px] text-pink-300 font-semibold">
              <CloudRain size={10} />
              <span>Keys Storm Alert 18:00</span>
            </div>
          </div>

          {/* Active Intel / Waypoint Widget */}
          <div
            onClick={() => launchApp('maps')}
            className="bg-[#131733]/75 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl p-3 shadow-lg flex flex-col justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                GPS Radar
              </span>
              <Navigation size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="my-1">
              <p className="text-xs font-bold text-white truncate">
                {activeWaypoint ? activeWaypoint.name : 'Ocean Beach Safehouse'}
              </p>
              <p className="text-[10px] text-cyan-300/80 truncate">
                {activeWaypoint ? activeWaypoint.district : 'Tap to open Leonida Map'}
              </p>
            </div>
            <div className="flex items-center space-x-1 text-[9px] text-white/50">
              <Sparkles size={10} className="text-cyan-400" />
              <span>35 POIs Charted</span>
            </div>
          </div>
        </div>

        {/* 4-Column Applications Grid */}
        <div className="pt-2">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 justify-items-center">
            {mainApps.map((app) => (
              <GTAOSAppIcon
                key={app.id}
                id={app.id}
                name={app.name}
                badge={app.badge}
                onClick={() => launchApp(app.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Translucent Glass Bottom Dock */}
      <div className="relative z-20 px-4 pb-2 pt-1">
        <div className="w-full bg-[#15112B]/80 backdrop-blur-2xl border border-white/15 rounded-[28px] p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-around">
          {dockApps.map((app) => (
            <GTAOSAppIcon
              key={`dock_${app.id}`}
              id={app.id}
              name={app.name}
              badge={app.badge}
              size={52}
              showLabel={false}
              onClick={() => launchApp(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
