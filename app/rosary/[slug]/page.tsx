import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

interface Mystery {
  n: number;
  slug: string;
  title: string;
  ref: string;
  fruit: string;
  desc: string;
}

interface MysterySet {
  set: string;
  days: string;
  list: Mystery[];
}

function getRosaryData(): MysterySet[] {
  const filePath = path.join(process.cwd(), "data", "rosary.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
}

// Flatten all mysteries into a single array for pagination
function getFlatMysteries(): { mystery: Mystery; setName: string }[] {
  const data = getRosaryData();
  const flat: { mystery: Mystery; setName: string }[] = [];
  data.forEach(set => {
    set.list.forEach(mystery => {
      flat.push({ mystery, setName: set.set });
    });
  });
  return flat;
}

export async function generateStaticParams() {
  const flat = getFlatMysteries();
  return flat.map((m) => ({
    slug: m.mystery.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const flat = getFlatMysteries();
  const item = flat.find((m) => m.mystery.slug === resolvedParams.slug);

  if (!item) return { title: "Mystery Not Found" };

  return {
    title: `${item.mystery.title} — ${item.setName}`,
    description: item.mystery.desc,
  };
}

export default async function MysteryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const flat = getFlatMysteries();
  const currentIndex = flat.findIndex((m) => m.mystery.slug === resolvedParams.slug);
  
  if (currentIndex === -1) {
    notFound();
  }

  const { mystery, setName } = flat[currentIndex];
  
  // Only paginate within the same set
  const currentSetStartIdx = flat.findIndex(m => m.setName === setName);
  const isFirstInSet = currentIndex === currentSetStartIdx;
  const isLastInSet = currentIndex === currentSetStartIdx + 4;

  const prevMystery = !isFirstInSet ? flat[currentIndex - 1].mystery : null;
  const nextMystery = !isLastInSet ? flat[currentIndex + 1].mystery : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)", paddingBottom: "4rem" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(180deg, var(--navy-dark) 0%, var(--navy) 100%)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          {setName} — Mystery {mystery.n}
        </p>
        <div style={{ 
          width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto 1.5rem",
          background: "rgba(201,168,76,0.1)", border: "2px solid var(--gold)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", color: "var(--gold)"
        }}>
          ✦
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem", maxWidth: "800px", margin: "0 auto" }}>
          {mystery.title}
        </h1>
      </section>

      {/* Content */}
      <div className="container-sacred" style={{ maxWidth: "800px", padding: "2rem 1.5rem" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "2.5rem 2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", border: "1px solid rgba(201,168,76,0.2)" }}>
          
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
             <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
              {mystery.ref}
            </p>
          </div>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontFamily: "var(--font-serif)" }}>
            {mystery.desc}
          </p>
          
          <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "12px", padding: "1.5rem", textAlign: "center", marginTop: "2rem" }}>
             <p style={{ color: "var(--gold)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
              Spiritual Fruit
            </p>
            <p style={{ color: "var(--white)", fontSize: "1.2rem", fontWeight: 600, fontFamily: "var(--font-serif)" }}>
              {mystery.fruit}
            </p>
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              PRAY FOR THIS MYSTERY:
            </p>
            <p style={{ color: "var(--gold)", fontSize: "1rem", fontWeight: 600, marginTop: "0.5rem" }}>
              1 Our Father · 10 Hail Marys · 1 Glory Be · 1 Fatima Prayer
            </p>
          </div>
        </div>
      </div>

      {/* Pagination Links */}
      <div className="container-sacred" style={{ maxWidth: "800px", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", gap: "1rem", flexWrap: "wrap" }}>
          {prevMystery ? (
            <Link href={`/rosary/${prevMystery.slug}`} style={{ flex: 1, textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.25rem", borderRadius: "10px", transition: "background 0.2s" }} className="sacred-card-hover">
              <div style={{ color: "var(--gold-dark)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "0.25rem" }}>&larr; Previous Mystery</div>
              <div style={{ color: "var(--white)", fontFamily: "var(--font-serif)", fontWeight: 600 }}>{prevMystery.title}</div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {nextMystery ? (
            <Link href={`/rosary/${nextMystery.slug}`} style={{ flex: 1, textDecoration: "none", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", padding: "1.25rem", borderRadius: "10px", textAlign: "right", transition: "background 0.2s" }} className="sacred-card-hover">
              <div style={{ color: "var(--gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "0.25rem" }}>Next Mystery &rarr;</div>
              <div style={{ color: "var(--white)", fontFamily: "var(--font-serif)", fontWeight: 600 }}>{nextMystery.title}</div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/rosary" className="btn-outline-sacred">
            Back to All Mysteries
          </Link>
        </div>
      </div>
    </div>
  );
}
