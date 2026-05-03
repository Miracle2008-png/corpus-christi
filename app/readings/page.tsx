import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Readings",
  description: "Today's Catholic daily Mass readings — Old Testament, Psalm, New Testament, and Gospel — with reflection.",
};

async function getReading(date: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/readings?date=${date}`, {
      next: { revalidate: 86400 }, // cache 24h
    });
    if (res.ok) return res.json();
  } catch {}
  // Fallback
  return {
    date,
    old_testament: { reference: "Genesis 1:1-2", text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
    psalm: { reference: "Psalm 23:1-3", text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.", response: "The Lord is my shepherd." },
    new_testament: { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    gospel: { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    gospel_reflection: "God's love is not abstract — it is expressed in the most concrete act in history: giving His Son for us. Today, let this truth be more than theology. Let it be the anchor of your heart.",
  };
}

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function ReadingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const today = new Date().toISOString().split("T")[0];
  const date = params.date || today;
  const reading = await getReading(date);

  const displayDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  // Generate a week of dates for calendar nav
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - 3 + i);
    return d.toISOString().split("T")[0];
  });

  const readingSections = [
    { label: "First Reading", ref: reading.old_testament?.reference, text: reading.old_testament?.text, icon: "+" },
    { label: "Responsorial Psalm", ref: reading.psalm?.reference, text: reading.psalm?.text, icon: "🎵", response: reading.psalm?.response },
    { label: "Second Reading", ref: reading.new_testament?.reference, text: reading.new_testament?.text, icon: "✉" },
    { label: "Gospel", ref: reading.gospel?.reference, text: reading.gospel?.text, icon: "+" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Liturgy of the Word</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "0.5rem" }}>
          Daily Readings
        </h1>
        <p style={{ color: "var(--gold)", fontSize: "1.1rem", marginBottom: "2rem" }}>{displayDate}</p>

        {/* Week navigation */}
        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
          {weekDates.map((d) => {
            const isActive = d === date;
            const dayName = new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = new Date(d + "T12:00:00").getDate();
            return (
              <Link
                key={d}
                href={`/readings?date=${d}`}
                style={{
                  width: "52px", textAlign: "center", padding: "0.5rem 0.25rem",
                  borderRadius: "10px", textDecoration: "none",
                  background: isActive ? "var(--gold)" : "rgba(255,255,255,0.08)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s",
                }}
              >
                <p style={{ fontSize: "0.65rem", color: isActive ? "var(--navy-dark)" : "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{dayName}</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: isActive ? "var(--navy-dark)" : "var(--white)" }}>{dayNum}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Readings */}
      <div className="container-sacred" style={{ maxWidth: "760px", padding: "3rem 1.5rem" }}>
        {readingSections.map((section, i) => (
          <div key={i} style={{
            background: "var(--white)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "12px",
            padding: "1.75rem",
            marginBottom: "1.5rem",
            borderLeft: "4px solid var(--gold)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
              <h2 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}>
                {section.label}
              </h2>
              <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: "0.82rem", fontStyle: "italic" }}>{section.ref}</span>
            </div>
            {section.response && (
              <p style={{ color: "var(--gold-dark)", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Response: &ldquo;{section.response}&rdquo;
              </p>
            )}
            <p style={{ fontFamily: "var(--font-serif)", lineHeight: 1.9, color: "var(--text-primary)", fontSize: "1rem" }}>
              {section.text}
            </p>
          </div>
        ))}

        {/* Reflection */}
        {reading.gospel_reflection && (
          <div style={{
            background: "var(--navy)",
            borderRadius: "16px",
            padding: "2rem",
            marginTop: "0.5rem",
          }}>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.2rem", marginBottom: "1rem" }}>
              ✝ Gospel Reflection
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.9, fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
              &ldquo;{reading.gospel_reflection}&rdquo;
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/rosary" className="btn-sacred">Pray the Rosary</Link>
          <Link href="/stations" className="btn-outline-sacred">✝ Stations of the Cross</Link>
        </div>
      </div>
    </div>
  );
}
