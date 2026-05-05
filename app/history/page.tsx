import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "2,000 Years of Church History",
  description: "Explore the history of the Catholic Church from the early Church in Rome through the great Councils, the medieval period, and into the modern age.",
};

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

export default function HistoryPage() {
  const timeline = getHistoryData();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "4rem" }}>
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Historia Ecclesiae</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          2,000 Years of Church History
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          From the Upper Room in Jerusalem to the Vatican today — the most remarkable institution in human history.
        </p>
      </section>

      <div className="container-sacred" style={{ maxWidth: "900px", padding: "4rem 1.5rem" }}>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "30px", top: 0, bottom: 0, width: "2px", background: "linear-gradient(180deg, var(--gold), rgba(201,168,76,0.2))" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {timeline.map((item) => (
              <div key={item.slug} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                {/* Icon dot */}
                <div style={{
                  width: "60px", height: "60px", borderRadius: "50%",
                  background: "var(--navy)", border: "3px solid var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", flexShrink: 0, zIndex: 1, position: "relative",
                }}>
                  {item.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: "0.5rem" }}>
                  <p style={{ color: "var(--gold)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.25rem" }}>{item.year}</p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.15rem", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                    {item.event}
                  </h2>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{item.desc}</p>
                  
                  <Link href={`/history/${item.slug}`} style={{ fontSize: "0.85rem", color: "var(--gold-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
