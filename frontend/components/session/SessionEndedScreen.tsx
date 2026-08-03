"use client";

import React from "react";
import { Lock, Sparkles, LogOut, RefreshCcw } from "lucide-react";
import { useSession } from "../../context/SessionContext";

export const SessionEndedScreen: React.FC = () => {
  const { isExpired, startSession } = useSession();

  if (!isExpired) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-2xl animate-fadeIn">
      {/* Background Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-panel max-w-lg w-full p-8 sm:p-10 rounded-3xl border border-red-500/30 text-center relative z-10 space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8 text-red-400" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 uppercase tracking-widest block w-fit mx-auto">
            SESSION EXPIRED & WIPED
          </span>
          <h1 className="text-3xl font-extrabold text-white">Session Complete</h1>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-light">
          Your private session has ended. Your temporary conversations, matches, and session activity have now expired and disappeared. Purchase another session to begin again.
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => startSession(3600, "1 Hour Private Session")}
            className="w-full sm:w-2/3 py-3.5 rounded-xl text-xs font-extrabold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
          >
            <RefreshCcw className="w-4 h-4" /> Start New Session ($4.99)
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="w-full sm:w-1/3 py-3.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Exit
          </button>
        </div>
      </div>
    </div>
  );
};
