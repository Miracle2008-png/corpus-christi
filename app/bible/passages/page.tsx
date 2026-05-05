"use client";
import { useState } from "react";
import Link from "next/link";
import passagesData from "../../../data/bible-passages.json";

export default function BiblePassagesPage() {
  const [activeTheme, setActiveTheme] = useState(0);

  const theme = passagesData[activeTheme];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 60%, #1a0a2e 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ The Word of God ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          100 Most Beloved<br />Bible Passages
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Timeless verses that have comforted, guided, and inspired millions across centuries. Explore by theme and let the Word speak to your heart.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>100</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Passages</div>
          </div>
          <div style={{ width: "1px", background: "rgba(201,168,76,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>10</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Themes</div>
          </div>
          <div style={{ width: "1px", background: "rgba(201,168,76,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>OT & NT</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Both Testaments</div>
          </div>
        </div>
      </section>

      {/* Theme Tabs */}
      <div style={{ background: "var(--navy-dark)", borderBottom: "1px solid rgba(201,168,76,0.15)", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {passagesData.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTheme(i)}
              style={{
                padding: "1rem 1.25rem",
                background: "none",
                border: "none",
                borderBottom: `3px solid ${activeTheme === i ? "var(--gold)" : "transparent"}`,
                color: activeTheme === i ? "var(--gold)" : "rgba(255,255,255,0.55)",
                fontSize: "0.8rem",
                fontWeight: activeTheme === i ? 700 : 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {t.theme}
            </button>
          ))}
        </div>
      </div>

      {/* Passages Grid */}
      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "3rem 1.5rem" }}>

        {/* Theme Header */}
        <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "6px", height: "48px", borderRadius: "3px", background: `linear-gradient(180deg, ${theme.color}, ${theme.color}88)` }} />
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>
              Theme {activeTheme + 1} of {passagesData.length}
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", color: "var(--navy)", margin: 0 }}>
              {theme.theme}
            </h2>
          </div>
        </div>

        {/* Passages */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
          {theme.passages.map((passage, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "1.75rem",
                border: "1px solid rgba(26,39,68,0.08)",
                boxShadow: "0 2px 12px rgba(26,39,68,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,39,68,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,39,68,0.05)"; }}
            >
              {/* Top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: theme.color }} />

              {/* Passage number */}
              <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", width: "28px", height: "28px", borderRadius: "50%", background: "rgba(26,39,68,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)" }}>
                {activeTheme * 10 + i + 1}
              </div>

              {/* Opening quote mark */}
              <div style={{ fontFamily: "Georgia, serif", fontSize: "3rem", color: theme.color, opacity: 0.15, lineHeight: 1, marginBottom: "-0.5rem", marginTop: "0.25rem" }}>&ldquo;</div>

              {/* Passage text */}
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-primary)", fontStyle: "italic", margin: "0 0 1.25rem" }}>
                {passage.text}
              </p>

              {/* Reference */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "20px", height: "2px", background: theme.color }} />
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: theme.color, letterSpacing: "0.04em" }}>
                  {passage.ref}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation between themes */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(26,39,68,0.08)" }}>
          <button
            onClick={() => setActiveTheme(Math.max(0, activeTheme - 1))}
            disabled={activeTheme === 0}
            style={{ padding: "0.75rem 1.5rem", border: "1px solid rgba(26,39,68,0.2)", background: "#fff", borderRadius: "10px", cursor: activeTheme === 0 ? "not-allowed" : "pointer", opacity: activeTheme === 0 ? 0.4 : 1, fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem", transition: "all 0.2s" }}
          >
            ← Previous Theme
          </button>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {passagesData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTheme(i)}
                style={{ width: "8px", height: "8px", borderRadius: "50%", border: "none", background: i === activeTheme ? "var(--navy)" : "rgba(26,39,68,0.2)", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveTheme(Math.min(passagesData.length - 1, activeTheme + 1))}
            disabled={activeTheme === passagesData.length - 1}
            style={{ padding: "0.75rem 1.5rem", border: "1px solid rgba(26,39,68,0.2)", background: "#fff", borderRadius: "10px", cursor: activeTheme === passagesData.length - 1 ? "not-allowed" : "pointer", opacity: activeTheme === passagesData.length - 1 ? 0.4 : 1, fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem", transition: "all 0.2s" }}
          >
            Next Theme →
          </button>
        </div>

        {/* Link to Stories */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "0.9rem" }}>Looking for full narratives?</p>
          <Link href="/bible/stories" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, var(--navy-dark), var(--navy))", color: "#fff", textDecoration: "none", padding: "0.8rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem" }}>
            Explore Top 30 Bible Stories →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="minmax(340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
