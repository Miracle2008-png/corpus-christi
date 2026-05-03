import type { Metadata } from "next";
import sacramentsData from "@/data/sacraments.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Seven Sacraments",
  description: "Learn about all 7 Catholic sacraments: Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, and Matrimony — with theological explanations and Bible references.",
};

const sacramentIcons = ["I", "II", "III", "IV", "V", "VI", "VII"];

export default function SacramentsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✝ The Seven Sacraments ✝</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          Sacred Signs of Grace
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          The seven sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church, by which divine life is dispensed to us. They touch all the stages and all the important moments of Christian life.
        </p>
      </section>

      {/* Sacraments Grid */}
      <div className="container-sacred section-sacred">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sacramentsData.map((sacrament, i) => (
            <article
              key={sacrament.slug}
              id={sacrament.slug}
              className="sacred-card"
              style={{ padding: "0", overflow: "hidden" }}
            >
              {/* Header bar */}
              <div style={{
                background: i % 2 === 0 ? "var(--navy)" : "linear-gradient(135deg, var(--navy-dark), var(--navy))",
                padding: "1.75rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  background: "rgba(201,168,76,0.2)",
                  border: "2px solid rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  flexShrink: 0,
                }}>
                  {sacramentIcons[i]}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-serif)", color: "rgba(201,168,76,0.8)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Sacrament {sacrament.number}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.5rem", lineHeight: 1.2 }}>
                    {sacrament.name}
                  </h2>
                </div>
              </div>
              
              {/* Painting Banner */}
              <div style={{ width: "100%", height: "260px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                <img 
                  src={`/images/sacraments/sacrament-${i + 1}.jpg`} 
                  alt={`${sacrament.name} - Nicolas Poussin`}
                  className="hover-zoom"
                  style={{ 
                    width: "100%", height: "100%", 
                    objectFit: "cover", 
                    display: "block",
                    filter: "brightness(0.85) sepia(0.15) contrast(1.1)",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {/* Left */}
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.75rem" }}>What is it?</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.925rem" }}>
                    {sacrament.explanation}
                  </p>

                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.75rem" }}>Theological Meaning</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.925rem" }}>
                    {sacrament.theological_meaning}
                  </p>
                </div>

                {/* Right */}
                <div>
                  {/* Steps */}
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.75rem" }}>How it&apos;s Celebrated</h3>
                  <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {sacrament.steps.slice(0, 4).map((step, si) => (
                      <li key={si} style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "0.875rem" }}>
                        {step}
                      </li>
                    ))}
                    {sacrament.steps.length > 4 && (
                      <li style={{ color: "var(--gold-dark)", fontSize: "0.875rem", listStyle: "none", marginLeft: "-1.25rem" }}>
                        +{sacrament.steps.length - 4} more steps...
                      </li>
                    )}
                  </ol>

                  {/* Scripture */}
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.5rem" }}>Scripture</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {sacrament.bible_references.map((ref, ri) => (
                      <span key={ri} style={{
                        background: "var(--cream)",
                        border: "1px solid rgba(201,168,76,0.3)",
                        color: "var(--navy)",
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        fontStyle: "italic",
                      }}>
                        {ref}
                      </span>
                    ))}
                  </div>

                  {/* Effects */}
                  {sacrament.effects.length > 0 && (
                    <div style={{ marginTop: "1.25rem" }}>
                      <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.5rem" }}>Effects</h3>
                      <ul style={{ listStyle: "none" }}>
                        {sacrament.effects.slice(0, 3).map((e, ei) => (
                          <li key={ei} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                            <span style={{ color: "var(--gold)", flexShrink: 0 }}>✦</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.75rem", marginBottom: "1rem" }}>
          Live the Sacramental Life
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem", maxWidth: "450px", margin: "0 auto 2rem" }}>
          The sacraments are encounters with the living Christ. Go to Mass. Go to Confession. Receive the grace He offers.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/mass" className="btn-sacred">Learn about Mass</Link>
          <Link href="/readings" className="btn-outline-sacred">Daily Readings</Link>
        </div>
      </section>
    </div>
  );
}
