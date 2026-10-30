"use client";

import { motion, useReducedMotion } from "motion/react";

// Headline words, with the ones that should be mint marked as accent
const headline = [
  { word: "I", accent: false },
  { word: "build", accent: false },
  { word: "websites", accent: false },
  { word: "and", accent: false },
  { word: "the", accent: false },
  { word: "software", accent: false },
  { word: "businesses", accent: true },
  { word: "run", accent: true },
  { word: "on.", accent: true },
];

// Homepage hero: grid background, drifting glow, availability pill, animated headline and buttons
export function Hero() {
  const reduceMotion = useReducedMotion();

  // Builds the fade-up animation for an item, or an instant one when reduced motion is on
  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
      animate: { opacity: 1, y: 0 },
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  }

  const wordsDoneAt = 0.15 + headline.length * 0.08;

  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Faint mint grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />

      {/* Soft mint glow that slowly drifts */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] max-w-[140vw]"
      >
        <div className="w-full h-full rounded-full bg-accent/15 blur-[120px] motion-safe:animate-drift" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-28 sm:pb-32">
        {/* Availability pill */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/60 px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted">
            Available for new projects
          </span>
        </motion.div>

        {/* Headline, revealed word by word */}
        <h1
          aria-label="I build websites and the software businesses run on."
          className="mt-8 max-w-4xl text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-text"
        >
          {headline.map((item, index) => (
            <span key={index} aria-hidden="true">
              <motion.span
                {...fadeUp(0.15 + index * 0.08)}
                className={`inline-block ${item.accent ? "text-accent" : ""}`}
              >
                {item.word}
              </motion.span>{" "}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(wordsDoneAt)}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted"
        >
          From e-commerce stores to custom tools, I design and build sites
          that look great and actually work.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp(wordsDoneAt + 0.1)}
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-bg transition-opacity hover:opacity-85"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-7 py-3.5 text-center text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            Let&apos;s talk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
