import React from "react";
import Link from "next/link";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Transparent Pricing & VIP Perks</h1>
        <p className="text-sm text-nexus-muted max-w-xl mx-auto">
          NEXUS is 100% free to register, create avatars, chat, and participate in communities. Upgrade for extra superpower boosts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-left space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Free Anonymous Tier</h3>
            <div className="text-3xl font-extrabold text-white mb-2">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
            <p className="text-xs text-slate-400">Full platform experience with standard discover deck.</p>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Vector Avatar Customizer</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Icebreaker Q&A Unlocks</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> E2E Mutual Identity Reveal</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Public Communities & Events</li>
          </ul>
          <Link href="/register" className="block text-center py-3 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700">
            Get Started Free
          </Link>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-2 border-nexus-purple bg-purple-950/20 text-left space-y-6 shadow-nexus-glow relative">
          <div>
            <span className="text-xs font-extrabold text-purple-300 bg-purple-900/60 px-3 py-1 rounded-full uppercase mb-2 inline-block border border-purple-500/40">
              VIP UNLIMITED
            </span>
            <h3 className="text-xl font-bold text-white mb-1">VIP Superpower</h3>
            <div className="text-3xl font-extrabold text-white mb-2">$12.99 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-300">For daters who want max visibility, incognito mode & boosts.</p>
          </div>
          <ul className="space-y-3 text-xs text-slate-200">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Unlimited Likes & Wave Greetings</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> See Who Viewed Your Avatar</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Read Receipts & Incognito Mode</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Custom Avatar Frames & Aura Glows</li>
          </ul>
          <Link href="/register" className="block text-center py-3 rounded-xl bg-nexus-gradient text-xs font-bold text-white shadow-nexus-glow">
            Upgrade to VIP
          </Link>
        </div>
      </div>
    </div>
  );
}
