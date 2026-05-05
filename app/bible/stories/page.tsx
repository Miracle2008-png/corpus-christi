"use client";
import { useState } from "react";
import Link from "next/link";
import storiesData from "../../../data/bible-stories.json";

const testamentColors: Record<string, { bg: string; text: string; border: string }> = {
  OT: { bg: "rgba(180, 130, 30, 0.12)", text: "#7a5a10", border: "rgba(180,130,30,0.35)" },
  NT: { bg: "rgba(26, 63, 92, 0.1)", text: "#1a3f5c", border: "rgba(26,63,92,0.3)" },
};

const themeColorMap: Record<string, string> = {
  "Creation": "#2d6a3f",
  "Sin & Fall": "#7b2d2d",
  "Judgement & Covenant": "#2d4a7b",
  "Faith & Obedience": "#5a3d7b",
  "God's Call": "#3d7b5a",
  "Liberation & Passover": "#7b5a2d",
  "Courage & Faith": "#2d5a7b",
  "The Power of God": "#7b2d5a",
  "Repentance & Mercy": "#3d5a2d",
  "Faithfulness & Deliverance": "#2d3d7b",
  "Suffering & Perseverance": "#5a2d2d",
  "Faith Under Persecution": "#7b3d2d",
  "Loyalty & Redemption": "#2d7b5a",
  "Incarnation": "#1a3f5c",
  "Identity of Christ": "#3f1a5c",
  "Overcoming Temptation": "#5c3f1a",
  "Kingdom Teaching": "#1a5c3f",
  "Miraculous Provision": "#3f5c1a",
  "Glory of Christ": "#5c1a3f",
  "Resurrection Power": "#1a5c5c",
  "Repentance & Forgiveness": "#5c1a1a",
  "Compassion & Charity": "#1a3f5c",
  "Eucharist & Service": "#3f1a1a",
  "Prayer & Surrender": "#1a1a5c",
  "Atonement & Sacrifice": "#5c1a3f",
  "Resurrection & New Life": "#1a5c1a",
  "Recognition of the Risen Lord": "#5c3f1a",
  "The Holy Spirit & The Church": "#3f1a5c",
  "Conversion & Transformation": "#1a3f3f",
  "End Times & New Creation": "#5c1a5c",
};

export default function BibleStoriesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "OT" | "NT">("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? storiesData
    : storiesData.filter((s) => s.testament === activeFilter);

  const otCount = storiesData.filter((s) => s.testament === "OT").length;
  const ntCount = storiesData.filter((s) => s.testament === "NT").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, var(--navy-dark) 50%, #1a0a2e 100%)",
        padding: "4.5rem 1.5rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%),radial-gradient(ellipse at 80% 20%, rgba(100,50,180,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ Sacred Narratives ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Top 30 Bible Stories<br />of All Time
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.75, fontSize: "0.95rem" }}>
          The most beloved and impactful narratives from Scripture — from Creation to Revelation — each with its Bible reference and key verse.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>30</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Stories</div>
          </div>
          <div style={{ width: "1px", background: "rgba(201,168,76,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>{otCount}</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Old Testament</div>
          </div>
          <div style={{ width: "1px", background: "rgba(201,168,76,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--gold)", fontFamily: "var(--font-serif)" }}>{ntCount}</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>New Testament</div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", padding: "1rem 1.5rem", position: "sticky", top: "64px", zIndex: 50 }}>
        <div className="container-sacred" style={{ maxWidth: "1200px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Filter:</span>
          {(["All", "OT", "NT"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: "999px",
                border: `1px solid ${activeFilter === f ? "var(--navy)" : "rgba(26,39,68,0.15)"}`,
                background: activeFilter === f ? "var(--navy)" : "#fff",
                color: activeFilter === f ? "#fff" : "var(--navy)",
                fontSize: "0.82rem",
                fontWeight: activeFilter === f ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.18s",
              }}
            >
              {f === "All" ? "All Stories" : f === "OT" ? `Old Testament (${otCount})` : `New Testament (${ntCount})`}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {filtered.length} stories
          </span>
        </div>
      </div>

      {/* Stories List */}
      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))", gap: "1.25rem" }}>
          {filtered.map((story) => {
            const isExpanded = expanded === story.rank;
            const accentColor = themeColorMap[story.theme] || "var(--navy)";
            const tColors = testamentColors[story.testament];

            return (
              <div
                key={story.rank}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: "1px solid rgba(26,39,68,0.08)",
                  boxShadow: isExpanded ? "0 8px 32px rgba(26,39,68,0.12)" : "0 2px 10px rgba(26,39,68,0.05)",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s",
                }}
              >
                {/* Card Header */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : story.rank)}
                  style={{ padding: "1.5rem", cursor: "pointer", display: "flex", gap: "1rem", alignItems: "flex-start" }}
                >
                  {/* Rank badge */}
                  <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "10px", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.9rem", fontFamily: "var(--font-serif)" }}>
                    {story.rank}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Tags row */}
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: "999px", background: tColors.bg, color: tColors.text, border: `1px solid ${tColors.border}`, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {story.testament}
                      </span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "0.15rem 0.6rem", borderRadius: "999px", background: "rgba(26,39,68,0.05)", color: "var(--text-muted)", border: "1px solid rgba(26,39,68,0.1)" }}>
                        {story.book}
                      </span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "0.15rem 0.6rem", borderRadius: "999px", background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                        {story.theme}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--navy)", margin: "0 0 0.3rem", lineHeight: 1.3 }}>
                      {story.title}
                    </h2>

                    <p style={{ fontSize: "0.78rem", color: accentColor, fontWeight: 600, margin: 0 }}>
                      {story.reference}
                    </p>
                  </div>

                  {/* Expand icon */}
                  <div style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "rgba(26,39,68,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--navy)">
                      <path d="M6 8L1 3h10z" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ borderTop: `3px solid ${accentColor}`, padding: "1.5rem", background: "rgba(26,39,68,0.015)" }}>
                    {/* Summary */}
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.75, fontSize: "0.93rem", marginBottom: "1.5rem" }}>
                      {story.summary}
                    </p>

                    {/* Key Verse */}
                    <div style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>
                        Key Verse
                      </p>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.97rem", fontStyle: "italic", color: "var(--navy)", lineHeight: 1.65, margin: 0 }}>
                        &ldquo;{story.keyVerse}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to Passages */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Looking for individual verses and quotes?
          </p>
          <Link
            href="/bible/passages"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, var(--navy-dark), var(--navy))", color: "#fff", textDecoration: "none", padding: "0.8rem 2rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem" }}
          >
            Explore 100 Popular Bible Passages →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="minmax(520px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
