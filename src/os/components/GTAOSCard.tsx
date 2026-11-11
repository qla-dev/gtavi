import React from 'react';

interface GTAOSCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  borderGlow?: 'pink' | 'cyan' | 'orange' | 'purple' | 'none';
}

export const GTAOSCard: React.FC<GTAOSCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
  borderGlow = 'none'
}) => {
  const glowClasses = {
    none: 'border-white/10',
    pink: 'border-pink-500/30 hover:border-pink-500/60 shadow-[0_4px_20px_rgba(255,79,145,0.15)]',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_4px_20px_rgba(72,201,255,0.15)]',
    orange: 'border-orange-500/30 hover:border-orange-500/60 shadow-[0_4px_20px_rgba(255,145,77,0.15)]',
    purple: 'border-purple-500/30 hover:border-purple-500/60 shadow-[0_4px_20px_rgba(157,103,255,0.15)]'
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-[#1C1736]/80 backdrop-blur-xl border ${glowClasses[borderGlow]} ${
        hoverEffect ? 'transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      {/* Subtle glossy top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl pointer-events-none" />
      {children}
    </div>
  );
};
