"use client";
import { useState } from "react";
import prayersData from "../../data/prayers.json";

export default function PrayersPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activePrayer, setActivePrayer] = useState(0);
  const [showLatin, setShowLatin] = useState(false);

  const category = prayersData[activeCategory];
  const prayer = category.prayers[activePrayer];

  const handleCategoryChange = (i: number) => {
    setActiveCategory(i);
    setActivePrayer(0);
    setShowLatin(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 60%, #2a0a3e 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ Pray Without Ceasing ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Catholic Prayers Library
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          From the earliest prayers of the Church to beloved devotions of the saints — a complete library for your daily prayer life.
        </p>
      </section>

      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }}>

          {/* LEFT — Category + Prayer list */}
          <div>
            {prayersData.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: "1.5rem" }}>
                <button
                  onClick={() => handleCategoryChange(ci)}
                  style={{
                    width: "100%", textAlign: "left", padding: "0.75rem 1rem",
                    background: activeCategory === ci ? "var(--navy-dark)" : "rgba(26,39,68,0.04)",
                    border: `1px solid ${activeCategory === ci ? "transparent" : "rgba(26,39,68,0.1)"}`,
                    borderRadius: "10px", cursor: "pointer", marginBottom: "0.4rem",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.88rem", color: activeCategory === ci ? "var(--gold)" : "var(--navy)", margin: 0 }}>{cat.category}</p>
                    <p style={{ fontSize: "0.72rem", color: activeCategory === ci ? "rgba(255,255,255,0.5)" : "var(--text-muted)", margin: 0 }}>{cat.prayers.length} prayers</p>
                  </div>
                </button>

                {activeCategory === ci && (
                  <div style={{ paddingLeft: "0.5rem" }}>
                    {cat.prayers.map((p, pi) => (
                      <button
                        key={pi}
                        onClick={() => { setActivePrayer(pi); setShowLatin(false); }}
                        style={{
                          width: "100%", textAlign: "left", padding: "0.6rem 0.9rem",
                          background: activePrayer === pi ? "rgba(201,168,76,0.12)" : "transparent",
                          border: `1px solid ${activePrayer === pi ? "rgba(201,168,76,0.4)" : "transparent"}`,
                          borderRadius: "8px", cursor: "pointer", marginBottom: "0.2rem",
                          fontSize: "0.82rem", color: activePrayer === pi ? "var(--navy)" : "var(--text-muted)",
                          fontWeight: activePrayer === pi ? 600 : 400, transition: "all 0.15s",
                        }}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — Prayer display */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", boxShadow: "0 4px 24px rgba(26,39,68,0.07)", overflow: "hidden" }}>

            {/* Prayer header */}
            <div style={{ background: "var(--navy-dark)", padding: "2rem 2.5rem" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                {category.icon} {category.category}
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.7rem", margin: "0 0 0.4rem", lineHeight: 1.2 }}>
                {prayer.title}
              </h2>
              {(prayer as any).latin && (
                <p style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.85rem", fontStyle: "italic", margin: "0 0 0.75rem" }}>
                  {(prayer as any).latin}
                </p>
              )}
              {(prayer as any).source && (
                <span style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)", fontSize: "0.75rem", padding: "0.2rem 0.75rem", borderRadius: "999px", fontWeight: 600 }}>
                  {(prayer as any).source}
                </span>
              )}
            </div>

            {/* Prayer body */}
            <div style={{ padding: "2.5rem" }}>

              {/* Note */}
              {(prayer as any).note && (
                <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "10px", padding: "0.9rem 1.1rem", marginBottom: "2rem", display: "flex", gap: "0.75rem" }}>
                  <span style={{ color: "var(--gold)", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>ℹ</span>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{(prayer as any).note}</p>
                </div>
              )}

              {/* Prayer text */}
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", lineHeight: 2.0, color: "var(--text-primary)", whiteSpace: "pre-line", padding: "0 0.5rem" }}>
                  {prayer.text}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(26,39,68,0.06)", flexWrap: "wrap" }}>
                <button
                  onClick={() => navigator.clipboard?.writeText(prayer.text)}
                  style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Prayer
                </button>
                {/* Prev/Next */}
                <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => { if (activePrayer > 0) { setActivePrayer(activePrayer - 1); setShowLatin(false); } }}
                    disabled={activePrayer === 0}
                    style={{ padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.82rem", fontWeight: 600, cursor: activePrayer === 0 ? "not-allowed" : "pointer", opacity: activePrayer === 0 ? 0.4 : 1 }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => { if (activePrayer < category.prayers.length - 1) { setActivePrayer(activePrayer + 1); setShowLatin(false); } }}
                    disabled={activePrayer === category.prayers.length - 1}
                    style={{ padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.82rem", fontWeight: 600, cursor: activePrayer === category.prayers.length - 1 ? "not-allowed" : "pointer", opacity: activePrayer === category.prayers.length - 1 ? 0.4 : 1 }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: \"280px 1fr\""] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
