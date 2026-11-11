import React, { useState } from 'react';
import {
  Flame,
  Radio,
  Clock,
  User,
  Vote,
  Share2,
  Bookmark,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSTabBar } from '../../os/components/GTAOSTabBar';
import { GTAOSCard } from '../../os/components/GTAOSCard';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { INITIAL_NEWS } from '../../data/newsData';
import { NewsArticle } from '../../types';

export const NewsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);

  const categories = [
    { id: 'all', label: 'Top Headlines' },
    { id: 'Florida Man', label: 'Florida Man' },
    { id: 'Crime', label: 'Crime & Vice' },
    { id: 'Luxury', label: 'Luxury Life' },
    { id: 'Politics', label: 'State Politics' }
  ];

  const filteredArticles = articles.filter((art) => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  const handleVote = (optionIndex: number) => {
    if (!selectedArticle || !selectedArticle.poll) return;
    setSelectedPollOption(optionIndex);

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === selectedArticle.id && a.poll) {
          const newVotes = [...a.poll.votes];
          newVotes[optionIndex] += 1;
          const updated = {
            ...a,
            poll: { ...a.poll, votes: newVotes }
          };
          setSelectedArticle(updated);
          return updated;
        }
        return a;
      })
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#120808] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Weazel News"
        subtitle="Confirming Your Prejudices Live"
        accentColor="#EF4444"
      />

      {/* Breaking News Live Ticker */}
      <div className="bg-red-900/90 text-white px-3 py-1.5 flex items-center space-x-2 border-b border-red-500/30 overflow-hidden shrink-0">
        <span className="px-1.5 py-0.5 rounded bg-black text-[9px] font-black uppercase text-amber-300 font-mono tracking-wider animate-pulse shrink-0">
          BREAKING
        </span>
        <div className="text-[11px] font-semibold truncate animate-marquee text-white/95">
          VCPD reports alligator roadblock cleared on Sunshine Parkway • Ocean Drive real estate hits record highs
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-2 bg-[#1C0D0D] border-b border-white/10 z-10">
        <GTAOSTabBar
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
        {filteredArticles.map((art) => (
          <GTAOSCard
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="overflow-hidden border border-red-950/40 hover:border-red-500/40 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-black/40">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D0D] via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-red-700 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                {art.category}
              </div>
            </div>

            {/* Article Snippet */}
            <div className="p-3.5 space-y-2">
              <h3 className="text-xs font-extrabold text-white leading-snug line-clamp-2">
                {art.title}
              </h3>
              <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                {art.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-white/50">
                <span className="font-semibold text-red-300">{art.author}</span>
                <span className="font-mono">{art.date}</span>
              </div>
            </div>
          </GTAOSCard>
        ))}
      </div>

      {/* Full Article Reader Screen */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#140808] text-white overflow-hidden animate-in slide-in-from-right duration-200">
          <GTAOSHeader
            title="Weazel News Wire"
            subtitle={selectedArticle.category}
            showBack={true}
            onBack={() => setSelectedArticle(null)}
          />

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {/* Big Headline */}
            <h1 className="text-base font-extrabold text-white leading-snug">
              {selectedArticle.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex items-center justify-between text-[11px] text-white/60 pb-2 border-b border-white/10">
              <div className="flex items-center space-x-1.5">
                <User size={12} className="text-red-400" />
                <span>{selectedArticle.author}</span>
              </div>
              <div className="flex items-center space-x-1.5 font-mono">
                <Clock size={12} />
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-56">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Text Paragraphs */}
            <div className="space-y-3 text-xs leading-relaxed text-white/90 font-medium">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Interactive Satirical Poll if attached */}
            {selectedArticle.poll && (
              <div className="mt-6 p-4 rounded-2xl bg-[#240F0F] border border-red-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                  <Vote size={16} />
                  <span>Weazel Public Opinion Poll</span>
                </div>
                <p className="text-xs text-white/90 font-semibold">{selectedArticle.poll.question}</p>

                <div className="space-y-2">
                  {selectedArticle.poll.options.map((option, idx) => {
                    const isSelected = selectedPollOption === idx;
                    const votes = selectedArticle.poll?.votes[idx] || 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleVote(idx)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-600/30 border-red-400 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <span>{option}</span>
                        <span className="font-mono text-[10px] text-amber-300 ml-2">
                          {votes.toLocaleString()} votes
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
