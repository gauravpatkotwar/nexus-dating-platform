"use client";

import React from "react";
import Link from "next/link";
import { Shield, Sparkles, Lock, Eye, Users, MessageSquare, Clock, ArrowRight, Star, Zap } from "lucide-react";
import { AvatarRenderer } from "../components/avatar/AvatarRenderer";
import { MOCK_CANDIDATES } from "../lib/mock-data";
import { useSession } from "../context/SessionContext";

export default function LandingPage() {
  const { startSession } = useSession();

  return (
    <div className="relative overflow-hidden">
      {/* Background Radial Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-cyan-900/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 border-2 border-emerald-500/60 text-emerald-400 text-xs font-extrabold mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            DEVELOPED BY US — OFFICIAL NEXUS DATING PLATFORM v1.0
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-cyan-300">STRICTLY 18+ PRIVATE SESSIONS</span>
        </div>

        {/* Tagline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight uppercase">
          MEET. CONNECT. <br />
          <span className="bg-clip-text text-transparent bg-nexus-gradient drop-shadow-lg text-glow-purple">
            DISAPPEAR.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 syntax-highlight font-light leading-relaxed">
          No permanent profiles. No endless history. Every session is a fresh start.
          <span className="block mt-2 text-sm text-nexus-muted">
            You purchase a single private session. 60 minutes of uninhibited chemistry. Everything created during your session vanishes when time runs out.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => startSession(3600, "1 Hour Private Session")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-95 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
          >
            Start 1 Hour Session ($4.99) <ArrowRight className="w-5 h-5" />
          </button>
          <Link
            href="/features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:text-white transition flex items-center justify-center gap-2"
          >
            How Private Sessions Work
          </Link>
        </div>

        {/* Floating Ephemeral Candidate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {MOCK_CANDIDATES.slice(0, 3).map((candidate, idx) => (
            <div
              key={candidate.id}
              className={`glass-card p-5 rounded-3xl relative overflow-hidden border border-slate-800/80 transition-all transform ${
                idx === 1 ? "lg:-translate-y-4 border-nexus-purple/50 shadow-nexus-glow" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <AvatarRenderer config={candidate.avatar} size={70} />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    {candidate.username}
                    <span className="text-xs font-normal text-slate-400">, {candidate.age}</span>
                  </h3>
                  <span className="text-xs text-nexus-cyan font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {candidate.compatibility}% Compatibility
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {candidate.distanceKm} km away • Active Session
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 italic">
                "{candidate.bio}"
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
                  <Clock className="w-3.5 h-3.5" /> Session Active
                </span>
                <span className="text-slate-400 text-[11px]">Expires on logout</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Session Passes Pricing Grid */}
      <section className="py-20 bg-slate-950/80 border-y border-slate-900 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-purple/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/40">
              <Zap className="w-3.5 h-3.5 text-cyan-300" /> NO SUBSCRIPTIONS. PAY PER SESSION.
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Choose Your Private Session Pass</h2>
            <p className="text-sm text-slate-400">
              Each purchase starts a new temporary experience. You purchase time, not permanent digital baggage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">1 Hour Session</h3>
                <div className="text-3xl font-extrabold text-white mb-4">$4.99</div>
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">✓ 60 Minutes Active Time</li>
                  <li className="flex items-center gap-2">✓ Fresh Vector Avatar</li>
                  <li className="flex items-center gap-2">✓ Ephemeral Q&A Unlocks</li>
                </ul>
              </div>
              <button
                onClick={() => startSession(3600, "1 Hour Private Session")}
                className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
              >
                Start 1h Session
              </button>
            </div>

            <div className="glass-card p-6 rounded-3xl border-2 border-nexus-purple bg-purple-950/20 flex flex-col justify-between shadow-nexus-glow relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-nexus-purple text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                MOST POPULAR
              </span>
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-1">6 Hour Session</h3>
                <div className="text-3xl font-extrabold text-white mb-4">$14.99</div>
                <ul className="space-y-2 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2">✓ 360 Minutes Active Time</li>
                  <li className="flex items-center gap-2">✓ Priority Candidate Deck</li>
                  <li className="flex items-center gap-2">✓ 1 Free Session Extension</li>
                </ul>
              </div>
              <button
                onClick={() => startSession(21600, "6 Hour Private Session")}
                className="w-full py-3 rounded-xl bg-nexus-gradient text-xs font-extrabold text-white shadow-nexus-glow"
              >
                Start 6h Session
              </button>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">24 Hour Session</h3>
                <div className="text-3xl font-extrabold text-white mb-4">$24.99</div>
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">✓ Full Day Access</li>
                  <li className="flex items-center gap-2">✓ Event Host Capabilities</li>
                  <li className="flex items-center gap-2">✓ Incognito Stealth Mode</li>
                </ul>
              </div>
              <button
                onClick={() => startSession(86400, "24 Hour Private Session")}
                className="w-full py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
              >
                Start 24h Session
              </button>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-amber-500/40 bg-amber-950/10 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-amber-300 mb-1">Weekend Pass</h3>
                <div className="text-3xl font-extrabold text-white mb-4">$39.99</div>
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">✓ Friday 5 PM - Sunday Midnight</li>
                  <li className="flex items-center gap-2">✓ VIP Community Access</li>
                  <li className="flex items-center gap-2">✓ Unlimited Mutual Reveals</li>
                </ul>
              </div>
              <button
                onClick={() => startSession(172800, "Weekend Pass")}
                className="w-full py-3 rounded-xl bg-amber-400 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
              >
                Start Weekend Pass
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
