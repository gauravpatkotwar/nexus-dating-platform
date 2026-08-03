"use client";

import React, { useState, useEffect } from "react";
import { 
  QrCode, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  Smartphone, 
  CreditCard,
  Lock,
  ArrowRight
} from "lucide-react";

interface SessionQrPaymentProps {
  onPaymentConfirmed: (passTier: { name: string; seconds: number; price: string }) => void;
  isConfirmed: boolean;
}

export const PASS_OPTIONS = [
  { id: "1h", name: "1 Hour Ephemeral Pass", seconds: 3600, price: "$4.99", upiAmount: "₹399", desc: "Standard anonymous dating session" },
  { id: "6h", name: "6 Hour Night Owl Pass", seconds: 21600, price: "$12.99", upiAmount: "₹999", desc: "Extended evening & party mode" },
  { id: "24h", name: "24 Hour Weekend Pass", seconds: 86400, price: "$24.99", upiAmount: "₹1,899", desc: "Full day unrestricted access" },
];

export const SessionQrPayment: React.FC<SessionQrPaymentProps> = ({
  onPaymentConfirmed,
  isConfirmed,
}) => {
  const [selectedPass, setSelectedPass] = useState(PASS_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "crypto" | "card">("upi");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    // Generate random transaction ID on mount or tier change
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    setTxnId(`NEX-${randomHex}`);
  }, [selectedPass]);

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentConfirmed(selectedPass);
    }, 1500);
  };

  const copyTxnId = () => {
    navigator.clipboard.writeText(txnId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-5 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-nexus-purple/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-nexus-gradient p-0.5 flex items-center justify-center shadow-nexus-glow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <QrCode className="w-4 h-4 text-nexus-cyan" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              Session Payment Pass <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Mandatory</span>
            </h3>
            <p className="text-[11px] text-slate-400">Scan QR to pay fee before starting session</p>
          </div>
        </div>

        {isConfirmed ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Awaiting Payment
          </span>
        )}
      </div>

      {/* Pass Selection */}
      <div className="grid grid-cols-3 gap-2">
        {PASS_OPTIONS.map((pass) => (
          <button
            key={pass.id}
            type="button"
            onClick={() => setSelectedPass(pass)}
            className={`p-2.5 rounded-xl border text-left transition-all relative ${
              selectedPass.id === pass.id
                ? "bg-slate-900 border-nexus-purple shadow-nexus-glow text-white"
                : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="text-[11px] font-semibold truncate">{pass.name.split(" ")[0]} {pass.name.split(" ")[1]}</div>
            <div className="text-xs font-black text-nexus-cyan mt-0.5">{pass.price} / {pass.upiAmount}</div>
          </button>
        ))}
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setPaymentMethod("upi")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            paymentMethod === "upi"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> UPI / GPay / PhonePe
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("crypto")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            paymentMethod === "crypto"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" /> USDT / Crypto
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            paymentMethod === "card"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-nexus-cyan" /> Wallet / Card
        </button>
      </div>

      {/* QR Code Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative">
        {/* Rendered Futuristic QR Graphic */}
        <div className="relative group">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-2xl flex flex-col items-center justify-center border-4 border-slate-800 relative overflow-hidden">
            {/* Standard Stylized High-Tech QR Representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
              {/* Outer Position Detection Patterns */}
              <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="4" />
              <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
              <rect x="13" y="13" width="10" height="10" fill="currentColor" rx="1" />

              <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="4" />
              <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
              <rect x="77" y="13" width="10" height="10" fill="currentColor" rx="1" />

              <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="4" />
              <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
              <rect x="13" y="77" width="10" height="10" fill="currentColor" rx="1" />

              {/* Data Blocks Grid */}
              <rect x="36" y="8" width="6" height="6" fill="currentColor" />
              <rect x="46" y="8" width="12" height="6" fill="currentColor" />
              <rect x="8" y="36" width="6" height="12" fill="currentColor" />
              <rect x="18" y="36" width="6" height="6" fill="currentColor" />
              <rect x="36" y="24" width="6" height="6" fill="currentColor" />
              <rect x="48" y="24" width="6" height="12" fill="currentColor" />
              
              <rect x="36" y="36" width="28" height="28" fill="#7C3AED" rx="4" />
              
              <rect x="72" y="36" width="12" height="6" fill="currentColor" />
              <rect x="84" y="46" width="8" height="12" fill="currentColor" />

              <rect x="36" y="72" width="12" height="6" fill="currentColor" />
              <rect x="52" y="72" width="6" height="12" fill="currentColor" />
              <rect x="64" y="64" width="12" height="12" fill="currentColor" />
              <rect x="80" y="72" width="12" height="12" fill="currentColor" />

              {/* Center NEXUS emblem inside QR */}
              <circle cx="50" cy="50" r="11" fill="#0B0F19" />
              <path d="M46 44 L54 50 L46 56" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Overlaid Verified Badge when Confirmed */}
            {isConfirmed && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-2 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-black text-emerald-400 text-center uppercase tracking-wider">
                  Payment Verified!
                </span>
                <span className="text-[10px] text-slate-400 text-center mt-0.5">
                  {selectedPass.name} Active
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Amount & Txn Reference */}
        <div className="mt-3 text-center w-full">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5">
            <span>Pay Fee:</span>
            <span className="text-sm font-black text-white bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700">
              {paymentMethod === "upi" ? selectedPass.upiAmount : selectedPass.price}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[11px] font-mono text-nexus-cyan bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Ref: {txnId}
            </span>
            <button
              type="button"
              onClick={copyTxnId}
              className="text-slate-400 hover:text-white p-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Manual / Auto Verification Trigger */}
      {!isConfirmed ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleSimulatePayment}
            disabled={isVerifying}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                Verifying Transaction on Gateway...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                I Have Completed QR Payment (Click to Verify)
              </>
            )}
          </button>
          <p className="text-[10px] text-slate-500 text-center">
            Payments are processed instantly. Once verified, the login button below will unlock.
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-semibold text-emerald-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Pass ready: {selectedPass.name} ({selectedPass.price})</span>
          </div>
          <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">Unlocked</span>
        </div>
      )}
    </div>
  );
};
