"use client";

import React from "react";
import { Clock, Zap } from "lucide-react";
import { useSession } from "../../context/SessionContext";

export const SessionTimerBadge: React.FC = () => {
  const { secondsRemaining, extendSession } = useSession();

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const isLowTime = secondsRemaining <= 300; // Under 5 mins

  return (
    <div
      onClick={() => extendSession(3600)}
      className={`px-3.5 py-1.5 rounded-2xl border flex items-center gap-2 cursor-pointer transition transform hover:scale-105 select-none ${
        isLowTime
          ? "bg-red-500/20 border-red-500/60 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse"
          : "bg-nexus-purple/20 border-nexus-purple/50 text-purple-200 shadow-nexus-glow"
      }`}
      title="Click to add +60 minutes to private session"
    >
      <Clock className={`w-4 h-4 ${isLowTime ? "text-red-400 animate-spin" : "text-purple-400"}`} />
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SESSION:</span>
        <span className="text-xs font-mono font-extrabold tracking-wider">{formatTime(secondsRemaining)}</span>
      </div>
      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-900 text-nexus-cyan border border-slate-700">
        +EXTEND
      </span>
    </div>
  );
};
