import React from 'react';
import { Bell, X } from 'lucide-react';
import { OSNotification } from '../../types';

interface GTAOSNotificationProps {
  notification: OSNotification;
  onDismiss: () => void;
  onClick: () => void;
}

export const GTAOSNotification: React.FC<GTAOSNotificationProps> = ({
  notification,
  onDismiss,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-[#1A1433]/90 hover:bg-[#1A1433] backdrop-blur-xl border border-pink-500/30 rounded-2xl p-3 shadow-xl flex items-center justify-between cursor-pointer transition-all select-none"
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shrink-0">
          <Bell size={15} />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white tracking-wide truncate">
              {notification.title}
            </span>
            <span className="text-[10px] text-pink-400 font-mono">{notification.time}</span>
          </div>
          <p className="text-[11px] text-white/70 truncate">{notification.message}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10"
      >
        <X size={13} />
      </button>
    </div>
  );
};
