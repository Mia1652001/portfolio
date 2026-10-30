"use client";

import { PointerEvent } from "react";
import { motion, MotionValue, useMotionTemplate, useMotionValue } from "motion/react";

// Tracks the mouse over a card and builds the mint glow that follows it
export function useBorderGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, var(--color-accent), transparent 70%)`;

  // Moves the glow to where the mouse is inside the card
  function trackGlow(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return { glow, trackGlow };
}

// Mint glow along a card's 1px border. Put it first inside a card with
// "group relative rounded-2xl bg-line p-px" and the card's content after it.
export function BorderGlow({ glow }: { glow: MotionValue<string> }) {
  return (
    <>
      {/* Soft halo just outside the border */}
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute -inset-1 rounded-[20px] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40"
      />
      {/* Sharp bright line on the border itself */}
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </>
  );
}
