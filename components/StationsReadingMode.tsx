"use client";
import { useState, useEffect } from "react";

interface Station {
  number: number;
  title: string;
  scripture_reference: string;
  scripture_text: string;
  meditation_text: string;
  prayer: string;
}

export default function StationsReadingMode({ stations }: { stations: Station[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStation, setActiveStation] = useState(0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "transparent", color: "var(--gold)",
          border: "1px solid var(--gold)", padding: "0.5rem 1rem",
          borderRadius: "999px", fontWeight: 600, cursor: "pointer",
          fontSize: "0.8rem", transition: "all 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.1)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <span style={{ fontSize: "1rem" }}></span> Reading Mode
      </button>
    );
  }

  const station = stations[activeStation];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#f4eedb", overflowY: "auto",
      padding: "clamp(2rem, 5vw, 6rem) clamp(1rem, 5vw, 20%)",
      color: "#2c2820"
    }}>
      {/* Top Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, #f4eedb 50%, transparent)", zIndex: 10 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", opacity: 0.7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Via Crucis
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: "rgba(0,0,0,0.05)", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          ✕
        </button>
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto", paddingBottom: "8rem" }}>
        <h2 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#8a2424", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>
          Station {station.number}
        </h2>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "3rem", textAlign: "center", color: "#1a1610", lineHeight: 1.2 }}>
          {station.title}
        </h1>

        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <p style={{ fontWeight: 700, color: "#8a2424", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            V. We adore Thee, O Christ, and we praise Thee.
          </p>
          <p style={{ fontWeight: 700, color: "#1a1610", fontSize: "1.1rem" }}>
            R. Because by Thy holy cross, Thou hast redeemed the world.
          </p>
        </div>

        <div style={{ marginBottom: "2.5rem", borderLeft: "3px solid rgba(138,36,36,0.3)", paddingLeft: "1.5rem" }}>
          <p style={{ fontStyle: "italic", opacity: 0.6, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{station.scripture_reference}</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.7 }}>
            &ldquo;{station.scripture_text}&rdquo;
          </p>
        </div>

        <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "3rem" }}>
          {station.meditation_text}
        </p>

        <div style={{ background: "rgba(0,0,0,0.03)", padding: "2rem", borderRadius: "12px", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8a2424", fontWeight: 700, marginBottom: "1rem" }}>Prayer</p>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            {station.prayer}
          </p>
          
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2c2820", marginBottom: "0.5rem" }}>Our Father... Hail Mary... Glory Be...</p>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem", opacity: 0.7 }}>Have mercy on us, O Lord. Have mercy on us.</p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "2rem" }}>
          <button 
            disabled={activeStation === 0}
            onClick={() => setActiveStation(prev => prev - 1)}
            style={{ opacity: activeStation === 0 ? 0.3 : 1, cursor: activeStation === 0 ? "default" : "pointer", background: "none", border: "none", color: "#8a2424", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            &larr; Previous
          </button>
          <div style={{ fontSize: "0.85rem", opacity: 0.5, fontWeight: 600 }}>{activeStation + 1} / 14</div>
          <button 
            disabled={activeStation === 13}
            onClick={() => setActiveStation(prev => prev + 1)}
            style={{ opacity: activeStation === 13 ? 0.3 : 1, cursor: activeStation === 13 ? "default" : "pointer", background: "none", border: "none", color: "#8a2424", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
