"use client";
import { useState, useMemo } from "react";

export default function SafeImage({ src, alt, fill, sizes, style, fallbackIcon = "" }: any) {
  // Derive the initial src correctly using useMemo — no setState during render
  const initialSrc = useMemo(() => {
    if (!src) return null;
    if (src.includes("wikimedia.org") && !src.startsWith("/assets/")) {
      return `/api/image?url=${encodeURIComponent(src)}`;
    }
    return src;
  }, [src]);

  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(initialSrc);

  if (isError || !src) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "var(--navy)", position: fill ? "absolute" : "relative" }}>
        <span style={{ fontSize: "5rem", opacity: 0.3, color: "var(--white)" }}>{fallbackIcon}</span>
      </div>
    );
  }

  const handleImageError = () => {
    if (currentSrc?.startsWith("/api/image")) {
      // Proxy failed — fall back to direct link (browser will try without proxy)
      console.warn(`Proxy failed for ${src}, trying direct`);
      setCurrentSrc(src);
    } else {
      // Both failed — show placeholder
      setIsError(true);
    }
  };

  const mergedStyle = fill
    ? { position: "absolute", width: "100%", height: "100%", objectFit: "cover", ...style }
    : style;

  return (
    <img
      src={currentSrc || ""}
      alt={alt}
      style={mergedStyle as any}
      referrerPolicy="no-referrer"
      onError={handleImageError}
      loading="lazy"
    />
  );
}
