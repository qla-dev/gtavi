import React from 'react';
import { X } from 'lucide-react';

interface GTAOSBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export const GTAOSBottomSheet: React.FC<GTAOSBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = 'max-h-[85%]'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Sheet Content */}
      <div
        className={`relative w-full ${maxHeight} bg-[#18132F] border-t border-pink-500/30 rounded-t-[28px] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300`}
      >
        {/* Drag handle */}
        <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-white/25" />
        </div>

        {/* Header */}
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#FF4F91]" />
            <span>{title}</span>
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
};
