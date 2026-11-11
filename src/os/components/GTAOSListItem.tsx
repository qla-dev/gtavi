import React from 'react';
import { ChevronRight } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface GTAOSListItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
  className?: string;
  badge?: string;
}

export const GTAOSListItem: React.FC<GTAOSListItemProps> = ({
  title,
  subtitle,
  icon,
  rightElement,
  onClick,
  showChevron = false,
  className = '',
  badge
}) => {
  const handleClick = () => {
    if (onClick) {
      audioService.playTap();
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between p-3.5 rounded-2xl bg-[#1C1736]/60 hover:bg-[#1C1736]/90 border border-white/5 hover:border-pink-500/30 transition-all select-none ${
        onClick ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-pink-400">
            {icon}
          </div>
        )}
        <div className="overflow-hidden">
          <div className="flex items-center space-x-2">
            <h4 className="text-xs font-semibold text-white truncate">{title}</h4>
            {badge && (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[11px] text-white/50 truncate mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 ml-2">
        {rightElement}
        {showChevron && <ChevronRight size={15} className="text-white/40" />}
      </div>
    </div>
  );
};
