import React from 'react';

interface GTAOSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const GTAOSInput: React.FC<GTAOSInputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-[#130E26]/90 border ${
          error ? 'border-red-500' : 'border-white/10 focus:border-pink-500/60'
        } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-400 font-medium">{error}</p>}
      {helperText && !error && <p className="text-[10px] text-white/40">{helperText}</p>}
    </div>
  );
};
