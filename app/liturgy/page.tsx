"use client";
import { useState, useEffect } from "react";
import { HOURS } from "@/data/liturgy-hours";
import AudioReader from "@/components/AudioReader";

export default function LiturgyPage() {
  const [activeHour, setActiveHour] = useState("lauds");
  const hour = HOURS.find(h => h.id === activeHour) || HOURS[1];

  // Auto-select the correct canonical hour based on current time
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 6) setActiveHour("vigils");
    else if (h < 9) setActiveHour("lauds");
    else if (h < 12) setActiveHour("terce");
    else if (h < 13) setActiveHour("sext");
    else if (h < 17) setActiveHour("none");
    else if (h < 20) setActiveHour("vespers");
    else setActiveHour("compline");
  }, []);

  const currentIndex = HOURS.findIndex(h => h.id === activeHour);

  // Build a single readable string for the audio player
  const fullText = [
    hour.invitatory,
    hour.hymn.lines.join(" "),
    hour.psalm.text.replace(/\n\n/g, " "),
    hour.reading.text.replace(/\n\n/g, " "),
    hour.canticle ? hour.canticle.text.replace(/\n\n/g, " ") : "",
    hour.collect,
  ].filter(Boolean).join(". ");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a18" }}>

      {/* ── HEADER ── */}
      <section style={{
        background: `linear-gradient(160deg, ${hour.color} 0%, #0a0f1a 100%)`,
        padding: "4rem 1.5rem 2.5rem",
        textAlign: "center",
        transition: "background 0.6s ease",
      }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>✦ Opus Dei · The Work of God ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginBottom: "0.5rem" }}>
          Liturgy of the Hours
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Sanctifying every hour of the day with the prayer of the Universal Church
        </p>

        {/* ── HOUR SELECTOR ── */}
        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "860px", margin: "0 auto" }}>
          {HOURS.map(h => (
            <button key={h.id} onClick={() => setActiveHour(h.id)} style={{
              background: activeHour === h.id ? "var(--gold)" : "rgba(255,255,255,0.07)",
              border: "1px solid " + (activeHour === h.id ? "var(--gold)" : "rgba(255,255,255,0.12)"),
              color: activeHour === h.id ? "#1a1000" : "rgba(255,255,255,0.7)",
              borderRadius: "999px",
              padding: "0.4rem 0.85rem",
              fontSize: "0.75rem",
              fontWeight: activeHour === h.id ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}>
              <span>{h.icon}</span>
              <span style={{ display: "inline" }}>{h.name}</span>
              <span style={{ opacity: 0.5, fontSize: "0.65rem" }}>· {h.time}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PRAYER BODY ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* Hour title card */}
        <div style={{
          textAlign: "center",
          marginBottom: "2rem",
          padding: "1.75rem",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
            {hour.subtitle} · {hour.time}
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "2rem", margin: "0 0 0.75rem" }}>
            {hour.icon} {hour.name}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 1.25rem" }}>
            {hour.intro}
          </p>
          <AudioReader text={fullText} label="Listen to this Hour" />
        </div>

        {/* ── OPENING VERSICLE ── */}
        <PrayerBlock title="Opening Versicle" icon="✦" color={hour.color}>
          <p style={textStyle}><em>{hour.invitatory}</em></p>
        </PrayerBlock>

        {/* ── HYMN ── */}
        <PrayerBlock title={`Hymn — ${hour.hymn.title}`} icon="♪" color={hour.color}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {hour.hymn.lines.map((line, i) => (
              <p key={i} style={{ ...textStyle, fontStyle: "italic", margin: 0 }}>{line}</p>
            ))}
          </div>
        </PrayerBlock>

        {/* ── PSALM ── */}
        <PrayerBlock title={`Psalm — ${hour.psalm.ref}: ${hour.psalm.title}`} icon="+" color={hour.color}>
          {hour.psalm.text.split("\n\n").map((para, i) => (
            <p key={i} style={{ ...textStyle, marginBottom: "0.75rem" }}>{para}</p>
          ))}
          <p style={{ ...textStyle, color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: "0.5rem" }}>
            Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.
          </p>
        </PrayerBlock>

        {/* ── SCRIPTURE READING ── */}
        <PrayerBlock title={`Scripture Reading — ${hour.reading.ref}`} icon="" color={hour.color}>
          {hour.reading.text.split("\n\n").map((para, i) => (
            <p key={i} style={{ ...textStyle, marginBottom: "0.75rem" }}>{para}</p>
          ))}
          <p style={{ ...textStyle, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            Thanks be to God.
          </p>
        </PrayerBlock>

        {/* ── CANTICLE (Benedictus / Magnificat / Nunc Dimittis) ── */}
        {hour.canticle && (
          <PrayerBlock title={hour.canticle.title} icon="✦" color={hour.color}>
            {hour.canticle.text.split("\n\n").map((para, i) => (
              <p key={i} style={{ ...textStyle, fontStyle: "italic", marginBottom: "0.75rem" }}>{para}</p>
            ))}
          </PrayerBlock>
        )}

        {/* ── SALVE REGINA (Compline only) ── */}
        {hour.antiphon && (
          <PrayerBlock title="Antiphon — Salve Regina" icon="🌙" color={hour.color}>
            <p style={{ ...textStyle, fontStyle: "italic" }}>{hour.antiphon}</p>
          </PrayerBlock>
        )}

        {/* ── CONCLUDING COLLECT ── */}
        <PrayerBlock title="Concluding Prayer" icon="" color={hour.color}>
          <p style={{ ...textStyle, fontStyle: "italic" }}>{hour.collect}</p>
        </PrayerBlock>

        {/* ── FINAL BLESSING ── */}
        <div style={{ textAlign: "center", marginTop: "2rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", fontStyle: "italic" }}>
          May the Lord bless us and keep us from all evil and bring us to everlasting life. Amen.
        </div>

        {/* ── PREV / NEXT NAVIGATION ── */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem", gap: "1rem", flexWrap: "wrap" }}>
          {currentIndex > 0 && (
            <button
              onClick={() => setActiveHour(HOURS[currentIndex - 1].id)}
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontSize: "0.9rem" }}
            >
              ← {HOURS[currentIndex - 1].icon} {HOURS[currentIndex - 1].name}
            </button>
          )}
          {currentIndex < HOURS.length - 1 && (
            <button
              onClick={() => setActiveHour(HOURS[currentIndex + 1].id)}
              style={{ background: "var(--gold)", border: "none", color: "#1a1000", padding: "0.75rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 700, marginLeft: "auto" }}
            >
              {HOURS[currentIndex + 1].icon} {HOURS[currentIndex + 1].name} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared styles ──
const textStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.9,
  fontSize: "0.97rem",
  margin: 0,
};

function PrayerBlock({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderLeft: `3px solid ${color}`,
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.25rem",
    }}>
      <p style={{
        fontSize: "0.63rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
        fontWeight: 700,
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}>
        <span style={{ color }}>{icon}</span>
        {title}
      </p>
      {children}
    </div>
  );
}
