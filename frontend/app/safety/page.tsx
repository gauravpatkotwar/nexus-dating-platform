import React from "react";
import { ShieldCheck, UserCheck, Lock, EyeOff, AlertTriangle } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Safety & 18+ Verification</h1>
        <p className="text-sm text-nexus-muted max-w-xl mx-auto">
          Privacy and safety are our primary product features, not afterthoughts.
        </p>
      </div>

      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <UserCheck className="w-5 h-5" /> Mandatory 18+ Age Gate
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All users must explicitly confirm their age (18+) before gaining platform access. Optional government ID and selfie verification award Verified Badges for event hosts and high-trust matching.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-nexus-cyan font-bold text-sm">
            <Lock className="w-5 h-5" /> Consent-Based Photo Sharing
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Photos are encrypted on client upload and never shown until both parties click "Reveal Identity". Consent can be revoked at any time.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <EyeOff className="w-5 h-5" /> No Live Precise Location Sharing
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            We do not broadcast exact GPS coordinates. Distances are rounded to neighborhood radius to prevent stalking or location tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
