import React from 'react';
import { AppId } from '../../types';
import { GTAAppIconGraphic } from '../theme/appIcons';

interface GTAOSAppIconProps {
  id: AppId;
  name: string;
  badge?: number | string;
  onClick: () => void;
  size?: number;
  showLabel?: boolean;
}

export const GTAOSAppIcon: React.FC<GTAOSAppIconProps> = ({
  id,
  name,
  badge,
  onClick,
  size = 58,
  showLabel = true
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center group focus:outline-none transition-transform duration-150 active:scale-90"
    >
      <div className="relative cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(255,79,145,0.35)] rounded-[25%]">
        <div className="rounded-[25%] overflow-hidden">
          <GTAAppIconGraphic id={id} size={size} className="drop-shadow-lg transition-transform block" />
        </div>

        {/* Badge counter — outside overflow-hidden so it doesn't get clipped */}
        {badge !== undefined && badge !== 0 && (
          <div className="absolute -top-1.5 -right-1.5 z-10 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 border border-white/40 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-pink-500/50 animate-bounce">
            {badge}
          </div>
        )}
      </div>

      {showLabel && (
        <span className="mt-1.5 text-[11px] font-semibold tracking-tight text-white/90 text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-[68px] truncate">
          {name}
        </span>
      )}
    </button>
  );
};
