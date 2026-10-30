"use client";

import { useEffect, useRef } from "react";
import { useHasMouse, usePrefersReducedMotion } from "@/lib/useMediaQuery";

// The accent color #5CF2B8 as RGB numbers, so canvas can add transparency to it
const MINT = "92, 242, 184";

const CELL = 48; // grid square size in pixels
const INTRO_SPREAD = 0.5; // seconds between the center lines and the outer lines starting
const INTRO_LINE = 0.9; // seconds each line takes to draw itself
const INTRO_END = INTRO_SPREAD + INTRO_LINE;
const PULSE_TAIL = 70; // length of the fading trail behind a data pulse
const MAX_PULSES = 6;

type Pulse = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  distance: number;
  travelled: number;
  speed: number;
};

// Eases a 0–1 value so it starts fast and settles gently
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Returns a random whole number from min up to and including max
function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Hero background on a canvas: grid that draws in from the center, a mint
// spotlight that follows the mouse (or drifts on phones) and data pulses
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const hasMouse = useHasMouse();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;

    // Off-screen layers: the faint grid, the bright grid shown under the
    // spotlight, and a scratch layer used for masking
    const faint = document.createElement("canvas");
    const bright = document.createElement("canvas");
    const scratch = document.createElement("canvas");
    const faintCtx = faint.getContext("2d");
    const brightCtx = bright.getContext("2d");
    const scratchCtx = scratch.getContext("2d");
    if (!faintCtx || !brightCtx || !scratchCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let originX = 0;
    let originY = 0;

    const spot = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let mouseInside = false;
    let pulses: Pulse[] = [];
    let nextPulseAt = INTRO_END + 0.8;

    let frame = 0;
    let running = false;
    let start = performance.now();
    let last = start;

    // How far through its intro draw-in a line is, based on its distance from the center
    function lineProgress(distanceFromCenter: number, elapsed: number) {
      const t = (elapsed - distanceFromCenter * INTRO_SPREAD) / INTRO_LINE;
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return easeOut(t);
    }

    // Draws every grid line, each grown out from the center by its intro progress
    function drawLines(c: CanvasRenderingContext2D, alpha: number, elapsed: number) {
      const cx = width / 2;
      const cy = height / 2;
      c.fillStyle = `rgba(${MINT}, ${alpha})`;

      for (let x = originX; x <= width; x += CELL) {
        const p = lineProgress(Math.abs(x - cx) / cx, elapsed);
        if (p > 0) c.fillRect(Math.round(x), cy - (height / 2) * p, 1, height * p);
      }
      for (let y = originY; y <= height; y += CELL) {
        const p = lineProgress(Math.abs(y - cy) / cy, elapsed);
        if (p > 0) c.fillRect(cx - (width / 2) * p, Math.round(y), width * p, 1);
      }
    }

    // Fades a layer out towards the edges, brightest at the top center
    function applyFade(c: CanvasRenderingContext2D) {
      const rx = Math.max(width * 0.7, height * 0.6);
      const ry = height * 0.95;
      const gradient = c.createRadialGradient(0, 0, 0, 0, 0, ry);
      gradient.addColorStop(0, "#000");
      gradient.addColorStop(0.35, "#000");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      c.save();
      c.globalCompositeOperation = "destination-in";
      c.translate(width / 2, 0);
      c.scale(rx / ry, 1);
      c.fillStyle = gradient;
      c.fillRect(-10000, 0, 20000, height);
      c.restore();
    }

    // Matches every canvas to the hero's size and redraws the cached grid layers
    function resize() {
      const rect = section!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      originX = (width / 2) % CELL;
      originY = (height / 2) % CELL;

      for (const [c, layer] of [
        [ctx!, canvas!],
        [faintCtx!, faint],
        [brightCtx!, bright],
        [scratchCtx!, scratch],
      ] as const) {
        layer.width = Math.round(width * dpr);
        layer.height = Math.round(height * dpr);
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      drawLines(faintCtx!, 0.09, Infinity);
      applyFade(faintCtx!);
      drawLines(brightCtx!, 0.5, Infinity);

      if (!running) {
        spot.x = target.x = width / 2;
        spot.y = target.y = height * 0.2;
      }
    }

    // Draws the big soft mint glow
    function drawGlow(strength: number) {
      const radius = Math.min(440, Math.max(width, 320) * 0.85);
      const gradient = ctx!.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
      gradient.addColorStop(0, `rgba(${MINT}, ${0.14 * strength})`);
      gradient.addColorStop(1, `rgba(${MINT}, 0)`);
      ctx!.fillStyle = gradient;
      ctx!.fillRect(spot.x - radius, spot.y - radius, radius * 2, radius * 2);
    }

    // Shows the bright grid in a soft circle around the spotlight, like a flashlight
    function drawSpotlight(strength: number) {
      const radius = hasMouse ? 210 : 160;
      const x0 = Math.max(0, Math.floor(spot.x - radius));
      const y0 = Math.max(0, Math.floor(spot.y - radius));
      const w = Math.min(width, Math.ceil(spot.x + radius)) - x0;
      const h = Math.min(height, Math.ceil(spot.y + radius)) - y0;
      if (w <= 0 || h <= 0) return;

      const gradient = scratchCtx!.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
      gradient.addColorStop(0, `rgba(0, 0, 0, ${strength})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      scratchCtx!.clearRect(x0, y0, w, h);
      scratchCtx!.drawImage(bright, x0 * dpr, y0 * dpr, w * dpr, h * dpr, x0, y0, w, h);
      scratchCtx!.globalCompositeOperation = "destination-in";
      scratchCtx!.fillStyle = gradient;
      scratchCtx!.fillRect(x0, y0, w, h);
      scratchCtx!.globalCompositeOperation = "source-over";
      ctx!.drawImage(scratch, x0 * dpr, y0 * dpr, w * dpr, h * dpr, x0, y0, w, h);
    }

    // Starts a new data pulse on a random grid line near the visible middle of the grid
    function spawnPulse() {
      const cols = Math.floor((width - originX) / CELL);
      const rows = Math.floor((height - originY) / CELL);
      const horizontal = Math.random() < 0.5;
      const direction = Math.random() < 0.5 ? -1 : 1;
      pulses.push({
        x: originX + randomInt(Math.round(cols * 0.15), Math.round(cols * 0.85)) * CELL,
        y: originY + randomInt(0, Math.round(rows * 0.7)) * CELL,
        dx: horizontal ? direction : 0,
        dy: horizontal ? 0 : direction,
        distance: randomInt(3, 8) * CELL,
        travelled: 0,
        speed: 90 + Math.random() * 90,
      });
    }

    // Moves and draws every data pulse: a bright dot with a fading trail
    function drawPulses(dt: number) {
      pulses = pulses.filter((pulse) => pulse.travelled < pulse.distance);

      for (const pulse of pulses) {
        pulse.travelled = Math.min(pulse.distance, pulse.travelled + pulse.speed * dt);
        const alpha = Math.sin(Math.PI * (pulse.travelled / pulse.distance));
        const headX = pulse.x + pulse.dx * pulse.travelled + 0.5;
        const headY = pulse.y + pulse.dy * pulse.travelled + 0.5;
        const tail = Math.min(pulse.travelled, PULSE_TAIL);
        const tailX = headX - pulse.dx * tail;
        const tailY = headY - pulse.dy * tail;

        const trail = ctx!.createLinearGradient(tailX, tailY, headX, headY);
        trail.addColorStop(0, `rgba(${MINT}, 0)`);
        trail.addColorStop(1, `rgba(${MINT}, ${0.85 * alpha})`);
        ctx!.strokeStyle = trail;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(headX, headY);
        ctx!.stroke();

        const halo = ctx!.createRadialGradient(headX, headY, 0, headX, headY, 9);
        halo.addColorStop(0, `rgba(${MINT}, ${0.7 * alpha})`);
        halo.addColorStop(1, `rgba(${MINT}, 0)`);
        ctx!.fillStyle = halo;
        ctx!.fillRect(headX - 9, headY - 9, 18, 18);

        ctx!.fillStyle = `rgba(${MINT}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(headX, headY, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Draws one still frame for people with reduced motion switched on
    function renderStill() {
      ctx!.clearRect(0, 0, width, height);
      spot.x = width / 2;
      spot.y = height * 0.15;
      drawGlow(1);
      ctx!.drawImage(faint, 0, 0, width, height);
    }

    // Draws one animation frame
    function render(now: number) {
      const elapsed = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Spotlight target: the mouse when it's over the hero, otherwise a slow drift
      if (!mouseInside) {
        const t = elapsed;
        target.x = width * (0.5 + 0.32 * Math.sin(t * 0.21));
        target.y = height * (0.32 + 0.2 * Math.sin(t * 0.29 + 1));
      }
      const follow = 1 - Math.exp(-dt * (mouseInside ? 8 : 1.5));
      spot.x += (target.x - spot.x) * follow;
      spot.y += (target.y - spot.y) * follow;

      ctx!.clearRect(0, 0, width, height);
      drawGlow(easeOut(Math.min(1, elapsed / 1.2)));

      if (elapsed < INTRO_END) {
        // Intro: grid lines grow out from the center
        scratchCtx!.clearRect(0, 0, width, height);
        drawLines(scratchCtx!, 0.09, elapsed);
        applyFade(scratchCtx!);
        ctx!.drawImage(scratch, 0, 0, width, height);
      } else {
        ctx!.drawImage(faint, 0, 0, width, height);
        drawSpotlight(easeOut(Math.min(1, (elapsed - INTRO_END) / 0.8)));

        if (elapsed > nextPulseAt) {
          if (pulses.length < MAX_PULSES) spawnPulse();
          if (pulses.length < MAX_PULSES && Math.random() < 0.35) spawnPulse();
          nextPulseAt = elapsed + 1.2 + Math.random() * 2;
        }
        drawPulses(dt);
      }

      frame = requestAnimationFrame(render);
    }

    // Starts the animation loop if it isn't already running
    function play() {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(render);
    }

    // Stops the animation loop, e.g. when the hero is scrolled out of view
    function pause() {
      running = false;
      cancelAnimationFrame(frame);
    }

    // Points the spotlight at the mouse
    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = section!.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      mouseInside = true;
    }

    // Lets the spotlight drift again when the mouse leaves the hero
    function handlePointerLeave() {
      mouseInside = false;
    }

    resize();

    if (reduceMotion) {
      renderStill();
      const resizeObserver = new ResizeObserver(() => {
        resize();
        renderStill();
      });
      resizeObserver.observe(section);
      return () => resizeObserver.disconnect();
    }

    start = performance.now();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else pause();
    });
    visibilityObserver.observe(section);

    if (hasMouse) {
      section.addEventListener("pointermove", handlePointerMove);
      section.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion, hasMouse]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
