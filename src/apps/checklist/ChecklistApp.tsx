import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  Award,
  Flame,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSProgressBar } from '../../os/components/GTAOSProgressBar';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { GTAOSModal } from '../../os/components/GTAOSModal';
import { ChecklistItem } from '../../types';

export const ChecklistApp: React.FC = () => {
  const checklist = useOSStore((s) => s.checklist);
  const toggleChecklist = useOSStore((s) => s.toggleChecklist);
  const addChecklistItem = useOSStore((s) => s.addChecklistItem);

  const [activeTab, setActiveTab] = useState<'all' | 'missions' | 'collectibles' | 'activities' | 'strangers' | 'custom'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');

  // Overall progression math
  const totalItems = checklist.length;
  const completedItems = checklist.filter((c) => c.completed).length;
  const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const tabs = [
    { id: 'all', label: 'Overview' },
    { id: 'missions', label: 'Missions' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'activities', label: 'Activities' },
    { id: 'strangers', label: 'Strangers & Freaks' },
    { id: 'custom', label: 'My Custom List' }
  ];

  const filteredItems = checklist.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleToggle = (item: ChecklistItem) => {
    toggleChecklist(item.id);
    if (!item.completed) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF4F91', '#48C9FF', '#FF914D', '#9D67FF']
        });
      } catch {
        // ignore
      }
    }
  };

  const handleCreateCustom = () => {
    if (!newTitle.trim()) return;
    addChecklistItem(newTitle, newSubtitle, 'custom');
    setNewTitle('');
    setNewSubtitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0F0D24] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="100% Leonida"
        subtitle={`Career Progression • ${completedItems}/${totalItems} Completed`}
        accentColor="#9D67FF"
        rightAction={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center hover:bg-purple-500/30"
            title="Add Custom Item"
          >
            <Plus size={16} />
          </button>
        }
      />

      {/* Hero Progress Banner */}
      <div className="p-4 bg-gradient-to-br from-[#1C153B] via-[#161130] to-[#110D25] border-b border-white/10 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold font-mono text-white tracking-wide">
                Leonida Completion
              </h2>
              <span className="text-[11px] font-semibold text-pink-400">
                {overallPercentage >= 100
                  ? '👑 Vice City Kingpin Legend'
                  : overallPercentage >= 50
                  ? '⭐ Notorious Leonida Outlaw'
                  : '🔥 Rising Syndicate Hustler'}
              </span>
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">
            {overallPercentage}%
          </span>
        </div>

        <GTAOSProgressBar
          value={overallPercentage}
          showPercent={false}
          color="pink"
          size="md"
        />
      </div>

      {/* Tabs */}
      <div className="px-4 py-2 bg-[#14102C] border-b border-white/10 z-10">
        <GTAOSTabBar tabs={tabs} activeTab={activeTab} onChange={(t) => setActiveTab(t as any)} />
      </div>

      {/* Checklist Items Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 no-scrollbar">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/30 text-white/90'
                : 'bg-[#181333]/70 hover:bg-[#181333] border-white/10 hover:border-pink-500/40 text-white'
            }`}
          >
            {/* Checkbox button */}
            <div className="mt-0.5 shrink-0">
              {item.completed ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_#10B981]">
                  <CheckCircle2 size={14} className="text-black" />
                </div>
              ) : (
                <Circle size={20} className="text-white/40 hover:text-pink-400 transition-colors" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-xs font-bold tracking-tight truncate ${
                    item.completed ? 'line-through text-white/60' : 'text-white'
                  }`}
                >
                  {item.title}
                </h4>
                {item.district && (
                  <span className="text-[10px] text-cyan-300 font-mono px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20 shrink-0 ml-2">
                    {item.district}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-white/60 mt-0.5 leading-snug">{item.subtitle}</p>

              {item.reward && (
                <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-amber-300 font-medium">
                  <Gift size={12} className="text-amber-400 shrink-0" />
                  <span className="truncate">Reward: {item.reward}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom To-Do Item Modal */}
      <GTAOSModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Custom Objective"
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-white/70 block mb-1">
              Objective Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Steal military attack helicopter from Naval base"
              className="w-full bg-[#120E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-white/70 block mb-1">
              Notes or Location
            </label>
            <input
              type="text"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              placeholder="e.g. Bring sniper rifle and heavy body armor"
              className="w-full bg-[#120E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60"
            />
          </div>

          <GTAOSButton fullWidth variant="primary" onClick={handleCreateCustom}>
            Add To Checklist
          </GTAOSButton>
        </div>
      </GTAOSModal>
    </div>
  );
};
