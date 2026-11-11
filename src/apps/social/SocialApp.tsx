import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Plus,
  X,
  BadgeCheck,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { GTAOSCard } from '../../os/components/GTAOSCard';
import { GTAOSBottomSheet } from '../../os/components/GTAOSBottomSheet';
import { INITIAL_STORIES } from '../../data/socialData';
import { BleeterPost, StoryItem } from '../../types';

export const SocialApp: React.FC = () => {
  const posts = useOSStore((s) => s.posts);
  const likePost = useOSStore((s) => s.likePost);
  const addBleetPost = useOSStore((s) => s.addBleetPost);
  const addCommentToPost = useOSStore((s) => s.addCommentToPost);

  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [activeCommentsPost, setActiveCommentsPost] = useState<BleeterPost | null>(null);
  const [newBleetModal, setNewBleetModal] = useState(false);
  const [bleetText, setBleetText] = useState('');
  const [commentText, setCommentText] = useState('');

  const handlePublishBleet = () => {
    if (!bleetText.trim()) return;
    addBleetPost(bleetText);
    setBleetText('');
    setNewBleetModal(false);
  };

  const handleSendComment = () => {
    if (!activeCommentsPost || !commentText.trim()) return;
    addCommentToPost(activeCommentsPost.id, commentText);
    setCommentText('');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0F0D24] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Bleeter"
        subtitle="Vice City Trending Feed"
        accentColor="#FF4F91"
        rightAction={
          <button
            onClick={() => setNewBleetModal(true)}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 active:scale-90"
            title="Compose Bleet"
          >
            <Plus size={16} />
          </button>
        }
      />

      {/* Stories Carousel */}
      <div className="px-3 py-2.5 bg-[#171233] border-b border-white/10 flex items-center space-x-3 overflow-x-auto no-scrollbar shrink-0">
        {/* Your Story button */}
        <div
          onClick={() => setNewBleetModal(true)}
          className="flex flex-col items-center space-y-1 cursor-pointer shrink-0"
        >
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-pink-500/60 p-0.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Plus size={20} />
            </div>
          </div>
          <span className="text-[10px] font-semibold text-white/80">Add Bleet</span>
        </div>

        {/* Other character stories */}
        {INITIAL_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center space-y-1 cursor-pointer shrink-0 group"
          >
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-md group-hover:scale-105 transition-transform">
              <img
                src={story.avatar}
                alt={story.author}
                className="w-full h-full rounded-full object-cover border border-[#171233]"
              />
            </div>
            <span className="text-[10px] font-semibold text-white/90 max-w-[56px] truncate">
              {story.author}
            </span>
          </div>
        ))}
      </div>

      {/* Bleeter Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
        {posts.map((post) => (
          <GTAOSCard
            key={post.id}
            className="p-3.5 space-y-3 border-white/10 hover:border-pink-500/30"
          >
            {/* Author header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-9 h-9 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <h4 className="text-xs font-bold text-white">{post.author}</h4>
                    {post.verified && <BadgeCheck size={14} className="text-pink-400 fill-pink-500/20" />}
                  </div>
                  <p className="text-[10px] text-white/50">{post.handle}</p>
                </div>
              </div>
              <span className="text-[10px] text-pink-300 font-mono">{post.timestamp}</span>
            </div>

            {/* Post Content */}
            <p className="text-xs text-white/90 leading-relaxed">{post.content}</p>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-1">
                {post.tags.map((t) => (
                  <span key={t} className="text-[10px] font-semibold text-cyan-400">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Attached media if present */}
            {post.image && (
              <div className="rounded-xl overflow-hidden max-h-56 bg-black/40 border border-white/10">
                <img src={post.image} alt="Media" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Engagement buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs text-white/70">
              <button
                onClick={() => likePost(post.id)}
                className={`flex items-center space-x-1.5 transition-colors ${
                  post.isLiked ? 'text-pink-500' : 'hover:text-pink-400'
                }`}
              >
                <Heart size={16} className={post.isLiked ? 'fill-pink-500 text-pink-500' : ''} />
                <span className="font-mono text-[11px] font-bold">{post.likes.toLocaleString()}</span>
              </button>

              <button
                onClick={() => setActiveCommentsPost(post)}
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="font-mono text-[11px] font-bold">
                  {post.commentsCount.toLocaleString()}
                </span>
              </button>

              <button className="flex items-center space-x-1.5 hover:text-white transition-colors">
                <Share2 size={15} />
              </button>
            </div>
          </GTAOSCard>
        ))}
      </div>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <div
          onClick={() => setActiveStory(null)}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 animate-in fade-in duration-200"
        >
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 w-full animate-pulse" />
          </div>

          {/* Story author pill */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <img
                src={activeStory.avatar}
                alt={activeStory.author}
                className="w-8 h-8 rounded-full border border-pink-500"
              />
              <span className="text-xs font-bold text-white">{activeStory.author}</span>
            </div>
            <button
              onClick={() => setActiveStory(null)}
              className="p-1 rounded-full bg-black/60 text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Media preview */}
          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden rounded-2xl border border-white/20">
            <img
              src={activeStory.media}
              alt="Story"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Caption */}
          <div className="p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-center">
            <p className="text-xs text-white font-medium">{activeStory.caption}</p>
          </div>
        </div>
      )}

      {/* Compose Bleet Modal */}
      {newBleetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#1A1433] border border-pink-500/40 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Compose Bleet</h3>
              <button
                onClick={() => setNewBleetModal(false)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <textarea
              value={bleetText}
              onChange={(e) => setBleetText(e.target.value)}
              placeholder="What's going down in Leonida? Spill the gossip..."
              rows={4}
              className="w-full bg-[#120E26] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-500/60 resize-none"
            />

            <div className="flex items-center justify-end space-x-2 pt-1">
              <GTAOSButton variant="outline" size="sm" onClick={() => setNewBleetModal(false)}>
                Cancel
              </GTAOSButton>
              <GTAOSButton variant="primary" size="sm" onClick={handlePublishBleet}>
                Bleet It
              </GTAOSButton>
            </div>
          </div>
        </div>
      )}

      {/* Comments Drawer */}
      <GTAOSBottomSheet
        isOpen={Boolean(activeCommentsPost)}
        onClose={() => setActiveCommentsPost(null)}
        title="Bleeter Replies"
      >
        {activeCommentsPost && (
          <div className="space-y-4">
            {/* List of comments */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {activeCommentsPost.comments && activeCommentsPost.comments.length > 0 ? (
                activeCommentsPost.comments.map((c) => (
                  <div key={c.id} className="flex items-start space-x-2.5 p-2 rounded-xl bg-white/5">
                    <img
                      src={c.avatar}
                      alt={c.author}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] font-bold text-pink-300">{c.author}</span>
                        <span className="text-[9px] text-white/40">{c.time}</span>
                      </div>
                      <p className="text-xs text-white/90 mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-white/50 text-center py-4">No replies yet. Be the first to Bleet back!</p>
              )}
            </div>

            {/* Input comment field */}
            <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 bg-[#130E26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500/60"
              />
              <button
                onClick={handleSendComment}
                className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}
      </GTAOSBottomSheet>
    </div>
  );
};
