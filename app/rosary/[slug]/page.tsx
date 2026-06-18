import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import React from "react";
import { closingPrayers, litanyOfLoreto } from "@/data/rosary-prayers";

interface Mystery {
  n: number;
  slug: string;
  title: string;
  ref: string;
  fruit: string;
  desc: string;
  image?: string;
}
interface MysterySet { set: string; days: string; list: Mystery[]; }

function getRosaryData(): MysterySet[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "rosary.json"), "utf8"));
}

function getFlatMysteries() {
  const data = getRosaryData();
  const flat: { mystery: Mystery; setName: string; days: string }[] = [];
  data.forEach(set => set.list.forEach(m => flat.push({ mystery: m, setName: set.set, days: set.days })));
  return flat;
}

export async function generateStaticParams() {
  return getFlatMysteries().map(m => ({ slug: m.mystery.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getFlatMysteries().find(m => m.mystery.slug === slug);
  if (!item) return { title: "Mystery Not Found" };
  return { title: `${item.mystery.title} — Rosary Mystery`, description: item.mystery.desc };
}

const DECADE_PRAYERS = [
  { step: 1, title: "Announce the Mystery", desc: "Name the mystery aloud and pause briefly to meditate on it." },
  { step: 2, title: "Our Father", text: "Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
  { step: 3, title: "10 Hail Marys", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus.\n\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.", note: "Repeat 10 times, meditating on the mystery with each bead." },
  { step: 4, title: "Glory Be", text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen." },
  { step: 5, title: "Fatima Prayer", text: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen." },
];

// CLOSING_PRAYERS have been moved to @/data/rosary-prayers
export default async function MysteryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flat = getFlatMysteries();
  const currentIndex = flat.findIndex(m => m.mystery.slug === slug);
  if (currentIndex === -1) notFound();

  const { mystery, setName, days } = flat[currentIndex];
  const setStartIdx = flat.findIndex(m => m.setName === setName);
  const prevMystery = currentIndex > setStartIdx ? flat[currentIndex - 1].mystery : null;
  const nextMystery = currentIndex < setStartIdx + 4 ? flat[currentIndex + 1].mystery : null;
  const isLastInSet = !nextMystery;

  const setMysteries = flat.filter(m => m.setName === setName).map(m => m.mystery);

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)", color: "#fff" }}>

      {/* HERO IMAGE */}
      <section style={{ position: "relative", height: "55vh", minHeight: "400px", overflow: "hidden" }}>
        {mystery.image ? (
          <Image
            src={mystery.image}
            alt={mystery.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(0.4)" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0a1628,#1a2744)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, var(--navy) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", padding: "2rem 1.5rem 2.5rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
            {setName} · Prayed on {days}
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,6vw,4rem)", color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            {mystery.n}. {mystery.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic", fontSize: "1rem" }}>{mystery.ref}</p>
          {mystery.image && (
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", marginTop: "0.5rem" }}>
              Classical Catholic artwork · Public Domain via Wikimedia Commons
            </p>
          )}
        </div>
      </section>

      {/* MYSTERY SELECTOR (mini nav within set) */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "0.75rem 1rem", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {setMysteries.map((m) => (
            <Link key={m.slug} href={`/rosary/${m.slug}`} style={{
              padding: "0.4rem 0.9rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600,
              textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s",
              background: m.slug === slug ? "var(--gold)" : "rgba(255,255,255,0.07)",
              color: m.slug === slug ? "var(--navy-dark)" : "rgba(255,255,255,0.7)",
              border: m.slug === slug ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}>
              {m.n}. {m.title}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* MYSTERY DETAIL */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--gold)", marginBottom: "1rem" }}>
            About This Mystery
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" }}>
            {mystery.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "10px", padding: "1rem 1.25rem" }}>
            <span style={{ fontSize: "1.5rem" }}></span>
            <div>
              <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.15rem" }}>Spiritual Fruit of This Mystery</p>
              <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>{mystery.fruit}</p>
            </div>
          </div>
        </div>

        {/* HOW TO PRAY THIS DECADE */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--gold)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span></span> How to Pray This Decade
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {DECADE_PRAYERS.map((p) => (
              <div key={p.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy-dark)", fontWeight: 800, fontSize: "0.9rem", flexShrink: 0 }}>
                  {p.step}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.9rem", marginBottom: p.text ? "0.5rem" : 0 }}>{p.title}</p>
                  {p.desc && <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{p.desc}</p>}
                  {p.text && <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-serif)", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}>{p.text}</p>}
                  {p.note && <p style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.78rem", marginTop: "0.5rem", fontStyle: "italic" }}>{p.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAV WITHIN SET */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {prevMystery ? (
            <Link href={`/rosary/${prevMystery.slug}`} style={{ flex: 1, minWidth: "200px", textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.1rem 1.25rem", borderRadius: "10px" }}>
              <div style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.25rem" }}>← Previous</div>
              <div style={{ color: "#fff", fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "0.95rem" }}>{prevMystery.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
          {nextMystery ? (
            <Link href={`/rosary/${nextMystery.slug}`} style={{ flex: 1, minWidth: "200px", textDecoration: "none", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", padding: "1.1rem 1.25rem", borderRadius: "10px", textAlign: "right" }}>
              <div style={{ color: "var(--gold)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.25rem" }}>Next Mystery →</div>
              <div style={{ color: "#fff", fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "0.95rem" }}>{nextMystery.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>

        {/* CLOSING PRAYERS (shown after last mystery in set) */}
        {isLastInSet && (
          <div style={{ marginTop: "1rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem", padding: "1.5rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px" }}>
              <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "1rem" }}>You have completed all 5 mysteries of the {setName}!</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Conclude your Rosary with the closing prayers below.</p>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--gold)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span></span> Closing Prayers
            </h2>
            {closingPrayers.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderLeft: "4px solid var(--gold)", borderRadius: "0 12px 12px 0", padding: "1.75rem", marginBottom: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.1rem", marginBottom: "1rem" }}>{p.title}</h3>
                {p.latin && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "0.75rem" }}>{p.latin}</p>}
                <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.95, fontFamily: "var(--font-serif)", fontSize: "0.97rem", whiteSpace: "pre-wrap" }}>{p.text}</p>
              </div>
            ))}

            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--gold)", marginTop: "3rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span></span> {litanyOfLoreto.title}
            </h2>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderLeft: "4px solid var(--gold)", borderRadius: "0 12px 12px 0", padding: "1.75rem", marginBottom: "1.25rem" }}>
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

        {/* BACK LINK */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/rosary" style={{ color: "rgba(201,168,76,0.7)", textDecoration: "none", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            ← Back to All Mysteries
          </Link>
        </div>
      </div>
    </div>
  );
}
