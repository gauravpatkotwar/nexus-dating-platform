"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, CheckCircle2, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { AvatarBuilder } from "@/components/avatar/AvatarBuilder";
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from "@/components/avatar/AvatarRenderer";
import { SessionQrPayment } from "@/components/payment/SessionQrPayment";
import { useSession } from "@/context/SessionContext";

export default function RegisterPage() {
  const router = useRouter();
  const { startSession } = useSession();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Non-Binary / Fluid");
  const [orientation, setOrientation] = useState("Exploring");
  const [relationshipGoal, setRelationshipGoal] = useState("Casual Hookups & Chat");
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  
  // Payment State
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [selectedPass, setSelectedPass] = useState({ name: "1 Hour Ephemeral Pass", seconds: 3600, price: "$4.99" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentConfirmed = (pass: { name: string; seconds: number; price: string }) => {
    setSelectedPass(pass);
    setIsPaymentConfirmed(true);
  };

  const handleFinishRegistration = () => {
    if (!isPaymentConfirmed) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      startSession(selectedPass.seconds, selectedPass.name);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12">
      <div className="glass-panel max-w-2xl w-full p-8 rounded-3xl border border-slate-800 shadow-nexus-glow relative">
        {/* Step Progress Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-nexus-cyan uppercase tracking-widest block">
              Step {step} of 4
            </span>
            <h2 className="text-xl font-extrabold text-white">
              {step === 1 && "Mandatory 18+ Verification & Credentials"}
              {step === 2 && "Dating Preferences & Orientation"}
              {step === 3 && "Create Your Anonymous Avatar"}
              {step === 4 && "Session Pass Fee (QR Payment)"}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-nexus-cyan shadow-cyan-glow" : "bg-slate-800"}`} />
            <span className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-nexus-purple shadow-nexus-glow" : "bg-slate-800"}`} />
            <span className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-amber-400 shadow-lg" : "bg-slate-800"}`} />
            <span className={`w-3 h-3 rounded-full ${step >= 4 ? "bg-emerald-400 shadow-lg" : "bg-slate-800"}`} />
          </div>
        </div>

        {/* STEP 1: Age Gate & Credentials */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 leading-relaxed">
                <strong className="block font-bold mb-1">STRICTLY 18+ ADULT PLATFORM</strong>
                NEXUS is designed exclusively for adults looking for casual dating, hookups, or relationships. You must be at least 18 years old to enter.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                  Anonymous Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CyberValkyrie"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                  Verified Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
              />
            </div>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="w-4 h-4 rounded text-nexus-purple focus:ring-0 accent-purple-600"
              />
              <span className="text-xs text-slate-300 font-semibold">
                I explicitly confirm I am 18 years of age or older, and agree to NEXUS Privacy Terms.
              </span>
            </label>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!ageConfirmed || !username || !email || !password}
              className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                ageConfirmed && username && email && password
                  ? "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90 cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              Continue to Preferences <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Preferences */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Gender Identity
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
              >
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
                <option value="Non-Binary / Fluid">Non-Binary / Fluid</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Sexual Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
              >
                <option value="Bi / Pansexual">Bi / Pansexual</option>
                <option value="Heterosexual">Heterosexual</option>
                <option value="Homosexual / Gay / Lesbian">Homosexual / Gay / Lesbian</option>
                <option value="Exploring">Exploring / Queer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Relationship Goal
              </label>
              <select
                value={relationshipGoal}
                onChange={(e) => setRelationshipGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-nexus-purple outline-none"
              >
                <option value="Casual Hookups & Chat">Casual Hookups & Chat</option>
                <option value="Friends & Co-op Buddy">Friends & Co-op Buddy</option>
                <option value="Long-term Chemistry">Long-term Chemistry</option>
                <option value="Open Relationship">Open Relationship</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-xl text-sm font-bold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Avatar Creator <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Avatar Customization */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <AvatarBuilder
              initialConfig={avatarConfig}
              onChange={(cfg) => setAvatarConfig(cfg)}
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 rounded-xl text-sm font-bold text-white bg-nexus-gradient shadow-nexus-glow hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Session Pass Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Session Pass QR Payment */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <SessionQrPayment
              onPaymentConfirmed={handlePaymentConfirmed}
              isConfirmed={isPaymentConfirmed}
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/3 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinishRegistration}
                disabled={!isPaymentConfirmed || isSubmitting}
                className={`w-2/3 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                  isPaymentConfirmed
                    ? "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90 cursor-pointer"
                    : "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span>Saving Profile & Launching Session...</span>
                ) : isPaymentConfirmed ? (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" /> Enter NEXUS & Start Session
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-slate-500" /> Complete QR Payment to Enter
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
