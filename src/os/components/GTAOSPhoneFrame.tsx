import React, { useState } from 'react';
import { Maximize2, Minimize2, Smartphone } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const GTAOSPhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const closeApp = useOSStore((s) => s.closeApp);
  const activeApp = useOSStore((s) => s.activeApp);
  const [forceFullScreen, setForceFullScreen] = useState(false);

  return (
    <div className="w-full h-[100dvh] bg-[#080712] flex items-center justify-center overflow-hidden relative select-none">
      {/* Background ambient neon glow for desktop wrapper */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Desktop Helper Toolbar */}
      <div className="hidden lg:flex fixed top-4 right-4 z-50 items-center space-x-2 bg-[#17132B]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-2xl text-xs text-white/80">
        <Smartphone size={14} className="text-pink-400" />
        <span className="font-mono text-[11px] font-semibold text-white/90">iFruit 16 Vice Pro Max</span>
        <div className="w-px h-3 bg-white/20" />
        <button
          onClick={() => setForceFullScreen(!forceFullScreen)}
          className="hover:text-pink-400 transition-colors flex items-center space-x-1"
          title="Toggle Mobile Frame / Full Window"
        >
          {forceFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span className="text-[10px]">{forceFullScreen ? 'Phone Frame' : 'Full Screen'}</span>
        </button>
      </div>

      {/* Phone Shell / Viewport */}
      <div
        className={`relative flex flex-col overflow-hidden transition-all duration-300 ${
          forceFullScreen
            ? 'w-full h-full rounded-none border-none'
            : 'w-full h-[100dvh] sm:w-[412px] sm:h-[870px] sm:max-h-[96dvh] sm:rounded-[52px] sm:border-[8px] sm:border-[#2A2445] sm:ring-1 sm:ring-white/20 sm:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(255,79,145,0.2)]'
        }`}
      >
        {/* Device screen contents */}
        <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden bg-[#101025]">
          {children}

          {/* Bottom Home Indicator Gesture Bar */}
          <div
            onClick={closeApp}
            className="w-full h-6 shrink-0 flex items-center justify-center cursor-pointer bg-gradient-to-t from-[#101025]/80 to-transparent z-40 group hover:opacity-100 transition-opacity"
            title="Click or tap to go Home"
          >
            <div
              className={`w-36 h-1 rounded-full transition-all duration-200 group-hover:w-44 group-hover:h-1.5 ${
                activeApp ? 'bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/40'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
