import React from "react";
import Link from "next/link";
import { Users, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { MOCK_COMMUNITIES } from "@/lib/mock-data";

export default function CommunityLandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">NEXUS Public Communities</h1>
        <p className="text-sm text-nexus-muted max-w-xl mx-auto">
          Connect with like-minded adults based on gaming, nightlife, travel, photography, and techno music before 1-on-1 dating.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_COMMUNITIES.map((c) => (
          <div key={c.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-4xl">{c.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{c.description}</p>
              <span className="text-[11px] font-bold text-nexus-cyan block">
                {c.membersCount.toLocaleString()} Members • {c.onlineCount} Active Now
              </span>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-xs font-bold text-nexus-purple hover:underline"
            >
              Join Group <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
