"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

const projectTypes = [
  "brand websites",
  "online stores",
  "booking systems",
  "dashboards",
  "custom tools",
];

const TYPE_SPEED = 70; // milliseconds per letter typed
const DELETE_SPEED = 35; // milliseconds per letter deleted
const HOLD_TIME = 1600; // how long a finished word stays on screen
const GAP_TIME = 350; // pause before typing the next word

// "Now building" line that types out and deletes each kind of project in turn
export function TypingLine({ startDelay }: { startDelay: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduceMotion) return;

    let wordIndex = 0;
    let letters = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    // Types or deletes one letter, then schedules the next step
    function step() {
      const word = projectTypes[wordIndex];

      if (!deleting) {
        letters += 1;
        setText(word.slice(0, letters));
        if (letters === word.length) {
          deleting = true;
          timer = setTimeout(step, HOLD_TIME);
        } else {
          timer = setTimeout(step, TYPE_SPEED);
        }
      } else {
        letters -= 1;
        setText(word.slice(0, letters));
        if (letters === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % projectTypes.length;
          timer = setTimeout(step, GAP_TIME);
        } else {
          timer = setTimeout(step, DELETE_SPEED);
        }
      }
    }

    timer = setTimeout(step, startDelay * 1000);
    return () => clearTimeout(timer);
  }, [reduceMotion, startDelay]);

  const label = (
    <>
      <span aria-hidden="true" className="text-accent">
        →
      </span>{" "}
      Now building{" "}
    </>
  );

  // Reduced motion: show every project type at once, no typing
  if (reduceMotion) {
    return (
      <p className="font-mono text-[11px] sm:text-xs uppercase leading-relaxed tracking-wider sm:tracking-widest text-muted">
        {label}
        <span className="text-text">{projectTypes.join(" · ")}</span>
      </p>
    );
  }

  return (
    <p className="h-5 whitespace-nowrap font-mono text-[11px] sm:text-xs uppercase leading-5 tracking-wider sm:tracking-widest text-muted">
      {label}
      <span className="sr-only">{projectTypes.join(", ")}</span>
      <span aria-hidden="true" className="text-text">
        {text}
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-accent animate-blink" />
      </span>
    </p>
  );
}
