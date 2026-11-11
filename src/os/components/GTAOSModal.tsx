import React from 'react';
import { X } from 'lucide-react';

interface GTAOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const GTAOSModal: React.FC<GTAOSModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-sm bg-[#1A1433] border border-pink-500/30 rounded-3xl p-5 shadow-[0_0_50px_rgba(255,79,145,0.2)] z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#48C9FF]" />
            <span>{title}</span>
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        <div className="text-white text-xs space-y-4">{children}</div>
      </div>
    </div>
  );
};
