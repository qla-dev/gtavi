import React from 'react';
import { Phone, Navigation, X, Bell } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const GTAOSDynamicIsland: React.FC = () => {
  const activeCall = useOSStore((s) => s.activeCall);
  const endCall = useOSStore((s) => s.endCall);
  const activeWaypoint = useOSStore((s) => s.activeWaypoint);
  const setWaypoint = useOSStore((s) => s.setWaypoint);
  const activeNotification = useOSStore((s) => s.activeNotification);
  const dismissNotification = useOSStore((s) => s.dismissNotification);
  const launchApp = useOSStore((s) => s.launchApp);

  // If there's an active notification
  if (activeNotification) {
    return (
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-200">
        <div
          onClick={() => {
            launchApp(activeNotification.appId);
            dismissNotification();
          }}
          className="bg-[#18132F]/95 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-3 shadow-2xl flex items-center justify-between cursor-pointer hover:border-pink-500/60 transition-all text-white"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/30">
              <Bell size={16} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white tracking-wide truncate">{activeNotification.title}</span>
                <span className="text-[10px] text-pink-400 font-mono shrink-0">{activeNotification.time}</span>
              </div>
              <p className="text-[11px] text-white/70 truncate">{activeNotification.message}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissNotification();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Active call pill
  if (activeCall) {
    return (
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-auto min-w-[210px] animate-in fade-in duration-200">
        <div
          onClick={() => launchApp('contacts')}
          className="bg-[#140E26]/95 border border-emerald-500/40 rounded-full py-1.5 px-3.5 shadow-2xl flex items-center justify-between cursor-pointer space-x-3 text-white backdrop-blur-xl"
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
              <Phone size={12} className="text-black" />
            </div>
            <span className="text-xs font-bold text-emerald-400">{activeCall.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-white/60 font-mono">00:42</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                endCall();
              }}
              className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500"
            >
              <X size={11} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active GPS Waypoint pill
  if (activeWaypoint) {
    return (
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-auto min-w-[220px] animate-in fade-in duration-200">
        <div
          onClick={() => launchApp('maps')}
          className="bg-[#10142C]/95 border border-cyan-500/40 rounded-full py-1.5 px-3.5 shadow-2xl flex items-center justify-between cursor-pointer space-x-3 text-white backdrop-blur-xl"
        >
          <div className="flex items-center space-x-2 overflow-hidden max-w-[140px]">
            <Navigation size={13} className="text-cyan-400 shrink-0 animate-bounce" />
            <span className="text-xs font-semibold text-cyan-300 truncate">{activeWaypoint.name}</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] text-white/60 font-mono">1.2 MI</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setWaypoint(null);
              }}
              className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default sleek camera notch
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40">
      <div className="h-5 w-24 bg-black/85 rounded-full flex items-center justify-center px-2 space-x-2 border border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#121629] border border-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0d1a]" />
      </div>
    </div>
  );
};
