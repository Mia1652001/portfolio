"use client";

import { ReactNode } from "react";
import { ShimmerImage } from "@/components/ShimmerImage";

// One app screenshot filling its frame.
// `preload` loads the image straight away; use it for screenshots near the top of the page.
export function AppScreen({
  image,
  alt,
  sizes,
  preload = false,
}: {
  image: string;
  alt: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <ShimmerImage
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      wrapperClassName="absolute inset-0"
      className="object-cover object-top"
    />
  );
}

// Laptop: a black screen bezel with a thin silver edge, and an aluminium base underneath.
// Sizes are percentages, so it keeps its shape from phone to desktop.
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate w-full">
      {/* Screen */}
      <div className="rounded-t-[1.6%_2.6%] bg-line p-[0.35%] pb-0 shadow-device">
        <div className="rounded-t-[1.4%_2.3%] bg-text p-[1.6%] pb-[2%]">
          <div className="relative aspect-[3104/1878] overflow-hidden rounded-[0.4%_0.6%] bg-panel">
            {children}
          </div>
        </div>
      </div>

      {/* Base, a little wider than the screen, with the opening notch in the middle */}
      <div className="relative -mx-[5%] aspect-[100/2.6] rounded-b-[4%_100%] border-x border-b border-line bg-linear-to-b from-panel to-line">
        <div className="absolute left-1/2 top-0 h-[40%] w-[13%] -translate-x-1/2 rounded-b-[30%_100%] bg-line" />
      </div>

      {/* Soft shadow on the "table" under the base */}
      <div aria-hidden="true" className="absolute inset-x-[2%] -bottom-[2%] -z-10 h-[4%] rounded-[50%] bg-text/15 blur-xl" />
    </div>
  );
}

// Phone: a black bezel with a thin silver edge, rounded corners and a Dynamic Island.
// Corner sizes are percentages (width / height), so they stay round at any size.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[17%/7.9%] bg-line p-[1.4%] shadow-device">
      <div className="rounded-[16%/7.4%] bg-text p-[3.4%]">
        <div className="relative aspect-[1170/2532] overflow-hidden rounded-[13%/6%] bg-panel">
          {children}
          <div className="absolute left-1/2 top-[1.6%] h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-text" />
        </div>
      </div>
    </div>
  );
}
