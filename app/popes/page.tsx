import type { Metadata } from "next";
import popes1 from "@/data/popes-1-50.json";
import popes2 from "@/data/popes-51-100.json";
import popes3 from "@/data/popes-101-150.json";
import popes4 from "@/data/popes-151-200.json";
import popes5 from "@/data/popes-201-250.json";
import popes6 from "@/data/popes-251-265.json";

export const metadata: Metadata = {
  title: "All Popes of the Catholic Church | Corpus Christi",
  description: "The complete list of all 265 Bishops of Rome — from St. Peter to Pope Francis — with portraits, reigns, nationalities, and historical notes.",
};

const allPopes = [...popes1, ...popes2, ...popes3, ...popes4, ...popes5, ...popes6];

const eras = [
  { label: "Apostolic & Patristic Era", range: [1, 50], years: "c. 30 – 498 AD", desc: "The foundational centuries — from Peter's martyrdom through the collapse of the Western Roman Empire." },
  { label: "Early Medieval Era", range: [51, 100], years: "499 – 827 AD", desc: "The papacy navigates barbarian kingdoms, Byzantine emperors, Islam, and the rise of the Franks." },
  { label: "High Medieval Era", range: [101, 150], years: "827 – 1048 AD", desc: "The Pornocracy, the Cadaver Synod, and the first stirrings of Gregorian Reform." },
  { label: "Reform & Crusade Era", range: [151, 200], years: "1049 – 1378 AD", desc: "The Gregorian Reform, the Great Schism of 1054, the Crusades, and the Avignon papacy." },
  { label: "Renaissance & Reformation Era", range: [201, 240], years: "1378 – 1689 AD", desc: "The Western Schism, the great Renaissance popes, the Protestant Reformation, and the Council of Trent." },
  { label: "Modern Era", range: [241, 267], years: "1691 – Present", desc: "Enlightenment, Revolution, Vatican Councils I and II, and the global Church of the 20th–21st centuries — through Pope Leo XIV, the first American pope." },
];

export default function PopesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark), var(--navy))", padding: "5rem 1.5rem 3.5rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Successors of Peter</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,5vw,3.75rem)", color: "#fff", marginBottom: "1rem" }}>
          All Popes of the Catholic Church
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>
          From St. Peter, crucified upside down on Vatican Hill around 68 AD, to Pope Francis — a complete record of 265 men who have held the office of Bishop of Rome across nearly 2,000 years of history.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>267</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Popes</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>~2,000</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Years of History</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "var(--gold)", fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700 }}>83</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Canonised Saints</p>
          </div>
        </div>
      </section>

      {/* Era navigation */}
      <div style={{ background: "var(--navy)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "0.75rem 1.5rem", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "0.5rem", minWidth: "max-content", margin: "0 auto", maxWidth: "1200px" }}>
          {eras.map((era) => (
            <a key={era.label} href={`#era-${era.range[0]}`} style={{
              color: "rgba(201,168,76,0.7)", fontSize: "0.75rem", textDecoration: "none",
              padding: "0.4rem 0.875rem", borderRadius: "999px",
              border: "1px solid rgba(201,168,76,0.2)", whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>
              {era.label}
            </a>
          ))}
        </div>
      </div>

      {/* Eras */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {eras.map((era) => {
          const eraPopesList = allPopes.filter(p => p.n >= era.range[0] && p.n <= era.range[1]);
          return (
            <div key={era.label} id={`era-${era.range[0]}`} style={{ marginBottom: "4rem" }}>
              <div style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "2px solid rgba(201,168,76,0.25)" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.4rem" }}>{era.years}</p>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.6rem", marginBottom: "0.4rem" }}>{era.label}</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{era.desc}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {eraPopesList.map((pope) => (
                  <article key={pope.n} className="pope-card">

                    {/* Portrait */}
                    {pope.img ? (
                      <div style={{ height: "200px", overflow: "hidden", background: "#eee" }}>
                        <img
                          src={pope.img}
                          alt={pope.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                        />
                      </div>
                    ) : (
                      <div style={{
                        height: "120px",
                        background: "linear-gradient(135deg, var(--navy-dark), var(--navy))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "2.5rem", color: "rgba(201,168,76,0.4)",
                      }}>
                        +
                      </div>
                    )}

                    {/* Content */}
                    <div style={{ padding: "1rem 1.125rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "0.65rem", color: "var(--gold-dark)", fontWeight: 700, letterSpacing: "0.08em" }}>Pope {pope.n}</span>
                        {pope.saint && (
                          <span style={{ fontSize: "0.6rem", background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)", padding: "0.15rem 0.4rem", borderRadius: "4px", fontWeight: 700, letterSpacing: "0.05em" }}>SAINT</span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.25rem", lineHeight: 1.3 }}>{pope.name}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "0.6rem" }}>{pope.reign} &mdash; {pope.nat}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.65, flex: 1 }}>{pope.note}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
