"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HOLY_SITES } from "@/data/holy-sites";

// Dynamically import the map to avoid SSR issues with Leaflet
const PilgrimageMap = dynamic(() => import("@/components/PilgrimageMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "520px", background: "#0f1a2e", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px" }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Loading map…</p>
    </div>
  ),
});

const TYPES = ["All", "Biblical Site", "Marian Shrine", "Papal Basilica", "Apostolic Shrine", "Franciscan Shrine", "Carmelite Shrine"];

export default function PilgrimagePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [prayerDone, setPrayerDone] = useState<Set<string>>(new Set());

  const filtered = filter === "All" ? HOLY_SITES : HOLY_SITES.filter(s => s.type === filter);
  const site = HOLY_SITES.find(s => s.id === selected);

  const markPrayed = (id: string) => {
    setPrayerDone(prev => new Set([...prev, id]));
  };

  // Persist visited sites in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pilgrimage-visited");
    if (stored) setPrayerDone(new Set(JSON.parse(stored)));
  }, []);

  useEffect(() => {
    if (prayerDone.size > 0) {
      localStorage.setItem("pilgrimage-visited", JSON.stringify([...prayerDone]));
    }
  }, [prayerDone]);

  return (
    <div style={{ minHeight: "100vh", background: "#0c1525" }}>

      {/* ── HEADER ── */}
      <section style={{
        background: "linear-gradient(160deg, #0a1a35 0%, #1a0f2e 50%, #0a1a20 100%)",
        padding: "4.5rem 1.5rem 3rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>✦ Peregrinatio Pro Christo ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,5vw,3.6rem)", color: "#fff", marginBottom: "1rem" }}>
          Virtual Pilgrimage
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "580px", margin: "0 auto 1.5rem", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Explore the holiest sites in Christendom — from Calvary in Jerusalem to Our Lady of Guadalupe in Mexico. Learn, pray, and spiritually journey to each sacred place.
        </p>

        {/* Progress */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "999px", padding: "0.5rem 1.25rem" }}>
          <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "1.1rem" }}>{prayerDone.size}</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>/ {HOLY_SITES.length} sites visited</span>
          <div style={{ width: "80px", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${(prayerDone.size / HOLY_SITES.length) * 100}%`, height: "100%", background: "var(--gold)", borderRadius: "999px", transition: "width 0.4s" }} />
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <div style={{ padding: "1.5rem 1.5rem 0" }}>
        <PilgrimageMap
          sites={HOLY_SITES}
          selected={selected}
          onSelect={setSelected}
          visited={prayerDone}
        />
      </div>

      {/* ── FILTER ── */}
      <div style={{ maxWidth: "1100px", margin: "1.5rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid " + (filter === t ? "var(--gold)" : "rgba(255,255,255,0.12)"),
              background: filter === t ? "var(--gold)" : "rgba(255,255,255,0.05)",
              color: filter === t ? "#1a1000" : "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              fontWeight: filter === t ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", alignSelf: "center" }}>
            {filtered.length} sites
          </span>
        </div>
      </div>

      {/* ── DETAIL PANEL (when site selected) ── */}
      {site && (
        <div style={{ maxWidth: "900px", margin: "1.5rem auto", padding: "0 1.5rem" }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: `4px solid ${site.color}`,
            borderRadius: "16px",
            overflow: "hidden",
          }}>
            {/* Site header */}
            <div style={{ background: site.color + "22", padding: "1.5rem 2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ background: site.color, color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.65rem", borderRadius: "999px", letterSpacing: "0.07em" }}>{site.type}</span>
                    <span style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", fontSize: "0.65rem", padding: "0.15rem 0.65rem", borderRadius: "999px" }}>👥 {site.pilgrims}</span>
                    {prayerDone.has(site.id) && (
                      <span style={{ background: "rgba(100,200,100,0.15)", color: "#6dc56d", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.65rem", borderRadius: "999px" }}>✓ Visited</span>
                    )}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "clamp(1.3rem,3vw,1.8rem)", margin: "0 0 0.25rem" }}>
                    {site.emoji} {site.name}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", margin: 0 }}>📍 {site.location}</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", padding: "0.4rem 0.85rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem" }}>
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Site body */}
            <div style={{ padding: "1.5rem 2rem" }}>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontSize: "0.94rem", marginBottom: "1.5rem" }}>
                {site.description}
              </p>

              {/* Feast day */}
              <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Feast Day</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem" }}>{site.feast}</p>
              </div>

              {/* Prayer */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem", marginBottom: "1.5rem" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>✝ Pilgrim Prayer</p>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "0.95rem", margin: 0 }}>
                  {site.prayer}
                </p>
              </div>

              {/* Mark as prayed */}
              {!prayerDone.has(site.id) ? (
                <button
                  onClick={() => markPrayed(site.id)}
                  style={{
                    background: site.color,
                    color: "#fff",
                    border: "none",
                    padding: "0.75rem 2rem",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  ✝ Mark as Visited & Prayed
                </button>
              ) : (
                <p style={{ color: "#6dc56d", fontSize: "0.88rem", fontWeight: 600 }}>
                  ✓ You have prayed at this site. God bless your pilgrimage!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SITE GRID ── */}
      <div style={{ maxWidth: "1100px", margin: "2rem auto", padding: "0 1.5rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {filtered.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: selected === s.id ? s.color + "22" : "rgba(255,255,255,0.03)",
                border: "1px solid " + (selected === s.id ? s.color + "55" : "rgba(255,255,255,0.07)"),
                borderLeft: `3px solid ${s.color}`,
                borderRadius: "12px",
                padding: "1.1rem 1.25rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = s.color + "18"; }}
              onMouseLeave={e => { e.currentTarget.style.background = selected === s.id ? s.color + "22" : "rgba(255,255,255,0.03)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{s.emoji}</span>
                {prayerDone.has(s.id) && (
                  <span style={{ color: "#6dc56d", fontSize: "0.75rem", fontWeight: 700 }}>✓ Visited</span>
                )}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "0.97rem", margin: "0 0 0.25rem", lineHeight: 1.3 }}>{s.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.75rem", margin: "0 0 0.35rem" }}>📍 {s.location}</p>
              <span style={{ background: s.color + "33", color: s.color, fontSize: "0.63rem", fontWeight: 700, padding: "0.12rem 0.55rem", borderRadius: "999px", letterSpacing: "0.05em" }}>{s.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
