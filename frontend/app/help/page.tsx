"use client";

import React from "react";
import { HelpCircle, Lock, ShieldCheck, MessageSquare } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-nexus-cyan" /> NEXUS Help Center & FAQ
        </h1>
        <p className="text-xs text-nexus-muted mt-1">Frequently asked questions about privacy, mutual reveal, and 18+ guidelines.</p>
      </div>

      <div className="space-y-4">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-white">How does Mutual Reveal work?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every member starts with an anonymous vector avatar. Your real profile photos, Instagram handle, and voice intro stay 100% blurred until both you and your match click "Reveal Identity". If either declines, photos remain locked.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-white">Is 18+ age verification mandatory?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Yes. NEXUS is strictly for adults (18+). We enforce mandatory age confirmation and optional selfie/government ID verification for verified host badges.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-white">Is my exact live GPS location visible?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            No. We never share exact live GPS coordinates. Distances are rounded to approximate neighborhood radius (e.g. 3.2 km) for user safety.
          </p>
        </div>
      </div>
    </div>
  );
}
