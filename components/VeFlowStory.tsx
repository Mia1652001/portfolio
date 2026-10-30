"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { veflow } from "@/lib/projects";
import { AppScreen, LaptopFrame } from "@/components/DeviceFrames";
import { FloatingPhone } from "@/components/FloatingPhone";

const NAV_HEIGHT = 80; // the sticky nav covers this much of the top of the screen
const steps = veflow.steps;
const total = String(steps.length).padStart(2, "0");

// Turns a step index into "01", "02" and so on
function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

// VeFlow walkthrough. Desktop: sticks to the screen while you scroll through the steps.
// Phones and tablets: the steps are simply stacked, each with its screenshot.
export function VeFlowStory() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: [`start ${NAV_HEIGHT}px`, "end end"],
  });

  // Works out which step to show from how far through the story you have scrolled
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const step = Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length)));
    setActive(step);
  });

  // Scrolls the page to the middle of a step's scroll range
  function goToStep(index: number) {
    const story = storyRef.current;
    if (!story) return;
    const storyTop = window.scrollY + story.getBoundingClientRect().top - NAV_HEIGHT;
    const scrollRange = story.offsetHeight - (window.innerHeight - NAV_HEIGHT);
    window.scrollTo({
      top: storyTop + (scrollRange * (index + 0.5)) / steps.length,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <>
      {/* Desktop: sticky scroll story */}
      <div ref={storyRef} className="relative hidden lg:block h-[380vh]">
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center">
          <div className="grid w-full grid-cols-[minmax(0,4fr)_minmax(0,7fr)] items-center gap-14">
            {/* Left: step text and progress */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                <span className="text-accent">{stepNumber(active)}</span> / {total}
              </p>

              {/* All steps sit on top of each other; only the active one is visible */}
              <div className="mt-5 grid">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    aria-hidden={index !== active}
                    className={`col-start-1 row-start-1 transition-[opacity,translate] duration-500 motion-reduce:transition-none ${
                      index === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
                    }`}
                  >
                    <h4 className="font-heading text-4xl xl:text-5xl font-bold tracking-tight text-text">
                      {step.title}
                    </h4>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{step.text}</p>
                  </div>
                ))}
              </div>

              {/* Step list with the mint progress line */}
              <ol className="relative mt-12 space-y-4 pl-6">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line" />
                <motion.span
                  aria-hidden="true"
                  style={{ scaleY: reduceMotion ? (active + 1) / steps.length : scrollYProgress }}
                  className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
                />
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-text ${
                        index === active ? "text-accent" : "text-muted"
                      }`}
                    >
                      {stepNumber(index)} &nbsp;{step.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: laptop with crossfading screenshots, phone floating in front */}
            <div className="relative pr-[9%] pb-10">
              <LaptopFrame>
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
                      index === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <AppScreen
                      image={step.image}
                      alt={`VeFlow ${step.title} screen`}
                      sizes="(min-width: 1024px) 640px, 100vw"
                    />
                  </div>
                ))}
              </LaptopFrame>
              <FloatingPhone image={veflow.phoneImage} className="absolute bottom-0 right-0 w-[21%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: stacked steps */}
      <ol className="space-y-16 lg:hidden">
        {steps.map((step, index) => (
          <li key={step.title}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              <span className="text-accent">{stepNumber(index)}</span> / {total}
            </p>
            <h4 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text">{step.title}</h4>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            <div className="mt-6 px-[3%]">
              <LaptopFrame>
                <AppScreen image={step.image} alt={`VeFlow ${step.title} screen`} sizes="100vw" />
              </LaptopFrame>
            </div>
          </li>
        ))}
      </ol>
      <FloatingPhone image={veflow.phoneImage} className="mx-auto mt-16 w-44 sm:w-52 lg:hidden" />
    </>
  );
}
