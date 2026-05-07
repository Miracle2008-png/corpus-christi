"use client";
import { useState, useEffect } from "react";

interface Section {
  label: string;
  ref?: string;
  text?: string;
  response?: string;
}

interface ReadingModeProps {
  date: string;
  sections: Section[];
  reflection?: string;
}

export default function ReadingMode({ date, sections, reflection }: ReadingModeProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          background: "var(--navy-dark)", color: "var(--gold)",
          border: "1px solid var(--gold)", padding: "0.6rem 1.2rem",
          borderRadius: "999px", fontWeight: 700, cursor: "pointer",
          fontSize: "0.85rem", transition: "all 0.2s"
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "var(--gold)";
          e.currentTarget.style.color = "var(--navy-dark)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = "var(--navy-dark)";
          e.currentTarget.style.color = "var(--gold)";
        }}
      >
        <span style={{ fontSize: "1.1rem" }}></span> Enter Reading Mode
      </button>
    );
  }

  return (
    <div className="reading-mode-overlay" style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#f4eedb",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      overflowY: "auto",
      padding: "clamp(2rem, 5vw, 6rem) clamp(1.5rem, 5vw, 20%)",
      color: "#2c2820",
      animation: "fadeIn 0.4s ease-out forwards"
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      {/* Top Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, #f4eedb 50%, transparent)", zIndex: 10 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", opacity: 0.7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Liturgy of the Word
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: "rgba(0,0,0,0.05)", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Close Reading Mode"
        >
          ✕
        </button>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "6rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: "0.5rem", textAlign: "center", color: "#1a1610" }}>
          Daily Readings
        </h1>
        <p style={{ textAlign: "center", opacity: 0.6, fontSize: "1.1rem", marginBottom: "4rem" }}>{date}</p>

        {sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#8a2424", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>
              {sec.label}
            </h2>
            <p style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7, marginBottom: "2rem" }}>
              {sec.ref}
            </p>
            {sec.response && (
              <p style={{ fontWeight: 700, marginBottom: "1.5rem", color: "#1a1610", fontSize: "clamp(1.1rem, 3vw, 1.25rem)", lineHeight: 1.6 }}>
                <span style={{ color: "#8a2424" }}>R.</span> {sec.response}
              </p>
            )}
            <div style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "clamp(1.2rem, 4vw, 1.45rem)", 
              lineHeight: 1.85,
              color: "#2c2820",
              textIndent: "1.5rem",
              textAlign: "justify"
            }}>
              {sec.text?.split('\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: "1.5rem" }}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {reflection && (
          <div style={{ marginTop: "6rem", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "4rem" }}>
            <h2 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#8a2424", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center" }}>
              Gospel Reflection
            </h2>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 3.5vw, 1.25rem)", lineHeight: 1.8, fontStyle: "italic", color: "#3a362f", textAlign: "center" }}>
              {reflection}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
