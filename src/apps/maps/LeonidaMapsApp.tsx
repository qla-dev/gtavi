import React, { useState, useMemo, useRef } from 'react';
import {
  Navigation,
  Compass,
  Plus,
  Minus,
  Star,
  ShieldAlert,
  Gift,
  Crosshair,
  Layers,
  MapPin,
  Eye,
  Trash2,
  ChevronDown,
  Building,
  Home,
  Wine,
  Wrench,
  DollarSign,
  Plane,
  Trees,
  Shield,
  BookOpen,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Search,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSSearchBar } from '../../os/components/GTAOSSearchBar';
import { GTAOSBottomSheet } from '../../os/components/GTAOSBottomSheet';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSModal } from '../../os/components/GTAOSModal';
import { MapCategory, MapLayerMode, MapLocation } from '../../types';
import {
  LEONIDA_REGIONS,
  REGION_CENTERS,
  calculateAtlasDistance
} from '../../data/mapsData';

interface ClusterNode {
  id: string;
  isCluster: boolean;
  x: number;
  y: number;
  locations: MapLocation[];
  count: number;
}

const MAP_DIMENSION = 1800; // Square coordinate canvas matching 40000x40000 Yanis v16 basemap

export const LeonidaMapsApp: React.FC = () => {
  const mapLocations = useOSStore((s) => s.mapLocations);
  const activeWaypoint = useOSStore((s) => s.activeWaypoint);
  const setWaypoint = useOSStore((s) => s.setWaypoint);
  const toggleFavoriteLocation = useOSStore((s) => s.toggleFavoriteLocation);
  const markLocationDiscovered = useOSStore((s) => s.markLocationDiscovered);
  const addCustomLocation = useOSStore((s) => s.addCustomLocation);
  const deleteLocation = useOSStore((s) => s.deleteLocation);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MapCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(true);
  const [layerMode, setLayerMode] = useState<MapLayerMode>('atlas');
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null);
  const [activeCluster, setActiveCluster] = useState<ClusterNode | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Zoom, Pan & 3D tilt controls
  // Initial center on Leonida state
  const [zoomLevel, setZoomLevel] = useState<number>(0.95);
  const [panOffset, setPanOffset] = useState({ x: -700, y: -450 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tilt3D, setTilt3D] = useState<number>(45);

  // Custom pin creation modal state
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pendingPinCoords, setPendingPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [customPinName, setCustomPinName] = useState('');
  const [customPinDesc, setCustomPinDesc] = useState('');
  const [customPinCategory, setCustomPinCategory] = useState<MapCategory>('custom');
  const [customPinNote, setCustomPinNote] = useState('');

  // Measurement tool state
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePointA, setMeasurePointA] = useState<{ x: number; y: number } | null>(null);
  const [measurePointB, setMeasurePointB] = useState<{ x: number; y: number } | null>(null);

  // Telemetry HUD coordinates (in GTA VI game units)
  const [telemetryCoords, setTelemetryCoords] = useState<{ x: number; y: number; z: number }>({
    x: 1409,
    y: 2803,
    z: 14
  });

  // Layer mode options
  const layerOptions: Array<{ id: MapLayerMode; label: string; icon: string }> = [
    { id: 'atlas', label: 'Atlas Basemap', icon: '⚡' },
    { id: 'satellite', label: 'Satellite', icon: '🛰️' },
    { id: 'topographic', label: 'Tactical', icon: '🎯' },
    { id: '3d', label: '3D Angle', icon: '🌐' }
  ];

  // Category filter tabs
  const categoryTabs = [
    { id: 'all', label: 'All Markers' },
    { id: 'safehouse', label: 'Safehouses & Hotels' },
    { id: 'nightlife', label: 'Clubs & Bars' },
    { id: 'garage', label: 'Chop Shops & Retail' },
    { id: 'heist', label: 'Heists & Vaults' },
    { id: 'weapons', label: 'Armory' },
    { id: 'transport', label: 'Airports & Docks' },
    { id: 'nature', label: 'Everglades & Keys' },
    { id: 'police', label: 'Precincts' },
    { id: 'collectible', label: 'Landmarks' },
    { id: 'custom', label: 'My Pins' }
  ];

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return mapLocations.filter((loc) => {
      const matchCat = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchRegion =
        selectedRegion === 'All Regions' || (loc.region && loc.region === selectedRegion);
      const matchSearch =
        search === '' ||
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        (loc.district && loc.district.toLowerCase().includes(search.toLowerCase())) ||
        (loc.realWorldAddress && loc.realWorldAddress.toLowerCase().includes(search.toLowerCase())) ||
        (loc.inGameAddress && loc.inGameAddress.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchRegion && matchSearch;
    });
  }, [mapLocations, selectedCategory, selectedRegion, search]);

  // ==========================================
  // FAST SPATIAL GRID CLUSTERING (like gtadb.net / IMG_8382)
  // ==========================================
  const clusters = useMemo<ClusterNode[]>(() => {
    // If zoomed past 2.4x, show individual POI markers directly
    if (zoomLevel >= 2.5) {
      return filteredLocations.map((loc) => ({
        id: loc.id,
        isCluster: false,
        x: loc.x,
        y: loc.y,
        locations: [loc],
        count: 1
      }));
    }

    // Dynamic grid cell size (in percent) based on zoom level:
    // Low zoom -> large cell radius (produces 100-240 count bubbles)
    // High zoom -> small cell radius (expands clusters)
    const cellSize =
      zoomLevel < 1.0 ? 5.2 : zoomLevel < 1.4 ? 3.8 : zoomLevel < 1.8 ? 2.5 : zoomLevel < 2.2 ? 1.6 : 1.0;

    const grid: Record<
      string,
      { id: string; points: MapLocation[]; sumX: number; sumY: number }
    > = {};

    for (let i = 0; i < filteredLocations.length; i++) {
      const loc = filteredLocations[i];
      const col = Math.floor(loc.x / cellSize);
      const row = Math.floor(loc.y / cellSize);
      const key = `${col}_${row}`;
      if (!grid[key]) {
        grid[key] = { id: `c_${key}`, points: [], sumX: 0, sumY: 0 };
      }
      grid[key].points.push(loc);
      grid[key].sumX += loc.x;
      grid[key].sumY += loc.y;
    }

    const result: ClusterNode[] = [];
    for (const cell of Object.values(grid)) {
      const count = cell.points.length;
      const avgX = cell.sumX / count;
      const avgY = cell.sumY / count;

      if (count === 1) {
        result.push({
          id: cell.points[0].id,
          isCluster: false,
          x: cell.points[0].x,
          y: cell.points[0].y,
          locations: cell.points,
          count: 1
        });
      } else {
        result.push({
          id: cell.id,
          isCluster: true,
          x: avgX,
          y: avgY,
          locations: cell.points,
          count
        });
      }
    }

    return result;
  }, [filteredLocations, zoomLevel]);

  // Pointer panning handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPanOffset({ x: newX, y: newY });

    // Update telemetry in GTADB coordinates
    // Convert pan position to percentage, then to GTADB coordinates:
    // gx = (pctX * 40000 / 100 - 32000) / 2
    // gy = (24000 - pctY * 40000 / 100) / 2
    const currentCenterPctX = ((-newX + 195) / (MAP_DIMENSION * zoomLevel)) * 100;
    const currentCenterPctY = ((-newY + 350) / (MAP_DIMENSION * zoomLevel)) * 100;
    const simGx = Math.round(((currentCenterPctX * 40000) / 100 - 32000) / 2);
    const simGy = Math.round((24000 - (currentCenterPctY * 40000) / 100) / 2);
    setTelemetryCoords({ x: simGx, y: simGy, z: layerMode === 'topographic' ? 45 : 12 });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleMapCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left - panOffset.x) / (MAP_DIMENSION * zoomLevel)) * 100;
    const clickY = ((e.clientY - rect.top - panOffset.y) / (MAP_DIMENSION * zoomLevel)) * 100;

    const clampedX = Math.max(2, Math.min(98, Math.round(clickX * 100) / 100));
    const clampedY = Math.max(2, Math.min(98, Math.round(clickY * 100) / 100));

    if (measureMode) {
      if (!measurePointA) {
        setMeasurePointA({ x: clampedX, y: clampedY });
      } else if (!measurePointB) {
        setMeasurePointB({ x: clampedX, y: clampedY });
      } else {
        setMeasurePointA({ x: clampedX, y: clampedY });
        setMeasurePointB(null);
      }
      return;
    }

    setPendingPinCoords({ x: clampedX, y: clampedY });
  };

  // Click on a numbered cluster bubble (zooms in & centers like gtadb.net)
  const handleClusterClick = (cluster: ClusterNode) => {
    if (zoomLevel < 2.3) {
      const targetZoom = Math.min(2.8, zoomLevel + 0.65);
      setZoomLevel(targetZoom);
      // Center the viewport on the clicked cluster
      const targetX = 195 - (cluster.x / 100) * MAP_DIMENSION * targetZoom;
      const targetY = 350 - (cluster.y / 100) * MAP_DIMENSION * targetZoom;
      setPanOffset({ x: targetX, y: targetY });
    } else {
      // If already zoomed in, open list of places inside this cluster
      setActiveCluster(cluster);
    }
  };

  // Jump to region from dropdown
  const handleSelectRegion = (regionName: string) => {
    setSelectedRegion(regionName);
    setIsRegionDropdownOpen(false);
    const center = REGION_CENTERS[regionName] || { x: 55, y: 50, zoom: 0.95 };
    setZoomLevel(center.zoom);
    const targetX = 195 - (center.x / 100) * MAP_DIMENSION * center.zoom;
    const targetY = 350 - (center.y / 100) * MAP_DIMENSION * center.zoom;
    setPanOffset({ x: targetX, y: targetY });
  };

  // Center whole map
  const handleCenterState = () => {
    handleSelectRegion('All Regions');
  };

  const handleCreateCustomPin = () => {
    if (!customPinName.trim() || !pendingPinCoords) return;
    addCustomLocation(
      customPinName,
      customPinDesc,
      customPinCategory,
      pendingPinCoords.x,
      pendingPinCoords.y,
      customPinNote
    );
    setCustomPinName('');
    setCustomPinDesc('');
    setCustomPinNote('');
    setPendingPinCoords(null);
    setIsPinModalOpen(false);
  };

  const measurement = useMemo(() => {
    if (measurePointA && measurePointB) {
      return calculateAtlasDistance(measurePointA, measurePointB);
    }
    return null;
  }, [measurePointA, measurePointB]);

  const discoveredCount = mapLocations.filter((l) => l.discovered).length;

  // Icon selector for category pins
  const getCategoryIcon = (cat: MapCategory) => {
    switch (cat) {
      case 'safehouse':
        return <Home size={11} />;
      case 'nightlife':
        return <Wine size={11} />;
      case 'garage':
        return <Wrench size={11} />;
      case 'heist':
        return <DollarSign size={11} />;
      case 'weapons':
        return <Crosshair size={11} />;
      case 'transport':
        return <Plane size={11} />;
      case 'nature':
        return <Trees size={11} />;
      case 'police':
        return <Shield size={11} />;
      case 'collectible':
        return <Sparkles size={11} />;
      default:
        return <MapPin size={11} />;
    }
  };

  const categoryColors: Record<string, string> = {
    safehouse: '#FF4F91',
    nightlife: '#9D67FF',
    garage: '#FF914D',
    heist: '#EF4444',
    weapons: '#F59E0B',
    transport: '#48C9FF',
    nature: '#10B981',
    police: '#3B82F6',
    collectible: '#EAB308',
    custom: '#EC4899',
    activity: '#8B5CF6'
  };

  return (
    <div className="flex flex-col h-full bg-[#080B18] text-white select-none overflow-hidden font-sans">
      {/* Top Header - GTA VI Leonida OS Style */}
      <GTAOSHeader
        title="LEONIDA ATLAS"
        subtitle={`GTADB Yanis v16 • ${filteredLocations.length} POIs`}
        rightAction={
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMeasureMode(!measureMode)}
              className={`p-2 rounded-xl transition-all ${
                measureMode
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/15 text-white/80'
              }`}
              title="Tactical Range Ruler"
            >
              <Crosshair size={16} />
            </button>
            <button
              onClick={handleCenterState}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-300"
              title="Reset State View"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        }
      />

      {/* Search & Top Action Bar matching gtadb.net top UI */}
      <div className="px-3 pt-2 pb-1.5 bg-[#0F132B] border-b border-white/10 shrink-0 space-y-1.5 z-30">
        <div className="flex items-center space-x-2">
          {/* gtadb.net-style Region Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
              className="px-3 py-1.5 rounded-xl bg-[#1A1F42] hover:bg-[#232958] border border-cyan-500/40 text-xs font-bold text-cyan-300 flex items-center space-x-1.5 shadow-md transition-all whitespace-nowrap"
            >
              <BookOpen size={13} className="text-cyan-400" />
              <span className="truncate max-w-[120px]">
                {selectedRegion === 'All Regions' ? 'GTA 6 - Leonida' : selectedRegion}
              </span>
              <ChevronDown size={13} className="text-white/60" />
            </button>

            {/* Region Selector Dropdown Menu */}
            {isRegionDropdownOpen && (
              <div className="absolute top-9 left-0 w-56 rounded-2xl bg-[#121633]/98 border border-cyan-500/30 shadow-2xl backdrop-blur-xl p-1.5 z-50">
                <div className="px-2.5 py-1 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-white/10">
                  Select Territory
                </div>
                {LEONIDA_REGIONS.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => handleSelectRegion(reg)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedRegion === reg
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{reg}</span>
                    {selectedRegion === reg && <CheckCircle2 size={12} className="text-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 2,091 Leonida landmarks..."
              className="w-full bg-[#181E3D] text-xs text-white placeholder-white/40 rounded-xl pl-8 pr-3 py-1.5 border border-white/10 focus:outline-none focus:border-pink-500/60"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 text-xs hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Bar Toggle Button */}
          <button
            onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
            className={`p-2 rounded-xl border transition-all ${
              isFilterBarOpen
                ? 'bg-pink-600 text-white border-pink-400'
                : 'bg-[#1A1F42] text-white/70 border-white/10 hover:text-white'
            }`}
            title="Toggle Categories"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Collapsible Category Filter Tabs */}
        {isFilterBarOpen && (
          <div className="pt-0.5">
            <GTAOSTabBar
              tabs={categoryTabs}
              activeTab={selectedCategory}
              onChange={(cat) => setSelectedCategory(cat as MapCategory)}
            />
          </div>
        )}
      </div>

      {/* Telemetry Bar (Coordinates & Map Mode Info) */}
      <div className="px-3 py-1 bg-[#090C1A] border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-white/60 z-20 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400 font-bold">
            X: {telemetryCoords.x} Y: {telemetryCoords.y} Z: {telemetryCoords.z}m
          </span>
          <span className="text-white/30">|</span>
          <span className="text-pink-300 font-bold">{clusters.length} Map Nodes</span>
        </div>

        {measureMode && measurement ? (
          <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
            <span>
              📏 {measurement.miles} mi ({measurement.km} km) • ~{measurement.drivingMinutes} min
            </span>
          </div>
        ) : measureMode ? (
          <span className="text-amber-400 font-bold animate-pulse">Tap 2 points to measure</span>
        ) : (
          <span className="text-white/40">GTADB 7c3f8c2</span>
        )}
      </div>

      {/* Main Interactive Map Canvas Viewport */}
      <div
        className="relative flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#030611]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleMapCanvasClick}
      >
        {/* Transformable Canvas Container with Zoom and Pan */}
        <div
          className={`absolute inset-0 transition-transform duration-75 origin-center ${
            layerMode === '3d' ? 'perspective-[900px]' : ''
          }`}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel}) ${
              layerMode === '3d' ? `rotateX(${tilt3D}deg)` : ''
            }`
          }}
        >
          {/* Tactical grid background extending into infinity */}
          <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-[linear-gradient(to_right,#0b1224_1px,transparent_1px),linear-gradient(to_bottom,#0b1224_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none" />

          {/* ======================================================== */}
          {/* THE REAL LEONIDA BASEMAP CANVAS (1800 x 1800) */}
          {/* ======================================================== */}
          <div
            className="relative select-none"
            style={{ width: `${MAP_DIMENSION}px`, height: `${MAP_DIMENSION}px` }}
          >
            {/* The Actual Yanis v16 / GTADB Basemap Image */}
            <img
              src="/maps/basemap.webp"
              alt="GTA VI Leonida Atlas"
              className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-300 ${
                layerMode === 'satellite'
                  ? 'brightness-90 contrast-125 saturate-125'
                  : layerMode === 'topographic'
                  ? 'brightness-75 contrast-150 hue-rotate-15'
                  : 'brightness-95 contrast-110'
              }`}
              draggable={false}
            />

            {/* Tactical Grid Overlay Lines matching gtadb.net */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px] pointer-events-none" />

            {/* Distance Measurement Line */}
            {measurePointA && measurePointB && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <line
                  x1={(measurePointA.x / 100) * MAP_DIMENSION}
                  y1={(measurePointA.y / 100) * MAP_DIMENSION}
                  x2={(measurePointB.x / 100) * MAP_DIMENSION}
                  y2={(measurePointB.y / 100) * MAP_DIMENSION}
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                />
              </svg>
            )}

            {/* ======================================================== */}
            {/* RENDER NUMBERED CLUSTER BUBBLES (matching gtadb.net / IMG_8382) */}
            {/* ======================================================== */}
            {clusters.map((node) => {
              const posX = (node.x / 100) * MAP_DIMENSION;
              const posY = (node.y / 100) * MAP_DIMENSION;

              if (node.isCluster) {
                const count = node.count;
                const isHigh = count >= 50;
                const isMedium = count >= 15;

                // Color palette matching gtadb.net / IMG_8382
                // High density (>50): Purple/violet bubble (e.g. 239, 168, 80)
                // Medium density (15-49): Slate blue bubble (e.g. 44, 48, 34)
                // Low density (<15): Deep dark blue bubble (e.g. 10, 7, 3)
                const bubbleBg = isHigh
                  ? 'bg-[#553088] border-2 border-purple-300 text-white shadow-[0_0_16px_rgba(139,92,246,0.65)]'
                  : isMedium
                  ? 'bg-[#294c77] border-2 border-blue-300 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                  : 'bg-[#183656] border-2 border-cyan-300 text-white shadow-[0_0_8px_rgba(6,182,212,0.45)]';

                const sizeClass =
                  count >= 100
                    ? 'w-11 h-11 text-xs'
                    : count >= 30
                    ? 'w-10 h-10 text-xs'
                    : count >= 10
                    ? 'w-9 h-9 text-[11px]'
                    : 'w-8 h-8 text-[11px]';

                return (
                  <div
                    key={node.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClusterClick(node);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                    style={{ left: `${posX}px`, top: `${posY}px` }}
                  >
                    <div
                      className={`${sizeClass} rounded-full flex items-center justify-center font-black transition-transform duration-150 group-hover:scale-120 group-active:scale-95 ${bubbleBg}`}
                    >
                      <span className="font-mono tracking-tight drop-shadow-md">{count}</span>
                    </div>
                  </div>
                );
              }

              // ========================================================
              // SINGLE POI PIN (clean circular pin with category icon)
              // ========================================================
              const loc = node.locations[0];
              const isWaypoint = activeWaypoint?.id === loc.id;
              const isSelected = activeLocation?.id === loc.id;
              const pinColor = categoryColors[loc.category] || '#FF4F91';

              return (
                <div
                  key={loc.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLocation(loc);
                    markLocationDiscovered(loc.id);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                  style={{ left: `${posX}px`, top: `${posY}px` }}
                >
                  {/* Waypoint Pulsing Ring */}
                  {isWaypoint && (
                    <div
                      className="absolute -inset-3.5 rounded-full animate-ping opacity-75 pointer-events-none"
                      style={{ backgroundColor: pinColor }}
                    />
                  )}

                  {/* Circular Pin Disc */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-150 group-hover:scale-125 ${
                      isSelected ? 'scale-130 ring-2 ring-white shadow-[0_0_15px_#fff]' : ''
                    }`}
                    style={{
                      backgroundColor: pinColor,
                      boxShadow: `0 0 12px ${pinColor}AA`
                    }}
                  >
                    <span className="text-white drop-shadow-md">{getCategoryIcon(loc.category)}</span>
                  </div>

                  {/* Label ONLY shown on selection or when zoomed very close */}
                  {(isSelected || zoomLevel > 2.8) && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/95 backdrop-blur-md text-[11px] font-bold text-white whitespace-nowrap border border-white/20 shadow-2xl pointer-events-none z-40">
                      {loc.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Floating Map Controls HUD */}
        <div className="absolute right-3.5 bottom-6 flex flex-col space-y-2 z-30">
          {/* Drop Custom Pin */}
          <button
            onClick={() => {
              setPendingPinCoords({ x: 50, y: 50 });
              setIsPinModalOpen(true);
            }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-95"
            title="Drop Custom Atlas Pin"
          >
            <MapPin size={18} />
          </button>

          {/* Layer Mode Switcher Toggle */}
          <button
            onClick={() => {
              const modes: MapLayerMode[] = ['atlas', 'satellite', 'topographic', '3d'];
              const nextIndex = (modes.indexOf(layerMode) + 1) % modes.length;
              setLayerMode(modes[nextIndex]);
            }}
            className="w-10 h-10 rounded-2xl bg-[#141833]/90 hover:bg-[#1C2247] border border-cyan-500/30 text-cyan-300 flex items-center justify-center shadow-lg active:scale-95"
            title={`Current: ${layerMode.toUpperCase()} Layer (Tap to change)`}
          >
            <Layers size={17} />
          </button>

          {/* 3D Pitch */}
          {layerMode === '3d' && (
            <button
              onClick={() => setTilt3D((t) => (t >= 65 ? 25 : t + 20))}
              className="w-10 h-10 rounded-2xl bg-[#141833]/90 hover:bg-[#1C2247] border border-cyan-500/30 text-cyan-300 flex items-center justify-center shadow-lg active:scale-95"
              title="Adjust 3D Pitch"
            >
              <Eye size={17} />
            </button>
          )}

          {/* Zoom In */}
          <button
            onClick={() => setZoomLevel((z) => Math.min(3.2, z + 0.35))}
            className="w-10 h-10 rounded-2xl bg-[#141833]/90 hover:bg-[#1C2247] border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95"
            title="Zoom In"
          >
            <Plus size={18} />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.35))}
            className="w-10 h-10 rounded-2xl bg-[#141833]/90 hover:bg-[#1C2247] border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95"
            title="Zoom Out"
          >
            <Minus size={18} />
          </button>
        </div>

        {/* "Explore the map guide ↓" Floating Pill (matching gtadb.net / IMG_8382) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="px-4 py-2 rounded-full bg-[#181C38]/95 hover:bg-[#20254A] border border-cyan-500/40 text-xs font-bold text-white shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center space-x-1.5 active:scale-95 transition-all"
          >
            <BookOpen size={14} className="text-cyan-400" />
            <span>Explore the map guide ↓</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAP GUIDE BOTTOM DRAWER (matching gtadb.net guide) */}
      {/* ======================================================== */}
      <GTAOSBottomSheet
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Leonida Atlas Map Guide"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
            <span className="font-bold text-cyan-300">Community Cartography: </span>
            Powered by genuine GTADB revision <code>7c3f8c2</code> / Yanis v16 mapping data. All 2,091 landmarks include verified in-game coordinates and real-world analogues.
          </div>

          {/* Regional Territory Breakdown */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Territories & POI Density
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Vice City Metro', count: '1,143 POIs', color: 'from-pink-500 to-rose-600' },
                { name: 'Lake Leonida & Everglades', count: '271 POIs', color: 'from-emerald-500 to-teal-600' },
                { name: 'Port Gellhorn', count: '243 POIs', color: 'from-orange-500 to-amber-600' },
                { name: 'Leonida Keys', count: '225 POIs', color: 'from-cyan-500 to-blue-600' },
                { name: 'Ambrosia Heartland', count: '171 POIs', color: 'from-amber-400 to-yellow-500' },
                { name: 'Mount Kalaga / Chokoloskee', count: '38 POIs', color: 'from-purple-500 to-indigo-600' }
              ].map((reg) => (
                <div
                  key={reg.name}
                  onClick={() => {
                    handleSelectRegion(reg.name);
                    setIsGuideOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-pink-300">
                      {reg.name}
                    </span>
                    <span className="text-[10px] text-white/50">{reg.count}</span>
                  </div>
                  <ArrowRight size={14} className="text-white/40 shrink-0 ml-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-pink-400 mb-2">
              POI Categories Legend
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#FF4F91] flex items-center justify-center text-[10px]">
                  🏠
                </div>
                <span>Safehouse / Hotel</span>
              </div>
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#9D67FF] flex items-center justify-center text-[10px]">
                  🍸
                </div>
                <span>Nightlife / Club</span>
              </div>
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#FF914D] flex items-center justify-center text-[10px]">
                  ⚙️
                </div>
                <span>Chop Shop / Retail</span>
              </div>
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#48C9FF] flex items-center justify-center text-[10px]">
                  ✈️
                </div>
                <span>Airport / Port</span>
              </div>
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-[10px]">
                  🐊
                </div>
                <span>Everglades & Keys</span>
              </div>
              <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/5">
                <div className="w-5 h-5 rounded-full bg-[#EAB308] flex items-center justify-center text-[10px]">
                  ✨
                </div>
                <span>Landmarks & Stashes</span>
              </div>
            </div>
          </div>
        </div>
      </GTAOSBottomSheet>

      {/* ======================================================== */}
      {/* CLUSTER SECTOR DRILL-DOWN BOTTOM SHEET */}
      {/* ======================================================== */}
      <GTAOSBottomSheet
        isOpen={Boolean(activeCluster)}
        onClose={() => setActiveCluster(null)}
        title={`Cluster Sector (${activeCluster?.locations.length || 0} Landmarks)`}
      >
        {activeCluster && (
          <div className="space-y-3">
            <p className="text-xs text-white/70">
              Multiple real community landmarks mapped in this coordinate sector. Select any location to open the dossier:
            </p>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {activeCluster.locations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setActiveLocation(loc);
                    setActiveCluster(null);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/20"
                      style={{ backgroundColor: categoryColors[loc.category] || '#FF4F91' }}
                    >
                      {getCategoryIcon(loc.category)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate">{loc.name}</h4>
                      <p className="text-[10px] text-pink-300 truncate">
                        {loc.district} • {loc.region || 'Leonida'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-white/40 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </GTAOSBottomSheet>

      {/* ======================================================== */}
      {/* REAL LOCATION DOSSIER BOTTOM SHEET */}
      {/* ======================================================== */}
      <GTAOSBottomSheet
        isOpen={Boolean(activeLocation)}
        onClose={() => setActiveLocation(null)}
        title={activeLocation?.name || 'Landmark Dossier'}
      >
        {activeLocation && (
          <div className="space-y-4">
            {/* Header Card */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#121630]">
              <img
                src={
                  activeLocation.image ||
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
                }
                alt={activeLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121630] via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-white/15">
                {activeLocation.region || activeLocation.district}
              </div>

              {activeLocation.coordinates && (
                <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/85 font-mono text-[9px] text-emerald-400 border border-emerald-500/30">
                  X:{activeLocation.coordinates.x} Y:{activeLocation.coordinates.y} Z:
                  {activeLocation.coordinates.z}m
                </div>
              )}

              <button
                onClick={() => toggleFavoriteLocation(activeLocation.id)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15"
              >
                <Star
                  size={16}
                  className={
                    activeLocation.isFavorite ? 'fill-amber-400 text-amber-300' : 'text-white/70'
                  }
                />
              </button>
            </div>

            {/* Description & Intel */}
            <div>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {activeLocation.description}
              </p>

              {activeLocation.realWorldAddress && (
                <div className="mt-2 p-2 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">
                    Real-World Analogue
                  </span>
                  <span className="text-white/80">{activeLocation.realWorldAddress}</span>
                </div>
              )}

              {activeLocation.inGameAddress && (
                <div className="mt-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-[10px] uppercase font-bold text-pink-400 block mb-0.5">
                    In-Game Address
                  </span>
                  <span className="text-white/80">{activeLocation.inGameAddress}</span>
                </div>
              )}

              {activeLocation.tags && activeLocation.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {activeLocation.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-purple-900/50 border border-purple-500/30 text-[10px] font-mono text-purple-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center space-x-2">
              <GTAOSButton
                fullWidth
                variant="primary"
                icon={<Navigation size={15} />}
                onClick={() => {
                  setWaypoint(activeLocation);
                  setActiveLocation(null);
                }}
              >
                {activeWaypoint?.id === activeLocation.id ? 'Waypoint Active' : 'Set GPS Waypoint'}
              </GTAOSButton>

              {activeLocation.category === 'custom' && (
                <button
                  onClick={() => {
                    deleteLocation(activeLocation.id);
                    setActiveLocation(null);
                  }}
                  className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30"
                  title="Delete Marker"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </GTAOSBottomSheet>

      {/* ======================================================== */}
      {/* CUSTOM PIN CREATION MODAL */}
      {/* ======================================================== */}
      <GTAOSModal
        isOpen={Boolean(pendingPinCoords) && isPinModalOpen}
        onClose={() => {
          setPendingPinCoords(null);
          setIsPinModalOpen(false);
        }}
        title="Drop Leonida Atlas Pin"
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-white/70 block mb-1">
              Marker Title
            </label>
            <input
              type="text"
              value={customPinName}
              onChange={(e) => setCustomPinName(e.target.value)}
              placeholder="e.g. Secret Smuggler Speedboat Cache"
              className="w-full bg-[#120E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-white/70 block mb-1">
              Category
            </label>
            <select
              value={customPinCategory}
              onChange={(e) => setCustomPinCategory(e.target.value as MapCategory)}
              className="w-full bg-[#120E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60"
            >
              <option value="custom">📌 Custom Waypoint</option>
              <option value="safehouse">🌴 Safehouse / Hideout</option>
              <option value="heist">💼 Heist Recon</option>
              <option value="garage">⚙️ Chop Shop</option>
              <option value="weapons">🔫 Arms Depot</option>
              <option value="nature">🐊 Wildlife Spot</option>
              <option value="collectible">💎 Hidden Stash</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-white/70 block mb-1">
              Private Tactical Note
            </label>
            <textarea
              value={customPinNote}
              onChange={(e) => setCustomPinNote(e.target.value)}
              placeholder="e.g. Guard shifts change at midnight, approach via jet ski"
              rows={3}
              className="w-full bg-[#120E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60 resize-none"
            />
          </div>

          <GTAOSButton fullWidth variant="primary" onClick={handleCreateCustomPin}>
            Save To Personal Atlas
          </GTAOSButton>
        </div>
      </GTAOSModal>
    </div>
  );
};
