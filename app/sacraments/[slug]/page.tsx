import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import sacramentsData from "@/data/sacraments.json";

interface Props {
  params: Promise<{ slug: string }>;
}

const sacramentIcons = ["I", "II", "III", "IV", "V", "VI", "VII"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sacrament = sacramentsData.find((s) => s.slug === slug);
  if (!sacrament) return { title: "Sacrament Not Found" };
  return {
    title: `Sacrament of ${sacrament.name}`,
    description: sacrament.explanation,
  };
}

export function generateStaticParams() {
  return sacramentsData.map((s) => ({ slug: s.slug }));
}

export default async function SacramentDetailPage({ params }: Props) {
  const { slug } = await params;
  const sacramentIndex = sacramentsData.findIndex((s) => s.slug === slug);
  const sacrament = sacramentsData[sacramentIndex];
  if (!sacrament) notFound();

  const icon = sacramentIcons[sacramentIndex];
  const imageUrl = `/images/sacraments/sacrament-${sacrament.number}.jpg`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,39,68,0.7) 0%, var(--navy) 100%)", zIndex: 1 }} />
        <div className="container-sacred" style={{ position: "relative", zIndex: 2, maxWidth: "1000px", padding: "3rem 1.5rem 0" }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: "2rem" }}>
            <Link href="/sacraments" style={{ color: "var(--gold)", textDecoration: "none", fontSize: "0.85rem" }}>← The Seven Sacraments</Link>
          </nav>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", paddingBottom: "3rem" }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "rgba(201,168,76,0.2)",
              border: "2px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 700 }}>
                {icon}
              </span>
            </div>
            <div>
              <p style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>
                Sacrament {sacrament.number}
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", lineHeight: 1.2 }}>
                {sacrament.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Painting Banner */}
      <div style={{ width: "100%", height: "400px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <Image 
          src={imageUrl} 
          alt={`Classical Painting depicting the Sacrament of ${sacrament.name}`}
          fill
          priority
          sizes="100vw"
          style={{ 
            objectFit: "cover", 
            display: "block",
            filter: "brightness(0.85) sepia(0.15) contrast(1.1)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-sacred" style={{ maxWidth: "1000px", padding: "4rem 1.5rem" }}>
        <div className="sacrament-grid">
          <style>{`
            .sacrament-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; }
            @media(min-width: 768px) { .sacrament-grid { grid-template-columns: 1fr minmax(300px, 1fr); } }
          `}</style>
          
          {/* Main Info */}
          <div>
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>What is it?</h2>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.8 }}>{sacrament.explanation}</p>
            </section>

            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>Theological Meaning</h2>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.8 }}>{sacrament.theological_meaning}</p>
            </section>

            <section>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem" }}>How it's Celebrated</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {sacrament.steps.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ 
                      width: "28px", height: "28px", borderRadius: "50%", 
                      background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, marginTop: "0.2rem"
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.6, paddingTop: "0.2rem" }}>{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sacred-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.25rem", marginBottom: "1rem" }}>Details</h3>
              
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Ordinary Minister</p>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.5 }}>{sacrament.minister}</p>
              </div>
              
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Recipient</p>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.5 }}>{sacrament.recipient}</p>
              </div>

              <div>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Spiritual Effects</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {sacrament.effects.map((effect, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.8rem", marginTop: "0.1rem" }}>✦</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sacred-card" style={{ padding: "2rem", background: "var(--navy)", color: "var(--white)", border: "none" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.25rem", marginBottom: "1rem" }}>Scriptural Basis</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sacrament.bible_references.map((ref, idx) => (
                  <span key={idx} style={{ 
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(201,168,76,0.3)",
                    padding: "0.4rem 0.8rem", borderRadius: "999px", fontSize: "0.85rem",
                    color: "var(--white)", fontStyle: "italic", fontFamily: "var(--font-serif)"
                  }}>
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
