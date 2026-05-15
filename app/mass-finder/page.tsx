"use client";
import { useState } from "react";

export default function MassFinderPage() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState("");

  const findNearMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationGranted(true);
        setLoading(false);
      },
      () => {
        setError("Could not access your location. Please enable location permissions or use the links below.");
        setLoading(false);
      }
    );
  };

  // OpenStreetMap embed — free, no API key required
  const osmUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.08},${coords.lat - 0.06},${coords.lng + 0.08},${coords.lat + 0.06}&layer=mapnik&marker=${coords.lat},${coords.lng}`
    : null;

  const googleMapsUrl = coords
    ? `https://www.google.com/maps/search/Catholic+church/@${coords.lat},${coords.lng},14z`
    : "https://www.google.com/maps/search/Catholic+church+near+me";

  const massTimesUrl = coords
    ? `https://www.masstimes.org/mass-times?lat=${coords.lat}&lng=${coords.lng}`
    : "https://www.masstimes.org";

  const infoCards = [
    { label: "I", title: "Vigil Mass", time: "Saturday evening", desc: "A Saturday evening Mass fulfills the Sunday obligation. Times vary but are typically 5:00–7:00 PM." },
    { label: "II", title: "Sunday Masses", time: "Sunday morning", desc: "Most parishes offer multiple Sunday Masses — typically 7:00, 9:00, 11:00 AM and sometimes an afternoon Mass." },
    { label: "III", title: "Daily Mass", time: "Weekdays", desc: "Most parishes offer a weekday Mass, usually 7:00–8:00 AM or 12:00 PM. A beautiful habit to build." },
    { label: "IV", title: "Confession", time: "Before Sunday Mass", desc: "Confession is typically offered 30–60 minutes before a Sunday Mass. Many parishes also offer it Saturday afternoon." },
    { label: "V", title: "Holy Days of Obligation", time: "Varies", desc: "Catholics are required to attend Mass on Christmas, Immaculate Conception, Assumption, and other holy days." },
    { label: "VI", title: "Traditional Latin Mass", time: "Varies by parish", desc: "The Traditional Latin Mass (Extraordinary Form) is offered in many dioceses. Check your diocese’s TLM schedule." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>

      {/* ── HEADER ── */}
      <section style={{
        background: "linear-gradient(160deg, var(--navy-dark) 0%, #1a0a00 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>✦ Find Holy Mass ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginBottom: "1rem" }}>
          Mass Finder
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Find your nearest Catholic church and Mass times — wherever you are in the world. Sunday Mass is not optional. Let us help you get there.
        </p>

        {/* ── CTA BUTTON ── */}
        {!locationGranted && (
          <button
            onClick={findNearMe}
            disabled={loading}
            style={{
              background: "var(--gold)",
              color: "#1a1000",
              border: "none",
              padding: "0.9rem 2.5rem",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
              transition: "all 0.2s",
            }}
          >
            {loading ? (
              <>
                <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #1a1000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Locating…
              </>
            ) : (
              <>Find Mass Near Me</>
            )}
          </button>
        )}

        {locationGranted && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(77,200,100,0.15)", border: "1px solid rgba(77,200,100,0.3)", color: "#6dc56d", borderRadius: "999px", padding: "0.4rem 1.2rem", fontSize: "0.85rem", fontWeight: 600 }}>
            ✓ Location found — churches shown on map below
          </div>
        )}

        {error && (
          <div style={{ marginTop: "1rem", color: "#ff8080", fontSize: "0.88rem", maxWidth: "480px", margin: "1rem auto 0" }}>
            {error}
          </div>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>

      {/* ── MAP ── */}
      <div style={{ padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {locationGranted && osmUrl ? (
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(26,39,68,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", marginBottom: "1.25rem" }}>
              <iframe
                width="100%"
                height="500"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                src={osmUrl}
                title="Your location on the map"
              />
              <div style={{ background: "rgba(26,39,68,0.04)", padding: "0.75rem 1.25rem", borderTop: "1px solid rgba(26,39,68,0.06)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Map data © <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy)" }}>OpenStreetMap</a> contributors. Use the links below to search for Catholic churches.
              </div>
            </div>
          ) : (
            <div style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid rgba(26,39,68,0.08)",
              height: "340px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.25rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <span style={{ fontSize: "3rem" }}>⛪</span>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", textAlign: "center", maxWidth: "320px", lineHeight: 1.6 }}>
                Click &ldquo;Find Mass Near Me&rdquo; above to locate nearby Catholic churches, or use one of the links below.
              </p>
              <button
                onClick={findNearMe}
                disabled={loading}
                style={{ background: "var(--navy)", color: "#fff", border: "none", padding: "0.65rem 1.5rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
              >
                Use My Location
              </button>
            </div>
          )}

          {/* ── EXTERNAL LINKS ── */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: locationGranted ? "flex-start" : "center", marginBottom: "0.5rem" }}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--navy)", color: "#fff",
                padding: "0.65rem 1.4rem", borderRadius: "10px",
                fontSize: "0.88rem", fontWeight: 600,
                textDecoration: "none", transition: "opacity 0.2s",
              }}
            >
              Search on Google Maps
            </a>
            <a
              href={massTimesUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--crimson)", color: "#fff",
                padding: "0.65rem 1.4rem", borderRadius: "10px",
                fontSize: "0.88rem", fontWeight: 600,
                textDecoration: "none", transition: "opacity 0.2s",
              }}
            >
              MassTimes.org
            </a>
            <a
              href="https://www.catholicdirectory.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                border: "1px solid rgba(26,39,68,0.2)", color: "var(--navy)",
                background: "#fff",
                padding: "0.65rem 1.4rem", borderRadius: "10px",
                fontSize: "0.88rem", fontWeight: 600,
                textDecoration: "none", transition: "all 0.2s",
              }}
            >
              Catholic Directory
            </a>
            <a
              href="https://www.latinmassdir.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold-dark)",
                background: "rgba(201,168,76,0.06)",
                padding: "0.65rem 1.4rem", borderRadius: "10px",
                fontSize: "0.88rem", fontWeight: 600,
                textDecoration: "none", transition: "all 0.2s",
              }}
            >
              ✝ Latin Mass Directory
            </a>
          </div>
        </div>
      </div>

      {/* ── INFO CARDS ── */}
      <section style={{ maxWidth: "1000px", margin: "1rem auto 4rem", padding: "0 1.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.5rem", marginBottom: "1.25rem" }}>
          Mass Times Guide
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {infoCards.map(item => (
            <div key={item.title} style={{
              background: "#fff",
              border: "1px solid rgba(26,39,68,0.07)",
              borderRadius: "12px",
              padding: "1.25rem",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>{item.label}</span>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.25rem" }}>{item.title}</h3>
              <p style={{ color: "var(--gold-dark)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.time}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
