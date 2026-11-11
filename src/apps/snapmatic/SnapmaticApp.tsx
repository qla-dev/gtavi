import React, { useState } from 'react';
import {
  Camera,
  Heart,
  Trash2,
  Image as ImageIcon,
  RotateCw,
  Sliders,
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { PhotoCapture } from '../../types';

export const SnapmaticApp: React.FC = () => {
  const captures = useOSStore((s) => s.captures);
  const saveCapture = useOSStore((s) => s.saveCapture);
  const deleteCapture = useOSStore((s) => s.deleteCapture);
  const setWallpaper = useOSStore((s) => s.setWallpaper);

  const [mode, setMode] = useState<'gallery' | 'camera'>('gallery');
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoCapture | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'none' | 'sunset' | 'neon' | 'vhs' | 'grain'>('sunset');
  const [cameraFacing, setCameraFacing] = useState<'rear' | 'front'>('rear');
  const [isFlashing, setIsFlashing] = useState(false);

  // Albums
  const albums = [
    { id: 'all', label: 'All Photos' },
    { id: 'Vice Beach', label: 'Vice Beach' },
    { id: 'Nightlife', label: 'Nightlife' },
    { id: 'Fleet', label: 'Fleet' },
    { id: 'Captures', label: 'Captures' }
  ];

  const filteredCaptures = captures.filter((c) => {
    if (selectedAlbum === 'all') return true;
    return c.album === selectedAlbum;
  });

  const handleCapturePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const scenicPhotos = [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        title: 'Sunset over Ocean Drive Penthouse',
        loc: 'Vice Beach Boardwalk'
      },
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
        title: 'Cheetah Classic Causeway Sprint',
        loc: 'Downtown Vice Expressway'
      },
      {
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
        title: 'Malibu Club Neon Lasers',
        loc: 'The Malibu Club, Vice Beach'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        title: 'Turquoise Waters of Pelican Reef',
        loc: 'Leonida Keys'
      }
    ];

    const randomPick = scenicPhotos[Math.floor(Math.random() * scenicPhotos.length)];

    const newCapture: PhotoCapture = {
      id: `snap_${Date.now()}`,
      title: randomPick.title,
      location: randomPick.loc,
      url: randomPick.url,
      timestamp: 'Just now',
      album: 'Captures',
      iso: 'ISO 400',
      shutter: '1/250s f/1.8',
      isFavorite: false
    };

    saveCapture(newCapture);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0B0918] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Snapmatic"
        subtitle={mode === 'camera' ? 'Live Viewfinder' : `${captures.length} Photos Captured`}
        accentColor="#FF4F91"
        rightAction={
          <button
            onClick={() => setMode(mode === 'camera' ? 'gallery' : 'camera')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center space-x-1.5 ${
              mode === 'camera'
                ? 'bg-pink-500 text-white border-pink-400'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {mode === 'camera' ? <ImageIcon size={13} /> : <Camera size={13} />}
            <span>{mode === 'camera' ? 'Gallery' : 'Camera'}</span>
          </button>
        }
      />

      {/* Mode: Camera Viewfinder */}
      {mode === 'camera' ? (
        <div className="relative flex-1 flex flex-col justify-between overflow-hidden bg-black">
          {/* Flash animation layer */}
          {isFlashing && (
            <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none" />
          )}

          {/* Camera Viewfinder View */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src={
                cameraFacing === 'rear'
                  ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
              }
              alt="Viewfinder"
              className={`w-full h-full object-cover transition-all duration-300 ${
                selectedFilter === 'sunset'
                  ? 'sepia-[0.35] contrast-[1.1] hue-rotate-[-10deg]'
                  : selectedFilter === 'neon'
                  ? 'contrast-[1.25] saturate-[1.6]'
                  : selectedFilter === 'vhs'
                  ? 'contrast-[1.2] saturate-[0.8] brightness-[0.95]'
                  : ''
              }`}
            />

            {/* Scanlines overlay if VHS filter */}
            {selectedFilter === 'vhs' && (
              <div className="absolute inset-0 hud-scanline pointer-events-none opacity-60" />
            )}

            {/* Viewfinder HUD Overlays */}
            <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
              {/* Corner brackets */}
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-2 border-l-2 border-white/60" />
                <div className="w-6 h-6 border-t-2 border-r-2 border-white/60" />
              </div>

              {/* Center crosshair */}
              <div className="self-center w-12 h-12 border border-white/40 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#FF4F91]" />
              </div>

              <div className="flex justify-between items-end">
                <div className="w-6 h-6 border-b-2 border-l-2 border-white/60" />
                <div className="w-6 h-6 border-b-2 border-r-2 border-white/60" />
              </div>
            </div>

            {/* Top Geolocation & Filter Stamp */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] pointer-events-none">
              <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono flex items-center space-x-1">
                <MapPin size={11} className="text-pink-400" />
                <span>Ocean Beach, Vice City</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-pink-300 font-mono uppercase font-bold">
                {selectedFilter} Filter
              </span>
            </div>
          </div>

          {/* Bottom Camera Toolbar */}
          <div className="bg-[#100D24] px-4 py-4 border-t border-white/10 flex flex-col space-y-3 z-20">
            {/* Filter Pills */}
            <div className="flex items-center justify-center space-x-2">
              {[
                { id: 'none', label: 'Normal' },
                { id: 'sunset', label: 'Vice Sunset' },
                { id: 'neon', label: 'Neon Noir' },
                { id: 'vhs', label: 'VHS 86' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors ${
                    selectedFilter === f.id
                      ? 'bg-pink-500 text-white shadow-[0_0_10px_#FF4F91]'
                      : 'bg-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Shutter Controls */}
            <div className="flex items-center justify-around pt-1">
              {/* Flip camera */}
              <button
                onClick={() => setCameraFacing(cameraFacing === 'rear' ? 'front' : 'rear')}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                title="Flip Camera"
              >
                <RotateCw size={18} />
              </button>

              {/* Shutter Button */}
              <button
                onClick={handleCapturePhoto}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 cursor-pointer active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,79,145,0.4)]"
                title="Take Picture"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:brightness-110" />
              </button>

              {/* Return to Gallery */}
              <button
                onClick={() => setMode('gallery')}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                title="View Gallery"
              >
                <ImageIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Mode: Photo Gallery */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Albums bar */}
          <div className="px-4 py-2 bg-[#15102E] border-b border-white/10 z-10">
            <GTAOSTabBar
              tabs={albums}
              activeTab={selectedAlbum}
              onChange={setSelectedAlbum}
            />
          </div>

          {/* Photo Grid */}
          <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-2.5 no-scrollbar">
            {filteredCaptures.map((capture) => (
              <div
                key={capture.id}
                onClick={() => setActivePhoto(capture)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-pink-500/50 cursor-pointer transition-all active:scale-[0.98]"
              >
                <img
                  src={capture.url}
                  alt={capture.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-[11px] font-bold text-white truncate">{capture.title}</p>
                  <p className="text-[9px] text-pink-300 truncate">{capture.location}</p>
                </div>

                {capture.isFavorite && (
                  <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-pink-400">
                    <Heart size={11} className="fill-pink-500 text-pink-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Photo Details Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <GTAOSHeader
            title="Snapmatic Preview"
            subtitle={activePhoto.location}
            showBack={true}
            onBack={() => setActivePhoto(null)}
            rightAction={
              <button
                onClick={() => {
                  deleteCapture(activePhoto.id);
                  setActivePhoto(null);
                }}
                className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30"
              >
                <Trash2 size={15} />
              </button>
            }
          />

          <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>

          {/* Photo Details Footer */}
          <div className="bg-[#140F2C] px-5 py-4 border-t border-white/10 flex flex-col space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{activePhoto.title}</h3>
                <p className="text-xs text-pink-300 flex items-center space-x-1 mt-0.5">
                  <MapPin size={12} />
                  <span>{activePhoto.location}</span>
                </p>
              </div>
              <span className="text-[10px] text-white/50 font-mono">{activePhoto.timestamp}</span>
            </div>

            <div className="flex items-center space-x-3 text-[10px] font-mono text-white/60 bg-white/5 p-2 rounded-xl">
              <span>{activePhoto.iso}</span>
              <span>•</span>
              <span>{activePhoto.shutter}</span>
              <span>•</span>
              <span>Album: {activePhoto.album}</span>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <GTAOSButton
                fullWidth
                variant="primary"
                icon={<Sparkles size={14} />}
                onClick={() => {
                  setWallpaper(activePhoto.url);
                  setActivePhoto(null);
                }}
              >
                Set As OS Wallpaper
              </GTAOSButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
