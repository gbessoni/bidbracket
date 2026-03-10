"use client";

import { useEffect } from "react";

interface HowItWorksProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    emoji: "1",
    title: "Create or Join a League",
    desc: "Invite your friends with a 4-letter code. Everyone starts with $100.",
  },
  {
    emoji: "2",
    title: "Nominate a Team",
    desc: "On your turn, pick any NCAA team to put up for auction. Think it'll go far? Others will too.",
  },
  {
    emoji: "3",
    title: "Bid Like You Mean It",
    desc: "All players bid in real-time. 15-second timer resets with each bid. Highest bidder wins the team.",
  },
  {
    emoji: "4",
    title: "Build Your Roster",
    desc: "Draft as many teams as your budget allows. Cinderellas are cheap. Blue bloods cost a fortune.",
  },
  {
    emoji: "5",
    title: "Win the Tournament",
    desc: "Every tournament win by your teams scores points. Most wins across your roster takes the crown.",
  },
];

export default function HowItWorks({ isOpen, onClose }: HowItWorksProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface-card border-b border-surface-border rounded-t-2xl px-5 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-black text-text-primary">How It Works</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-6">
          {/* Intro */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
            <p className="text-sm text-text-secondary leading-relaxed">
              Forget filling out a boring bracket.
              <span className="text-accent font-bold"> BidBracket</span> turns March Madness
              into a <span className="text-text-primary font-semibold">live auction</span> where
              you draft the teams you believe in &mdash; and outbid your friends for the ones everyone wants.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.emoji} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-black text-white">{step.emoji}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{step.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Strategy callout */}
          <div className="bg-alert/10 border border-alert/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-alert mb-1.5">The Strategy</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Do you go all-in on a #1 seed? Or spread your $100 across scrappy
              underdogs? Here&apos;s the catch: <span className="text-text-primary font-semibold">if the draft
              ends and you still have money, you don&apos;t get to use it.</span> Every
              dollar left on the table is a wasted opportunity. Spend wisely, but spend it all.
            </p>
          </div>

          {/* Not your grandpa's bracket */}
          <div className="bg-surface-hover rounded-xl p-4">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Not Your Average Bracket</h4>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex gap-2">
                <span className="text-text-muted">Old way:</span>
                <span>Pick winners on a sheet. Set it and forget it. Boring.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent font-semibold">BidBracket:</span>
                <span>Draft teams in a live auction. Every round of the tourney, your roster climbs or falls. Real competition. Real stakes.</span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            Let&apos;s Draft
          </button>
        </div>
      </div>
    </div>
  );
}
