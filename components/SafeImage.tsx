"use client";
import { useState } from "react";

export default function SafeImage({ src, alt, fill, sizes, style, fallbackIcon = "" }: any) {
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  // Initialize currentSrc with the proxied URL if it's wikimedia
  if (!currentSrc && src) {
    if (src.includes("wikimedia.org") && !src.startsWith("/assets/")) {
      setCurrentSrc(`/api/image?url=${encodeURIComponent(src)}`);
    } else {
      setCurrentSrc(src);
    }
  }

  if (isError || !src) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "var(--navy)", position: fill ? "absolute" : "relative" }}>
        <span style={{ fontSize: "5rem", opacity: 0.3, color: "var(--white)" }}>{fallbackIcon}</span>
      </div>
    );
  }

  const handleImageError = () => {
    if (currentSrc?.startsWith("/api/image")) {
      // Proxy failed (e.g. 429), try original direct link
      console.warn(`Proxy failed for ${src}, falling back to direct link`);
      setCurrentSrc(src);
    } else {
      // Both failed
      setIsError(true);
    }
  };

  const mergedStyle = fill ? { position: "absolute", width: "100%", height: "100%", objectFit: "cover", ...style } : style;

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
