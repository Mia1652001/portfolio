"use client";

import { useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { useHasMouse, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { AppScreen, PhoneFrame } from "@/components/DeviceFrames";

// Phone mock-up that floats gently up and down and tilts slightly toward the mouse
export function FloatingPhone({ image, className = "" }: { image: string; className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const hasMouse = useHasMouse();
  const rotateX = useSpring(0, { stiffness: 80, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (reduceMotion || !hasMouse) return;

    // Tilts the phone a few degrees depending on where the mouse is on the screen
    function handlePointerMove(event: PointerEvent) {
      rotateY.set((event.clientX / window.innerWidth - 0.5) * 16);
      rotateX.set(-(event.clientY / window.innerHeight - 0.5) * 12);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, hasMouse, rotateX, rotateY]);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PhoneFrame>
          <AppScreen image={image} alt="VeFlow on a phone" sizes="240px" />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  );
}
