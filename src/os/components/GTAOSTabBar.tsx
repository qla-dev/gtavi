import React from 'react';
import { audioService } from '../../services/audioService';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface GTAOSTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline' | 'bottom';
  className?: string;
}

export const GTAOSTabBar: React.FC<GTAOSTabBarProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className = ''
}) => {
  const handleSelect = (id: string) => {
    audioService.playTap();
    onChange(id);
  };

  if (variant === 'bottom') {
    return (
      <div className={`w-full bg-[#140E26]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 flex items-center justify-around z-30 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive ? 'text-pink-400 scale-105' : 'text-white/50 hover:text-white/80'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-pink-400 font-bold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-pink-500 mt-0.5 shadow-[0_0_6px_#FF4F91]" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Pill variant
  return (
    <div className={`flex items-center space-x-1.5 overflow-x-auto py-1 px-1 no-scrollbar select-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
              isActive
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25 border border-pink-400/40'
                : 'bg-[#18132F]/80 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                  isActive ? 'bg-white text-pink-600' : 'bg-white/10 text-white/70'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
