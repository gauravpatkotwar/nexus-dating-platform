"use client";

import React, { useState } from "react";
import { Shield, AlertTriangle, UserCheck, DollarSign, Users, CheckCircle2, XCircle, BarChart3, Filter } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "verifications" | "banned">("overview");

  // Mock Admin Data
  const reportsList = [
    { id: "rep-1", reporter: "CyberValkyrie", reportedUser: "SpamBot99", reason: "Unsolicited promotional links in chat", status: "pending", date: "10 mins ago" },
    { id: "rep-2", reporter: "PixelKnight", reportedUser: "FakeUser12", reason: "Impersonation attempt", status: "pending", date: "1 hour ago" },
  ];

  const verificationsList = [
    { id: "ver-1", username: "AstralMuse", ageSubmitted: 24, docType: "Government ID", status: "pending", date: "2 hours ago" },
    { id: "ver-2", username: "NeonShadow", ageSubmitted: 30, docType: "Selfie Live Check", status: "approved", date: "1 day ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-2">
            <Shield className="w-4 h-4" /> ADMIN CONTROL CONSOLE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">NEXUS Platform Moderation & Analytics</h1>
          <p className="text-xs text-nexus-muted mt-0.5">Manage 18+ verifications, user reports, safety queue & platform stats.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl font-bold">
            AI Moderation Engine Active
          </span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Total Active Users</span>
            <Users className="w-5 h-5 text-nexus-cyan" />
          </div>
          <div className="text-2xl font-extrabold text-white">28,490</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+12.4% this week</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Monthly Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">$42,850</div>
          <span className="text-[10px] text-emerald-400 font-semibold">VIP Subscriptions & Coins</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Pending Reports</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300">14</div>
          <span className="text-[10px] text-slate-400">Requires Moderator Action</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Verification Requests</span>
            <UserCheck className="w-5 h-5 text-nexus-purple" />
          </div>
          <div className="text-2xl font-extrabold text-white">8</div>
          <span className="text-[10px] text-purple-400 font-semibold">18+ ID / Selfie Checks</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "overview" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "reports" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
          }`}
        >
          Moderation Queue (Reports)
        </button>
        <button
          onClick={() => setActiveTab("verifications")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "verifications" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
          }`}
        >
          18+ Verifications
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-nexus-cyan" /> Revenue & User Growth Analytics
            </h3>
            <div className="h-48 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
              [Live Real-time Analytics Chart Simulation - 99.8% Uptime]
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Pending Moderation Reports</h3>
          <div className="space-y-3">
            {reportsList.map((rep) => (
              <div key={rep.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Reported: {rep.reportedUser}</span>
                    <span className="text-[10px] text-slate-400">by {rep.reporter} • {rep.date}</span>
                  </div>
                  <p className="text-xs text-amber-300 mt-1">Reason: {rep.reason}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold hover:bg-red-500/30">
                    Ban User
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "verifications" && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">18+ Identity Verification Requests</h3>
          <div className="space-y-3">
            {verificationsList.map((ver) => (
              <div key={ver.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">{ver.username} (Age: {ver.ageSubmitted})</span>
                  <span className="text-[11px] text-slate-400 block">{ver.docType} • Submitted {ver.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  {ver.status === "approved" ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Approved
                    </span>
                  ) : (
                    <>
                      <button className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30">
                        Approve Badge
                      </button>
                      <button className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
