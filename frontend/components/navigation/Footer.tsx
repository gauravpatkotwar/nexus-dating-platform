import React from "react";
import Link from "next/link";
import { Shield, Heart, Lock, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-nexus-gradient p-0.5 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-wider">NEXUS</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            The modern anonymous adult dating platform (18+). Meet people before you meet their face. Personality, chemistry, and privacy first.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
            <Lock className="w-3.5 h-3.5" /> 256-Bit E2E Photo Shield Active
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/discover" className="hover:text-white transition">Discover Candidates</Link></li>
            <li><Link href="/features" className="hover:text-white transition">Mutual Reveal System</Link></li>
            <li><Link href="/communities" className="hover:text-white transition">Public Communities</Link></li>
            <li><Link href="/events" className="hover:text-white transition">Verified Events</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Coins & Premium VIP</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Safety & Trust</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/safety" className="hover:text-white transition">18+ Mandatory Age Gate</Link></li>
            <li><Link href="/safety#selfie" className="hover:text-white transition">Selfie & ID Verification</Link></li>
            <li><Link href="/safety#privacy" className="hover:text-white transition">Zero Live Location Sharing</Link></li>
            <li><Link href="/safety#moderation" className="hover:text-white transition">AI Moderation Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/help" className="hover:text-white transition">Help Center & FAQ</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About NEXUS</Link></li>
            <li><Link href="/help#terms" className="hover:text-white transition">Terms of Service (18+)</Link></li>
            <li><Link href="/help#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} NEXUS Dating Platform. All rights reserved. Strictly 18+.</p>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Designed with</span>
          <Heart className="w-3.5 h-3.5 text-nexus-accent fill-nexus-accent" />
          <span>for Privacy-First Connections</span>
        </div>
      </div>
    </footer>
  );
};
