"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Formats a number for display; years skip the thousands comma
function format(value: number, isYear?: boolean) {
  const rounded = Math.round(value);
  return isYear ? String(rounded) : rounded.toLocaleString("en");
}

// Number that counts up from zero the first time it scrolls into view
export function CountUp({
  value,
  suffix = "",
  isYear,
}: {
  value: number;
  suffix?: string;
  isYear?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduceMotion) {
      element.textContent = format(value, isYear);
      return;
    }
    if (!inView) {
      element.textContent = format(0, isYear);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        element.textContent = format(latest, isYear);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, isYear]);

  return (
    <>
      {/* The real number is in the HTML, so it shows even before the script runs */}
      <span ref={ref} className="tabular-nums">
        {format(value, isYear)}
      </span>
      {suffix}
    </>
  );
}
