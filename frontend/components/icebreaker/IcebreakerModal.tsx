"use client";

import React, { useState } from "react";
import { IcebreakerQuestion, ICEBREAKER_QUESTIONS } from "../../lib/mock-data";
import { Sparkles, MessageSquare, Lock, Unlock, CheckCircle2 } from "lucide-react";
import { AvatarRenderer, AvatarConfig } from "../avatar/AvatarRenderer";

interface IcebreakerModalProps {
  candidateName: string;
  candidateAvatar: AvatarConfig;
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const IcebreakerModal: React.FC<IcebreakerModalProps> = ({
  candidateName,
  candidateAvatar,
  isOpen,
  onClose,
  onUnlocked,
}) => {
  const [selectedQuestion] = useState<IcebreakerQuestion>(
    ICEBREAKER_QUESTIONS[Math.floor(Math.random() * ICEBREAKER_QUESTIONS.length)]
  );
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (option: "A" | "B") => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setUnlocked(true);
      setTimeout(() => {
        onUnlocked();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-nexus-purple/40 shadow-nexus-glow relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-nexus-purple/20 border border-nexus-purple/40 text-purple-300 text-xs font-bold gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" /> ICEBREAKER UNLOCK
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Break the Ice with {candidateName}
          </h3>
          <p className="text-xs text-nexus-muted mt-1">
            Answer this quick chemistry question to unlock 1-on-1 messaging!
          </p>
        </div>

        {/* Candidate Avatar Display */}
        <div className="flex justify-center mb-6">
          <AvatarRenderer config={candidateAvatar} size={100} />
        </div>

        {!unlocked ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
              <h4 className="text-sm font-bold text-nexus-cyan mb-3">
                "{selectedQuestion.question}"
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleSelect("A")}
                  className={`p-3 rounded-xl border text-sm font-semibold transition flex items-center justify-between ${
                    selectedOption === "A"
                      ? "border-nexus-purple bg-nexus-purple/30 text-white shadow-nexus-glow"
                      : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span>{selectedQuestion.optionA}</span>
                  {selectedOption === "A" && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </button>

                <button
                  onClick={() => handleSelect("B")}
                  className={`p-3 rounded-xl border text-sm font-semibold transition flex items-center justify-between ${
                    selectedOption === "B"
                      ? "border-nexus-cyan bg-nexus-cyan/30 text-white shadow-cyan-glow"
                      : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span>{selectedQuestion.optionB}</span>
                  {selectedOption === "B" && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedOption || isSubmitting}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                selectedOption
                  ? "bg-nexus-gradient text-white shadow-nexus-glow hover:opacity-90 cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span>Unlocking Connection...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4" /> Unlock Chat Channel
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Unlock className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-white">Chat Channel Unlocked!</h4>
            <p className="text-xs text-emerald-300">
              Both answers matched! Redirecting to messenger...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
