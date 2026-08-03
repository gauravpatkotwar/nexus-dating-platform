"use client";

import React from "react";
import { Bell, Sparkles, MessageSquare, Unlock, ShieldCheck, Heart } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "n1",
      title: "Identity Reveal Consent Granted",
      description: "CyberValkyrie agreed to Reveal Identity! Click to open photos & Instagram.",
      time: "10 mins ago",
      icon: <Unlock className="w-4 h-4 text-emerald-400" />,
      badge: "Mutual Reveal",
    },
    {
      id: "n2",
      title: "Icebreaker Question Answered",
      description: "PixelKnight answered your Friday Night icebreaker question. Chat is unlocked!",
      time: "2 hours ago",
      icon: <Sparkles className="w-4 h-4 text-nexus-cyan" />,
      badge: "Icebreaker",
    },
    {
      id: "n3",
      title: "New Like Received",
      description: "An anonymous member with 94% compatibility liked your profile.",
      time: "Yesterday",
      icon: <Heart className="w-4 h-4 text-pink-400" />,
      badge: "Match",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-nexus-cyan" /> Notifications & Alerts
        </h1>
        <p className="text-xs text-nexus-muted mt-1">Real-time alerts for matches, reveals, and icebreakers.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              {n.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
