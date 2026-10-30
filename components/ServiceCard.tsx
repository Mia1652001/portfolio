"use client";

import { motion } from "motion/react";
import { useHasMouse, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import type { Service } from "@/lib/projects";
import { BorderGlow, useBorderGlow } from "@/components/BorderGlow";

// The lines that make up each icon, drawn on a 24 × 24 grid
const iconPaths: Record<Service["icon"], string[]> = {
  // Browser window with a few lines of content
  website: ["M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M3 9h18", "M7 13h6", "M7 16h10"],
  // Shopping bag
  store: ["M5.5 8h13l-1 12h-11z", "M9 8V6.5a3 3 0 0 1 6 0V8"],
  // Dashboard panels
  system: ["M4 4h7v7H4z", "M13 4h7v4h-7z", "M13 10h7v10h-7z", "M4 13h7v7H4z"],
};

// Line icon that draws itself the first time it scrolls into view
function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {iconPaths[icon].map((d, index) =>
        reduceMotion ? (
          <path key={d} d={d} />
        ) : (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              pathLength: { duration: 1.1, delay: 0.2 + index * 0.18, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: 0.2 + index * 0.18 },
            }}
          />
        )
      )}
    </svg>
  );
}

// Service card: drawing icon, text, what's included, proof and a link to the matching project.
// Lifts on hover, with the same mint border glow as the project cards.
export function ServiceCard({ service }: { service: Service }) {
  const reduceMotion = usePrefersReducedMotion();
  const hasMouse = useHasMouse();
  const { glow, trackGlow } = useBorderGlow();
  const interactive = hasMouse && !reduceMotion;

  return (
    <article
      onPointerMove={interactive ? trackGlow : undefined}
      className={`group relative h-full rounded-2xl bg-line p-px transition-[translate,background-color] duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        interactive ? "" : "hover:bg-accent/40"
      }`}
    >
      {interactive && <BorderGlow glow={glow} />}

      <div className="relative flex h-full flex-col rounded-[15px] bg-bg p-7 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-accent">
          <ServiceIcon icon={service.icon} />
        </div>

        <h3 className="mt-8 font-heading text-2xl font-bold tracking-tight text-text">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{service.text}</p>

        {service.includes && (
          <ul className="mt-6 space-y-2.5">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted"
              >
                <span aria-hidden="true" className="h-px w-3 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {service.proof && (
          <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
            <span className="mr-2 font-mono text-[11px] uppercase tracking-widest text-accent">Proof</span>
            {service.proof}
          </p>
        )}

        <a
          href={`#${service.target}`}
          className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
        >
          See it in action
          <span
            aria-hidden="true"
            className="transition-[translate] duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}
