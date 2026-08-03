import React from "react";
import { Shield, Sparkles, Lock, MessageSquare, Users, Calendar } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Core Platform Features</h1>
        <p className="text-sm text-nexus-muted max-w-xl mx-auto">
          Combining elements of Discord, Bumble, Reddit, and Steam for the ultimate privacy-first experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <Lock className="w-8 h-8 text-nexus-purple" />
          <h3 className="text-lg font-bold text-white">Mutual Identity Reveal</h3>
          <p className="text-xs text-slate-300">
            Real profile photos, Instagram handles, and voice intros remain locked behind blurred placeholders until both users press "Reveal Identity".
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <Sparkles className="w-8 h-8 text-nexus-cyan" />
          <h3 className="text-lg font-bold text-white">Customizable Vector Avatars</h3>
          <p className="text-xs text-slate-300">
            Cyberpunk, Anime, Pixel Art, Fantasy, Minimalist, Cute, and Modern avatar builder with customizable hair, eyes, skin, accessories, and glowing frames.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <MessageSquare className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Icebreaker Q&A System</h3>
          <p className="text-xs text-slate-300">
            Skip generic greetings! Every conversation starts with a fun mandatory icebreaker quiz that both users answer before chat unlocks.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <Users className="w-8 h-8 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Discord-Style Communities & Events</h3>
          <p className="text-xs text-slate-300">
            Public interest groups (Gamers, Travelers, Fitness, Nightlife) with post feeds, comments, and host-verified local meetups.
          </p>
        </div>
      </div>
    </div>
  );
}
