"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SessionContextType {
  sessionActive: boolean;
  secondsRemaining: number;
  isWelcomeOpen: boolean;
  isWarningOpen: boolean;
  isExpired: boolean;
  sessionTier: string;
  startSession: (seconds?: number, tier?: string) => void;
  extendSession: (seconds?: number) => void;
  endSession: () => void;
  closeWarning: () => void;
  closeWelcome: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionActive, setSessionActive] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600); // 60 minutes default
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(true);
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [sessionTier, setSessionTier] = useState<string>("1 Hour Private Session");

  // Timer Tick Interval
  useEffect(() => {
    if (!sessionActive || isWelcomeOpen || isExpired) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          setSessionActive(false);
          return 0;
        }

        // Trigger 5-minute warning popup at exactly 300 seconds (5:00)
        if (prev === 300) {
          setIsWarningOpen(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionActive, isWelcomeOpen, isExpired]);

  const startSession = (seconds: number = 3600, tier: string = "1 Hour Private Session") => {
    setSecondsRemaining(seconds);
    setSessionTier(tier);
    setSessionActive(true);
    setIsExpired(false);
    setIsWarningOpen(false);
    setIsWelcomeOpen(true);
  };

  const extendSession = (secondsToAdd: number = 3600) => {
    setSecondsRemaining((prev) => prev + secondsToAdd);
    setIsWarningOpen(false);
    setIsExpired(false);
    setSessionActive(true);
  };

  const endSession = () => {
    setSecondsRemaining(0);
    setIsExpired(true);
    setIsWarningOpen(false);
    setSessionActive(false);
  };

  const closeWarning = () => setIsWarningOpen(false);
  const closeWelcome = () => setIsWelcomeOpen(false);

  return (
    <SessionContext.Provider
      value={{
        sessionActive,
        secondsRemaining,
        isWelcomeOpen,
        isWarningOpen,
        isExpired,
        sessionTier,
        startSession,
        extendSession,
        endSession,
        closeWarning,
        closeWelcome,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
