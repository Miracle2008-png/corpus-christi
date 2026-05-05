"use client";
import { useState } from "react";

const encyclicals = [
  {
    id: "rerum-novarum",
    title: "Rerum Novarum",
    subtitle: "On the Condition of Labour",
    pope: "Pope Leo XIII",
    year: 1891,
    era: "Modern",
    theme: "Social Teaching",
    themeColor: "#1a5c3f",
    summary: "Often called the 'Magna Carta of Catholic Social Teaching.' Leo XIII addressed the plight of workers during the Industrial Revolution, defending the rights of labour, the importance of private property, and the duty of the state to protect the poor — charting a path between laissez-faire capitalism and Marxist socialism.",
    keyTeachings: [
      "Workers have the right to fair wages and decent conditions",
      "Private property is a natural right but must be used for the common good",
      "Class conflict is not inevitable — cooperation between workers and employers is possible",
      "The state has a duty to protect the weak",
      "Workers have the right to form associations (trade unions)",
    ],
    famousQuote: "Let the working man and the employer make free agreements, and in particular let them agree freely as to the wages; nevertheless, there underlies a dictate of natural justice more imperious and ancient than any bargain between man and man.",
  },
  {
    id: "humanae-vitae",
    title: "Humanae Vitae",
    subtitle: "On the Regulation of Birth",
    pope: "Pope Paul VI",
    year: 1968,
    era: "Modern",
    theme: "Marriage & Life",
    themeColor: "#7b2d2d",
    summary: "One of the most controversial documents in modern Church history. Paul VI reaffirmed the Church's teaching that artificial contraception is intrinsically disordered, insisting that the unitive and procreative dimensions of the conjugal act must not be artificially separated. The encyclical's prophetic predictions about the effects of widespread contraception — including depersonalisation of women and government coercion — have been widely noted.",
    keyTeachings: [
      "Each conjugal act must remain open to the transmission of life",
      "Artificial contraception is intrinsically evil",
      "Natural Family Planning is morally acceptable",
      "Sexual love must always respect the total person of the spouse",
      "The Church, not individuals alone, is the authentic interpreter of the moral law",
    ],
    famousQuote: "We must once again declare that the direct interruption of the generative process already begun... is to be absolutely excluded as licit means of regulating the number of children.",
  },
  {
    id: "veritatis-splendor",
    title: "Veritatis Splendor",
    subtitle: "The Splendour of Truth",
    pope: "Pope John Paul II",
    year: 1993,
    era: "JPII Era",
    theme: "Moral Theology",
    themeColor: "#1a3f5c",
    summary: "John Paul II's comprehensive treatment of fundamental moral theology, written in dialogue with the young rich man of Matthew 19. He critiques trends in contemporary moral theology — particularly proportionalism and consequentialism — and defends the existence of absolute moral norms (intrinsic evils) that admit no exceptions regardless of intention or circumstance.",
    keyTeachings: [
      "Some acts are intrinsically evil and can never be justified by intention or circumstance",
      "Conscience must be formed in the truth — it does not create moral truth",
      "Freedom is ordered to truth, not opposed to it",
      "Proportionalism and consequentialism are incompatible with Catholic moral teaching",
      "Martyrdom is the supreme witness to moral truth",
    ],
    famousQuote: "Certain acts are intrinsically evil: their evil object cannot be redeemed by any intention or circumstance. They remain evil even if performed with a good intention.",
  },
  {
    id: "laudato-si",
    title: "Laudato Si'",
    subtitle: "On Care for Our Common Home",
    pope: "Pope Francis",
    year: 2015,
    era: "Francis Era",
    theme: "Environment",
    themeColor: "#2d6a3f",
    summary: "Named after St. Francis of Assisi's Canticle of the Sun, this groundbreaking encyclical addresses the ecological crisis as a moral and spiritual issue. Francis draws together scientific analysis, theological reflection, and social justice concerns, arguing that care for the environment is inseparable from care for the poor and from our relationship with God.",
    keyTeachings: [
      "The earth is 'our common home' — we are stewards, not owners",
      "The ecological crisis is inseparable from social injustice (integral ecology)",
      "Consumerism and a throwaway culture are spiritually disordered",
      "Care for creation is a requirement of Christian faith",
      "Both individual conversion and systemic change are necessary",
    ],
    famousQuote: "The Earth, our home, is beginning to look more and more like an immense pile of filth. In many parts of the planet, the elderly lament that once beautiful landscapes are now covered with rubbish.",
  },
  {
    id: "deus-caritas-est",
    title: "Deus Caritas Est",
    subtitle: "God Is Love",
    pope: "Pope Benedict XVI",
    year: 2005,
    era: "Benedict Era",
    theme: "Love & Charity",
    themeColor: "#5c1a3f",
    summary: "Benedict XVI's first encyclical — a profound meditation on love in its many forms. He explores the relationship between eros (human love) and agape (divine love), arguing they are not opposed but that one purifies and elevates the other. The second part addresses the Church's social mission of charity (caritas) as an expression of love.",
    keyTeachings: [
      "God is Love — this is not just a metaphor but the deepest truth about God",
      "Eros and agape are not opposed; purified human love opens us to divine love",
      "The Church's charitable mission cannot be reduced to political action",
      "Justice and love are both necessary — neither replaces the other",
      "The Saints are the proof that God's love can transform a human life",
    ],
    famousQuote: "Love — caritas — will always prove necessary, even in the most just society. There is no ordering of the State so just that it can eliminate the need for a service of love.",
  },
  {
    id: "spe-salvi",
    title: "Spe Salvi",
    subtitle: "On Christian Hope",
    pope: "Pope Benedict XVI",
    year: 2007,
    era: "Benedict Era",
    theme: "Hope & Eschatology",
    themeColor: "#1a3a5c",
    summary: "A rich meditation on the nature of Christian hope, drawing on Scripture, philosophy, and the lives of the saints. Benedict argues that modern man has replaced eschatological hope with faith in progress — a 'faith' that has failed. True hope is personal, not merely collective, and is rooted in relationship with a God who holds our future.",
    keyTeachings: [
      "Hope is not optimism — it is theological faith in God's faithfulness",
      "The modern faith in progress has proved insufficient as a substitute for Christian hope",
      "Judgement is not opposed to hope but is its necessary counterpart",
      "Purgatory expresses our hope for a final healing and purification",
      "Prayer for the dead is an expression of hope that transcends death",
    ],
    famousQuote: "The one who has hope lives differently; the one who hopes has been granted the gift of a new life.",
  },
];

const eras = ["All", "Modern", "JPII Era", "Benedict Era", "Francis Era"];

export default function EncyclicalsPage() {
  const [activeEra, setActiveEra] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = activeEra === "All" ? encyclicals : encyclicals.filter(e => e.era === activeEra);
  const detail = encyclicals.find(e => e.id === selected);

  if (detail) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>
        <div style={{ background: detail.themeColor, padding: "3.5rem 1.5rem", position: "relative" }}>
          <div className="container-sacred" style={{ maxWidth: "860px" }}>
            <button onClick={() => setSelected(null)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.65)", background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 0.9rem", fontSize: "0.8rem", cursor: "pointer", marginBottom: "1.5rem" }}>
              ← Back to Encyclicals
            </button>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.75rem", borderRadius: "999px" }}>{detail.year}</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.75rem", borderRadius: "999px" }}>{detail.theme}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "2.5rem", margin: "0 0 0.4rem" }}>{detail.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", margin: "0 0 0.4rem", fontSize: "1.1rem" }}>{detail.subtitle}</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>{detail.pope}</p>
          </div>
        </div>
        <div className="container-sacred" style={{ maxWidth: "860px", padding: "2.5rem 1.5rem" }}>
          <p style={{ color: "var(--text-primary)", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "2rem" }}>{detail.summary}</p>
          <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.2rem", marginBottom: "1rem" }}>Key Teachings</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {detail.keyTeachings.map((t, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: detail.themeColor, fontSize: "0.8rem", marginTop: "0.25rem", flexShrink: 0 }}>✦</span>
                <span style={{ fontSize: "0.93rem", color: "var(--text-primary)", lineHeight: 1.7 }}>{t}</span>
              </li>
            ))}
          </ul>
          <div style={{ borderLeft: `4px solid ${detail.themeColor}`, paddingLeft: "1.5rem", background: "rgba(26,39,68,0.02)", borderRadius: "0 12px 12px 0", padding: "1.25rem 1.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Key Quote</p>
            <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>&ldquo;{detail.famousQuote}&rdquo;</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #1a0a0a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ The Voice of Peter ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>Papal Encyclicals</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Encyclicals are letters from the Pope to the whole Church, addressing matters of doctrine, morality, and social teaching. Here are the most significant of the modern era, summarised for accessibility.
        </p>
      </section>

      {/* Era filter */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", padding: "0.9rem 1.5rem" }}>
        <div className="container-sacred" style={{ maxWidth: "1100px", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {eras.map(era => (
            <button key={era} onClick={() => setActiveEra(era)} style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: `1px solid ${activeEra === era ? "var(--navy)" : "rgba(26,39,68,0.15)"}`, background: activeEra === era ? "var(--navy)" : "#fff", color: activeEra === era ? "#fff" : "var(--navy)", fontSize: "0.8rem", fontWeight: activeEra === era ? 700 : 500, cursor: "pointer", transition: "all 0.18s" }}>
              {era}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "1100px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {filtered.map(enc => (
            <div key={enc.id} onClick={() => setSelected(enc.id)} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 10px rgba(26,39,68,0.05)", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(26,39,68,0.12)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,39,68,0.05)"; }}>
              <div style={{ background: enc.themeColor, padding: "1.5rem 1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.7rem", fontWeight: 600, padding: "0.15rem 0.6rem", borderRadius: "999px", marginBottom: "0.5rem", display: "inline-block" }}>{enc.year}</span>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.3rem", margin: "0 0 0.2rem" }}>{enc.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", fontStyle: "italic", margin: 0 }}>{enc.subtitle}</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem 1.75rem" }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{enc.pope}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.86rem", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{enc.summary}</p>
                <span style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.8rem", color: enc.themeColor, fontWeight: 600 }}>Read Summary →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){div[style*="minmax(320px"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
