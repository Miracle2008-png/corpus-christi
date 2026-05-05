"use client";
import { useState } from "react";
import novenasData from "../../data/novenas.json";

export default function NovenasPage() {
  const [activeNovena, setActiveNovena] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  const novena = novenasData[activeNovena];
  const day = novena.days[activeDay];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, var(--navy-dark) 50%, #1a2a1a 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ Nine Days of Prayer ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Novena Directory
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          A novena is nine consecutive days of prayer, rooted in the nine days the Apostles and Mary spent in prayer between the Ascension and Pentecost. Choose a novena and pray day by day.
        </p>
      </section>

      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2rem" }}>

          {/* LEFT — Novena list */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
              Available Novenas
            </p>
            {novenasData.map((n, i) => (
              <button
                key={i}
                onClick={() => { setActiveNovena(i); setActiveDay(0); }}
                style={{
                  width: "100%", textAlign: "left", padding: "1rem 1.1rem",
                  background: activeNovena === i ? "var(--navy-dark)" : "#fff",
                  border: `1px solid ${activeNovena === i ? "transparent" : "rgba(26,39,68,0.1)"}`,
                  borderRadius: "12px", cursor: "pointer", marginBottom: "0.6rem",
                  transition: "all 0.2s",
                  boxShadow: activeNovena === i ? "0 4px 20px rgba(0,0,0,0.2)" : "0 1px 4px rgba(26,39,68,0.05)",
                }}
              >
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "0.92rem", color: activeNovena === i ? "#fff" : "var(--navy)", margin: "0 0 0.2rem", lineHeight: 1.3 }}>
                  {n.title}
                </p>
                <p style={{ fontSize: "0.72rem", color: activeNovena === i ? "rgba(201,168,76,0.8)" : "var(--text-muted)", margin: 0 }}>
                  {n.patron}
                </p>
              </button>
            ))}
          </div>

          {/* RIGHT — Novena content */}
          <div>
            {/* Novena header card */}
            <div style={{ background: "var(--navy-dark)", borderRadius: "16px", padding: "2rem 2.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>
                    {novena.patron}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.75rem", margin: "0 0 0.3rem" }}>
                    {novena.title}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: 0 }}>{novena.subtitle}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.2rem" }}>Feast Day</p>
                  <p style={{ color: "var(--gold)", fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>{novena.feast}</p>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem" }}>
                {novena.intro}
              </p>
            </div>

            {/* Day selector */}
            <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
                Select Day
              </p>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {novena.days.map((d, di) => (
                  <button
                    key={di}
                    onClick={() => setActiveDay(di)}
                    style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      border: `2px solid ${activeDay === di ? "var(--gold)" : "rgba(26,39,68,0.15)"}`,
                      background: activeDay === di ? "linear-gradient(135deg,var(--gold-dark),var(--gold))" : "#fff",
                      color: activeDay === di ? "var(--navy-dark)" : "var(--text-muted)",
                      fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {di + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Day content */}
            <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
              {/* Day header */}
              <div style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "1.25rem 1.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "var(--navy-dark)", fontWeight: 800, fontSize: "1rem" }}>{activeDay + 1}</span>
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, margin: "0 0 0.1rem" }}>Day {activeDay + 1}</p>
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.1rem", margin: 0 }}>{day.title}</h3>
                </div>
              </div>

              <div style={{ padding: "1.75rem" }}>
                {/* Today's Intention */}
                <div style={{ background: "rgba(26,39,68,0.03)", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1.75rem", borderLeft: "4px solid var(--navy)" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Today's Intention</p>
                  <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{day.intention}</p>
                </div>

                {/* Opening */}
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Opening</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.97rem", lineHeight: 2.0, color: "var(--text-primary)", whiteSpace: "pre-line", marginBottom: "1.75rem" }}>{novena.opening}</p>

                {/* Daily Prayer */}
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Prayer</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.97rem", lineHeight: 2.0, color: "var(--text-primary)", whiteSpace: "pre-line", marginBottom: "1.75rem" }}>{novena.daily_prayer}</p>

                {/* Closing */}
                <div style={{ background: "var(--navy-dark)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
                  <p style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "0.97rem", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>{novena.closing}</p>
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem", justifyContent: "space-between" }}>
                  <button
                    onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                    disabled={activeDay === 0}
                    style={{ padding: "0.7rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.85rem", fontWeight: 600, cursor: activeDay === 0 ? "not-allowed" : "pointer", opacity: activeDay === 0 ? 0.4 : 1 }}
                  >
                    ← Day {activeDay}
                  </button>
                  {activeDay < 8 && (
                    <button
                      onClick={() => setActiveDay(Math.min(8, activeDay + 1))}
                      style={{ padding: "0.7rem 1.5rem", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", color: "var(--navy-dark)", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
                    >
                      Day {activeDay + 2} →
                    </button>
                  )}
                  {activeDay === 8 && (
                    <div style={{ padding: "0.7rem 1.5rem", borderRadius: "8px", background: "rgba(26,168,76,0.1)", border: "1px solid rgba(26,168,76,0.3)", color: "#166534", fontSize: "0.85rem", fontWeight: 700 }}>
                      ✓ Novena Complete
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: \"260px 1fr\""] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
