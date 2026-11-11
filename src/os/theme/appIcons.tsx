import React from 'react';
import { AppId } from '../../types';

interface AppIconProps {
  id: AppId;
  size?: number;
  className?: string;
}

export const GTAAppIconGraphic: React.FC<AppIconProps> = ({ id, size = 64, className = '' }) => {
  switch (id) {
    case 'maps':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="map_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>
            <linearGradient id="neon_route" x1="10" y1="70" x2="70" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4F91" />
              <stop offset="100%" stopColor="#48C9FF" />
            </linearGradient>
            <filter id="glow_route" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#map_bg)" />
          {/* Grid lines */}
          <line x1="20" y1="0" x2="20" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="60" y1="0" x2="60" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="0" y1="28" x2="80" y2="28" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="0" y1="56" x2="80" y2="56" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          {/* Island Landmass silhouette */}
          <path d="M12 60C18 45 32 40 45 48C58 56 68 40 70 30C72 20 62 14 50 16C38 18 25 28 15 36Z" fill="#1E293B" opacity="0.8" />
          {/* Neon Highway Route */}
          <path d="M14 68C24 62 30 38 48 40C62 42 66 22 66 18" stroke="url(#neon_route)" strokeWidth="4.5" strokeLinecap="round" filter="url(#glow_route)" />
          {/* Radar target pin */}
          <circle cx="66" cy="18" r="6" fill="#FF4F91" />
          <circle cx="66" cy="18" r="10" stroke="#FF4F91" strokeWidth="1.5" opacity="0.7" />
          <circle cx="66" cy="18" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'garage':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="garage_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#31102A" />
              <stop offset="60%" stopColor="#1B0F2A" />
              <stop offset="100%" stopColor="#0B0918" />
            </linearGradient>
            <linearGradient id="car_body" x1="16" y1="40" x2="64" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF914D" />
              <stop offset="50%" stopColor="#FF4F91" />
              <stop offset="100%" stopColor="#9D67FF" />
            </linearGradient>
            <linearGradient id="tach_glow" x1="20" y1="20" x2="60" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#48C9FF" />
              <stop offset="100%" stopColor="#FF4F91" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#garage_bg)" />
          {/* Speedometer arc */}
          <path d="M22 42 A22 22 0 1 1 58 42" stroke="url(#tach_glow)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2" opacity="0.6" />
          {/* Exotic Supercar Silhouette */}
          <path d="M14 54C16 52 20 51 25 50L32 40C36 34 46 33 54 38L65 47C68 49 70 52 68 56L66 58C65 59 62 60 58 60L22 60C18 60 14 57 14 54Z" fill="url(#car_body)" />
          {/* Cockpit canopy */}
          <path d="M34 41C37 36 45 35 52 39L59 46C53 46 42 45 34 41Z" fill="#101025" opacity="0.85" />
          {/* Wheels */}
          <circle cx="26" cy="58" r="6" fill="#0F172A" stroke="#FF4F91" strokeWidth="2" />
          <circle cx="26" cy="58" r="2.5" fill="#48C9FF" />
          <circle cx="56" cy="58" r="6" fill="#0F172A" stroke="#FF4F91" strokeWidth="2" />
          <circle cx="56" cy="58" r="2.5" fill="#48C9FF" />
          {/* Underglow */}
          <line x1="20" y1="65" x2="62" y2="65" stroke="#FF4F91" strokeWidth="2" opacity="0.8" filter="drop-shadow(0 0 6px #FF4F91)" />
        </svg>
      );

    case 'snapmatic':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="cam_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E1338" />
              <stop offset="50%" stopColor="#2A1B4E" />
              <stop offset="100%" stopColor="#4A154B" />
            </linearGradient>
            <linearGradient id="lens_ring" x1="24" y1="24" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#48C9FF" />
              <stop offset="50%" stopColor="#9D67FF" />
              <stop offset="100%" stopColor="#FF4F91" />
            </linearGradient>
            <linearGradient id="aperture" x1="30" y1="30" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF914D" />
              <stop offset="100%" stopColor="#FF4F91" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#cam_bg)" />
          {/* Camera body outline */}
          <path d="M22 28C22 25 24 23 27 23H33L36 19H44L47 23H53C56 23 58 25 58 28V53C58 56 56 58 53 58H27C24 58 22 56 22 53V28Z" fill="#140E26" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {/* Big Lens */}
          <circle cx="40" cy="41" r="15" fill="#0C0A19" stroke="url(#lens_ring)" strokeWidth="3" />
          <circle cx="40" cy="41" r="8" fill="url(#aperture)" />
          {/* Glass reflection */}
          <circle cx="37" cy="38" r="3" fill="#FFFFFF" opacity="0.8" />
          {/* Shutter dot & flash */}
          <circle cx="28" cy="28" r="2.5" fill="#48C9FF" />
          <rect x="49" y="27" width="5" height="3" rx="1.5" fill="#FF914D" />
        </svg>
      );

    case 'social':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="social_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4F91" />
              <stop offset="50%" stopColor="#C026D3" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#social_bg)" />
          {/* Satirical Bleeter bird / speech wave icon */}
          <path d="M20 38C20 27 29 18 40 18C51 18 60 27 60 38C60 48 52 56 42 57L33 63L35 55C26 53 20 46 20 38Z" fill="#FFFFFF" />
          {/* Neon heart & megaphone wave inside */}
          <path d="M40 32C42 29 46 29 48 31C50 33 50 37 47 40L40 47L33 40C30 37 30 33 32 31C34 29 38 29 40 32Z" fill="#FF4F91" />
          {/* Pulse spark */}
          <circle cx="56" cy="24" r="4" fill="#48C9FF" />
        </svg>
      );

    case 'properties':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="prop_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="50%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>
            <linearGradient id="gold_grad" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#prop_bg)" />
          {/* Dynasty 8 luxury mansion roofline */}
          <path d="M40 16L64 34V62H16V34L40 16Z" fill="#042017" stroke="url(#gold_grad)" strokeWidth="2.5" />
          {/* Art deco palm tree behind */}
          <path d="M54 26C58 24 64 25 66 28C64 30 60 30 56 31Z" fill="#10B981" />
          {/* Penthouse windows */}
          <rect x="25" y="40" width="8" height="12" rx="2" fill="#FCD34D" opacity="0.9" />
          <rect x="36" y="38" width="8" height="14" rx="2" fill="#FCD34D" opacity="0.9" />
          <rect x="47" y="40" width="8" height="12" rx="2" fill="#FCD34D" opacity="0.9" />
          {/* Grand doorway */}
          <path d="M35 54H45V62H35V54Z" fill="url(#gold_grad)" />
          {/* Number 8 luxury emblem */}
          <circle cx="40" cy="27" r="4" stroke="url(#gold_grad)" strokeWidth="1.5" />
        </svg>
      );

    case 'checklist':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="chk_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="chk_gold" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF914D" />
              <stop offset="100%" stopColor="#FF4F91" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#chk_bg)" />
          {/* Circular badge */}
          <circle cx="40" cy="40" r="26" stroke="#48C9FF" strokeWidth="3" strokeDasharray="140 30" strokeLinecap="round" />
          {/* "100%" bold typography */}
          <text x="40" y="36" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="Rajdhani, sans-serif" letterSpacing="1">100%</text>
          {/* Checkmark flourish */}
          <path d="M28 46L36 54L52 38" stroke="url(#chk_gold)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'contacts':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="phone_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#phone_bg)" />
          {/* Chat bubble */}
          <path d="M20 28C20 24 23 21 27 21H53C57 21 60 24 60 28V44C60 48 57 51 53 51H35L25 59V51H27C23 51 20 48 20 44V28Z" fill="#FFFFFF" />
          {/* Chat dots */}
          <circle cx="33" cy="36" r="3" fill="#059669" />
          <circle cx="43" cy="36" r="3" fill="#059669" />
          <circle cx="53" cy="36" r="3" fill="#059669" opacity="0.6" />
        </svg>
      );

    case 'news':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="news_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B91C1C" />
              <stop offset="50%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#news_bg)" />
          {/* Weazel News "W" lightning bolt logo */}
          <path d="M18 26L27 54H33L40 36L47 54H53L62 26H53L46 45L41 31H39L34 45L27 26H18Z" fill="#FFFFFF" />
          {/* Live broadcast pill */}
          <rect x="22" y="60" width="36" height="8" rx="4" fill="#FEF08A" />
          <text x="40" y="66" textAnchor="middle" fill="#7F1D1D" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">WEAZEL LIVE</text>
        </svg>
      );

    case 'ai':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="ai_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E1035" />
              <stop offset="50%" stopColor="#3B0764" />
              <stop offset="100%" stopColor="#170629" />
            </linearGradient>
            <linearGradient id="ai_orb" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#48C9FF" />
              <stop offset="50%" stopColor="#9D67FF" />
              <stop offset="100%" stopColor="#FF4F91" />
            </linearGradient>
            <filter id="ai_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#ai_bg)" />
          {/* Cybernetic V.I.C.E. Brain Core */}
          <circle cx="40" cy="40" r="18" fill="url(#ai_orb)" filter="url(#ai_glow)" />
          <circle cx="40" cy="40" r="10" fill="#170629" />
          {/* Neural Ring Radiations */}
          <circle cx="40" cy="40" r="26" stroke="#48C9FF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
          {/* V letter monogram inside */}
          <path d="M35 34L40 44L45 34" stroke="#48C9FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
          <defs>
            <linearGradient id="set_bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="gear_metal" x1="24" y1="24" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="20" fill="url(#set_bg)" />
          {/* Industrial Cogwheel */}
          <circle cx="40" cy="40" r="18" fill="none" stroke="url(#gear_metal)" strokeWidth="6" strokeDasharray="7 2" />
          <circle cx="40" cy="40" r="8" fill="#1E293B" stroke="#FF4F91" strokeWidth="2" />
          {/* Neon adjustment sliders */}
          <line x1="28" y1="62" x2="52" y2="62" stroke="#48C9FF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="62" r="3" fill="#FF4F91" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className="rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-white"
        >
          GTA
        </div>
      );
  }
};
