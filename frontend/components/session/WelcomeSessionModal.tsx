"use client";

import React from "react";
import { Shield, Sparkles, Clock, Lock, ArrowRight } from "lucide-react";
import { useSession } from "../../context/SessionContext";

export const WelcomeSessionModal: React.FC = () => {
  const { isWelcomeOpen, closeWelcome, secondsRemaining, sessionTier } = useSession();

  if (!isWelcomeOpen) return null;

  const minutesDisplay = Math.floor(secondsRemaining / 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fadeIn">
      {/* Background Radial Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/40 via-blue-900/30 to-cyan-900/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-panel max-w-xl w-full p-8 sm:p-10 rounded-3xl border border-nexus-purple/50 shadow-nexus-glow text-center relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-nexus-gradient p-0.5 flex items-center justify-center mx-auto shadow-nexus-glow">
          <div className="w-full h-full bg-nexus-bg rounded-[22px] flex items-center justify-center">
            <Clock className="w-8 h-8 text-nexus-cyan animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> EPHEMERAL PRIVATE SESSION
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            YOUR PRIVATE SESSION <br />
            <span className="bg-clip-text text-transparent bg-nexus-gradient text-glow-purple">
              STARTS NOW
            </span>
          </h1>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-nexus-cyan">
            <Clock className="w-4 h-4" /> Allocated Duration: {minutesDisplay} Minutes ({sessionTier})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            You have <strong>{minutesDisplay} minutes</strong> to meet new people. Everything created during this session is temporary and disappears completely when your session ends.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-left text-[11px] text-slate-400">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-white block">No Profiles</span>
            Fresh avatar every visit
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-white block">No History</span>
            Zero digital footprint
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-white block">Fresh Chemistry</span>
            Pure conversation
          </div>
        </div>

        <button
          onClick={closeWelcome}
          className="w-full py-4 rounded-2xl text-base font-extrabold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-95 transition transform hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
        >
          ENTER SESSION <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
