import React from "react";
import { Shield, Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">About NEXUS</h1>
        <p className="text-base text-nexus-muted max-w-2xl mx-auto">
          Reinventing adult dating through privacy, consent, and personality-first chemistry.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 leading-relaxed text-sm text-slate-300">
        <p>
          NEXUS was created out of fatigue with conventional superficial dating apps. Swiping endlessly on photos leads to burnout, awkward dates, and privacy risks.
        </p>
        <p>
          We built NEXUS so that personality, lifestyle compatibility, and real conversation come before physical appearance. Every user creates a customizable vector avatar. Real photos stay encrypted until both users decide to reveal them.
        </p>
      </div>
    </div>
  );
}
