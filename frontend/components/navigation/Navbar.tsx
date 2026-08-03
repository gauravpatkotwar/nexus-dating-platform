"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles, Bell, MessageSquare, Compass, Users, Menu, X } from "lucide-react";
import { SessionTimerBadge } from "../session/SessionTimerBadge";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAppPage = [
    "/dashboard", "/discover", "/messages", "/communities", "/events",
    "/notifications", "/settings", "/premium", "/coins", "/admin"
  ].some((path) => pathname?.startsWith(path));

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={isAppPage ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-nexus-gradient p-0.5 flex items-center justify-center shadow-nexus-glow group-hover:scale-105 transition">
            <div className="w-full h-full bg-nexus-bg rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-nexus-cyan" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-nexus-gradient drop-shadow">
              NEXUS
            </span>
            <span className="text-[10px] uppercase font-bold text-nexus-cyan block tracking-widest -mt-1">
              DISAPPEAR (18+)
            </span>
          </div>
        </Link>

        {/* Public Navigation */}
        {!isAppPage && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/features" className="hover:text-white transition">Features</Link>
            <Link href="/safety" className="hover:text-white transition">Safety</Link>
            <Link href="/pricing" className="hover:text-white transition">Session Passes</Link>
            <Link href="/community" className="hover:text-white transition">Community</Link>
          </nav>
        )}

        {/* App Quick Links (Desktop) */}
        {isAppPage && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            <Link
              href="/discover"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                pathname === "/discover" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" /> Discover
            </Link>
            <Link
              href="/messages"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                pathname === "/messages" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Messages
            </Link>
            <Link
              href="/communities"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                pathname === "/communities" ? "bg-nexus-purple text-white shadow-nexus-glow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Communities
            </Link>
          </nav>
        )}

        {/* Live Ephemeral Session Countdown & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Always Visible Persistent Session Timer */}
          <SessionTimerBadge />

          {isAppPage ? (
            <>
              <Link
                href="/notifications"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nexus-cyan animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nexus-cyan" />
              </Link>
              <Link
                href="/admin"
                className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Admin Console
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 transition"
              >
                Start Session
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-slate-900/95 border border-slate-800 rounded-2xl space-y-3">
          {!isAppPage ? (
            <>
              <Link href="/about" className="block py-2 text-sm text-slate-300 hover:text-white">About NEXUS</Link>
              <Link href="/features" className="block py-2 text-sm text-slate-300 hover:text-white">Ephemeral Sessions</Link>
              <Link href="/safety" className="block py-2 text-sm text-slate-300 hover:text-white">Safety & 18+ Gate</Link>
              <Link href="/pricing" className="block py-2 text-sm text-slate-300 hover:text-white">Session Passes</Link>
              <Link href="/community" className="block py-2 text-sm text-slate-300 hover:text-white">Communities</Link>
            </>
          ) : (
            <>
              <Link href="/discover" className="block py-2 text-sm text-slate-300 hover:text-white">Discover</Link>
              <Link href="/messages" className="block py-2 text-sm text-slate-300 hover:text-white">Messages</Link>
              <Link href="/communities" className="block py-2 text-sm text-slate-300 hover:text-white">Communities</Link>
              <Link href="/events" className="block py-2 text-sm text-slate-300 hover:text-white">Events</Link>
              <Link href="/pricing" className="block py-2 text-sm text-slate-300 hover:text-white">Purchase Session Pass</Link>
              <Link href="/admin" className="block py-2 text-sm text-slate-300 hover:text-white">Admin Console</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
