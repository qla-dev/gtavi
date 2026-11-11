import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Smartphone,
  Star,
  RefreshCw,
  Check,
  Shield,
  CreditCard,
  Wifi,
  Radio
} from 'lucide-react';
import { useOSStore, WALLPAPERS } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSSwitch } from '../../os/components/GTAOSSwitch';
import { GTAOSListItem } from '../../os/components/GTAOSListItem';
import { GTAOSButton } from '../../os/components/GTAOSButton';

export const SettingsApp: React.FC = () => {
  const wallpaper = useOSStore((s) => s.wallpaper);
  const setWallpaper = useOSStore((s) => s.setWallpaper);
  const soundEnabled = useOSStore((s) => s.soundEnabled);
  const toggleSound = useOSStore((s) => s.toggleSound);
  const wantedLevel = useOSStore((s) => s.wantedLevel);
  const setWantedLevel = useOSStore((s) => s.setWantedLevel);
  const bankBalance = useOSStore((s) => s.bankBalance);
  const resetToDefaults = useOSStore((s) => s.resetToDefaults);

  const [airplaneMode, setAirplaneMode] = useState(false);
  const [haptics, setHaptics] = useState(true);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0F0D24] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Settings"
        subtitle="LeonidaOS 6.1 • iFruit 16 Pro"
        accentColor="#B7AFCB"
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 no-scrollbar">
        {/* Leonida Driver's License / Outlaw Profile Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#221845] to-[#161030] border border-pink-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3.5 mb-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="Driver"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-500/60 shadow-md"
            />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-bold">
                State of Leonida ID
              </span>
              <h3 className="text-base font-extrabold text-white font-mono">Jason Duval</h3>
              <p className="text-xs text-white/60">Vice City Outlaw • #VC-99410</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
            <div className="p-2 rounded-xl bg-black/30">
              <span className="text-[9px] text-white/50 uppercase block">Syndicate Balance</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">
                ${bankBalance.toLocaleString()}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/30">
              <span className="text-[9px] text-white/50 uppercase block">Affiliation</span>
              <span className="font-bold text-pink-300 text-xs">Vice Beach Crew</span>
            </div>
          </div>
        </div>

        {/* Wanted Level Simulator (Interactive signature GTA feature!) */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-white/70 block px-1">
            Police Heat / Wanted Level
          </label>
          <div className="p-3.5 rounded-2xl bg-[#1A1438] border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setWantedLevel(wantedLevel === star ? 0 : star)}
                  className="p-1 text-white hover:scale-125 transition-transform"
                >
                  <Star
                    size={22}
                    className={`${
                      star <= wantedLevel
                        ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_8px_#f59e0b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-pink-400">
              {wantedLevel === 0 ? 'No Heat' : `${wantedLevel} Star Wanted`}
            </span>
          </div>
        </div>

        {/* Wallpaper Picker Section */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-white/70 block px-1">
            OS Wallpaper
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {WALLPAPERS.map((wp) => {
              const isSelected = wallpaper === wp.url;
              return (
                <div
                  key={wp.id}
                  onClick={() => setWallpaper(wp.url)}
                  className={`group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    isSelected
                      ? 'border-pink-500 shadow-[0_0_15px_rgba(255,79,145,0.4)] scale-105'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-semibold text-white/90 truncate">
                    {wp.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio & Network Controls */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-white/70 block px-1">
            System Preferences
          </label>
          <div className="p-3 rounded-2xl bg-[#1A1438] border border-white/10 space-y-1">
            <GTAOSSwitch
              checked={soundEnabled}
              onChange={toggleSound}
              label="UI Sound Effects"
              description="Synthesized 80s feedback & ringtones"
            />
            <div className="h-px bg-white/5 my-1" />
            <GTAOSSwitch
              checked={airplaneMode}
              onChange={setAirplaneMode}
              label="Airplane Mode"
              description="Disable cellular data"
            />
          </div>
        </div>

        {/* About Device Section */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-white/70 block px-1">
            About Device
          </label>
          <div className="p-3.5 rounded-2xl bg-[#1A1438] border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-white/50">Model</span>
              <span className="font-semibold text-white">iFruit 16 Vice Pro Max</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">OS Version</span>
              <span className="font-semibold text-pink-400 font-mono">LeonidaOS 6.1 (Build VC-2026)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Network</span>
              <span className="font-semibold text-cyan-300">ViceMobile 5G LTE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Rockstar Game Services</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected</span>
              </span>
            </div>
          </div>
        </div>

        {/* Reset State Button */}
        <div className="pt-2 pb-6">
          <GTAOSButton
            fullWidth
            variant="outline"
            icon={<RefreshCw size={14} />}
            onClick={resetToDefaults}
          >
            Reset OS Demo State
          </GTAOSButton>
        </div>
      </div>
    </div>
  );
};
