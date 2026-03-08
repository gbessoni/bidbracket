import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

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
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
