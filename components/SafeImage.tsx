"use client";
import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, fill, sizes, style, fallbackIcon = "" }: any) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "var(--navy)" }}>
        <span style={{ fontSize: "5rem", opacity: 0.3, color: "var(--white)" }}>{fallbackIcon}</span>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill={fill} sizes={sizes} style={style} onError={() => setError(true)} />;
}
