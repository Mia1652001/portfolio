"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useHasMouse, usePrefersReducedMotion } from "@/lib/useMediaQuery";

const PULL = 0.35; // how strongly the link leans toward the mouse
const REACH = 70; // how far outside the link the pull starts, in pixels

// Link that pulls slightly toward the mouse when it comes close
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const hasMouse = useHasMouse();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion || !hasMouse) {
      x.jump(0);
      y.jump(0);
      return;
    }

    // Leans the link toward the mouse, strongest at medium range, none when far away
    function handlePointerMove(event: PointerEvent) {
      const link = ref.current;
      if (!link) return;
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - x.get();
      const centerY = rect.top + rect.height / 2 - y.get();
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const radius = Math.max(rect.width, rect.height) / 2 + REACH;
      const strength = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
      x.set(dx * PULL * strength);
      y.set(dy * PULL * strength);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, hasMouse, x, y]);

  return (
    <motion.a ref={ref} href={href} style={{ x, y }} className={className}>
      {children}
    </motion.a>
  );
}
