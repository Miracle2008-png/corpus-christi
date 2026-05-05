"use client";
import { useState } from "react";

const cardinalVirtues = [
  { name: "Prudence", latin: "Prudentia", icon: "🧠", color: "#1a3f5c", desc: "The mother and queen of all virtues. Prudence is right reason in action — the ability to discern the true good in every circumstance and to choose the right means of achieving it. It guides the other virtues.", practice: "Before making decisions, ask: Is this truly good? Is this the right way? Pray for wisdom before important choices.", ccc: "CCC 1806" },
  { name: "Justice", latin: "Iustitia", icon: "⚖", color: "#5c3f1a", desc: "The moral virtue that consists in the constant and firm will to give their due to God and neighbour. Justice towards God is called the 'virtue of religion.' Justice towards men disposes one to respect the rights of each person.", practice: "Pay what you owe. Give fair wages. Respect others' reputations. Honour your commitments.", ccc: "CCC 1807" },
  { name: "Fortitude", latin: "Fortitudo", icon: "🛡", color: "#3f1a5c", desc: "The moral virtue that ensures firmness in difficulties and constancy in the pursuit of the good. It strengthens the resolve to resist temptations and to overcome obstacles. The cardinal virtue of courage.", practice: "Do the right thing even when it costs you. Stand up for truth even when mocked. Endure suffering without losing faith.", ccc: "CCC 1808" },
  { name: "Temperance", latin: "Temperantia", icon: "⚖️", color: "#1a5c3f", desc: "The moral virtue that moderates the attraction of pleasures and provides balance in the use of created goods. It ensures the will's mastery over instincts and keeps desires within the limits of what is honourable.", practice: "Fast regularly. Limit screen time. Drink in moderation. Don't let any appetite — food, comfort, praise — govern your choices.", ccc: "CCC 1809" },
];

const theologicalVirtues = [
  { name: "Faith", latin: "Fides", icon: "✝", color: "#1a2a5c", desc: "Faith is the theological virtue by which we believe in God and believe all that He has said and revealed to us, because He is truth itself. By faith, man freely commits his entire self to God.", ccc: "CCC 1814" },
  { name: "Hope", latin: "Spes", icon: "⚓", color: "#5c1a1a", desc: "The theological virtue by which we desire the kingdom of heaven and eternal life as our happiness, placing our trust in Christ's promises and relying not on our own strength but on the help of the Holy Spirit.", ccc: "CCC 1817" },
  { name: "Charity (Love)", latin: "Caritas", icon: "❤", color: "#5c1a3f", desc: "The greatest of the three theological virtues. Charity is the virtue by which we love God above all things for His own sake, and our neighbour as ourselves for the love of God. The form and mother of all virtues.", ccc: "CCC 1822" },
];

const beatitudes = [
  { b: "Blessed are the poor in spirit", result: "for theirs is the kingdom of heaven.", meaning: "To be poor in spirit is to recognise our complete dependence on God — not clinging to wealth, status, or self-sufficiency. It is the foundational disposition: those who know they need God will receive His kingdom.", ref: "Matthew 5:3" },
  { b: "Blessed are those who mourn", result: "for they shall be comforted.", meaning: "Those who grieve sin — their own and the world's — are blessed. This is not mere sadness but holy sorrow (penthos in Greek) — the sorrow of repentance and compassion that opens the heart to God's consolation.", ref: "Matthew 5:4" },
  { b: "Blessed are the meek", result: "for they shall inherit the earth.", meaning: "Meekness is not weakness but strength under control — the ability to endure injustice without retaliation, trusting in God's justice. Moses is called 'the meekest man on earth' (Numbers 12:3), yet he led a nation.", ref: "Matthew 5:5" },
  { b: "Blessed are those who hunger and thirst for righteousness", result: "for they shall be satisfied.", meaning: "An intense, bodily desire for justice and holiness — both personal righteousness and justice in the world. This beatitude promises complete fulfilment: God will satisfy this longing fully, eternally.", ref: "Matthew 5:6" },
  { b: "Blessed are the merciful", result: "for they shall receive mercy.", meaning: "Mercy — misericordia, 'a heart that gives itself to the miserable' — is the disposition to forgive, to help, to bear with others' failures. Those who show mercy discover they are themselves in need of it, and God meets them.", ref: "Matthew 5:7" },
  { b: "Blessed are the pure in heart", result: "for they shall see God.", meaning: "Purity of heart is undivided love for God — single-minded devotion that is not split between God and idols. The pure in heart will see God face to face, which is the whole purpose and destiny of human existence.", ref: "Matthew 5:8" },
  { b: "Blessed are the peacemakers", result: "for they shall be called sons of God.", meaning: "Peacemakers actively work to heal divisions, reconcile enemies, and bring God's shalom into conflict. They are called sons of God because they imitate God, whose supreme act was reconciling humanity to Himself in Christ.", ref: "Matthew 5:9" },
  { b: "Blessed are those who are persecuted for righteousness", result: "for theirs is the kingdom of heaven.", meaning: "Those who suffer for doing right share in Christ's own Passion. This beatitude is the mark of the saint and the martyr. The kingdom — promised in the first beatitude — is also the reward of the last, forming a perfect circle.", ref: "Matthew 5:10" },
];

export default function VirtuesPage() {
  const [tab, setTab] = useState<"cardinal" | "theological" | "beatitudes">("cardinal");
  const [openB, setOpenB] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #1a2a0a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ The Life of Virtue ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>Virtues & Beatitudes</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Virtue is a habitual and firm disposition to do good. The virtues are the building blocks of the moral life — the character of the Christian. The Beatitudes are Christ's portrait of holiness.
        </p>
      </section>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
        <div className="container-sacred" style={{ maxWidth: "1100px", display: "flex" }}>
          {([["cardinal", "Cardinal Virtues"], ["theological", "Theological Virtues"], ["beatitudes", "The Beatitudes"]] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "1rem 1.25rem", background: "none", border: "none", borderBottom: `3px solid ${tab === t ? "var(--gold)" : "transparent"}`, color: tab === t ? "var(--navy)" : "var(--text-muted)", fontWeight: tab === t ? 700 : 500, fontSize: "0.88rem", cursor: "pointer", transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "1100px", padding: "2.5rem 1.5rem" }}>

        {/* Cardinal Virtues */}
        {tab === "cardinal" && (
          <div>
            <p style={{ color: "var(--text-muted)", maxWidth: "680px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.93rem" }}>
              The four cardinal virtues — Prudence, Justice, Fortitude, and Temperance — are the hinge virtues on which all other moral virtues turn (<em>cardo</em> = hinge). They can be cultivated by everyone through reason and practice. They were identified by ancient philosophers and adopted by the Church.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {cardinalVirtues.map((v, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", boxShadow: "0 2px 12px rgba(26,39,68,0.05)" }}>
                  <div style={{ background: v.color, padding: "1.75rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{v.icon}</div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.4rem", margin: "0 0 0.2rem" }}>{v.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", fontStyle: "italic", margin: 0 }}>{v.latin}</p>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1.25rem" }}>{v.desc}</p>
                    <div style={{ background: "rgba(26,39,68,0.03)", borderRadius: "8px", padding: "0.9rem 1rem", marginBottom: "0.75rem" }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>Practice</p>
                      <p style={{ color: "var(--navy)", fontSize: "0.84rem", lineHeight: 1.6, margin: 0 }}>{v.practice}</p>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontStyle: "italic" }}>{v.ccc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Theological Virtues */}
        {tab === "theological" && (
          <div>
            <p style={{ color: "var(--text-muted)", maxWidth: "680px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.93rem" }}>
              The three theological virtues — Faith, Hope, and Charity — have God as their origin, motive, and object. They cannot be acquired by human effort alone; they are infused by God at Baptism and grow through the sacramental life and prayer. "And now these three remain: faith, hope and love. But the greatest of these is love." (1 Corinthians 13:13)
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {theologicalVirtues.map((v, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", boxShadow: "0 2px 12px rgba(26,39,68,0.05)" }}>
                  <div style={{ background: v.color, padding: "2rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{v.icon}</div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.4rem", margin: "0 0 0.2rem" }}>{v.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", fontStyle: "italic", margin: 0 }}>{v.latin}</p>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{v.desc}</p>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontStyle: "italic" }}>{v.ccc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beatitudes */}
        {tab === "beatitudes" && (
          <div>
            <div style={{ background: "var(--navy-dark)", borderRadius: "14px", padding: "1.5rem 2rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                "Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. And he opened his mouth and taught them, saying..." — Matthew 5:1-2
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {beatitudes.map((b, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
                  <button onClick={() => setOpenB(openB === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", margin: "0 0 0.2rem", fontWeight: 600 }}>{b.b},</p>
                      <p style={{ fontFamily: "var(--font-serif)", color: "var(--gold-dark)", fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>{b.result}</p>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.2s", transform: openB === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openB === i && (
                    <div style={{ borderTop: "3px solid var(--gold)", padding: "1.5rem", background: "rgba(26,39,68,0.01)" }}>
                      <p style={{ color: "var(--text-primary)", lineHeight: 1.85, fontSize: "0.93rem", marginBottom: "0.75rem" }}>{b.meaning}</p>
                      <span style={{ fontSize: "0.72rem", color: "var(--gold-dark)", fontWeight: 600, background: "rgba(201,168,76,0.1)", padding: "0.2rem 0.7rem", borderRadius: "999px", border: "1px solid rgba(201,168,76,0.3)" }}>{b.ref}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@media(max-width:700px){div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr !important;}div[style*="minmax(280px"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
