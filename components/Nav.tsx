"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, MouseEvent } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Section links shown in the nav, each pointing at a section id on the homepage
const navLinks = [
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
];

const linkStyles = "text-sm text-muted transition-colors hover:text-text";

// Floating white pill nav: inline links on desktop, a dropdown card on mobile.
// Stays at the top while scrolling and turns into frosted glass.
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Switches to the frosted glass look as soon as the page is scrolled
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 8);
  });

  // Scrolls to a homepage section when already on the homepage, since
  // Next.js Link doesn't scroll for a hash-only change on the current route.
  // The mobile menu closes first, so the scroll waits a frame.
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
    <header className="pointer-events-none sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <div className="pointer-events-auto relative mx-auto max-w-5xl">
        <nav
          className={`flex items-center justify-between gap-3 rounded-full border border-line py-2 pl-5 pr-2 shadow-soft transition-[background-color] duration-300 motion-reduce:transition-none ${
            isScrolled ? "bg-bg/70 backdrop-blur-xl backdrop-saturate-150" : "bg-bg"
          }`}
        >
          {/* Name */}
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-text whitespace-nowrap"
          >
            Mia Davidson
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-8">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
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

            {/* Black pill button */}
            <Link
              href="/#contact"
              onClick={(event) => handleSectionClick(event, "contact")}
              className="rounded-full bg-text px-4 py-2 text-[13px] sm:text-sm font-medium text-bg whitespace-nowrap transition-opacity hover:opacity-85"
            >
              Start a project
            </Link>

            {/* Mobile menu toggle: two lines that turn into a cross */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="md:hidden relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-panel"
            >
              <span
                className={`absolute h-[1.5px] w-4 rounded-full bg-text transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 rounded-full bg-text transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown card */}
        {isOpen && (
          <div className="md:hidden absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl border border-line bg-bg/90 p-2 shadow-soft backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={(event) => handleSectionClick(event, link.id)}
                className="rounded-2xl px-4 py-3 text-base text-text transition-colors hover:bg-panel"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
