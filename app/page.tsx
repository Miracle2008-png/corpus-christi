import type { Metadata } from "next";
import Link from "next/link";
import CursorParticles from "@/components/CursorParticles";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corpus Christi — Catholic Ministry Platform",
  description:
    "A sacred digital home for the Catholic faithful. Daily readings, saints, rosary, sacraments, and more — free and offline-first.",
};

// Featured saint quotes for rotation (SSR, static)
const saintQuotes = [
  { quote: "Our heart is restless, until it repose in Thee.", saint: "St. Augustine of Hippo" },
  { quote: "Let nothing disturb you, let nothing frighten you. All things are passing away: God never changes.", saint: "St. Teresa of Ávila" },
  { quote: "Start by doing what is necessary; then do what is possible; and suddenly you are doing the impossible.", saint: "St. Francis of Assisi" },
  { quote: "Be who God meant you to be and you will set the world on fire.", saint: "St. Catherine of Siena" },
  { quote: "I am not afraid. I was born to do this.", saint: "St. Joan of Arc" },
  { quote: "Do not be afraid.", saint: "St. John Paul II" },
  { quote: "After my death, I will let fall a shower of roses.", saint: "St. Thérèse of Lisieux" },
];

const features = [
  { href: "/saints", label: "Saints", desc: "Biographies, miracles & patronages" },
  { href: "/popes", label: "Popes", desc: "St. Peter to Pope Leo XIV" },
  { href: "/sacraments", label: "Sacraments", desc: "The 7 holy sacraments explained" },
  { href: "/stations", label: "Stations", desc: "Immersive Way of the Cross" },
  { href: "/rosary", label: "Holy Rosary", desc: "Guided prayer with mysteries" },
  { href: "/readings", label: "Daily Readings", desc: "Scripture for today" },
  { href: "/calendar", label: "Calendar", desc: "Liturgical seasons & feasts" },
  { href: "/miracles", label: "Miracles", desc: "Verified signs and wonders" },
  { href: "/mass", label: "Mass & Confession", desc: "Full liturgical breakdown" },
  { href: "/history", label: "Church History", desc: "Rome to today — 2000 years" },
  { href: "/priesthood", label: "Holy Orders", desc: "The three sacred degrees" },
  { href: "/incorruptibles", label: "Incorruptibles", desc: "Bodies that defy decay" },
  { href: "/intentions", label: "Prayer Wall", desc: "Submit & pray for others" },
];

// Pick today's quote by day of year
function getTodaysQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return saintQuotes[dayOfYear % saintQuotes.length];
}

// Calculate the real liturgical season
function getLiturgicalSeason(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  const md = month * 100 + day; // e.g. 1225 = Dec 25

  // Easter calculation (Anonymous Gregorian algorithm)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31);
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(year, easterMonth - 1, easterDay);

  const dayOfYear = Math.floor((now.getTime() - new Date(year, 0, 1).getTime()) / 86400000);
  const easterDoy = Math.floor((easter.getTime() - new Date(year, 0, 1).getTime()) / 86400000);
  const diff = dayOfYear - easterDoy;

  // Advent: 4 Sundays before Christmas
  const christmasDow = new Date(year, 11, 25).getDay();
  const adventStart = new Date(year, 11, 25 - christmasDow - 21);
  const adventDoy = Math.floor((adventStart.getTime() - new Date(year, 0, 1).getTime()) / 86400000);

  if (diff >= -46 && diff < -6) return "Lent";
  if (diff >= -6 && diff < 0) return "Holy Week";
  if (diff === 0) return "Easter Sunday";
  if (diff > 0 && diff <= 49) return "Easter";
  if (diff === 49) return "Pentecost";
  if (dayOfYear >= adventDoy) return "Advent";
  if (md >= 1225 || md <= 112) return "Christmas";
  return "Ordinary Time";
}

// Get today's reading from lectionary data
function getTodaysGospel() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const filePath = path.join(process.cwd(), "data", "lectionary-2026-full.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const todaysReading = data.find((d: { date: string }) => d.date === today);
    if (todaysReading?.gospel?.text && !todaysReading.gospel.text.startsWith("A reading from")) {
      return {
        reference: todaysReading.gospel.reference,
        text: todaysReading.gospel.text.substring(0, 400) + (todaysReading.gospel.text.length > 400 ? "..." : ""),
        reflection: todaysReading.gospel_reflection || "Take a moment to reflect on how today's Gospel applies to your life.",
      };
    }
  } catch {}
  return {
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reflection: "God's love is not abstract — it is expressed in the most concrete act in history: giving His Son for us. Let this truth be the anchor of your heart.",
  };
}

export default function HomePage() {
  const todaysQuote = getTodaysQuote();
  const todaysGospel = getTodaysGospel();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const season = getLiturgicalSeason();

  return (
    <>
      <CursorParticles />
      {/* ========== HERO ========== */}
      <section className="hero-sacred" style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem", position: "relative", overflow: "hidden" }}>

        {/* Background cross pattern */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: "clamp(200px, 40vw, 600px)", color: "rgba(201,168,76,0.04)", userSelect: "none", fontWeight: 900, lineHeight: 1, fontFamily: "serif" }}>+</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "999px", padding: "0.4rem 1.2rem", marginBottom: "2rem" }}>
            <span style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Sacred Digital Ministry</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, color: "var(--white)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Corpus{" "}
            <span style={{ color: "var(--gold)", textShadow: "0 0 40px rgba(201,168,76,0.5)" }}>Christi</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Your daily companion for Catholic life. Access the daily readings, pray the Rosary, and discover the lives of the Saints—wherever you are.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/readings" className="btn-sacred btn-sacred-lg" style={{ fontSize: "1rem", padding: "0.9rem 2.25rem" }}>
              Today&apos;s Readings
            </Link>
            <Link href="/rosary" className="btn-outline-sacred btn-outline-lg" style={{ fontSize: "1rem", padding: "0.85rem 2rem", borderWidth: "2px" }}>
              Pray the Rosary
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TODAY'S DATE BANNER ========== */}
      <div style={{ background: "var(--gold)", padding: "0.75rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "var(--navy-dark)", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.05em" }}>
          {today} · {season}
        </p>
      </div>

      {/* ========== SAINT QUOTE OF THE DAY ========== */}
      <section style={{ background: "var(--navy)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem", fontWeight: 700 }}>
            Saint Quote of the Day 
          </p>
          <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 2rem)", color: "var(--white)", fontStyle: "italic", lineHeight: 1.5, marginBottom: "1.5rem" }}>
            &ldquo;{todaysQuote.quote}&rdquo;
          </blockquote>
          <cite style={{ color: "var(--gold)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.03em" }}>
            — {todaysQuote.saint}
          </cite>
        </div>
      </section>

      <hr className="gold-divider" style={{ margin: 0 }} />

      {/* ========== QUICK ACCESS GRID ========== */}
      <section className="section-sacred bg-parchment">
        <div className="container-sacred">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--navy)", marginBottom: "0.75rem" }}>
              Grow in Grace
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
              A complete library of Catholic tradition, theology, and devotions.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.25rem",
          }}>
            {features.map((f, i) => (
              <Link
                key={f.href}
                href={f.href}
                style={{ textDecoration: "none" }}
                className={`animate-fade-in animate-delay-${Math.min(i + 1, 4)}`}
              >
                <div className="sacred-card" style={{ padding: "1.75rem 1.25rem", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "var(--gold)", letterSpacing: "0.1em" }}>✦</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--navy)", marginBottom: "0.4rem", fontWeight: 700 }}>
                    {f.label}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DYNAMIC TODAY'S GOSPEL ========== */}
      <section style={{ background: "var(--navy)", padding: "5rem 1.5rem" }}>
        <div className="container-sacred" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>
              ✦ Liturgy of the Word ✦
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--white)", marginBottom: "0.5rem" }}>
              Today&apos;s Gospel
            </h2>
            <div className="gold-divider" />
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "2rem" }}>
            <div className="reading-section">
              <h3>Gospel</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "0.5rem" }}>{todaysGospel.reference}</p>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}>
                &ldquo;{todaysGospel.text}&rdquo;
              </p>
            </div>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
              <h3 style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>Reflection</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {todaysGospel.reflection}
              </p>
            </div>
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <Link href="/readings" className="btn-sacred btn-sacred-lg" style={{ fontSize: "0.95rem", padding: "0.85rem 2rem" }}>
                Read Full Daily Readings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section style={{ background: "linear-gradient(135deg, var(--crimson) 0%, #6B0F0F 100%)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
            Take Your Prayer Life Anywhere
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem", lineHeight: 1.7 }}>
            Add Corpus Christi to your home screen to pray offline, track your novenas, and read the daily gospel on the go.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/rosary" className="btn-sacred btn-sacred-lg" style={{ fontSize: "1rem", padding: "0.9rem 2.25rem" }}>
              Pray Now
            </Link>
            <Link href="/saints" className="btn-outline-sacred btn-outline-lg" style={{ borderColor: "rgba(255,255,255,0.5)", color: "var(--white)", fontSize: "1rem", padding: "0.85rem 2rem" }}>
              Explore Saints
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
