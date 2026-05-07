import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

const CLOSING_PRAYERS = [
  {
    title: "Hail Holy Queen (Salve Regina)",
    latin: "Salve, Regina, Mater misericordiae; vita, dulcedo et spes nostra, salve...",
    text: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope! To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy towards us, and after this our exile, show unto us the blessed Fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary!\n\nPray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
  },
  {
    title: "The Rosary Prayer (Benediction)",
    text: "Let us pray. O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life: grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain, and obtain what they promise. Through the same Christ our Lord. Amen."
  },
  {
    title: "Prayer to St. Michael",
    text: "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all the evil spirits who roam throughout the world seeking the ruin of souls. Amen."
  },
  {
    title: "Litany of the Blessed Virgin Mary (abbreviated)",
    text: "Lord, have mercy. Christ, have mercy. Lord, have mercy.\nHoly Mary — Pray for us.\nHoly Mother of God — Pray for us.\nHoly Virgin of virgins — Pray for us.\nMother of Christ — Pray for us.\nMother of the Church — Pray for us.\nMother of divine grace — Pray for us.\nMother most pure — Pray for us.\nMother most chaste — Pray for us.\nMother inviolate — Pray for us.\nMother most amiable — Pray for us.\nMother of good counsel — Pray for us.\nMother of our Creator — Pray for us.\nMother of our Saviour — Pray for us.\nVirgin most prudent — Pray for us.\nVirgin most venerable — Pray for us.\nVirgin most renowned — Pray for us.\nVirgin most powerful — Pray for us.\nVirgin most merciful — Pray for us.\nVirgin most faithful — Pray for us.\nMirror of justice — Pray for us.\nSeat of wisdom — Pray for us.\nCause of our joy — Pray for us.\nSpiritual vessel — Pray for us.\nVessel of honour — Pray for us.\nSingular vessel of devotion — Pray for us.\nMystical rose — Pray for us.\nTower of David — Pray for us.\nTower of ivory — Pray for us.\nHouse of gold — Pray for us.\nArk of the covenant — Pray for us.\nGate of heaven — Pray for us.\nMorning star — Pray for us.\nHealth of the sick — Pray for us.\nRefuge of sinners — Pray for us.\nComforter of the afflicted — Pray for us.\nHelp of Christians — Pray for us.\nQueen of Angels — Pray for us.\nQueen of Patriarchs — Pray for us.\nQueen of Prophets — Pray for us.\nQueen of Apostles — Pray for us.\nQueen of Martyrs — Pray for us.\nQueen of Confessors — Pray for us.\nQueen of Virgins — Pray for us.\nQueen of all Saints — Pray for us.\nQueen conceived without original sin — Pray for us.\nQueen assumed into heaven — Pray for us.\nQueen of the most holy Rosary — Pray for us.\nQueen of families — Pray for us.\nQueen of peace — Pray for us.\n\nLamb of God, who takest away the sins of the world — Spare us, O Lord.\nLamb of God, who takest away the sins of the world — Graciously hear us, O Lord.\nLamb of God, who takest away the sins of the world — Have mercy on us.\n\nPray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.\n\nGrant, we beseech Thee, O Lord God, that we Thy servants may enjoy perpetual health of mind and body; and by the glorious intercession of the Blessed Mary, ever Virgin, be delivered from present sorrow, and obtain eternal joy. Through Christ our Lord. Amen."
  },
];

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
            {CLOSING_PRAYERS.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderLeft: "4px solid var(--gold)", borderRadius: "0 12px 12px 0", padding: "1.75rem", marginBottom: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.1rem", marginBottom: "1rem" }}>{p.title}</h3>
                {p.latin && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "0.75rem" }}>{p.latin}</p>}
                <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.95, fontFamily: "var(--font-serif)", fontSize: "0.97rem", whiteSpace: "pre-line" }}>{p.text}</p>
              </div>
            ))}
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
