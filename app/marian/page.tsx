"use client";
import { useState } from "react";

const apparitions = [
  {
    id: "fatima",
    title: "Our Lady of Fátima",
    location: "Fátima, Portugal",
    year: "1917",
    seers: "Lúcia dos Santos, Francisco Marto, Jacinta Marto",
    approved: "1930 by Bishop of Leiria",
    message: "Our Lady appeared six times to three shepherd children between May and October 1917. She called for daily Rosary, penance, consecration of Russia to her Immaculate Heart, and the Five First Saturdays devotion. She revealed the three Fátima Secrets and performed the Miracle of the Sun witnessed by 70,000 people on October 13, 1917.",
    feast: "May 13",
    keyQuote: "I am the Lady of the Rosary. I have come to warn the faithful to amend their lives and ask pardon for their sins. They must not continue to offend Our Lord, who is already so deeply offended.",
  },
  {
    id: "lourdes",
    title: "Our Lady of Lourdes",
    location: "Lourdes, France",
    year: "1858",
    seers: "St. Bernadette Soubirous",
    approved: "1862 by Bishop of Tarbes",
    message: "Mary appeared 18 times to the 14-year-old Bernadette Soubirous in the Grotto of Massabielle. She revealed herself as the Immaculate Conception, asked for processions and a chapel to be built, and caused a healing spring to flow. Over 200 miraculous cures have been officially verified by the Catholic Church. 6 million pilgrims visit Lourdes annually.",
    feast: "February 11",
    keyQuote: "I am the Immaculate Conception.",
  },
  {
    id: "guadalupe",
    title: "Our Lady of Guadalupe",
    location: "Mexico City, Mexico",
    year: "1531",
    seers: "St. Juan Diego Cuauhtlatoatzin",
    approved: "1555",
    message: "Mary appeared four times to the indigenous convert Juan Diego, requesting a church be built on Tepeyac Hill. To prove her message, she imprinted her image miraculously on Juan Diego's tilma (cloak). The tilma still exists today at the Basilica in Mexico City, and scientists have found no natural explanation for the image. Our Lady of Guadalupe is the Patroness of the Americas.",
    feast: "December 12",
    keyQuote: "Am I not here, I who am your Mother?",
  },
  {
    id: "akita",
    title: "Our Lady of Akita",
    location: "Akita, Japan",
    year: "1973",
    seers: "Sr. Agnes Sasagawa",
    approved: "1984 by Bishop Ito of Niigata",
    message: "Mary appeared and spoke to Sister Agnes 101 times, warning of a great punishment if humanity did not repent — a catastrophe worse than the deluge that would eliminate a great part of humanity. She called for prayer, penance, and courageous sacrifice. A wooden statue of Our Lady wept human tears 101 times, verified by scientists.",
    feast: "October 13",
    keyQuote: "Many men in this world afflict the Lord. I desire souls to console Him to soften the anger of the Heavenly Father.",
  },
  {
    id: "knock",
    title: "Our Lady of Knock",
    location: "Knock, County Mayo, Ireland",
    year: "1879",
    seers: "15 witnesses of all ages",
    approved: "Approved by the Church",
    message: "On the evening of 21 August 1879, fifteen people of Knock village witnessed an apparition on the south gable of the parish church: Our Lady, St. Joseph, St. John the Evangelist, and a lamb on an altar surrounded by angels. The apparition lasted two hours in pouring rain while the gable wall remained dry. Knock is now a national Marian shrine of Ireland visited by 1.5 million pilgrims yearly.",
    feast: "August 21",
    keyQuote: "This apparition is a silent apparition — Our Lady said no words, but her presence spoke of peace and consolation.",
  },
];

const titles = [
  { title: "Our Lady, Star of the Sea", latin: "Stella Maris", meaning: "Mary as the guiding light for sailors and all who navigate life's storms. Invoked by seafarers for protection since the early Church.", feast: "— ", icon: "✦" },
  { title: "Our Lady of Perpetual Help", latin: "Mater de Perpetuo Succursu", meaning: "Depicted in the famous Byzantine icon, Mary holds the Child Jesus who clings to her after seeing Angels holding instruments of the Passion. She is the ever-ready helper in all our needs.", feast: "June 27", icon: "" },
  { title: "Our Lady of Sorrows", latin: "Mater Dolorosa", meaning: "The seven sorrows of Mary: the Prophecy of Simeon, the Flight into Egypt, the Loss of Jesus in the Temple, meeting Jesus on the Way of the Cross, the Crucifixion, the Descent from the Cross, and the Burial.", feast: "September 15", icon: "" },
  { title: "Our Lady of Mount Carmel", latin: "Domina Nostra de Monte Carmelo", meaning: "Patroness of the Carmelite Order. Devotion includes wearing the Brown Scapular, promised by Our Lady to St. Simon Stock in 1251 as a sign of her protection and a guarantee of final perseverance for those who wear it devotedly.", feast: "July 16", icon: "✦" },
  { title: "Immaculate Heart of Mary", latin: "Cor Immaculatum Mariae", meaning: "Mary's heart, free from all sin, burning with love for God and souls. Consecration to the Immaculate Heart was requested at Fátima. The First Saturday devotion of reparation is connected to this devotion.", feast: "Saturday after Sacred Heart", icon: "✦" },
  { title: "Our Lady, Queen of Heaven", latin: "Regina Caeli", meaning: "Honoured as Queen of Heaven and Earth, crowned by the Holy Trinity. The Regina Caeli prayer is prayed during Eastertide. Mary\u2019s queenship flows from her divine motherhood and her cooperation in redemption.", feast: "August 22", icon: "✦" },
];

const consecrationSteps = [
  { day: "Days 1–12", title: "Knowledge of Self", desc: "Purification period. Meditate on pride, vanity, and the slavery of sin. St. Louis de Montfort recommends reading about our miseries and the need for Mary's help." },
  { day: "Days 13–19", title: "Knowledge of Mary", desc: "Illumination period. Study Mary's life, virtues, and privileges. Read St. Louis de Montfort's writings on Mary as the perfect path to Jesus." },
  { day: "Days 20–26", title: "Knowledge of Jesus Christ", desc: "Union period. Deepen your knowledge of Jesus — who He is and what He has done for us. This is the goal of the entire consecration." },
  { day: "Days 27–33", title: "Preparation for the Act", desc: "Final preparation. Intensify prayer, penance, and reading. Arrange for Confession and Holy Communion on Day 33." },
  { day: "Day 33", title: "The Act of Consecration", desc: "On the final day, go to Confession, receive Holy Communion, and pray the formal Act of Consecration to Jesus through Mary. This is your total gift of self." },
];

export default function MarianPage() {
  const [activeTab, setActiveTab] = useState<"apparitions" | "titles" | "consecration">("apparitions");
  const [activeApparition, setActiveApparition] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #0f1f3d 50%, #2a0a1a 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ Totus Tuus ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Marian Devotions
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Devotion to Our Lady is one of the oldest and most cherished traditions of the Church. Explore Our Lady's apparitions, titles, and the path of Marian consecration.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)", marginTop: "1.25rem", fontSize: "0.9rem" }}>
          &ldquo;Blessed are you among women, and blessed is the fruit of your womb.&rdquo; — Luke 1:42
        </p>
      </section>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
        <div className="container-sacred" style={{ maxWidth: "1200px", display: "flex" }}>
          {([
            ["apparitions", "Apparitions"],
            ["titles", "Titles of Mary"],
            ["consecration", "Marian Consecration"],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: "1rem 1.5rem", background: "none", border: "none", borderBottom: `3px solid ${activeTab === tab ? "var(--gold)" : "transparent"}`, color: activeTab === tab ? "var(--navy)" : "var(--text-muted)", fontWeight: activeTab === tab ? 700 : 500, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "2.5rem 1.5rem" }}>

        {/* Apparitions Tab */}
        {activeTab === "apparitions" && (
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem" }}>
            <div>
              {apparitions.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActiveApparition(i)}
                  style={{ width: "100%", textAlign: "left", padding: "0.9rem 1.1rem", background: activeApparition === i ? "var(--navy-dark)" : "#fff", border: `1px solid ${activeApparition === i ? "transparent" : "rgba(26,39,68,0.1)"}`, borderRadius: "10px", cursor: "pointer", marginBottom: "0.5rem", transition: "all 0.2s" }}
                >
                  <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "0.88rem", color: activeApparition === i ? "var(--gold)" : "var(--navy)", margin: "0 0 0.2rem" }}>{a.title}</p>
                  <p style={{ fontSize: "0.72rem", color: activeApparition === i ? "rgba(255,255,255,0.5)" : "var(--text-muted)", margin: 0 }}>{a.location} · {a.year}</p>
                </button>
              ))}
            </div>
            <div>
              {(() => {
                const a = apparitions[activeApparition];
                return (
                  <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
                    <div style={{ background: "var(--navy-dark)", padding: "2rem 2.5rem" }}>
                      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(201,168,76,0.2)", color: "var(--gold)", fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.75rem", borderRadius: "999px", border: "1px solid rgba(201,168,76,0.3)" }}>{a.year}</span>
                        <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", padding: "0.2rem 0.75rem", borderRadius: "999px" }}>Feast: {a.feast}</span>
                        <span style={{ background: "rgba(26,168,76,0.15)", color: "#4ade80", fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.75rem", borderRadius: "999px" }}>✓ Approved</span>
                      </div>
                      <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.7rem", margin: "0 0 0.3rem" }}>{a.title}</h2>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: 0 }}>{a.location}</p>
                    </div>
                    <div style={{ padding: "2rem 2.5rem" }}>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Seers</p>
                        <p style={{ color: "var(--navy)", fontWeight: 600, fontSize: "0.9rem" }}>{a.seers}</p>
                      </div>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Church Approval</p>
                        <p style={{ color: "var(--navy)", fontSize: "0.9rem" }}>{a.approved}</p>
                      </div>
                      <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.93rem", marginBottom: "1.75rem" }}>{a.message}</p>
                      <div style={{ background: "rgba(26,39,68,0.03)", borderLeft: "4px solid var(--gold)", borderRadius: "0 10px 10px 0", padding: "1.25rem 1.5rem" }}>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Our Lady's Words</p>
                        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--navy)", fontSize: "0.97rem", lineHeight: 1.7, margin: 0 }}>&ldquo;{a.keyQuote}&rdquo;</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Titles Tab */}
        {activeTab === "titles" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
            {titles.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", padding: "1.75rem", boxShadow: "0 2px 10px rgba(26,39,68,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.5rem", color: "var(--gold)" }}>{t.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.05rem", margin: "0 0 0.15rem" }}>{t.title}</h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--gold-dark)", fontStyle: "italic", margin: 0 }}>{t.latin}</p>
                  </div>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>{t.meaning}</p>
                {t.feast !== "— " && (
                  <span style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold-dark)", fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.7rem", borderRadius: "999px" }}>
                    Feast: {t.feast}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Consecration Tab */}
        {activeTab === "consecration" && (
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <div style={{ background: "var(--navy-dark)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>Totus Tuus — Total Consecration</p>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>33-Day Preparation to Mary</h2>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontSize: "0.9rem", maxWidth: "580px", margin: "0 auto" }}>
                Based on the spirituality of St. Louis de Montfort, popularized by St. John Paul II whose motto was &ldquo;Totus Tuus&rdquo; (All Yours). This 33-day program prepares the soul to consecrate itself totally to Jesus through Mary.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {consecrationSteps.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", padding: "1.5rem 1.75rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: i === consecrationSteps.length - 1 ? "linear-gradient(135deg,var(--gold-dark),var(--gold))" : "rgba(26,39,68,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontWeight: 800, fontSize: "0.85rem", color: i === consecrationSteps.length - 1 ? "var(--navy-dark)" : "var(--navy)" }}>{i + 1}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: "var(--gold-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{s.day}</p>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.05rem", margin: "0 0 0.5rem" }}>{s.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "12px", padding: "1.25rem 1.5rem", marginTop: "1.5rem" }}>
              <p style={{ color: "var(--navy)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
                <strong>Recommended book:</strong> <em>True Devotion to Mary</em> by St. Louis de Montfort. Also widely used: <em>33 Days to Morning Glory</em> by Fr. Michael Gaitley, MIC — a modern guide to the same consecration using the writings of four Marian saints.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: \"240px 1fr\""] {
            grid-template-columns: 1fr !important;
          }
          div[style*="minmax(340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
