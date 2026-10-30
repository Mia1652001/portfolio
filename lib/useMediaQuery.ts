"use client";

import { useSyncExternalStore } from "react";

// Returns whether a CSS media query matches, and updates live when it changes.
// The server always gets `false`, so the first render matches the server HTML.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

// Returns true when the visitor has reduced motion switched on
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// Returns true on devices with a real mouse (not phones or tablets)
export function useHasMouse() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
