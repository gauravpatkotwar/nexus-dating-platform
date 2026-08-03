"use client";

import React, { useState } from "react";
import { AvatarConfig, AvatarRenderer, DEFAULT_AVATAR_CONFIG } from "./AvatarRenderer";
import { Sparkles, Palette, Shield, Shirt, Layers, Check } from "lucide-react";

interface AvatarBuilderProps {
  initialConfig?: AvatarConfig;
  onChange?: (config: AvatarConfig) => void;
}

export const AvatarBuilder: React.FC<AvatarBuilderProps> = ({
  initialConfig = DEFAULT_AVATAR_CONFIG,
  onChange,
}) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<"theme" | "hair" | "eyes" | "skin" | "accessory" | "outfit" | "frame">("theme");

  const updateField = (key: keyof AvatarConfig, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    if (onChange) onChange(newConfig);
  };

  const THEMES = [
    { id: "cyberpunk", label: "Cyberpunk", icon: "⚡" },
    { id: "anime", label: "Anime", icon: "🌸" },
    { id: "pixel", label: "Pixel Art", icon: "👾" },
    { id: "fantasy", label: "Fantasy", icon: "⚔️" },
    { id: "minimal", label: "Minimalist", icon: "✨" },
    { id: "cute", label: "Cute Chibi", icon: "🎀" },
    { id: "modern", label: "Modern", icon: "🕶️" },
  ];

  const HAIR_STYLES = [
    { id: "neon-spikes", label: "Neon Spikes" },
    { id: "long-waves", label: "Long Waves" },
    { id: "short-fade", label: "Short Fade" },
  ];

  const HAIR_COLORS = [
    "#06B6D4", "#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#1E293B"
  ];

  const EYE_COLORS = [
    "#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#6366F1"
  ];

  const SKIN_TONES = [
    "#F3D0D7", "#E0AC69", "#C68642", "#8D5524", "#FFDBAC", "#5A3825"
  ];

  const ACCESSORIES = [
    { id: "none", label: "None" },
    { id: "cyber-viser", label: "Cyber Visor" },
    { id: "glasses", label: "Glasses" },
    { id: "cat-ears", label: "Cat Ears" },
  ];

  const FRAMES = [
    { id: "neon-purple", label: "Neon Purple Glow" },
    { id: "neon-cyan", label: "Cyan Cyber Ring" },
    { id: "gold-vip", label: "Gold VIP Frame" },
    { id: "holo", label: "Holographic Sparkle" },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row gap-8 max-w-4xl w-full">
      {/* Live Preview Panel */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 md:w-1/3 shrink-0">
        <div className="relative mb-4">
          <AvatarRenderer config={config} size={160} />
          <span className="absolute -bottom-2 right-2 bg-nexus-purple text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-400/50 shadow-md">
            {config.theme.toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Anonymous Avatar</h3>
        <p className="text-xs text-nexus-muted text-center">
          Real photos remain locked until mutual reveal.
        </p>

        <div className="w-full mt-6 space-y-2">
          <button
            onClick={() => {
              const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)].id as AvatarConfig["theme"];
              const randomHair = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
              const randomEye = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];
              const randomConfig: AvatarConfig = {
                ...config,
                theme: randomTheme,
                hairColor: randomHair,
                eyeColor: randomEye,
              };
              setConfig(randomConfig);
              if (onChange) onChange(randomConfig);
            }}
            className="w-full py-2 px-4 rounded-xl bg-nexus-purple/20 border border-nexus-purple/50 text-purple-300 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-nexus-purple/30 transition"
          >
            <Sparkles className="w-4 h-4 text-purple-400" /> Randomize Avatar
          </button>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="flex-1 flex flex-col">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab("theme")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "theme"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Theme
          </button>
          <button
            onClick={() => setActiveTab("hair")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "hair"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Hair
          </button>
          <button
            onClick={() => setActiveTab("eyes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "eyes"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Eyes
          </button>
          <button
            onClick={() => setActiveTab("skin")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "skin"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Skin
          </button>
          <button
            onClick={() => setActiveTab("accessory")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "accessory"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Accessory
          </button>
          <button
            onClick={() => setActiveTab("frame")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === "frame"
                ? "bg-nexus-purple text-white shadow-nexus-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Frame
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 space-y-4">
          {activeTab === "theme" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Choose Aesthetic Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {THEMES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateField("theme", item.id)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                      config.theme === item.id
                        ? "border-nexus-purple bg-nexus-purple/20 text-white font-bold"
                        : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "hair" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Hair Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {HAIR_STYLES.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => updateField("hairStyle", h.id)}
                      className={`p-2.5 rounded-xl border text-xs text-center transition ${
                        config.hairStyle === h.id
                          ? "border-nexus-cyan bg-nexus-cyan/20 text-cyan-300 font-bold"
                          : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Hair Color
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {HAIR_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateField("hairColor", color)}
                      className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition transform hover:scale-105 ${
                        config.hairColor === color ? "border-white scale-110 shadow-lg" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {config.hairColor === color && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "eyes" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Eye Color
              </label>
              <div className="flex flex-wrap gap-3">
                {EYE_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateField("eyeColor", color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition transform hover:scale-105 ${
                      config.eyeColor === color ? "border-white scale-110 shadow-nexus-glow" : "border-slate-800"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {config.eyeColor === color && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skin" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Skin Tone
              </label>
              <div className="flex flex-wrap gap-3">
                {SKIN_TONES.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateField("skinTone", color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition transform hover:scale-105 ${
                      config.skinTone === color ? "border-white scale-110 shadow-md" : "border-slate-800"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {config.skinTone === color && <Check className="w-4 h-4 text-slate-900 drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "accessory" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Cyber Gear & Accessories
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {ACCESSORIES.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => updateField("accessory", acc.id)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition ${
                      config.accessory === acc.id
                        ? "border-nexus-purple bg-nexus-purple/20 text-white font-bold"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "frame" && (
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Glow Frame & Aura
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {FRAMES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateField("frame", f.id)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition ${
                      config.frame === f.id
                        ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
