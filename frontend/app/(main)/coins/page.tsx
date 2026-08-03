"use client";

import React from "react";
import { Sparkles, Zap, Shield, Plus, Star } from "lucide-react";

export default function CoinsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" /> NEXUS VIRTUAL CURRENCY
        </div>
        <h1 className="text-3xl font-extrabold text-white">NEXUS Coin Store</h1>
        <p className="text-xs text-nexus-muted mt-1">
          Use coins for profile boosts, highlight messages, avatar cosmetics, and host event passes.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 bg-amber-950/20 text-center flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
          <div className="text-left">
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">Your Balance</span>
            <span className="text-2xl font-extrabold text-white">250 Coins</span>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300">
          Redeem Code
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="text-3xl">🪙</div>
          <h3 className="text-base font-bold text-white">100 Coins</h3>
          <p className="text-xs text-slate-400">Great for 1 Profile Boost or 2 Super Waves.</p>
          <div className="text-xl font-bold text-white">$4.99</div>
          <button className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700">Buy 100</button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-amber-400 bg-amber-950/20 text-center space-y-4 shadow-nexus-glow">
          <div className="text-3xl">💰</div>
          <h3 className="text-base font-bold text-amber-300">500 Coins + 50 Bonus</h3>
          <p className="text-xs text-slate-300">Most popular bundle for active daters.</p>
          <div className="text-xl font-bold text-white">$19.99</div>
          <button className="w-full py-3 rounded-xl bg-nexus-gradient text-xs font-bold text-white shadow-nexus-glow">Buy 550</button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="text-3xl">💎</div>
          <h3 className="text-base font-bold text-white">1500 Coins + 250 Bonus</h3>
          <p className="text-xs text-slate-400">Ultimate vault for avatar cosmetics & event hosting.</p>
          <div className="text-xl font-bold text-white">$49.99</div>
          <button className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700">Buy 1750</button>
        </div>
      </div>
    </div>
  );
}
