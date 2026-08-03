"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, ArrowRight, CheckCircle2, QrCode } from "lucide-react";
import { SessionQrPayment } from "@/components/payment/SessionQrPayment";
import { useSession } from "@/context/SessionContext";

export default function LoginPage() {
  const router = useRouter();
  const { startSession } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [selectedPass, setSelectedPass] = useState({ name: "1 Hour Ephemeral Pass", seconds: 3600, price: "$4.99" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentConfirmed = (pass: { name: string; seconds: number; price: string }) => {
    setSelectedPass(pass);
    setIsPaymentConfirmed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPaymentConfirmed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Initialize ephemeral session with selected pass tier
      startSession(selectedPass.seconds, selectedPass.name);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-nexus-glow relative">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-nexus-gradient p-0.5 flex items-center justify-center mx-auto mb-3 shadow-nexus-glow">
            <div className="w-full h-full bg-nexus-bg rounded-[14px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-nexus-cyan" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back to NEXUS</h2>
          <p className="text-xs text-nexus-muted mt-1">
            Pay session fee & log in for private, ephemeral matchmaking
          </p>
        </div>

        {/* OAuth Fast Sign-in */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition"
          >
            <span className="text-sm">🌐</span> Google
          </button>
          <button
            type="button"
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition"
          >
            <span className="text-sm">🍎</span> Apple ID
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-widest absolute">
            Account Credentials
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anonymous@nexus.app"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-nexus-purple transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-nexus-cyan hover:underline">Forgot?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-nexus-purple transition"
            />
          </div>

          {/* STEP 2: Ephemeral Session QR Payment Wall */}
          <div className="pt-2">
            <SessionQrPayment
              onPaymentConfirmed={handlePaymentConfirmed}
              isConfirmed={isPaymentConfirmed}
            />
          </div>

          {/* Final Login Button */}
          <button
            type="submit"
            disabled={!isPaymentConfirmed || isSubmitting || !email || !password}
            className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition shadow-lg mt-4 ${
              isPaymentConfirmed && email && password
                ? "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90 cursor-pointer"
                : "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span>Authenticating & Initializing Ephemeral Session...</span>
            ) : isPaymentConfirmed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Sign In & Start Session ({selectedPass.name}) <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-500" />
                Pay Session Fee via QR to Unlock Login
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Don't have an anonymous account yet?{" "}
          <Link href="/register" className="text-nexus-cyan font-bold hover:underline">
            Register (18+)
          </Link>
        </p>
      </div>
    </div>
  );
}
