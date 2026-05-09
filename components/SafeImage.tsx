"use client";
import { useState } from "react";

export default function SafeImage({ src, alt, fill, sizes, style, fallbackIcon = "" }: any) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "var(--navy)", position: fill ? "absolute" : "relative" }}>
        <span style={{ fontSize: "5rem", opacity: 0.3, color: "var(--white)" }}>{fallbackIcon}</span>
      </div>
    );
  }

  const mergedStyle = fill ? { position: "absolute", width: "100%", height: "100%", objectFit: "cover", ...style } : style;

  return (
    <img 
      src={src} 
      alt={alt} 
      style={mergedStyle as any} 
      referrerPolicy="no-referrer"
      onError={() => setError(true)} 
    />
  );
}
