"use client";

import { PointerEvent, useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useHasMouse, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import type { Project } from "@/lib/projects";
import { ShimmerImage } from "@/components/ShimmerImage";

const SCROLL_SPEED = 140; // pixels per second the screenshot scrolls inside the frame
const MIN_SCROLL = 60; // screenshots shorter than this past the frame don't scroll
const TILT = 8; // maximum card tilt in degrees

// Project card: full-page screenshot in a browser frame. With a mouse, hovering
// scrolls the screenshot, tilts the card and deepens its shadow.
// On phones the screenshot scrolls by itself while the card is on screen.
export function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = usePrefersReducedMotion();
  const hasMouse = useHasMouse();
  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollDistance = useRef(0);
  const inView = useInView(viewportRef, { amount: 0.6 });

  const y = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });

  const interactive = hasMouse && !reduceMotion;

  // Measures how far the screenshot reaches below the frame, so we know how far to scroll it
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Works out the screenshot's height at the frame's current width
    function measure() {
      const imageHeight = (viewport!.clientWidth * project.image.height) / project.image.width;
      scrollDistance.current = Math.max(0, imageHeight - viewport!.clientHeight);
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, [project.image]);

  // Phones: scroll down and back up on a loop while the card is on screen
  useEffect(() => {
    if (hasMouse || reduceMotion || !inView) return;
    const distance = scrollDistance.current;
    if (distance < MIN_SCROLL) return;

    const controls = animate(y, [0, -distance], {
      duration: distance / SCROLL_SPEED,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1.2,
      delay: 0.6,
    });
    return () => {
      controls.stop();
      y.set(0);
    };
  }, [hasMouse, reduceMotion, inView, y]);

  // Starts scrolling the screenshot down slowly when the mouse arrives
  function handlePointerEnter() {
    if (!interactive) return;
    const distance = scrollDistance.current;
    if (distance < MIN_SCROLL) return;
    animate(y, -distance, { duration: distance / SCROLL_SPEED, ease: "easeInOut" });
  }

  // Tilts the card toward the mouse
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    rotateY.set((x / rect.width - 0.5) * TILT);
    rotateX.set(-(top / rect.height - 0.5) * TILT);
  }

  // Puts everything back when the mouse leaves
  function handlePointerLeave() {
    if (!interactive) return;
    animate(y, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    rotateX.set(0);
    rotateY.set(0);
  }

  const urlLabel = project.link ? project.link.label : project.name.toLowerCase();

  return (
    <article id={project.id}>
      <motion.div
        ref={cardRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={interactive ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
        className="group relative rounded-2xl bg-line p-px shadow-soft transition-shadow duration-300 hover:shadow-device"
      >
        <div className="relative overflow-hidden rounded-[15px] bg-bg">
          {/* Browser bar */}
          <div aria-hidden="true" className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
            </span>
            <span className="mx-auto max-w-[60%] truncate rounded-full border border-line bg-bg px-3 py-1 font-mono text-[10px] text-muted">
              {urlLabel}
            </span>
            <span className="w-[42px]" />
          </div>

          {/* Screenshot window */}
          <div ref={viewportRef} className="relative aspect-[16/11] overflow-hidden">
            <motion.div style={{ y }}>
              <ShimmerImage
                src={project.image.src}
                width={project.image.width}
                height={project.image.height}
                alt={`${project.name} website, full page`}
                sizes="(min-width: 768px) 560px, 100vw"
                wrapperClassName="relative w-full"
                className="h-auto w-full"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Name, line, link and tags */}
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-text">{project.name}</h3>
          <p className="mt-1 leading-relaxed text-muted">{project.line}</p>
        </div>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 shrink-0 font-mono text-[11px] uppercase tracking-widest text-accent transition-opacity hover:opacity-75"
          >
            Visit <span aria-hidden="true">↗</span>
            <span className="sr-only">{project.link.label} (opens in a new tab)</span>
          </a>
        )}
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
