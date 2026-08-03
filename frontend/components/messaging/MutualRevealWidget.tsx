"use client";

import React, { useState } from "react";
import { Lock, Unlock, Eye, ShieldCheck, Instagram, Volume2, Sparkles } from "lucide-react";
import { Candidate } from "../../lib/mock-data";

interface MutualRevealWidgetProps {
  candidate: Candidate;
  initialRevealState: {
    userAccepted: boolean;
    candidateAccepted: boolean;
    isFullyRevealed: boolean;
  };
  onRevealStatusChange?: (newStatus: { userAccepted: boolean; isFullyRevealed: boolean }) => void;
}

export const MutualRevealWidget: React.FC<MutualRevealWidgetProps> = ({
  candidate,
  initialRevealState,
  onRevealStatusChange,
}) => {
  const [revealState, setRevealState] = useState(initialRevealState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleUserReveal = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedUserAccepted = !revealState.userAccepted;
      const isFullyRevealed = updatedUserAccepted && revealState.candidateAccepted;
      const newState = {
        ...revealState,
        userAccepted: updatedUserAccepted,
        isFullyRevealed,
      };
      setRevealState(newState);
      setIsProcessing(false);
      if (onRevealStatusChange) {
        onRevealStatusChange({ userAccepted: updatedUserAccepted, isFullyRevealed });
      }
    }, 800);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/80 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-nexus-purple/20 text-purple-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Mutual Identity Shield
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-nexus-cyan border border-slate-700">
                E2E CONSENT
              </span>
            </h4>
            <p className="text-xs text-nexus-muted">
              Real photos and Instagram stay locked until both parties agree to reveal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
            revealState.isFullyRevealed
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
          }`}>
            {revealState.isFullyRevealed ? "✨ IDENTITIES UNLOCKED" : "🔒 LOCKED BY DEFAULT"}
          </span>
        </div>
      </div>

      {/* Dual Consent Status Badges */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
          revealState.userAccepted
            ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300"
            : "border-slate-800 bg-slate-950/40 text-slate-400"
        }`}>
          <span>Your Consent:</span>
          <span className="font-bold">
            {revealState.userAccepted ? "✓ Agreed to Reveal" : "Locked"}
          </span>
        </div>

        <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
          revealState.candidateAccepted
            ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300"
            : "border-slate-800 bg-slate-950/40 text-slate-400"
        }`}>
          <span>{candidate.username}'s Consent:</span>
          <span className="font-bold">
            {revealState.candidateAccepted ? "✓ Agreed to Reveal" : "Waiting..."}
          </span>
        </div>
      </div>

      {/* Photo & Profile Hidden / Revealed Display */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
        {revealState.isFullyRevealed ? (
          <div className="flex flex-col md:flex-row items-center gap-5 animate-fadeIn">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-nexus-cyan shadow-cyan-glow shrink-0">
              <img
                src={candidate.realPhotoPlaceholderUrl}
                alt={candidate.username}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-nexus-cyan" />
                <span className="text-base font-extrabold text-white">
                  Real Photo Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Mutual consent verified. You can now view {candidate.username}'s real profile photo and social handles.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" /> {candidate.instagramHidden}
                </span>
                <button className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1.5 hover:bg-purple-500/20">
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" /> Play Voice Intro ({candidate.voiceIntroDuration})
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-slate-800 shrink-0">
              <img
                src={candidate.realPhotoPlaceholderUrl}
                alt="Photo locked"
                className="w-full h-full object-cover photo-locked"
              />
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                <Lock className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Photo Encrypted
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-left">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                Identity Sealed Behind 256-Bit Blur
              </h5>
              <p className="text-xs text-slate-400">
                To protect privacy, real photos, Instagram handles, and voice intros remain 100% hidden until both users hit the button below.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Toggle Button */}
      <div className="mt-4">
        <button
          onClick={handleToggleUserReveal}
          disabled={isProcessing}
          className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition ${
            revealState.userAccepted
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              : "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90"
          }`}
        >
          {isProcessing ? (
            <span>Updating Privacy Consent...</span>
          ) : revealState.userAccepted ? (
            <>
              <Lock className="w-4 h-4" /> Revoke Reveal Consent
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-300" /> Grant Reveal Identity Consent
            </>
          )}
        </button>
      </div>
    </div>
  );
};
