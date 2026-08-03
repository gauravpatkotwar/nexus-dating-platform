"use client";

import React, { useState } from "react";
import { Users, MessageSquare, ThumbsUp, Plus, Shield, Sparkles } from "lucide-react";
import { MOCK_COMMUNITIES, CommunityGroup } from "@/lib/mock-data";
import { AvatarRenderer } from "@/components/avatar/AvatarRenderer";

export default function CommunitiesPage() {
  const [communities] = useState<CommunityGroup[]>(MOCK_COMMUNITIES);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityGroup>(MOCK_COMMUNITIES[0]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostContent) return;

    const newPost = {
      id: `p-${Date.now()}`,
      authorName: "CyberValkyrie",
      authorAvatarTheme: "cyberpunk" as const,
      title: newPostTitle,
      content: newPostContent,
      upvotes: 1,
      commentsCount: 0,
      timestamp: "Just now",
    };

    setSelectedCommunity({
      ...selectedCommunity,
      posts: [newPost, ...selectedCommunity.posts],
    });

    setNewPostTitle("");
    setNewPostContent("");
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-nexus-cyan" /> Public Communities & Hubs
          </h1>
          <p className="text-xs text-nexus-muted mt-1">
            Discord + Reddit hybrid groups. Discuss shared interests & hobbies anonymously.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-nexus-gradient text-white shadow-nexus-glow text-xs font-bold flex items-center gap-2 hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* Grid: Community Selector & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Communities Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Joined Hubs ({communities.length})
          </h3>
          {communities.map((group) => {
            const isSelected = group.id === selectedCommunity.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedCommunity(group)}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? "border-nexus-purple bg-slate-900 shadow-nexus-glow"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{group.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      {group.membersCount.toLocaleString()} members • {group.onlineCount} online
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Community Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedCommunity.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedCommunity.title}</h2>
                <p className="text-xs text-slate-300">{selectedCommunity.description}</p>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {selectedCommunity.posts.map((post) => (
              <div key={post.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarRenderer
                      config={{
                        theme: post.authorAvatarTheme,
                        hairStyle: "neon-spikes",
                        hairColor: "#06B6D4",
                        eyeColor: "#7C3AED",
                        skinTone: "#F3D0D7",
                        accessory: "none",
                        outfitColor: "#1E293B",
                        background: "bg-gradient",
                        frame: "neon-cyan",
                      }}
                      size={36}
                    />
                    <div>
                      <span className="text-xs font-bold text-white">{post.authorName}</span>
                      <span className="text-[10px] text-slate-500 block">{post.timestamp}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    ANONYMOUS POST
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{post.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-800/80 text-xs">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-nexus-cyan">
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes} Upvotes
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
                    <MessageSquare className="w-3.5 h-3.5" /> {post.commentsCount} Comments
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Post to {selectedCommunity.title}</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                  Post Title
                </label>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                  Post Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share details anonymously..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-nexus-gradient shadow-nexus-glow"
              >
                Publish Anonymous Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
