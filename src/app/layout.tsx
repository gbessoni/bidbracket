import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  title: "BidBracket - Auction Draft",
  description: "Real-time NCAA March Madness auction draft game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AnalyticsProvider />
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
