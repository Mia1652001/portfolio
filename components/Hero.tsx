"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { MagneticLink } from "@/components/MagneticLink";

// Headline, one array per line. The second line is light grey.
const headlineLines = [
  { words: ["Websites", "and", "software,"], className: "text-text" },
  { words: ["built", "to", "perform."], className: "text-faint" },
];

// Intro timing, in seconds after the page loads
const WORDS_START = 0.25;
const WORD_STAGGER = 0.08;
const WORD_COUNT = headlineLines.reduce((count, line) => count + line.words.length, 0);
const WORDS_DONE = WORDS_START + WORD_COUNT * WORD_STAGGER + 0.2;

// Position of each line's first word in the whole headline, so the stagger carries on into line two
const lineStarts = headlineLines.map((_, lineIndex) =>
  headlineLines.slice(0, lineIndex).reduce((count, line) => count + line.words.length, 0)
);

const ease = [0.22, 1, 0.36, 1] as const;

// Homepage hero, filling the screen with everything centred: dot grid background,
// availability pill, word by word headline, subtext, two buttons and a scroll cue
export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  // Fade-up entrance for an item, or nothing at all when reduced motion is on
  function fadeUp(delay: number) {
    if (reduceMotion) return {};
    return {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay, ease },
    };
  }

  // Headline word entrance: starts slightly blurred and low, rises into sharp focus
  function blurUp(delay: number) {
    if (reduceMotion) return {};
    return {
      initial: { opacity: 0, y: 24, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0.9, delay, ease },
    };
  }

  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col">
      {/* Faint dot grid, reaching up behind the nav and fading out downward */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 dot-grid" />

      {/* key: starts the content fresh if reduced motion turns on, so nothing is left mid-animation */}
      <div key={reduceMotion ? "still" : "animated"} className="relative flex flex-1 flex-col">
        <div className="mx-auto my-auto flex max-w-5xl flex-col items-center px-5 sm:px-8 py-16 sm:py-20 text-center">
          {/* Availability pill */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-3.5 py-1.5 shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline on two lines, revealed word by word */}
          <h1
            aria-label="Websites and software, built to perform."
            className="mt-8 sm:mt-10 text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.04em]"
          >
            {headlineLines.map((line, lineIndex) => (
              <span key={line.words.join(" ")} aria-hidden="true" className={`block ${line.className}`}>
                {line.words.map((word, index) => (
                  <span key={word}>
                    <motion.span
                      {...blurUp(WORDS_START + (lineStarts[lineIndex] + index) * WORD_STAGGER)}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(WORDS_DONE - 0.3)}
            className="mt-6 sm:mt-8 max-w-2xl text-[17px] sm:text-xl leading-relaxed text-muted text-balance"
          >
            I design and build brand websites, online stores and custom systems.
            My own product, VeFlow, runs car rental companies across Mauritius.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp(WORDS_DONE - 0.15)}
            className="mt-9 sm:mt-10 flex flex-wrap justify-center gap-3"
          >
            <MagneticLink
              href="#work"
              className="rounded-full bg-text px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              See my work
            </MagneticLink>
            <MagneticLink
              href="#contact"
              className="rounded-full border border-line bg-bg px-6 py-3 text-[15px] font-medium text-text shadow-soft transition-colors hover:bg-panel"
            >
              Let&apos;s talk
            </MagneticLink>
          </motion.div>
        </div>

        {/* Scroll cue: a short line with a dark dash sliding down it */}
        <motion.a
          href="#work"
          {...fadeUp(WORDS_DONE + 0.4)}
          className="mx-auto mb-6 sm:mb-8 flex flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-text"
        >
          Scroll
          <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-text motion-safe:animate-scroll-cue" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
