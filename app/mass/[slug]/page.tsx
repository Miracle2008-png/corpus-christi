import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import massData from "@/data/mass.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const part = massData.find((p_item) => p_item.slug === p.slug);
  if (!part) return { title: "Not Found" };
  return {
    title: `${part.section} | The Holy Mass`,
    description: part.summary,
  };
}

export async function generateStaticParams() {
  return massData.map((part) => ({
    slug: part.slug,
  }));
}

export default async function MassDetailPage({ params }: Props) {
  const p = await params;
  const part = massData.find((p_item) => p_item.slug === p.slug);

  if (!part) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div className="container-sacred">
          <Link href="/mass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", fontSize: "0.875rem", textDecoration: "none", marginBottom: "2rem", fontWeight: 600 }}>
            <span>←</span> Back to Order of Mass
          </Link>
          <p style={{ color: "var(--gold)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
            Part {part.order}
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "0.5rem" }}>
            {part.section}
          </h1>
          <p style={{ color: "var(--gold-dark)", fontSize: "1.25rem", fontStyle: "italic", marginBottom: "1.5rem" }}>
            {part.latin}
          </p>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>
            {part.summary}
          </p>
        </div>
      </section>

      {/* Steps Container */}
      <section className="container-sacred" style={{ marginTop: "-2rem" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "3rem", boxShadow: "0 20px 40px rgba(26, 39, 68, 0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            {part.steps.map((step, idx) => (
              <div key={idx}>
                {/* Step Header */}
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    color: "var(--navy)", fontWeight: 800, fontSize: "1.2rem"
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.75rem", marginBottom: "0.25rem" }}>
                      {step.name}
                    </h2>
                    <p style={{ color: "var(--gold-dark)", fontStyle: "italic", fontSize: "1rem" }}>
                      {step.latin}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div style={{ marginLeft: "4.5rem" }}>
                  <p style={{ color: "var(--text)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                    {step.detail}
                  </p>

                  {/* Liturgical Text (Prayers and Responses) */}
                  {(step.prayers.length > 0 || step.responses.length > 0) && (
                    <div style={{ background: "rgba(201,168,76,0.05)", borderLeft: "4px solid var(--gold)", padding: "1.5rem 2rem", borderRadius: "0 8px 8px 0" }}>
                      <h4 style={{ color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>
                        Liturgical Text
                      </h4>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {/* Prayers (Priest) */}
                        {step.prayers.map((prayer, pIdx) => (
                          <div key={`p-${pIdx}`} style={{ display: "flex", gap: "1rem" }}>
                            <span style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.85rem", width: "80px", flexShrink: 0, paddingTop: "0.2rem" }}>PRIEST:</span>
                            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--navy-dark)", lineHeight: 1.6 }}>{prayer}</span>
                          </div>
                        ))}
                        
                        {/* Responses (People) */}
                        {step.responses.map((response, rIdx) => (
                          <div key={`r-${rIdx}`} style={{ display: "flex", gap: "1rem" }}>
                            <span style={{ color: "var(--crimson)", fontWeight: 700, fontSize: "0.85rem", width: "80px", flexShrink: 0, paddingTop: "0.2rem" }}>PEOPLE:</span>
                            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 600, color: "var(--navy-dark)", lineHeight: 1.6 }}>{response}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider between steps */}
                {idx < part.steps.length - 1 && (
                  <hr style={{ border: "none", height: "1px", background: "rgba(201,168,76,0.2)", margin: "3.5rem 0 0 4.5rem" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
