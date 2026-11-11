import React from 'react';
import { Search, X } from 'lucide-react';

interface GTAOSSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const GTAOSSearchBar: React.FC<GTAOSSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search size={15} className="absolute left-3.5 text-white/40 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#130E26]/90 border border-white/10 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/50 transition-all font-medium"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};
