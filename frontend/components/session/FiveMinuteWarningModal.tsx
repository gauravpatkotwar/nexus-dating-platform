"use client";

import React, { useState } from "react";
import { AlertTriangle, Clock, Sparkles, RefreshCw, X } from "lucide-react";
import { useSession } from "../../context/SessionContext";

export const FiveMinuteWarningModal: React.FC = () => {
  const { isWarningOpen, closeWarning, extendSession, endSession, secondsRemaining } = useSession();
  const [isExtending, setIsExtending] = useState(false);

  if (!isWarningOpen) return null;

  const handleContinueSession = () => {
    setIsExtending(true);
    setTimeout(() => {
      extendSession(3600); // Add 60 minutes immediately
      setIsExtending(false);
    }, 600);
  };

  const formatMinSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative text-center space-y-5">
        <button
          onClick={closeWarning}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest block w-fit mx-auto mb-2">
            TIME EXPIRATION WARNING
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            Your Session Ends in <span className="text-amber-400 font-mono">{formatMinSec(secondsRemaining)}</span>
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-light">
          Your conversations and temporary connections will disappear when your session ends. Continue your experience by purchasing another private session.
        </p>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleContinueSession}
            disabled={isExtending}
            className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
          >
            {isExtending ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Adding +60 Minutes...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" /> Continue Session (+60 Mins)
              </>
            )}
          </button>

          <button
            onClick={endSession}
            className="w-full py-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            End Session Now
          </button>
        </div>
      </div>
    </div>
  );
};
