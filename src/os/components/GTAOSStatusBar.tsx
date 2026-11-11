import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Star } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface StatusBarProps {
  variant?: 'light' | 'dark' | 'transparent';
}

export const GTAOSStatusBar: React.FC<StatusBarProps> = ({ variant = 'transparent' }) => {
  const [time, setTime] = useState<string>('');
  const wantedLevel = useOSStore((s) => s.wantedLevel);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full px-5 pt-3 pb-1.5 flex items-center justify-between text-xs z-40 transition-colors select-none ${
        variant === 'dark' ? 'bg-[#101025]/90 backdrop-blur-md text-white' : 'text-white'
      }`}
    >
      {/* Left: Time & Carrier */}
      <div className="flex items-center space-x-2">
        <span className="font-bold tracking-tight text-[13px] font-mono">{time || '19:86'}</span>
        <span className="text-[10px] font-semibold tracking-wider text-pink-400/90 uppercase hidden sm:inline">
          Vice 5G
        </span>
      </div>

      {/* Wanted level stars (GTA signature feature) */}
      {wantedLevel > 0 && (
        <div className="flex items-center space-x-0.5 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500/40 animate-pulse">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={11}
              className={`${
                star <= wantedLevel
                  ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_6px_#f59e0b]'
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* Right: Signal, Wifi, Battery */}
      <div className="flex items-center space-x-2 text-white/90">
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-0.5 h-1 bg-white/70 rounded-full" />
          <div className="w-0.5 h-1.5 bg-white/70 rounded-full" />
          <div className="w-0.5 h-2 bg-white rounded-full" />
          <div className="w-0.5 h-2.5 bg-white rounded-full" />
        </div>
        <Wifi size={13} className="text-white/80" />
        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-mono text-white/80">96%</span>
          <BatteryMedium size={15} className="text-emerald-400 rotate-90" />
        </div>
      </div>
    </div>
  );
};
