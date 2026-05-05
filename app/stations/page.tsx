"use client";
import { useEffect, useRef, useState } from "react";
import stationsData from "@/data/stations.json";
import Link from "next/link";
import Image from "next/image";

export default function StationsPage() {
  const [activeStation, setActiveStation] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStation(i); },
        { threshold: 0.5 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: "#080810" }}>
      {/* Fixed sidebar progress */}
      <nav
        aria-label="Station progress"
        style={{
          position: "fixed", right: "1.5rem", top: "50%", transform: "translateY(-50%)",
          zIndex: 100, display: "flex", flexDirection: "column", gap: "6px",
        }}
      >
        {stationsData.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })}
            title={s.title}
            style={{
              width: i === activeStation ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === activeStation ? "var(--gold)" : "rgba(201,168,76,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </nav>

      {/* Fixed top nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        background: "rgba(8,8,16,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        padding: "0.75rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem" }}>
          Back to Home
        </Link>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
            Via Crucis — Way of the Cross
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
            Station {activeStation + 1} of {stationsData.length}
          </p>
        </div>
        <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
          <div style={{
            height: "100%", borderRadius: "2px",
            background: "var(--gold)",
            width: `${((activeStation + 1) / stationsData.length) * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Opening title section */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 2rem",
        background: "linear-gradient(180deg, #0A0A1A 0%, #080810 100%)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ fontSize: "clamp(200px,40vw,500px)", color: "rgba(201,168,76,0.04)", fontWeight: 900, lineHeight: 1, userSelect: "none" }}>+</div>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>
            Via Crucis
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem,8vw,5rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1 }}>
            The Way of the Cross
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Walk with Jesus through the fourteen stations of His Passion. Paintings by James Tissot (1886–1894), from his pilgrimage to the Holy Land. Scroll to begin.
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
            Scroll down — use arrow keys or swipe on mobile
          </p>
          <div style={{ marginTop: "3rem", display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {stationsData.map((_, i) => (
              <button
                key={i}
                onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  width: "32px", height: "32px", borderRadius: "6px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  background: "transparent", color: "rgba(201,168,76,0.7)",
                  fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(201,168,76,0.7)"; }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 14 Station sections */}
      {stationsData.map((station, i) => (
        <section
          key={station.slug}
          id={station.slug}
          ref={(el) => { sectionRefs.current[i] = el; }}
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            position: "relative",
          }}
        >
          {/* Left: Painting */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src={station.image_url}
              alt={`${station.title} — James Tissot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.75) saturate(0.9)",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              priority={i === 0}
            />
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 60%, #080810 100%)",
              pointerEvents: "none",
            }} />
            {/* Station number watermark */}
            <div style={{
              position: "absolute", bottom: "2rem", left: "2rem",
              fontFamily: "var(--font-serif)", fontSize: "clamp(4rem,10vw,8rem)",
              fontWeight: 900, color: "rgba(201,168,76,0.15)", lineHeight: 1,
              userSelect: "none",
            }}>
              {station.number}
            </div>
            {/* Artist credit */}
            <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(0,0,0,0.5)", borderRadius: "6px", padding: "0.3rem 0.6rem" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.08em" }}>James Tissot, c. 1890 · Public Domain</p>
            </div>
          </div>

          {/* Right: Content */}
          <div style={{
            background: "#080810",
            padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3.5rem) clamp(2rem,5vw,4rem) clamp(1.5rem,3vw,2.5rem)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            overflowY: "auto",
          }}>
            <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>
              Station {station.number} of 14
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.4rem,3vw,2.25rem)",
              color: "#fff", marginBottom: "1.5rem", lineHeight: 1.2,
            }}>
              {station.title}
            </h2>

            {/* Scripture */}
            <div style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1.5rem",
            }}>
              <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>
                {station.scripture_reference}
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                &ldquo;{station.scripture_text}&rdquo;
              </p>
            </div>

            {/* Meditation */}
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.9, fontSize: "0.92rem", marginBottom: "1.5rem" }}>
              {station.meditation_text}
            </p>

            {/* Prayer */}
            <div style={{
              borderLeft: "3px solid var(--gold)",
              paddingLeft: "1.25rem",
              background: "rgba(0,0,0,0.3)",
              padding: "1rem 1.25rem",
              borderRadius: "0 8px 8px 0",
            }}>
              <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>Prayer</p>
              <p style={{ color: "rgba(255,255,255,0.78)", fontStyle: "italic", fontFamily: "var(--font-serif)", lineHeight: 1.8, fontSize: "0.92rem" }}>
                {station.prayer}
              </p>
            </div>

            {/* Next station hint */}
            {i < stationsData.length - 1 && (
              <button
                onClick={() => sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  marginTop: "2rem", alignSelf: "flex-start",
                  background: "transparent", border: "1px solid rgba(201,168,76,0.3)",
                  color: "rgba(201,168,76,0.7)", padding: "0.6rem 1.25rem",
                  borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem",
                  fontWeight: 600, letterSpacing: "0.04em", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(201,168,76,0.7)"; }}
              >
                Next: {stationsData[i + 1].title} &rarr;
              </button>
            )}

            {/* Final station CTA */}
            {i === stationsData.length - 1 && (
              <div style={{ marginTop: "2rem" }}>
                <p style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontStyle: "italic", marginBottom: "1rem", fontSize: "1rem" }}>
                  He is risen. The Way of the Cross ends in empty tomb.
                </p>
                <Link href="/rosary" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg,var(--gold-dark),var(--gold))",
                  color: "var(--navy-dark)", padding: "0.75rem 1.75rem",
                  borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.875rem",
                }}>
                  Continue: Pray the Rosary
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Closing section */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "4rem 2rem",
        background: "linear-gradient(180deg, #080810 0%, #0A0A1A 100%)",
      }}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{ fontSize: "2rem", color: "var(--gold)", marginBottom: "1.5rem" }}>+</div>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "2rem", marginBottom: "1rem" }}>
            The Journey Is Complete
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2rem" }}>
            You have walked the Via Crucis with Jesus. Return often. Each time you walk this road, you will find Him meeting you at the station that speaks to your own suffering.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/rosary" style={{ display: "inline-block", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", color: "var(--navy-dark)", padding: "0.75rem 1.75rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
              Pray the Rosary
            </Link>
            <Link href="/" style={{ display: "inline-block", border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold)", padding: "0.75rem 1.75rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
              Return Home
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section[id] { grid-template-columns: 1fr !important; }
          section[id] > div:first-child { height: 45vh; }
          nav[aria-label="Station progress"] { right: 0.5rem; }
        }
      `}</style>
    </div>
  );
}
