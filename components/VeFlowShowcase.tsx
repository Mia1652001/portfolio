"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { veflow } from "@/lib/projects";
import { AppScreen, LaptopFrame } from "@/components/DeviceFrames";
import { FloatingPhone } from "@/components/FloatingPhone";

const ease = [0.22, 1, 0.36, 1] as const;

// Big laptop showing VeFlow, with a phone overlapping its bottom right corner.
// The laptop tilts up into place when it scrolls into view, then grows slightly while scrolling.
export function VeFlowShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // 0 when the top of the showcase reaches the bottom of the screen, 1 when it is centred
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1.04]);

  return (
    <div ref={ref}>
      {/* key: starts fresh if reduced motion turns on, so nothing is left mid-animation */}
      <motion.div
        key={reduceMotion ? "still" : "animated"}
        style={reduceMotion ? undefined : { scale }}
        className="relative pb-[6%] sm:pr-[6%]"
      >
        {/* Laptop: starts lying back and tilts up into place once it is on screen */}
        <div className="perspective-[2000px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 60, rotateX: 28 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease }}
            className="origin-bottom"
          >
            <LaptopFrame>
              {/*
                The screenshot has a transparent margin and a Mac title bar around the app.
                Enlarging and shifting it makes just the app fill the laptop screen
                (the app starts 112px in and 134px down; 1571px of its height is shown).
              */}
              <div className="absolute -left-[4.31%] -top-[8.53%] h-[119.54%] w-[119.54%]">
                <AppScreen
                  image={veflow.laptopImage}
                  alt="VeFlow booking screen"
                  sizes="(min-width: 1024px) 1250px, 120vw"
                />
              </div>
            </LaptopFrame>
          </motion.div>
        </div>

        {/* Phone: rises in just after the laptop, then floats gently */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.7, ease }}
          className="absolute bottom-0 right-0 w-[26%] sm:w-[20%]"
        >
          <FloatingPhone image={veflow.phoneImage} />
        </motion.div>
      </motion.div>
    </div>
  );
}
