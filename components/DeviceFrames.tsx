"use client";

import { ReactNode } from "react";
import { ShimmerImage } from "@/components/ShimmerImage";

// One app screenshot filling its frame, or a "coming soon" placeholder when there is no image yet
export function AppScreen({ image, alt, sizes }: { image: string; alt: string; sizes: string }) {
  if (!image) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg bg-grid">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted">
          Screenshot coming soon
        </span>
      </div>
    );
  }

  return (
    <ShimmerImage
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      wrapperClassName="absolute inset-0"
      className="object-cover object-top"
    />
  );
}

// Laptop outline: a screen with a thin bezel and a base underneath
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="rounded-t-2xl border border-line bg-bg p-2 sm:p-2.5 pb-0 sm:pb-0 shadow-2xl shadow-black/70">
        <div className="relative aspect-[3104/1878] overflow-hidden rounded-t-lg bg-bg">
          {children}
        </div>
      </div>
      <div className="relative h-3 sm:h-4 -mx-[4%] rounded-b-2xl border border-t-0 border-line bg-gradient-to-b from-line to-bg">
        <div className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-md bg-bg/70" />
      </div>
    </div>
  );
}

// Phone outline with rounded corners and a notch
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-line bg-bg p-1.5 shadow-2xl shadow-black/70">
      <div className="relative aspect-[1170/2532] overflow-hidden rounded-[1.6rem] bg-bg">
        {children}
        <div className="absolute left-1/2 top-1.5 h-4 w-1/3 -translate-x-1/2 rounded-full bg-bg" />
      </div>
    </div>
  );
}
