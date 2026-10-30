"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, MouseEvent } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Section links shown in the nav, each pointing at a section id on the homepage
const navLinks = [
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
];

const linkStyles =
  "font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent";

// Site nav bar: inline links on desktop, a hamburger dropdown on mobile.
// Turns into frosted glass with a mint scroll progress line once you scroll.
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Switches to the frosted glass look as soon as the page is scrolled
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 8);
  });

  // Scrolls to a homepage section when already on the homepage, since
  // Next.js Link doesn't scroll for a hash-only change on the current route.
  // The mobile menu closes first: closing it shrinks the nav and moves the page,
  // so the scroll waits a frame to aim at where the section ends up.
  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setIsOpen(false);
    if (pathname === "/") {
      event.preventDefault();
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line transition-[background-color] duration-300 motion-reduce:transition-none ${
        isScrolled ? "bg-bg/70 backdrop-blur-md" : "bg-bg"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          {/* Name with a mint dot */}
          <Link href="/" className="font-heading text-lg sm:text-xl font-bold text-text whitespace-nowrap">
            Mia Davidson<span className="text-accent">.</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-8">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(event) => handleSectionClick(event, link.id)}
                  className={linkStyles}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mint pill button */}
            <Link
              href="/#contact"
              onClick={(event) => handleSectionClick(event, "contact")}
              className="rounded-full bg-accent px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-bg whitespace-nowrap transition-opacity hover:opacity-85"
            >
              Start a project
            </Link>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            >
              <span className="w-5 h-0.5 bg-text" />
              <span className="w-5 h-0.5 bg-text" />
              <span className="w-5 h-0.5 bg-text" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-5 pt-6 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={(event) => handleSectionClick(event, link.id)}
                className={linkStyles}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Mint line along the bottom that fills up as you scroll down the page */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        />
      )}
    </header>
  );
}
