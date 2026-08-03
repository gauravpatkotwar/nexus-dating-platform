"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users, Plus, ShieldCheck, CheckCircle2 } from "lucide-react";
import { MOCK_EVENTS, NexusEvent } from "@/lib/mock-data";

export default function EventsPage() {
  const [events, setEvents] = useState<NexusEvent[]>(MOCK_EVENTS);
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-400" /> Local Meetups & Events
          </h1>
          <p className="text-xs text-nexus-muted mt-1">
            Host or attend verified local events: Coffee meetups, arcade nights, rooftop drinks.
          </p>
        </div>

        <button className="px-5 py-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-lg text-xs font-bold flex items-center gap-2 hover:bg-amber-500/30 transition">
          <Plus className="w-4 h-4" /> Host New Event (Verified Only)
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => {
          const isAttending = !!rsvpState[evt.id];
          return (
            <div key={evt.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
                  {evt.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">{evt.category}</span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-nexus-cyan" />
                  <span>{evt.date} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-nexus-purple" />
                  <span>{evt.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>
                    Host: <strong className="text-white">{evt.hostName}</strong>
                    {evt.hostVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 ml-1.5 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Host
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  {evt.attendeesCount + (isAttending ? 1 : 0)} / {evt.maxCapacity} Attending
                </span>

                <button
                  onClick={() => toggleRsvp(evt.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isAttending
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                      : "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90"
                  }`}
                >
                  {isAttending ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> RSVP Confirmed
                    </>
                  ) : (
                    "Reserve Spot"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
