import React from 'react';

interface GTAOSProgressBarProps {
  value: number; // 0-100
  label?: string;
  sublabel?: string;
  color?: 'pink' | 'cyan' | 'orange' | 'purple' | 'green';
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const GTAOSProgressBar: React.FC<GTAOSProgressBarProps> = ({
  value,
  label,
  sublabel,
  color = 'pink',
  showPercent = true,
  size = 'md'
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  const colorStyles = {
    pink: 'from-pink-500 to-rose-500 shadow-[0_0_10px_#FF4F91]',
    cyan: 'from-cyan-400 to-blue-500 shadow-[0_0_10px_#48C9FF]',
    orange: 'from-amber-400 to-orange-500 shadow-[0_0_10px_#FF914D]',
    purple: 'from-purple-500 to-indigo-600 shadow-[0_0_10px_#9D67FF]',
    green: 'from-emerald-400 to-teal-500 shadow-[0_0_10px_#10B981]'
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="w-full space-y-1">
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            {label && <span className="font-semibold text-white/90">{label}</span>}
            {sublabel && <span className="text-[10px] text-white/50">{sublabel}</span>}
          </div>
          {showPercent && (
            <span className="font-mono font-bold text-white/80 text-[11px]">{Math.round(clamped)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#110D24] rounded-full overflow-hidden border border-white/5 p-0.5 ${heightStyles[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorStyles[color]} transition-all duration-300`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
