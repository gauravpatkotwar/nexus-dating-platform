"use client";

import React from "react";

export interface AvatarConfig {
  theme: "cyberpunk" | "anime" | "pixel" | "fantasy" | "minimal" | "cute" | "modern";
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  accessory: string;
  outfitColor: string;
  background: string;
  frame: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  theme: "cyberpunk",
  hairStyle: "neon-spikes",
  hairColor: "#06B6D4",
  eyeColor: "#7C3AED",
  skinTone: "#F3D0D7",
  accessory: "cyber-viser",
  outfitColor: "#1E293B",
  background: "linear-gradient(135deg, #0B0F19, #1E293B)",
  frame: "neon-cyan",
};

interface AvatarRendererProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config = DEFAULT_AVATAR_CONFIG,
  size = 120,
  className = "",
}) => {
  const {
    theme = "cyberpunk",
    hairColor = "#06B6D4",
    eyeColor = "#7C3AED",
    skinTone = "#E0AC69",
    accessory = "none",
    outfitColor = "#1E293B",
    background = "bg-gradient",
    frame = "neon-purple",
  } = config;

  // Frame Styles
  const getFrameStyle = () => {
    switch (frame) {
      case "neon-purple":
        return "border-2 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.6)]";
      case "neon-cyan":
        return "border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]";
      case "gold-vip":
        return "border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]";
      case "holo":
        return "border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]";
      default:
        return "border border-slate-700";
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${getFrameStyle()} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Layer */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full"
      >
        <defs>
          <radialGradient id="cyber-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#090D16" />
          </radialGradient>
          <linearGradient id="anime-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="pixel-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Dynamic Background */}
        <rect
          width="100"
          height="100"
          fill={
            theme === "anime"
              ? "url(#anime-bg)"
              : theme === "pixel"
              ? "url(#pixel-bg)"
              : "url(#cyber-bg)"
          }
        />

        {/* Base Body & Shoulders */}
        <path
          d="M 20 100 Q 20 70 50 70 Q 80 70 80 100 Z"
          fill={outfitColor || "#1E293B"}
        />

        {/* Collar / Outfit Accents */}
        <path
          d="M 40 70 L 50 82 L 60 70 Z"
          fill={theme === "cyberpunk" ? "#06B6D4" : "#7C3AED"}
          opacity="0.8"
        />

        {/* Neck */}
        <rect x="44" y="55" width="12" height="18" fill={skinTone} rx="2" />

        {/* Head */}
        <ellipse cx="50" cy="45" rx="22" ry="24" fill={skinTone} />

        {/* Ears */}
        <ellipse cx="28" cy="46" rx="4" ry="6" fill={skinTone} />
        <ellipse cx="72" cy="46" rx="4" ry="6" fill={skinTone} />

        {/* Eyes & Brows */}
        <path d="M 36 39 Q 42 36 44 40" stroke="#000" strokeWidth="1.5" fill="none" />
        <path d="M 56 40 Q 58 36 64 39" stroke="#000" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="43" r="3.5" fill={eyeColor} />
        <circle cx="60" cy="43" r="3.5" fill={eyeColor} />
        <circle cx="41" cy="42" r="1" fill="#FFF" />
        <circle cx="61" cy="42" r="1" fill="#FFF" />

        {/* Mouth */}
        <path d="M 45 57 Q 50 61 55 57" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Hair Styles */}
        {config.hairStyle === "neon-spikes" || theme === "cyberpunk" ? (
          <path
            d="M 25 42 C 22 25, 30 15, 50 15 C 70 15, 78 25, 75 42 C 70 30, 65 24, 50 24 C 35 24, 30 30, 25 42 Z"
            fill={hairColor}
          />
        ) : config.hairStyle === "long-waves" || theme === "anime" ? (
          <g>
            <path
              d="M 22 45 C 18 20, 30 10, 50 10 C 70 10, 82 20, 78 45 C 82 65, 75 85, 72 90 L 68 90 C 72 70, 75 50, 72 40 C 65 22, 35 22, 28 40 C 25 50, 28 70, 32 90 L 28 90 C 25 85, 18 65, 22 45 Z"
              fill={hairColor}
            />
            <path d="M 38 22 Q 50 32 62 22" fill={hairColor} />
          </g>
        ) : (
          <path
            d="M 27 40 C 25 22, 35 18, 50 18 C 65 18, 75 22, 73 40 C 68 32, 60 28, 50 28 C 40 28, 32 32, 27 40 Z"
            fill={hairColor}
          />
        )}

        {/* Accessories */}
        {accessory === "cyber-viser" && (
          <path
            d="M 32 38 L 68 38 L 65 47 L 35 47 Z"
            fill="#06B6D4"
            opacity="0.85"
            stroke="#FFF"
            strokeWidth="0.5"
          />
        )}
        {accessory === "glasses" && (
          <g stroke="#FFF" strokeWidth="1.5" fill="none">
            <rect x="34" y="39" width="12" height="9" rx="2" />
            <rect x="54" y="39" width="12" height="9" rx="2" />
            <line x1="46" y1="43" x2="54" y2="43" />
          </g>
        )}
        {accessory === "cat-ears" && (
          <g fill={hairColor}>
            <polygon points="26,22 34,8 42,20" />
            <polygon points="58,20 66,8 74,22" />
          </g>
        )}
      </svg>
    </div>
  );
};
