"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Text whose words blur in and slide up one by one when scrolled into view, like the hero headline
export function RevealWords({ text }: { text: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) return <>{text}</>;

  return (
    <>
      {/* Screen readers read this once instead of word by word */}
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>{" "}
        </span>
      ))}
    </>
  );
}
