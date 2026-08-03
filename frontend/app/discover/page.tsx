"use client";

import React, { useState } from "react";
import { Compass, Filter, Heart, X, Hand, HelpCircle, Sparkles, Lock, ShieldCheck, Check } from "lucide-react";
import { AvatarRenderer } from "@/components/avatar/AvatarRenderer";
import { MOCK_CANDIDATES, Candidate } from "@/lib/mock-data";
import { IcebreakerModal } from "@/components/icebreaker/IcebreakerModal";

export default function DiscoverPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [icebreakerCandidate, setIcebreakerCandidate] = useState<Candidate | null>(null);

  // Filter States
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(35);
  const [maxDistance, setMaxDistance] = useState(25);

  const currentCandidate = candidates[currentIndex % candidates.length];

  const handleNextCandidate = () => {
    setCurrentIndex((prev) => (prev + 1) % candidates.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header & Filter Controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-nexus-cyan" /> Discover Candidates
          </h1>
          <p className="text-xs text-nexus-muted mt-1">
            Anonymous cards ranked by compatibility & personality chemistry.
          </p>
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold flex items-center gap-2 transition"
        >
          <Filter className="w-4 h-4 text-nexus-purple" /> Advanced Filters
        </button>
      </div>

      {/* Main Candidate Card */}
      {currentCandidate && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-nexus-glow relative max-w-2xl mx-auto animate-fadeIn">
          {/* Online Status & Compatibility Tag */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                currentCandidate.onlineStatus === "online"
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  : "bg-amber-400"
              }`} />
              <span className="text-xs font-bold text-slate-300 capitalize">
                {currentCandidate.onlineStatus} • {currentCandidate.mood}
              </span>
            </div>

            <div className="px-3.5 py-1 rounded-full bg-nexus-purple/20 border border-nexus-purple/50 text-purple-300 font-extrabold text-xs flex items-center gap-1.5 shadow-nexus-glow">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {currentCandidate.compatibility}% Compatibility
            </div>
          </div>

          {/* Avatar & Core Profile Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <AvatarRenderer config={currentCandidate.avatar} size={140} />

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-extrabold text-white">
                  {currentCandidate.username}, {currentCandidate.age}
                </h2>
                {currentCandidate.verified && (
                  <span className="p-1 rounded-lg bg-nexus-cyan/10 border border-nexus-cyan/40 text-nexus-cyan text-xs" title="Verified 18+ Member">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400 block font-medium">
                📍 {currentCandidate.distanceKm} km away • {currentCandidate.locationName}
              </span>

              <div className="inline-block px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                Looking for: <span className="text-nexus-cyan font-bold">{currentCandidate.lookingFor}</span>
              </div>
            </div>
          </div>

          {/* Bio Quote */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Personal Bio
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-light italic">
              "{currentCandidate.bio}"
            </p>
          </div>

          {/* Interest Tags */}
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Interests & Lifestyle
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentCandidate.lifestyle.map((l) => (
                <span key={l} className="px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-800/50 text-purple-300 text-xs font-bold">
                  ⚡ {l}
                </span>
              ))}
              {currentCandidate.interests.map((i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                  #{i}
                </span>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between mb-8">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" /> Real Photo Encrypted
            </span>
            <span>Unlocks upon mutual reveal</span>
          </div>

          {/* Action Buttons: Pass, Wave, Icebreaker Q, Like */}
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={handleNextCandidate}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-400 hover:text-red-400 flex flex-col items-center justify-center gap-1 transition"
            >
              <X className="w-5 h-5" />
              <span className="text-[10px] font-bold">Pass</span>
            </button>

            <button
              onClick={handleNextCandidate}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 flex flex-col items-center justify-center gap-1 transition"
            >
              <Hand className="w-5 h-5" />
              <span className="text-[10px] font-bold">Wave</span>
            </button>

            <button
              onClick={() => setIcebreakerCandidate(currentCandidate)}
              className="p-4 rounded-2xl bg-nexus-purple/20 border border-nexus-purple/50 text-purple-300 hover:bg-nexus-purple/30 flex flex-col items-center justify-center gap-1 transition shadow-nexus-glow"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-[10px] font-bold">Question</span>
            </button>

            <button
              onClick={handleNextCandidate}
              className="p-4 rounded-2xl bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90 flex flex-col items-center justify-center gap-1 transition"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span className="text-[10px] font-bold">Like</span>
            </button>
          </div>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-nexus-cyan" /> Advanced Match Filters
              </h3>
              <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Age Range ({ageMin} - {ageMax})
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="18"
                    max="60"
                    value={ageMax}
                    onChange={(e) => setAgeMax(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Maximum Distance ({maxDistance} km)
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded"
                />
                <span className="text-xs text-slate-300 font-semibold">
                  Verified 18+ Government / Selfie Accounts Only
                </span>
              </label>

              <button
                onClick={() => setShowFilterModal(false)}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-nexus-gradient shadow-nexus-glow"
              >
                Apply Discover Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Icebreaker Modal */}
      {icebreakerCandidate && (
        <IcebreakerModal
          candidateName={icebreakerCandidate.username}
          candidateAvatar={icebreakerCandidate.avatar}
          isOpen={!!icebreakerCandidate}
          onClose={() => setIcebreakerCandidate(null)}
          onUnlocked={() => setIcebreakerCandidate(null)}
        />
      )}
    </div>
  );
}
