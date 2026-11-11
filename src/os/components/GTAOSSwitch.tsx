import React from 'react';
import { audioService } from '../../services/audioService';

interface GTAOSSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const GTAOSSwitch: React.FC<GTAOSSwitchProps> = ({
  checked,
  onChange,
  label,
  description
}) => {
  const toggle = () => {
    audioService.playTap();
    onChange(!checked);
  };

  return (
    <div
      onClick={toggle}
      className="flex items-center justify-between py-2 cursor-pointer select-none group"
    >
      <div className="pr-4">
        {label && (
          <p className="text-xs font-semibold text-white group-hover:text-pink-300 transition-colors">
            {label}
          </p>
        )}
        {description && <p className="text-[10px] text-white/50">{description}</p>}
      </div>
      <div
        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 border ${
          checked
            ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-400/40 shadow-[0_0_12px_rgba(255,79,145,0.4)]'
            : 'bg-white/10 border-white/10'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-md ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};
