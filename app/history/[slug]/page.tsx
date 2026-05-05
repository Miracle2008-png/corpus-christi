import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

interface HistoryEvent {
  slug: string;
  year: string;
  event: string;
  desc: string;
  icon: string;
  deep_dive: string;
}

function getHistoryData(): HistoryEvent[] {
  const filePath = path.join(process.cwd(), "data", "history.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
}

export async function generateStaticParams() {
  const history = getHistoryData();
  return history.map((h) => ({
    slug: h.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const history = getHistoryData();
  const event = history.find((h) => h.slug === resolvedParams.slug);

  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.event} — Church History`,
    description: event.desc,
  };
}

export default async function HistoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const history = getHistoryData();
  const currentIndex = history.findIndex((h) => h.slug === resolvedParams.slug);
  
  if (currentIndex === -1) {
    notFound();
  }

  const currentEvent = history[currentIndex];
  const prevEvent = currentIndex > 0 ? history[currentIndex - 1] : null;
  const nextEvent = currentIndex < history.length - 1 ? history[currentIndex + 1] : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "4rem" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.8rem", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "1rem" }}>
          {currentEvent.year}
        </p>
        <div style={{ 
          width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto 1.5rem",
          background: "var(--navy-dark)", border: "2px solid var(--gold)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", color: "var(--gold)"
        }}>
          {currentEvent.icon}
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem", maxWidth: "800px", margin: "0 auto" }}>
          {currentEvent.event}
        </h1>
      </section>

      {/* Content */}
      <div className="container-sacred" style={{ maxWidth: "800px", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem 2rem", boxShadow: "0 4px 24px rgba(26,39,68,0.06)", border: "1px solid rgba(26,39,68,0.08)" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem", display: "inline-block" }}>
            Historical Overview
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-primary)", marginBottom: "2rem", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
            {currentEvent.desc}
          </p>
          
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>
            Deep Dive
          </h2>
          <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
            {currentEvent.deep_dive.split('\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: "1.5rem" }}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Links */}
      <div className="container-sacred" style={{ maxWidth: "800px", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", gap: "1rem", flexWrap: "wrap" }}>
          {prevEvent ? (
            <Link href={`/history/${prevEvent.slug}`} style={{ flex: 1, textDecoration: "none", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "1rem", borderRadius: "10px", transition: "background 0.2s" }} className="sacred-card-hover">
              <div style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "0.25rem" }}>&larr; Previous Event</div>
              <div style={{ color: "var(--navy)", fontFamily: "var(--font-serif)", fontWeight: 600 }}>{prevEvent.event}</div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {nextEvent ? (
            <Link href={`/history/${nextEvent.slug}`} style={{ flex: 1, textDecoration: "none", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "1rem", borderRadius: "10px", textAlign: "right", transition: "background 0.2s" }} className="sacred-card-hover">
              <div style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "0.25rem" }}>Next Event &rarr;</div>
              <div style={{ color: "var(--navy)", fontFamily: "var(--font-serif)", fontWeight: 600 }}>{nextEvent.event}</div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/history" className="btn-outline-sacred">
            Back to Timeline
          </Link>
        </div>
      </div>
    </div>
  );
}
