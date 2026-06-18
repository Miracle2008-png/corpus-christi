"use client";
import React, { useState } from "react";
import Image from "next/image";

const MARY_IMAGE = "/images/mary.jpg";

import mysteries from "@/data/rosary.json";
import Link from "next/link";

import { introductoryPrayers, decadeInstructions, closingPrayers, litanyOfLoreto } from "@/data/rosary-prayers";

const rosaryMiracles = [
  { title: "Battle of Lepanto, 1571", desc: "Pope Pius V called all of Europe to pray the Rosary before the Battle of Lepanto on October 7, 1571. The Christian fleet, vastly outnumbered by the Ottoman armada, won a decisive victory that saved Western civilization. Pope Pius V, hundreds of miles away in Rome, reportedly had a vision of the victory before any messenger arrived. He attributed the victory entirely to the Rosary and established October 7 as the Feast of Our Lady of Victory, now Our Lady of the Rosary.", youtube: "https://www.youtube.com/watch?v=LZ3gfbZMfkU" },
  { title: "Hiroshima — The Miracle of the Eight Jesuits", desc: "On August 6, 1945, the atomic bomb was dropped on Hiroshima. Eight Jesuit priests living in a rectory less than a mile from the epicenter survived without radiation sickness or significant injury. Fr. Hubert Schiffer, who survived, later testified: 'We believe that we survived because we were living the message of Fatima. We lived and prayed the Rosary daily.' When scientific teams examined the site, they had no natural explanation for the priests' survival. Fr. Schiffer was examined over 200 times by atomic bomb experts. No abnormalities were ever found.", youtube: "https://www.youtube.com/watch?v=A9u2kHiJbfY" },
  { title: "Father Peyton and the National Rosary Crusade", desc: "Fr. Patrick Peyton, CSC, diagnosed with terminal tuberculosis in 1939, prayed the Rosary daily for healing. He recovered completely, which he attributed to Our Lady's intercession. He went on to found the Family Rosary Crusade, holding Rosary rallies attended by millions across six continents. At his São Paulo rally in Brazil, over one million people gathered. His famous motto: 'The family that prays together stays together.'", youtube: "https://www.youtube.com/watch?v=MN9jfYHVtME" },
  { title: "Our Lady of Pompeii and the Miraculous Picture", desc: "In 1875, a battered and worm-eaten canvas of Our Lady of the Rosary was transported on a cart of manure to a chapel in Pompeii, Italy. Within years, remarkable healings were reported by those who prayed the Rosary before the image. The most famous was the healing of Fortuna Agrelli, a young girl given up by doctors as hopeless. After a novena of Rosaries before the image, she was fully healed. The Vatican investigated and confirmed the healing as miraculous. The chapel became the Basilica of Our Lady of the Rosary of Pompei.", youtube: "https://www.youtube.com/watch?v=kKJLqF8e65U" },
];

export default function RosaryPage() {
  const [activeSet, setActiveSet] = useState(0);
  const [activeMystery, setActiveMystery] = useState(0);
  const [showLatin, setShowLatin] = useState(false);
  const [tab, setTab] = useState<"mysteries"|"prayers"|"miracles">("mysteries");

  const mystery = mysteries[activeSet].list[activeMystery];

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)" }}>

      {/* Hero with Mary image */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src={MARY_IMAGE}
          alt="The Immaculate Conception — classical Catholic painting"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.35) saturate(0.8)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,39,68,0.3) 0%, var(--navy) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem 1.5rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>The Most Holy Rosary</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem,7vw,5rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.1 }}>
            Pray the Holy Rosary
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 1rem", lineHeight: 1.7 }}>
            The Rosary is the weapon of our times. — Pope Pius XI
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontStyle: "italic" }}>
            Our Lady of the Rosary by Bartolomé Esteban Murillo, c. 1650 · Public Domain
          </p>
        </div>
      </section>

      {/* HOW TO PRAY — Step by Step */}
      <div style={{ background: "rgba(201,168,76,0.05)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem,4vw,2.2rem)", color: "var(--gold)", textAlign: "center", marginBottom: "0.5rem" }}>
            How to Pray the Rosary
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Follow these steps to pray a complete set of 5 mysteries
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {[
              { n: 1, icon: "", title: "Make the Sign of the Cross", desc: "Begin with the Sign of the Cross." },
              { n: 2, icon: "", title: "Apostles' Creed", desc: "Hold the crucifix and recite the Apostles' Creed." },
              { n: 3, icon: "", title: "Our Father", desc: "Pray one Our Father on the first large bead." },
              { n: 4, icon: "", title: "3 Hail Marys", desc: "Pray 3 Hail Marys on the next 3 small beads for Faith, Hope & Charity." },
              { n: 5, icon: "", title: "Glory Be", desc: "Pray the Glory Be and the Fatima Prayer." },
              { n: 6, icon: "", title: "Announce Mystery 1", desc: "Name the first mystery, then pray Our Father on the large bead." },
              { n: 7, icon: "", title: "10 Hail Marys", desc: "Pray 10 Hail Marys on the small beads, meditating on the mystery." },
              { n: 8, icon: "", title: "Glory Be + Fatima", desc: "End the decade with Glory Be and the Fatima Prayer." },
              { n: 9, icon: "�", title: "Repeat ×5", desc: "Repeat steps 6–8 for all 5 mysteries of the chosen set." },
              { n: 10, icon: "�", title: "Closing Prayers", desc: "Finish with Hail Holy Queen, the Benediction, and optionally the Litany of Mary." },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy-dark)", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.2rem" }}>{s.icon} {s.title}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontSize: "0.8rem", marginTop: "1.75rem", fontStyle: "italic" }}>
            Click any mystery below to get the full prayers and classical artwork for each decade →
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        {(["mysteries","prayers","miracles"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "0.6rem 1.4rem", borderRadius: "999px",
            border: "1.5px solid rgba(201,168,76,0.4)",
            background: tab === t ? "var(--gold)" : "transparent",
            color: tab === t ? "var(--navy-dark)" : "var(--gold)",
            fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
            textTransform: "capitalize", transition: "all 0.2s",
          }}>
            {t === "mysteries" ? "The Mysteries" : t === "prayers" ? "All Prayers" : "Rosary Miracles"}
          </button>
        ))}
      </div>

      {/* MYSTERIES TAB */}
      {tab === "mysteries" && (
        <div className="container-sacred" style={{ maxWidth: "1100px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          {/* Set selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
            {mysteries.map((m, i) => (
              <button key={m.set} onClick={() => { setActiveSet(i); setActiveMystery(0); }} style={{
                padding: "1rem 1.25rem", borderRadius: "10px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                border: `2px solid ${i === activeSet ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
                background: i === activeSet ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.02)",
              }}>
                <p style={{ color: i === activeSet ? "var(--gold)" : "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{m.set}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{m.days}</p>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}>
            {/* Mystery list */}
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", marginBottom: "1.25rem", fontSize: "1.2rem" }}>{mysteries[activeSet].set}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {mysteries[activeSet].list.map((m, i) => (
                  <button key={i} onClick={() => setActiveMystery(i)} style={{
                    padding: "0.9rem 1rem", borderRadius: "8px", textAlign: "left", cursor: "pointer", transition: "all 0.2s",
                    border: `1.5px solid ${i === activeMystery ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)"}`,
                    background: i === activeMystery ? "rgba(201,168,76,0.1)" : "transparent",
                    display: "flex", gap: "0.75rem", alignItems: "flex-start",
                  }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.82rem", minWidth: "1.5rem" }}>{m.n}.</span>
                    <div>
                      <p style={{ color: i === activeMystery ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.15rem" }}>{m.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>{m.ref}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mystery detail */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "1.75rem" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Mystery {activeMystery + 1}</p>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.4rem", marginBottom: "0.5rem" }}>{mystery.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "1rem" }}>{mystery.ref}</p>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.92rem" }}>{mystery.desc}</p>
              <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "0.875rem" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Spiritual Fruit</p>
                <p style={{ color: "#fff", fontWeight: 600 }}>{mystery.fruit}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: "1.25rem", marginBottom: "1rem" }}>
                For each mystery: 1 Our Father · 10 Hail Marys · 1 Glory Be · 1 Fatima Prayer
              </p>
              <Link href={`/rosary/${mystery.slug}`} style={{ display: "inline-block", background: "var(--gold)", color: "var(--navy-dark)", padding: "0.6rem 1.2rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", transition: "all 0.2s" }}>
                Deep Dive & Pray &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* PRAYERS TAB */}
      {tab === "prayers" && (
        <div className="container-sacred" style={{ maxWidth: "800px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
            <button onClick={() => setShowLatin(!showLatin)} style={{
              background: showLatin ? "rgba(201,168,76,0.2)" : "transparent",
              border: "1.5px solid rgba(201,168,76,0.4)", color: "var(--gold)",
              padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600,
            }}>
              {showLatin ? "Show English" : "Show Latin"}
            </button>
          </div>
          {/* Introductory Prayers */}
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "0.5rem" }}>Introductory Prayers</h2>
          {introductoryPrayers.map((p, i) => (
            <div key={`intro-${i}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem" }}>{p.title}</h3>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontStyle: "italic" }}>{p.when}</span>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.95, whiteSpace: "pre-wrap" }}>
                {showLatin && p.latin ? p.latin : p.text}
              </p>
            </div>
          ))}

          {/* The Decades */}
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "0.5rem" }}>{decadeInstructions.title}</h2>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "1.75rem", marginBottom: "2.5rem" }}>
            <ul style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.95, paddingLeft: "1.2rem" }}>
              {decadeInstructions.instructions.map((inst, i) => (
                <li key={`dec-${i}`} style={{ marginBottom: "0.5rem" }}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Closing Prayers */}
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "0.5rem" }}>Closing Prayers</h2>
          {closingPrayers.map((p, i) => (
            <div key={`close-${i}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem" }}>{p.title}</h3>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontStyle: "italic" }}>{p.when}</span>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.95, whiteSpace: "pre-wrap" }}>
                {showLatin && p.latin ? p.latin : p.text}
              </p>
            </div>
          ))}

          {/* Litany of Loreto */}
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "0.5rem" }}>{litanyOfLoreto.title}</h2>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontStyle: "italic", marginBottom: "1.5rem", textAlign: "center" }}>{litanyOfLoreto.when}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
              {litanyOfLoreto.lines.map((line, i) => (
                <React.Fragment key={`litany-${i}`}>
                  <div style={{ color: "rgba(255,255,255,0.9)", textAlign: "right", paddingRight: "1rem", borderRight: "1px solid rgba(201,168,76,0.2)" }}>{line.call}</div>
                  <div style={{ color: "var(--gold)", fontStyle: "italic", paddingLeft: "0.5rem" }}>{line.resp}</div>
                </React.Fragment>
              ))}
            </div>
            
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--gold)", fontWeight: "bold" }}>V.</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{litanyOfLoreto.conclusion.v}</span>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ color: "var(--gold)", fontWeight: "bold" }}>R.</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{litanyOfLoreto.conclusion.r}</span>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.95, whiteSpace: "pre-wrap" }}>
                {litanyOfLoreto.conclusion.prayer}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MIRACLES TAB */}
      {tab === "miracles" && (
        <div className="container-sacred" style={{ maxWidth: "900px", paddingTop: "2rem", paddingBottom: "4rem" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Throughout history, the Rosary has been associated with miraculous events — military victories, physical healings, and extraordinary providences — documented by the Church and confirmed by historical record.
          </p>
          {rosaryMiracles.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderLeft: "4px solid var(--gold)", borderRadius: "0 12px 12px 0", padding: "1.75rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.15rem", marginBottom: "0.75rem" }}>{m.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.25rem" }}>{m.desc}</p>
              <a href={m.youtube} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,80,80,0.3)",
                color: "#ff6b6b", padding: "0.5rem 1rem", borderRadius: "8px",
                textDecoration: "none", fontSize: "0.82rem", fontWeight: 600,
              }}>
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
