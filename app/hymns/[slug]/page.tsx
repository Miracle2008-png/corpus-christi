import Link from "next/link";
import { headers } from "next/headers";
import AudioReader from "@/components/AudioReader";

export const dynamic = "force-dynamic";

export default async function HymnPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  let hymn = null;
  try {
    const res = await fetch(`${protocol}://${host}/api/hymns/${slug}`, {
      cache: "no-store"
    });
    if (res.ok) {
      hymn = await res.json();
    }
  } catch (error) {
    console.error("Failed to load hymn:", error);
  }

  if (!hymn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ivory)" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Hymn not found</h2>
          <Link href="/hymns" className="btn-sacred">Return to Hymns Index</Link>
        </div>
      </div>
    );
  }

  // Combine english lyrics for the audio reader
  const fullText = hymn.lyrics.map((l: any) => l.english_text).join(". ");

  return (
    <div style={{ minHeight: "100vh", background: "#fcfaf7" }}>
      {/* Top Navbar */}
      <div style={{ background: "var(--navy-dark)", padding: "1rem 1.5rem", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/hymns" style={{ color: "var(--gold)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>←</span> Hymnal
          </Link>
          <div style={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700 }}>
            {hymn.title}
          </div>
          <div style={{ width: "60px" }} /> {/* Spacer for flex balance */}
        </div>
      </div>

      {/* Header Info */}
      <div className="container-sacred" style={{ maxWidth: "800px", padding: "4rem 1.5rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--navy)", marginBottom: "0.5rem" }}>
          {hymn.title}
        </h1>
        {hymn.latin_title && (
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--gold-dark)", fontStyle: "italic", marginBottom: "1.5rem" }}>
            {hymn.latin_title}
          </h2>
        )}
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", marginTop: "2rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          {hymn.author && (
            <div><strong>Author:</strong> {hymn.author}</div>
          )}
          {hymn.meter && (
            <div><strong>Meter:</strong> {hymn.meter}</div>
          )}
        </div>
        
        {hymn.history && (
          <div style={{ background: "#fff", border: "1px solid rgba(26,39,68,0.1)", borderRadius: "12px", padding: "1.5rem", marginTop: "2.5rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-dark)", marginBottom: "0.8rem", fontWeight: 700 }}>History</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)" }}>{hymn.history}</p>
          </div>
        )}
      </div>

      {/* Lyrics Body */}
      <div className="container-sacred" style={{ maxWidth: "760px", padding: "2rem 1.5rem 6rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "4rem" }}>
          <AudioReader text={fullText} label="Listen to Lyrics" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {hymn.lyrics.map((verse: any) => (
            <div key={verse.stanza} style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ color: "var(--gold-dark)", fontWeight: 700, fontFamily: "var(--font-serif)", fontSize: "1.2rem", opacity: 0.5 }}>
                {verse.stanza}
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: verse.latin_text ? "1fr 1fr" : "1fr", gap: "2rem" }}>
                {verse.latin_text && (
                  <div>
                    <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--navy)", opacity: 0.6, marginBottom: "1rem" }}>Latin</h4>
                    <p style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontSize: "1.15rem", lineHeight: 1.9, fontStyle: "italic", whiteSpace: "pre-wrap" }}>
                      {verse.latin_text}
                    </p>
                  </div>
                )}
                <div>
                  {verse.latin_text && <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--navy)", opacity: 0.6, marginBottom: "1rem" }}>English</h4>}
                  <p style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontSize: "1.15rem", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {verse.english_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
