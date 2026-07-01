"use client";

import Link from "next/link";
import { useState } from "react";

const linkStyles = "transition-opacity hover:opacity-60";

// Site nav bar: inline links on desktop, a hamburger dropdown on mobile
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-6xl mx-auto px-6 sm:px-8 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A1A1A" }}
        >
          Mia Davidson
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/#about" className={linkStyles} style={{ color: "#1A1A1A" }}>
            About
          </Link>
          <Link href="/contact" className={linkStyles} style={{ color: "#1A1A1A" }}>
            Contact
          </Link>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className="w-6 h-0.5" style={{ backgroundColor: "#1A1A1A" }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: "#1A1A1A" }} />
          <span className="w-6 h-0.5" style={{ backgroundColor: "#1A1A1A" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-6 text-sm font-medium">
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className={linkStyles}
            style={{ color: "#1A1A1A" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={linkStyles}
            style={{ color: "#1A1A1A" }}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
