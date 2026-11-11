import React from 'react';
import { audioService } from '../../services/audioService';

interface GTAOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  glow?: boolean;
}

export const GTAOSButton: React.FC<GTAOSButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  glow = false,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      audioService.playTap();
      onClick?.(e);
    }
  };

  const baseStyle =
    'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-150 rounded-xl cursor-pointer select-none active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2.5 gap-2',
    lg: 'text-sm px-5 py-3.5 gap-2.5'
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#FF4F91] to-[#FF914D] text-white hover:brightness-110 shadow-lg shadow-pink-500/25 border border-white/20',
    secondary:
      'bg-gradient-to-r from-[#48C9FF] to-[#9D67FF] text-white hover:brightness-110 shadow-lg shadow-cyan-500/25 border border-white/20',
    accent:
      'bg-[#9D67FF] text-white hover:bg-[#8B50F7] shadow-lg shadow-purple-500/30 border border-purple-400/30',
    outline:
      'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md',
    danger:
      'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:brightness-110 shadow-lg shadow-red-500/30 border border-red-400/30',
    ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/5'
  };

  const glowStyle = glow ? 'shadow-[0_0_20px_rgba(255,79,145,0.45)]' : '';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${glowStyle} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
