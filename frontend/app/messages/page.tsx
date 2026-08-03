"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Mic, Image, Smile, Lock, Unlock, Pin, Clock, MoreVertical, CheckCheck } from "lucide-react";
import { AvatarRenderer } from "@/components/avatar/AvatarRenderer";
import { MOCK_CHAT_THREADS, ChatThread, MessageItem } from "@/lib/mock-data";
import { MutualRevealWidget } from "@/components/messaging/MutualRevealWidget";

export default function MessagesPage() {
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("chat-1");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [disappearingTimer, setDisappearingTimer] = useState<"off" | "24h" | "1h">("off");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: MessageItem = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: inputText,
          lastTimestamp: "Just now",
          messages: [...t.messages, newMessage],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setInputText("");

    // Simulate reply after 1.5s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMessage: MessageItem = {
        id: `m-reply-${Date.now()}`,
        senderId: activeThread.candidate.id,
        text: "I love how easy it is to talk anonymously here! Chemical chemistry is so real.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, replyMessage], lastMessage: replyMessage.text }
            : t
        )
      );
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      <div className="glass-panel rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 min-h-[78vh] overflow-hidden">
        {/* Left Sidebar: Threads List */}
        <div className="lg:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/60">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-nexus-purple" /> Messages
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
              E2E Encrypted
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-900">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full p-4 text-left flex items-start gap-3 transition ${
                    isActive ? "bg-slate-900/90 border-l-4 border-nexus-purple" : "hover:bg-slate-900/40"
                  }`}
                >
                  <AvatarRenderer config={thread.candidate.avatar} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {thread.candidate.username}
                      </h4>
                      <span className="text-[10px] text-slate-500">{thread.lastTimestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>
                    {thread.mutualRevealState.isFullyRevealed && (
                      <span className="mt-1 text-[10px] text-emerald-400 font-semibold block">
                        ✨ Both Identities Revealed
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Chat Window */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900/40">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-3">
              <AvatarRenderer config={activeThread.candidate.avatar} size={44} />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {activeThread.candidate.username}
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <span className="text-xs text-slate-400">
                  {activeThread.candidate.compatibility}% Compatibility • {activeThread.candidate.locationName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDisappearingTimer(disappearingTimer === "off" ? "24h" : "off")}
                className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                  disappearingTimer !== "off"
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
                title="Disappearing Messages Timer"
              >
                <Clock className="w-4 h-4" /> {disappearingTimer === "off" ? "Timer Off" : disappearingTimer}
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* Embedded Mutual Reveal Widget */}
            <MutualRevealWidget
              candidate={activeThread.candidate}
              initialRevealState={activeThread.mutualRevealState}
            />

            {/* Messages Feed */}
            {activeThread.messages.map((msg) => {
              const isMe = msg.senderId === "me";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {!isMe && (
                    <AvatarRenderer config={activeThread.candidate.avatar} size={32} />
                  )}

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? "bg-nexus-gradient text-white rounded-br-none shadow-nexus-glow"
                        : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`text-[9px] mt-1 text-right font-medium ${
                        isMe ? "text-purple-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <AvatarRenderer config={activeThread.candidate.avatar} size={28} />
                <span>{activeThread.candidate.username} is typing...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
              <button type="button" className="p-2 text-slate-400 hover:text-white">
                <Image className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-white">
                <Mic className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-white">
                <Smile className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeThread.candidate.username} anonymously...`}
                className="flex-1 bg-transparent px-2 py-1 text-xs text-white placeholder-slate-500 outline-none"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-nexus-gradient text-white shadow-nexus-glow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
