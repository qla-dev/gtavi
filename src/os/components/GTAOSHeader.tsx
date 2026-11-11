import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface GTAOSHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  accentColor?: string;
}

export const GTAOSHeader: React.FC<GTAOSHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  rightAction,
  accentColor = '#FF4F91'
}) => {
  const closeApp = useOSStore((s) => s.closeApp);
  const goBack = useOSStore((s) => s.goBack);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <div className="w-full bg-[#18132F]/85 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-30 shrink-0 select-none">
      <div className="flex items-center space-x-2">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/90 active:scale-90 transition-all border border-white/10"
            title="Go back"
          >
            <ArrowLeft size={16} />
          </button>
        ) : (
          <button
            onClick={closeApp}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/90 active:scale-90 transition-all border border-white/10"
            title="Return to Home"
          >
            <Home size={16} />
          </button>
        )}

        <div className="leading-tight">
          <div className="flex items-center space-x-1.5">
            <span
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
            />
            <h1 className="text-sm font-bold tracking-wider uppercase text-white font-mono">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-[10px] text-white/50 pl-3 font-medium tracking-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1.5">
        {rightAction}
        <button
          onClick={closeApp}
          className="w-8 h-8 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/20 active:scale-90 transition-all"
          title="Minimize to Home"
        >
          <Home size={15} />
        </button>
      </div>
    </div>
  );
};
