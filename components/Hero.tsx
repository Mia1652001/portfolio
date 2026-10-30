"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MagneticLink } from "@/components/MagneticLink";
import { TypingLine } from "@/components/TypingLine";

// Headline words. Mint words get a light sweep that starts once all the
// words are in (about 2 seconds after load), one word after another.
const headline = [
  { word: "I", accent: false },
  { word: "build", accent: false },
  { word: "websites", accent: false },
  { word: "and", accent: false },
  { word: "the", accent: false },
  { word: "software", accent: false },
  { word: "businesses", accent: true, sweep: "motion-safe:animate-sweep-1" },
  { word: "run", accent: true, sweep: "motion-safe:animate-sweep-2" },
  { word: "on.", accent: true, sweep: "motion-safe:animate-sweep-3" },
];

// Intro timing, in seconds after the page loads
const WORDS_START = 0.7; // the grid is mostly drawn by now
const WORD_STAGGER = 0.09;
const WORDS_DONE = WORDS_START + headline.length * WORD_STAGGER + 0.3;

const ease = [0.22, 1, 0.36, 1] as const;

// Homepage hero: animated grid canvas, availability pill, headline intro,
// typing line, magnetic buttons and a scroll fade
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Text drifts down and fades as the hero scrolls away, so it moves slower than the page
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Fade-up entrance for an item, or nothing at all when reduced motion is on
  function fadeUp(delay: number) {
    if (reduceMotion) return {};
    return {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay, ease },
    };
  }

  // Headline word entrance: starts blurred and low, slides up into sharp focus
  function blurUp(delay: number) {
    if (reduceMotion) return {};
    return {
      initial: { opacity: 0, y: 28, filter: "blur(12px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0.8, delay, ease },
    };
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg">
      <HeroCanvas />

      {/* key: starts the content fresh if reduced motion turns on, so nothing is left mid-animation */}
      <motion.div
        key={reduceMotion ? "still" : "animated"}
        style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
        className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-28 sm:pb-32"
      >
        {/* Availability pill */}
        <motion.div
          {...fadeUp(0.3)}
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
                {...blurUp(WORDS_START + index * WORD_STAGGER)}
                className="inline-block"
              >
                {item.accent ? (
                  <span className={`text-sweep ${item.sweep}`}>
                    {item.word}
                  </span>
                ) : (
                  item.word
                )}
              </motion.span>{" "}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(WORDS_DONE)}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted"
        >
          From e-commerce stores to custom tools, I design and build sites
          that look great and actually work.
        </motion.p>

        {/* Typing line */}
        <motion.div {...fadeUp(WORDS_DONE + 0.15)} className="mt-5">
          <TypingLine startDelay={WORDS_DONE + 0.7} />
        </motion.div>

        {/* Magnetic buttons */}
        <motion.div
          {...fadeUp(WORDS_DONE + 0.3)}
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <MagneticLink
            href="#work"
            className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_var(--color-accent)]"
          >
            See my work
          </MagneticLink>
          <MagneticLink
            href="#contact"
            className="rounded-full border border-line px-7 py-3.5 text-center text-sm font-semibold text-text transition-[color,border-color,box-shadow] duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_32px_-8px_var(--color-accent)]"
          >
            Let&apos;s talk
          </MagneticLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
