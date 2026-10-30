"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, MouseEvent } from "react";

// Section links shown in the nav, each pointing at a section id on the homepage
const navLinks = [
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
];

const linkStyles =
  "font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent";

// Site nav bar: inline links on desktop, a hamburger dropdown on mobile
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Scrolls to a homepage section when already on the homepage, since
  // Next.js Link doesn't scroll for a hash-only change on the current route
  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (pathname === "/") {
      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
    setIsOpen(false);
  }

  return (
    <header className="bg-bg border-b border-line">
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
    </header>
  );
}
