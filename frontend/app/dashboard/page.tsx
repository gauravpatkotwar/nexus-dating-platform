"use client";

import React from "react";
import Link from "next/link";
import { Compass, MessageSquare, Users, Calendar, Sparkles, ShieldCheck, Flame, ArrowRight, Lock } from "lucide-react";
import { AvatarRenderer } from "@/components/avatar/AvatarRenderer";
import { MOCK_CANDIDATES, MOCK_CHAT_THREADS, MOCK_COMMUNITIES, MOCK_EVENTS } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-nexus-purple/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 shadow-nexus-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Anonymous Privacy Shield Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="bg-clip-text text-transparent bg-nexus-gradient">CyberValkyrie</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            3 new chemistry matches nearby • 1 pending identity reveal consent request.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/discover"
            className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 transition flex items-center gap-2"
          >
            <Compass className="w-4 h-4" /> Start Discovering
          </Link>
          <Link
            href="/messages"
            className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Messages
          </Link>
        </div>
      </div>

      {/* Grid Layout: Top Chemistry Candidates + Active Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Chemistry Candidates */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-nexus-cyan" /> Top Chemistry Candidates Nearby
            </h2>
            <Link href="/discover" className="text-xs text-nexus-cyan font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_CANDIDATES.map((candidate) => (
              <div
                key={candidate.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <AvatarRenderer config={candidate.avatar} size={64} />
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1">
                        {candidate.username}, {candidate.age}
                      </h3>
                      <span className="text-xs text-nexus-cyan font-bold block">
                        ⚡ {candidate.compatibility}% Compatibility
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {candidate.distanceKm} km • {candidate.locationName}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    "{candidate.bio}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Photo Shielded
                  </span>
                  <Link
                    href="/discover"
                    className="px-3 py-1.5 rounded-xl bg-nexus-purple/20 border border-nexus-purple/50 text-purple-300 text-xs font-bold hover:bg-nexus-purple/30 transition"
                  >
                    View Card
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Messages Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-nexus-purple" /> Active Conversations
            </h2>
          </div>

          <div className="space-y-3">
            {MOCK_CHAT_THREADS.map((thread) => (
              <Link
                key={thread.id}
                href="/messages"
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-nexus-purple/40 block transition"
              >
                <div className="flex items-center gap-3">
                  <AvatarRenderer config={thread.candidate.avatar} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {thread.candidate.username}
                      </h4>
                      <span className="text-[10px] text-slate-500">{thread.lastTimestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>

                {thread.mutualRevealState.isFullyRevealed && (
                  <span className="mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full inline-block">
                    ✨ Identity Revealed
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Communities & Local Events Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Trending Communities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-nexus-cyan" /> Trending Communities
            </h2>
            <Link href="/communities" className="text-xs text-nexus-cyan font-bold hover:underline">
              Browse All
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_COMMUNITIES.map((comm) => (
              <div key={comm.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{comm.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{comm.title}</h4>
                    <span className="text-xs text-slate-400">
                      {comm.membersCount.toLocaleString()} Members • {comm.onlineCount} Online
                    </span>
                  </div>
                </div>
                <Link
                  href="/communities"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Join Group
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Local Verified Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" /> Verified Local Meetups
            </h2>
            <Link href="/events" className="text-xs text-amber-400 font-bold hover:underline">
              View Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_EVENTS.map((evt) => (
              <div key={evt.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {evt.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{evt.date} • {evt.time}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                <p className="text-xs text-slate-400">{evt.location}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    {evt.attendeesCount} / {evt.maxCapacity} Attending
                  </span>
                  <Link href="/events" className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold">
                    RSVP Spot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
