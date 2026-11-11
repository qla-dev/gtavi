import React, { useState } from 'react';
import {
  Building2,
  Car,
  Bed,
  Check,
  DollarSign,
  TrendingUp,
  Key,
  ShieldCheck
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSCard } from '../../os/components/GTAOSCard';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { GTAOSBottomSheet } from '../../os/components/GTAOSBottomSheet';
import { PropertyListing } from '../../types';

export const PropertiesApp: React.FC = () => {
  const properties = useOSStore((s) => s.properties);
  const buyProperty = useOSStore((s) => s.buyProperty);
  const bankBalance = useOSStore((s) => s.bankBalance);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProp, setSelectedProp] = useState<PropertyListing | null>(null);

  const categories = [
    { id: 'all', label: 'All Listings' },
    { id: 'owned', label: `My Deeds (${properties.filter((p) => p.owned).length})` },
    { id: 'Luxury Estate', label: 'Estates' },
    { id: 'Residential', label: 'Condos & Lofts' },
    { id: 'Commercial', label: 'Commercial' },
    { id: 'Safehouse', label: 'Safehouses' }
  ];

  const filteredProperties = properties.filter((prop) => {
    if (activeCategory === 'owned') return prop.owned;
    if (activeCategory === 'all') return true;
    return prop.category === activeCategory;
  });

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0C121E] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Dynasty 8 Real Estate"
        subtitle={`Leonida Luxury Properties • Balance: $${bankBalance.toLocaleString()}`}
        accentColor="#10B981"
      />

      {/* Categories */}
      <div className="px-4 py-2 bg-[#101A2B] border-b border-white/10 z-10">
        <GTAOSTabBar
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Property Listings Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
        {filteredProperties.map((prop) => (
          <GTAOSCard
            key={prop.id}
            className="overflow-hidden border border-emerald-500/20 hover:border-emerald-500/50"
          >
            {/* Property Hero Image */}
            <div
              onClick={() => setSelectedProp(prop)}
              className="relative h-44 w-full cursor-pointer bg-black/40 overflow-hidden group"
            >
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1736] via-transparent to-transparent" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                {prop.category}
              </div>

              {/* Status / Price */}
              <div className="absolute top-3 right-3">
                {prop.owned ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-mono font-bold text-xs shadow-lg flex items-center space-x-1">
                    <Key size={13} />
                    <span>OWNED</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-mono font-black text-xs shadow-lg">
                    ${prop.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* District & Address */}
              <div className="absolute bottom-2 left-3 right-3">
                <span className="text-[10px] text-emerald-300 font-semibold">{prop.district}</span>
                <h3 className="text-sm font-bold text-white truncate drop-shadow-md">
                  {prop.title}
                </h3>
              </div>
            </div>

            {/* Content & Amenities */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/80 bg-white/5 p-2 rounded-xl">
                <div className="flex items-center space-x-1.5">
                  <Bed size={14} className="text-emerald-400" />
                  <span>{prop.bedrooms} Bed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Car size={14} className="text-cyan-400" />
                  <span>{prop.garageSpaces}-Car Garage</span>
                </div>
                {prop.incomePerDay && (
                  <div className="flex items-center space-x-1.5 text-amber-300 font-mono font-bold">
                    <TrendingUp size={14} />
                    <span>+${prop.incomePerDay.toLocaleString()}/day</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center space-x-2 pt-1">
                <GTAOSButton
                  fullWidth
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProp(prop)}
                >
                  View Details & Features
                </GTAOSButton>
                {!prop.owned && (
                  <GTAOSButton
                    fullWidth
                    variant="primary"
                    size="sm"
                    icon={<DollarSign size={14} />}
                    onClick={() => buyProperty(prop.id)}
                  >
                    Acquire Deed
                  </GTAOSButton>
                )}
              </div>
            </div>
          </GTAOSCard>
        ))}
      </div>

      {/* Property Details Bottom Sheet */}
      <GTAOSBottomSheet
        isOpen={Boolean(selectedProp)}
        onClose={() => setSelectedProp(null)}
        title={selectedProp?.title || 'Property Overview'}
      >
        {selectedProp && (
          <div className="space-y-4">
            <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedProp.image}
                alt={selectedProp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-3 px-2 py-1 rounded bg-black/75 text-[10px] text-white font-mono">
                {selectedProp.address}
              </div>
            </div>

            <p className="text-xs text-white/90 leading-relaxed font-medium">
              {selectedProp.description}
            </p>

            {/* Key Features List */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Compound Amenities
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedProp.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 text-xs text-white/90"
                  >
                    <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase button inside sheet */}
            <div className="pt-2">
              {selectedProp.owned ? (
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                  <span className="text-xs font-bold text-emerald-300 flex items-center justify-center space-x-1.5">
                    <Check size={16} />
                    <span>Property in Personal Asset Registry</span>
                  </span>
                </div>
              ) : (
                <GTAOSButton
                  fullWidth
                  variant="primary"
                  icon={<DollarSign size={15} />}
                  onClick={() => {
                    buyProperty(selectedProp.id);
                    setSelectedProp(null);
                  }}
                >
                  Confirm Purchase (${selectedProp.price.toLocaleString()})
                </GTAOSButton>
              )}
            </div>
          </div>
        )}
      </GTAOSBottomSheet>
    </div>
  );
};
