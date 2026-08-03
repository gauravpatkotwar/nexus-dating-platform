"use client";

import React, { useState } from "react";
import { Shield, Lock, Bell, Eye, UserX, Check } from "lucide-react";

export default function SettingsPage() {
  const [incognito, setIncognito] = useState(false);
  const [allowWave, setAllowWave] = useState(true);
  const [ghostMode, setGhostMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-nexus-cyan" /> Account & Privacy Settings
        </h1>
        <p className="text-xs text-nexus-muted mt-1">Manage anonymous controls, security shields, and blocked users.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-nexus-purple uppercase tracking-wider">Privacy Controls</h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-white">Incognito Mode (VIP)</h4>
            <p className="text-[11px] text-slate-400">Only candidates you like can view your avatar card.</p>
          </div>
          <button
            onClick={() => setIncognito(!incognito)}
            className={`w-12 h-6 rounded-full transition p-1 ${incognito ? "bg-nexus-purple" : "bg-slate-800"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition transform ${incognito ? "translate-x-6" : ""}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-white">Allow Spontaneous Waves</h4>
            <p className="text-[11px] text-slate-400">Receive quick wave greetings from candidates nearby.</p>
          </div>
          <button
            onClick={() => setAllowWave(!allowWave)}
            className={`w-12 h-6 rounded-full transition p-1 ${allowWave ? "bg-nexus-cyan" : "bg-slate-800"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition transform ${allowWave ? "translate-x-6" : ""}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-xs font-bold text-white">No Exact Live Location Sharing</h4>
            <p className="text-[11px] text-slate-400">Location is strictly rounded to neighborhood distance for safety.</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
            ENFORCED BY DEFAULT
          </span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Danger Zone</h3>
        <button className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-bold hover:bg-red-900/40">
          Delete Account & Wipe Encrypted Data
        </button>
      </div>
    </div>
  );
}
