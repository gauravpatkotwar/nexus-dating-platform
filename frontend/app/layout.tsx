import "./globals.css";
import React from "react";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/navigation/Footer";
import { SessionProvider } from "../context/SessionContext";
import { WelcomeSessionModal } from "../components/session/WelcomeSessionModal";
import { FiveMinuteWarningModal } from "../components/session/FiveMinuteWarningModal";
import { SessionEndedScreen } from "../components/session/SessionEndedScreen";

export const metadata = {
  title: "NEXUS | MEET. CONNECT. DISAPPEAR. (18+)",
  description:
    "Ephemeral anonymous adult dating experience (18+). No profiles. No permanent history. No digital baggage. Every session is a fresh start.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-nexus-bg text-white min-h-screen flex flex-col selection:bg-nexus-purple selection:text-white">
        <SessionProvider>
          {/* Ephemeral Session Overlay Modals */}
          <WelcomeSessionModal />
          <FiveMinuteWarningModal />
          <SessionEndedScreen />

          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
