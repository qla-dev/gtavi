import React, { useState } from 'react';
import {
  Gauge,
  Zap,
  Disc,
  Sliders,
  DollarSign,
  Scale,
  Check,
  Sparkles
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSCard } from '../../os/components/GTAOSCard';
import { GTAOSProgressBar } from '../../os/components/GTAOSProgressBar';
import { GTAOSModal } from '../../os/components/GTAOSModal';
import { Vehicle } from '../../types';

export const GarageApp: React.FC = () => {
  const vehicles = useOSStore((s) => s.vehicles);
  const buyVehicle = useOSStore((s) => s.buyVehicle);
  const bankBalance = useOSStore((s) => s.bankBalance);

  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'super' | 'muscle' | 'tuners' | 'marine'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [compareA, setCompareA] = useState<Vehicle | null>(null);
  const [compareB, setCompareB] = useState<Vehicle | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Tabs
  const tabs = [
    { id: 'all', label: 'All Fleet' },
    { id: 'owned', label: `My Garage (${vehicles.filter((v) => v.owned).length})` },
    { id: 'super', label: 'Supercars' },
    { id: 'muscle', label: 'Muscle' },
    { id: 'tuners', label: 'Tuners' },
    { id: 'marine', label: 'Boats & Helis' }
  ];

  const filteredVehicles = vehicles.filter((v) => {
    if (activeTab === 'owned') return v.owned;
    if (activeTab === 'super') return v.category === 'Super' || v.category === 'Sports Classic';
    if (activeTab === 'muscle') return v.category === 'Muscle';
    if (activeTab === 'tuners') return v.category === 'Tuners';
    if (activeTab === 'marine') return v.category === 'Boats' || v.category === 'Aviation';
    return true;
  });

  const handleStartCompare = (veh: Vehicle) => {
    if (!compareA) {
      setCompareA(veh);
    } else if (!compareB && compareA.id !== veh.id) {
      setCompareB(veh);
      setIsCompareModalOpen(true);
    } else {
      setCompareA(veh);
      setCompareB(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0F0D21] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Vice Customs"
        subtitle={`Motorsport & Garage • Balance: $${bankBalance.toLocaleString()}`}
        accentColor="#FF914D"
        rightAction={
          compareA ? (
            <button
              onClick={() => {
                if (compareA && compareB) setIsCompareModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center space-x-1"
            >
              <Scale size={12} />
              <span>Compare ({compareB ? '2/2' : '1/2'})</span>
            </button>
          ) : undefined
        }
      />

      {/* Category Tabs */}
      <div className="px-4 py-2 bg-[#17132E]/90 border-b border-white/10 z-20">
        <GTAOSTabBar tabs={tabs} activeTab={activeTab} onChange={(t) => setActiveTab(t as any)} />
      </div>

      {/* Vehicles Grid / Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
        {filteredVehicles.length === 0 ? (
          <div className="py-16 text-center text-white/50 text-xs">
            No vehicles found in this category. Visit Dynasty Motorsports or buy from the fleet!
          </div>
        ) : (
          filteredVehicles.map((vehicle) => {
            const isComparing = compareA?.id === vehicle.id || compareB?.id === vehicle.id;

            return (
              <GTAOSCard
                key={vehicle.id}
                className="overflow-hidden border border-white/10 hover:border-pink-500/40"
              >
                {/* Vehicle Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-black/40">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1736] via-transparent to-transparent" />

                  {/* Top Manufacturer Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center space-x-1.5 shadow-md">
                    <span>{vehicle.badge}</span>
                  </div>

                  {/* Owned Status or Price */}
                  <div className="absolute top-3 right-3">
                    {vehicle.owned ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white font-mono font-bold text-[11px] shadow-lg flex items-center space-x-1">
                        <Check size={12} />
                        <span>OWNED</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-pink-600/90 text-white font-mono font-bold text-[11px] shadow-lg">
                        ${vehicle.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Custom Plate if Owned */}
                  {vehicle.owned && vehicle.customPlate && (
                    <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-yellow-400 text-black font-mono font-black text-[9px] tracking-widest border border-black/40 shadow-md">
                      {vehicle.customPlate}
                    </div>
                  )}
                </div>

                {/* Card Content & Stats */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-tight uppercase font-mono">
                        {vehicle.name}
                      </h3>
                      <p className="text-[11px] text-pink-300 font-semibold">
                        {vehicle.manufacturer} • {vehicle.category} ({vehicle.drivetrain})
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartCompare(vehicle)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 border transition-all ${
                        isComparing
                          ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                          : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                      }`}
                      title="Compare specs with another ride"
                    >
                      <Scale size={13} />
                      <span className="text-[10px]">{isComparing ? 'Selected' : 'Compare'}</span>
                    </button>
                  </div>

                  {/* Performance Bars */}
                  <div className="space-y-2 pt-1">
                    <GTAOSProgressBar
                      label="Top Speed"
                      sublabel={`${vehicle.topSpeed} MPH`}
                      value={(vehicle.topSpeed / 240) * 100}
                      color="pink"
                      size="sm"
                    />
                    <GTAOSProgressBar
                      label="Acceleration"
                      sublabel={`${vehicle.acceleration}/100`}
                      value={vehicle.acceleration}
                      color="orange"
                      size="sm"
                    />
                    <GTAOSProgressBar
                      label="Handling"
                      sublabel={`${vehicle.handling}/100`}
                      value={vehicle.handling}
                      color="cyan"
                      size="sm"
                    />
                  </div>

                  {/* Actions: Buy / Tune */}
                  <div className="pt-2 flex items-center space-x-2">
                    {vehicle.owned ? (
                      <GTAOSButton
                        fullWidth
                        variant="secondary"
                        icon={<Sliders size={14} />}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        Performance Tuning
                      </GTAOSButton>
                    ) : (
                      <GTAOSButton
                        fullWidth
                        variant="primary"
                        icon={<DollarSign size={14} />}
                        onClick={() => buyVehicle(vehicle.id)}
                      >
                        Purchase (${vehicle.price.toLocaleString()})
                      </GTAOSButton>
                    )}
                  </div>
                </div>
              </GTAOSCard>
            );
          })
        )}
      </div>

      {/* Tuning Modal */}
      <GTAOSModal
        isOpen={Boolean(selectedVehicle)}
        onClose={() => setSelectedVehicle(null)}
        title={`${selectedVehicle?.name || 'Vehicle'} Tuning`}
      >
        {selectedVehicle && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#130E26] border border-white/10">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-bold text-white text-xs">{selectedVehicle.name}</h4>
                <p className="text-[10px] text-pink-400">Custom Plate: {selectedVehicle.customPlate}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span>EMS Engine Upgrade (Stage 4)</span>
                <span className="text-emerald-400 font-bold">INSTALLED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span>Twin-Scroll Turbo Tuning</span>
                <span className="text-emerald-400 font-bold">INSTALLED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span>Neon Underglow (Hot Pink)</span>
                <span className="text-emerald-400 font-bold">INSTALLED</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span>Limo Window Tinting</span>
                <span className="text-emerald-400 font-bold">INSTALLED</span>
              </div>
            </div>

            <GTAOSButton
              fullWidth
              variant="primary"
              onClick={() => setSelectedVehicle(null)}
            >
              Save Configuration
            </GTAOSButton>
          </div>
        )}
      </GTAOSModal>

      {/* Side-by-Side Comparison Modal */}
      <GTAOSModal
        isOpen={isCompareModalOpen && Boolean(compareA) && Boolean(compareB)}
        onClose={() => setIsCompareModalOpen(false)}
        title="Vehicle Comparison"
      >
        {compareA && compareB && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-[#140F2B] border border-pink-500/30">
                <img
                  src={compareA.image}
                  alt={compareA.name}
                  className="w-full h-16 rounded-lg object-cover mb-1.5"
                />
                <span className="text-xs font-bold text-pink-400 block truncate">{compareA.name}</span>
                <span className="text-[10px] text-white/60 font-mono">${compareA.price.toLocaleString()}</span>
              </div>

              <div className="p-2 rounded-xl bg-[#140F2B] border border-cyan-500/30">
                <img
                  src={compareB.image}
                  alt={compareB.name}
                  className="w-full h-16 rounded-lg object-cover mb-1.5"
                />
                <span className="text-xs font-bold text-cyan-400 block truncate">{compareB.name}</span>
                <span className="text-[10px] text-white/60 font-mono">${compareB.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-3 bg-[#110D24] p-3 rounded-2xl border border-white/5">
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-pink-400">{compareA.topSpeed} MPH</span>
                  <span className="text-white/60">Top Speed</span>
                  <span className="text-cyan-400">{compareB.topSpeed} MPH</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
                  <div
                    className="bg-pink-500"
                    style={{ width: `${(compareA.topSpeed / (compareA.topSpeed + compareB.topSpeed)) * 100}%` }}
                  />
                  <div
                    className="bg-cyan-400"
                    style={{ width: `${(compareB.topSpeed / (compareA.topSpeed + compareB.topSpeed)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-pink-400">{compareA.acceleration}/100</span>
                  <span className="text-white/60">Acceleration</span>
                  <span className="text-cyan-400">{compareB.acceleration}/100</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
                  <div
                    className="bg-pink-500"
                    style={{ width: `${(compareA.acceleration / (compareA.acceleration + compareB.acceleration)) * 100}%` }}
                  />
                  <div
                    className="bg-cyan-400"
                    style={{ width: `${(compareB.acceleration / (compareA.acceleration + compareB.acceleration)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-pink-400">{compareA.handling}/100</span>
                  <span className="text-white/60">Handling</span>
                  <span className="text-cyan-400">{compareB.handling}/100</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
                  <div
                    className="bg-pink-500"
                    style={{ width: `${(compareA.handling / (compareA.handling + compareB.handling)) * 100}%` }}
                  />
                  <div
                    className="bg-cyan-400"
                    style={{ width: `${(compareB.handling / (compareA.handling + compareB.handling)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <GTAOSButton
              fullWidth
              variant="outline"
              onClick={() => {
                setCompareA(null);
                setCompareB(null);
                setIsCompareModalOpen(false);
              }}
            >
              Clear Comparison
            </GTAOSButton>
          </div>
        )}
      </GTAOSModal>
    </div>
  );
};
