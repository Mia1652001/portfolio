"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Status = "loading" | "loaded" | "error";

// Next.js Image with a soft shimmer while it loads and a fallback message if it fails.
// `wrapperClassName` sizes and positions the box the shimmer fills (relative or absolute).
export function ShimmerImage({
  wrapperClassName = "relative",
  className = "",
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [status, setStatus] = useState<Status>("loading");

  return (
    <div className={wrapperClassName}>
      {status === "loading" && (
        <div aria-hidden="true" className="absolute inset-0 shimmer motion-safe:animate-shimmer" />
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-line font-mono text-xs uppercase tracking-widest text-muted">
          Image unavailable
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`${className} transition-opacity duration-700 motion-reduce:transition-none ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
