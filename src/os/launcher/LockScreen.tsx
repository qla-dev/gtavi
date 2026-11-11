import React, { useState, useEffect } from 'react';
import { Lock, Flashlight, Camera, ChevronUp } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSStatusBar } from '../components/GTAOSStatusBar';
import { audioService } from '../../services/audioService';

export const LockScreen: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const unlockPhone = useOSStore((s) => s.unlockPhone);
  const launchApp = useOSStore((s) => s.launchApp);
  const wallpaper = useOSStore((s) => s.wallpaper);
  const notifications = useOSStore((s) => s.notifications);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFlashlight = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playTap();
    setFlashlightOn(!flashlightOn);
  };

  const handleCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlockPhone();
    launchApp('snapmatic');
  };

  return (
    <div
      onClick={unlockPhone}
      className="absolute inset-0 z-50 flex flex-col justify-between text-white overflow-hidden cursor-pointer select-none"
    >
      {/* Background wallpaper with subtle dim */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#101025]/60 via-black/30 to-[#101025]/90" />

      {/* Status Bar */}
      <GTAOSStatusBar />

      {/* Lock header & clock */}
      <div className="relative z-10 flex flex-col items-center pt-8 px-6 text-center animate-in fade-in duration-300">
        <div className="flex items-center space-x-1.5 text-xs text-white/70 tracking-widest uppercase mb-1">
          <Lock size={12} className="text-pink-400" />
          <span>Leonida OS</span>
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight font-mono text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {time || '19:86'}
        </h1>
        <p className="text-sm font-medium text-pink-200/90 tracking-wide mt-1">
          {dateStr || 'Tuesday, November 10'}
        </p>

        {/* Recent notifications stack preview */}
        {notifications.length > 0 && (
          <div className="mt-8 w-full max-w-xs space-y-2">
            <div className="bg-[#18132F]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-left shadow-xl">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-pink-400">{notifications[0].title}</span>
                <span className="text-[10px] text-white/40">{notifications[0].time}</span>
              </div>
              <p className="text-[11px] text-white/80 line-clamp-2">{notifications[0].message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom unlock hint and shortcuts */}
      <div className="relative z-10 px-8 pb-8 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-1 animate-bounce">
          <ChevronUp size={20} className="text-pink-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-white/80">
            Swipe up or Tap to Unlock
          </span>
        </div>

        {/* Quick buttons */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleFlashlight}
            className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all ${
              flashlightOn
                ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_#f59e0b]'
                : 'bg-black/40 border-white/20 text-white hover:bg-black/60'
            }`}
            title="Toggle Flashlight"
          >
            <Flashlight size={20} />
          </button>

          <button
            onClick={handleCamera}
            className="w-12 h-12 rounded-full bg-black/40 border border-white/20 text-white hover:bg-black/60 flex items-center justify-center backdrop-blur-xl active:scale-90 transition-all"
            title="Quick Snapmatic"
          >
            <Camera size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
