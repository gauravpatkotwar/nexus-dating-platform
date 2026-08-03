"use client";

import React from "react";
import { Crown, Sparkles, CheckCircle2, Shield, Zap, Eye, Lock } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4">
          <Crown className="w-4 h-4 text-amber-400" /> NEXUS VIP UNLIMITED
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Elevate Your Chemistry Experience</h1>
        <p className="text-xs sm:text-sm text-nexus-muted max-w-xl mx-auto mt-2">
          Unlock unlimited candidates, see who viewed your profile, custom avatar frames, and incognito mode.
        </p>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
          <Sparkles className="w-6 h-6 text-amber-400 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">Unlimited Likes & Waves</h4>
          <p className="text-xs text-slate-400">Discover candidates without daily swiping limitations.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
          <Eye className="w-6 h-6 text-cyan-400 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">See Profile Visitors</h4>
          <p className="text-xs text-slate-400">View who checked out your avatar and icebreakers.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
          <Lock className="w-6 h-6 text-purple-400 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">Incognito Mode</h4>
          <p className="text-xs text-slate-400">Browse candidates completely hidden from search feeds.</p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">1 Month VIP</h3>
            <div className="text-3xl font-extrabold text-white mb-4">$19.99 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300 text-left mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Likes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Read Receipts</li>
            </ul>
          </div>
          <button className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700">Select Plan</button>
        </div>

        <div className="glass-card p-6 rounded-3xl border-2 border-amber-400 bg-amber-950/20 flex flex-col justify-between shadow-[0_0_30px_rgba(251,191,36,0.2)] relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
            MOST POPULAR
          </span>
          <div>
            <h3 className="text-lg font-bold text-amber-300 mb-1">3 Months VIP</h3>
            <div className="text-3xl font-extrabold text-white mb-4">$12.99 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300 text-left mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Unlimited Likes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Gold Avatar Frame</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> 1 Free Boost / Week</li>
            </ul>
          </div>
          <button className="w-full py-3 rounded-xl bg-amber-400 text-xs font-extrabold text-slate-950 hover:bg-amber-300 shadow-lg">Upgrade to VIP</button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">12 Months VIP</h3>
            <div className="text-3xl font-extrabold text-white mb-4">$8.99 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300 text-left mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> All Perks Included</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority Support</li>
            </ul>
          </div>
          <button className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700">Select Plan</button>
        </div>
      </div>
    </div>
  );
}
