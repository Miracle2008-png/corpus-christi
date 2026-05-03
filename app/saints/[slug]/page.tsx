import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import saintsData from "@/data/saints.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const saint = saintsData.find((s) => s.slug === slug);
  if (!saint) return { title: "Saint Not Found" };
  return {
    title: saint.name,
    description: `${saint.known_for}. Feast day: ${saint.feast_day}. ${saint.biography_long.slice(0, 150)}...`,
  };
}

export function generateStaticParams() {
  return saintsData.map((s) => ({ slug: s.slug }));
}

export default async function SaintDetailPage({ params }: Props) {
  const { slug } = await params;
  const saint = saintsData.find((s) => s.slug === slug);
  if (!saint) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "3rem 1.5rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,39,68,0.7) 0%, var(--navy) 100%)", zIndex: 1 }} />
        <div className="container-sacred" style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: "2rem" }}>
            <Link href="/saints" style={{ color: "var(--gold)", textDecoration: "none", fontSize: "0.85rem" }}>← All Saints</Link>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.5rem", alignItems: "start", paddingBottom: "3rem" }}>
            {/* Portrait */}
            <div style={{ width: "200px", height: "260px", borderRadius: "12px", overflow: "hidden", border: "3px solid rgba(201,168,76,0.4)", flexShrink: 0, background: "var(--navy-dark)", position: "relative" }}>
              {saint.image_url ? (
                <Image
                  src={saint.image_url}
                  alt={`Portrait of ${saint.name}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="200px"
                  priority
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <span style={{ fontSize: "6rem", opacity: 0.3 }}>✝</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className={`badge-category badge-${saint.category}`} style={{ marginBottom: "0.75rem", display: "inline-block" }}>
                {saint.category}
              </span>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "var(--white)", marginBottom: "1rem", lineHeight: 1.2 }}>
                {saint.name}
              </h1>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" }}>
                {saint.feast_day && (
                  <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.25rem" }}>Feast Day</p>
                    <p style={{ color: "var(--white)", fontSize: "0.9rem", fontWeight: 600 }}>{saint.feast_day}</p>
                  </div>
                )}
                {saint.birth_date && (
                  <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.25rem" }}>Born</p>
                    <p style={{ color: "var(--white)", fontSize: "0.9rem" }}>{saint.birth_date}</p>
                  </div>
                )}
                {saint.death_date && (
                  <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.25rem" }}>Died</p>
                    <p style={{ color: "var(--white)", fontSize: "0.9rem" }}>{saint.death_date}</p>
                  </div>
                )}
                {saint.canonized_by_pope && (
                  <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.25rem" }}>Canonized By</p>
                    <p style={{ color: "var(--white)", fontSize: "0.9rem" }}>{saint.canonized_by_pope}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-sacred" style={{ maxWidth: "900px", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2.5rem" }}>
          {/* Main */}
          <div>
            {/* Biography */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>Biography</h2>
              <hr className="gold-divider" style={{ marginBottom: "1.25rem", marginTop: 0 }} />
              <p style={{ lineHeight: 1.9, color: "var(--text-primary)", fontSize: "1rem" }}>{saint.biography_long}</p>
            </section>

            {/* Miracles */}
            {saint.miracles.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>Miracles & Signs</h2>
                <hr className="gold-divider" style={{ marginBottom: "1.25rem", marginTop: 0 }} />
                <ul style={{ listStyle: "none" }}>
                  {saint.miracles.map((miracle, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--gold)", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>✦</span>
                      <span style={{ color: "var(--text-primary)", lineHeight: 1.6 }}>{miracle}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Quotes */}
            {saint.quotes.length > 0 && (
              <section style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>Wisdom & Quotes</h2>
                <hr className="gold-divider" style={{ marginBottom: "1.25rem", marginTop: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {saint.quotes.map((quote, i) => (
                    <blockquote key={i} style={{
                      background: "var(--cream)", borderLeft: "4px solid var(--gold)",
                      padding: "1rem 1.25rem", borderRadius: "0 8px 8px 0",
                      fontFamily: "var(--font-serif)", fontStyle: "italic",
                      color: "var(--navy)", lineHeight: 1.6,
                    }}>
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            {/* Known For */}
            <div className="sacred-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "0.75rem" }}>Known For</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{saint.known_for}</p>
            </div>

            {/* Patron Of */}
            {saint.patron_of.length > 0 && (
              <div className="sacred-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "0.75rem" }}>Patron Saint Of</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {saint.patron_of.map((p, i) => (
                    <span key={i} style={{
                      background: "var(--cream)", color: "var(--navy)", fontSize: "0.78rem",
                      padding: "0.25rem 0.6rem", borderRadius: "999px", fontWeight: 500,
                      border: "1px solid rgba(201,168,76,0.3)",
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Canonization */}
            {saint.canonization_date && (
              <div style={{ background: "var(--navy)", borderRadius: "12px", padding: "1.5rem", color: "var(--white)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", marginBottom: "1rem" }}>Canonization</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>Date</p>
                <p style={{ fontSize: "0.95rem", marginBottom: "0.875rem" }}>{saint.canonization_date}</p>
                {saint.canonized_by_pope && (
                  <>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>Canonized By</p>
                    <p style={{ fontSize: "0.95rem" }}>{saint.canonized_by_pope}</p>
                  </>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
