"use client";
import { useState } from "react";

const cardinalVirtues = [
  { name: "Prudence", latin: "Prudentia", color: "#1a3f5c", desc: "The mother and queen of all virtues. Prudence is right reason in action — the ability to discern the true good in every circumstance and to choose the right means of achieving it. Without prudence, good intentions can lead to disastrous results. It guides the other virtues by setting rule and measure, allowing us to overcome ignorance and see reality as it truly is.", practice: "Before making decisions, ask: Is this truly good? Is this the right way? Pray for wisdom before important choices and seek counsel from the wise.", ccc: "CCC 1806" },
  { name: "Justice", latin: "Iustitia", color: "#5c3f1a", desc: "The moral virtue that consists in the constant and firm will to give their due to God and neighbour. Justice towards God is called the 'virtue of religion.' Justice towards men disposes one to respect the rights of each person and to establish in human relationships the harmony that promotes equity with regard to persons and to the common good.", practice: "Pay what you owe. Give fair wages. Respect others' reputations. Honour your commitments, and defend the rights of the vulnerable and oppressed.", ccc: "CCC 1807" },
  { name: "Fortitude", latin: "Fortitudo", color: "#3f1a5c", desc: "The moral virtue that ensures firmness in difficulties and constancy in the pursuit of the good. It strengthens the resolve to resist temptations and to overcome obstacles. Fortitude enables one to conquer fear, even fear of death, and to face trials and persecutions. It disposes one even to renounce and sacrifice his life in defense of a just cause.", practice: "Do the right thing even when it costs you. Stand up for truth even when mocked. Endure suffering without losing faith, and bear your daily crosses with patience.", ccc: "CCC 1808" },
  { name: "Temperance", latin: "Temperantia", color: "#1a5c3f", desc: "The moral virtue that moderates the attraction of pleasures and provides balance in the use of created goods. It ensures the will's mastery over instincts and keeps desires within the limits of what is honourable. The temperate person directs the sensitive appetites toward what is good and maintains a healthy discretion.", practice: "Fast regularly. Limit screen time. Drink in moderation. Do not let any appetite — food, comfort, or praise — govern your choices. Cultivate modesty and purity.", ccc: "CCC 1809" },
];

const theologicalVirtues = [
  { name: "Faith", latin: "Fides", color: "#1a2a5c", desc: "Faith is the theological virtue by which we believe in God and believe all that He has said and revealed to us, and that Holy Church proposes for our belief, because He is truth itself. By faith, man freely commits his entire self to God. For this reason the believer seeks to know and do God's will.", ccc: "CCC 1814" },
  { name: "Hope", latin: "Spes", color: "#5c1a1a", desc: "The theological virtue by which we desire the kingdom of heaven and eternal life as our happiness, placing our trust in Christ's promises and relying not on our own strength, but on the help of the grace of the Holy Spirit. Hope keeps man from discouragement, sustains him during times of abandonment, and opens up his heart in expectation of eternal beatitude.", ccc: "CCC 1817" },
  { name: "Charity", latin: "Caritas", color: "#5c1a3f", desc: "The greatest of the three theological virtues. Charity is the theological virtue by which we love God above all things for his own sake, and our neighbor as ourselves for the love of God. Jesus makes charity the new commandment. It is the superior virtue, the form, and the mother of all virtues.", ccc: "CCC 1822" },
];

const corporalWorks = [
  { name: "To feed the hungry", desc: "Providing nourishment to those without food, recognizing Christ in the starving." },
  { name: "To give water to the thirsty", desc: "Ensuring access to clean water and refreshment for those in need." },
  { name: "To clothe the naked", desc: "Providing adequate clothing and dignity to those who lack basic necessities." },
  { name: "To shelter the homeless", desc: "Offering refuge, housing, and a safe place for those without a home." },
  { name: "To visit the sick", desc: "Spending time with the ill, offering comfort, medical assistance, and prayer." },
  { name: "To visit the imprisoned", desc: "Bringing hope and the light of Christ to those incarcerated, recognizing their human dignity." },
  { name: "To bury the dead", desc: "Treating the bodies of the deceased with respect and providing a proper Christian burial." }
];

const spiritualWorks = [
  { name: "To instruct the ignorant", desc: "Teaching others about the Catholic faith and the truths of the Gospel." },
  { name: "To counsel the doubtful", desc: "Offering guidance and clarity to those struggling with their faith or life decisions." },
  { name: "To admonish sinners", desc: "Lovingly correcting those who are engaged in sinful behavior to bring them back to grace." },
  { name: "To bear wrongs patiently", desc: "Enduring injustices and slights without bitterness or immediate retaliation." },
  { name: "To forgive offences willingly", desc: "Letting go of grudges and extending the mercy of Christ to those who hurt us." },
  { name: "To comfort the afflicted", desc: "Consoling those who are grieving, distressed, or experiencing emotional pain." },
  { name: "To pray for the living and the dead", desc: "Interceding before God on behalf of all souls, both on earth and in Purgatory." }
];

const holySpiritGifts = [
  { name: "Wisdom", desc: "The highest gift, which allows us to see the world from God's perspective and to desire the things of Heaven above the things of earth." },
  { name: "Understanding", desc: "The gift that gives us a deeper insight into the mysteries of the Catholic faith, moving beyond mere intellectual knowledge." },
  { name: "Counsel", desc: "The gift of right judgment, which helps us discern what is good and what is evil in difficult situations, guiding us to choose the path of salvation." },
  { name: "Fortitude", desc: "The gift of courage, granting us the strength to stand firm in our faith and endure trials, persecution, or temptation without failing." },
  { name: "Knowledge", desc: "The gift that allows us to see the true value of created things in their relationship to God, recognizing that nothing on earth can satisfy our souls." },
  { name: "Piety", desc: "The gift of reverence, which inspires us to worship God as our loving Father and to treat others with genuine respect as children of God." },
  { name: "Fear of the Lord", desc: "The gift of awe and wonder, giving us a profound respect for God's majesty and a deep dread of separating ourselves from Him through sin." }
];

const holySpiritFruits = [
  { name: "Charity", desc: "A selfless, unconditional love for God and neighbor." },
  { name: "Joy", desc: "A deep, abiding happiness that comes from living in God's grace." },
  { name: "Peace", desc: "A tranquility of soul that remains even amidst life's storms." },
  { name: "Patience", desc: "The ability to endure difficulties and the faults of others gracefully." },
  { name: "Kindness", desc: "A gentle, compassionate disposition toward everyone we meet." },
  { name: "Goodness", desc: "The habit of doing what is right and avoiding what is evil." },
  { name: "Generosity", desc: "A willingness to give freely of our time, talent, and treasure." },
  { name: "Gentleness", desc: "A mild and tender approach to others, avoiding harshness." },
  { name: "Faithfulness", desc: "Loyalty to God, His Church, and the commitments we have made." },
  { name: "Modesty", desc: "Purity in thoughts, words, dress, and actions, honoring the body." },
  { name: "Self-Control", desc: "Mastery over our passions and physical appetites." },
  { name: "Chastity", desc: "The proper integration of sexuality within our state of life." }
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
  const [tab, setTab] = useState<"cardinal" | "theological" | "beatitudes" | "mercy" | "spirit">("cardinal");
  const [openB, setOpenB] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #1a2a0a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>The Life of Grace</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>Virtues & Grace</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Virtue is a habitual and firm disposition to do good. The virtues are the building blocks of the moral life — the character of the Christian. Here we explore the cardinal and theological virtues, the works of mercy, and the gifts of the Holy Spirit.
        </p>
      </section>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", overflowX: "auto", whiteSpace: "nowrap" }}>
        <div className="container-sacred" style={{ maxWidth: "1200px", display: "flex" }}>
          {([
            ["cardinal", "Cardinal Virtues"], 
            ["theological", "Theological Virtues"], 
            ["mercy", "Works of Mercy"],
            ["spirit", "The Holy Spirit"],
            ["beatitudes", "The Beatitudes"]
          ] as const).map(([t, label]) => (
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
            <p style={{ color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              The four cardinal virtues — Prudence, Justice, Fortitude, and Temperance — are the hinge virtues on which all other moral virtues turn. They can be cultivated by everyone through reason and practice. They form the foundation of natural human morality, elevated and perfected by God's grace.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {cardinalVirtues.map((v, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", boxShadow: "0 2px 12px rgba(26,39,68,0.05)" }}>
                  <div style={{ background: v.color, padding: "1.75rem", textAlign: "center", borderBottom: "4px solid var(--gold)" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.6rem", margin: "0 0 0.2rem" }}>{v.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontStyle: "italic", margin: 0 }}>{v.latin}</p>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>{v.desc}</p>
                    <div style={{ background: "rgba(26,39,68,0.03)", borderLeft: "3px solid var(--gold)", padding: "1rem", marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--navy-dark)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>How to Practice</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{v.practice}</p>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--gold-dark)", fontWeight: 600 }}>{v.ccc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Theological Virtues */}
        {tab === "theological" && (
          <div>
            <p style={{ color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              The three theological virtues — Faith, Hope, and Charity — have God as their direct origin, motive, and object. They cannot be acquired by human effort alone; they are infused by God into the souls of the faithful to make them capable of acting as His children and meriting eternal life. They are the pledge of the presence and action of the Holy Spirit.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
              {theologicalVirtues.map((v, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ background: v.color, padding: "1.5rem 2rem", borderBottom: "4px solid var(--gold)" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.8rem", margin: "0 0 0.2rem" }}>{v.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>{v.latin}</p>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1rem" }}>{v.desc}</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold-dark)", fontWeight: 600 }}>{v.ccc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Works of Mercy */}
        {tab === "mercy" && (
          <div>
            <p style={{ color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              The works of mercy are charitable actions by which we come to the aid of our neighbor in their spiritual and bodily necessities. Instructing, advising, consoling, and comforting are spiritual works of mercy, as are forgiving and bearing wrongs patiently. The corporal works of mercy consist especially in feeding the hungry, sheltering the homeless, clothing the naked, visiting the sick and imprisoned, and burying the dead.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              {/* Corporal */}
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy-dark)", fontSize: "1.6rem", marginBottom: "1.5rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem" }}>Corporal Works of Mercy</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {corporalWorks.map((w, i) => (
                    <div key={i} style={{ background: "#fff", padding: "1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.08)", borderLeft: "4px solid var(--navy)" }}>
                      <h4 style={{ color: "var(--navy)", margin: "0 0 0.4rem", fontSize: "1.05rem" }}>{w.name}</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Spiritual */}
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy-dark)", fontSize: "1.6rem", marginBottom: "1.5rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem" }}>Spiritual Works of Mercy</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {spiritualWorks.map((w, i) => (
                    <div key={i} style={{ background: "#fff", padding: "1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.08)", borderLeft: "4px solid var(--gold-dark)" }}>
                      <h4 style={{ color: "var(--navy)", margin: "0 0 0.4rem", fontSize: "1.05rem" }}>{w.name}</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Holy Spirit */}
        {tab === "spirit" && (
          <div>
            <p style={{ color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              The moral life of Christians is sustained by the gifts of the Holy Spirit. These are permanent dispositions which make man docile in following the promptings of the Holy Spirit. The fruits of the Spirit are perfections that the Holy Spirit forms in us as the first fruits of eternal glory.
            </p>
            
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy-dark)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>The Seven Gifts of the Holy Spirit</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", marginBottom: "3.5rem" }}>
              {holySpiritGifts.map((g, i) => (
                <div key={i} style={{ background: "var(--navy-dark)", color: "#fff", padding: "1.5rem", borderRadius: "8px", borderBottom: "3px solid var(--gold)" }}>
                  <h4 style={{ color: "var(--gold)", margin: "0 0 0.5rem", fontSize: "1.15rem", fontFamily: "var(--font-serif)" }}>{g.name}</h4>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              ))}
            </div>
            
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy-dark)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>The Twelve Fruits of the Holy Spirit</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
              {holySpiritFruits.map((f, i) => (
                <div key={i} style={{ background: "#fff", padding: "1.25rem", borderRadius: "8px", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <h4 style={{ color: "var(--navy)", margin: "0 0 0.4rem", fontSize: "1rem" }}>{f.name}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beatitudes */}
        {tab === "beatitudes" && (
          <div>
            <div style={{ background: "var(--navy-dark)", borderRadius: "12px", padding: "1.5rem 2rem", marginBottom: "2rem", borderLeft: "4px solid var(--gold)" }}>
              <p style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                "Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. And he opened his mouth and taught them, saying..." — Matthew 5:1-2
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {beatitudes.map((b, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "10px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
                  <button onClick={() => setOpenB(openB === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.1rem", margin: "0 0 0.2rem", fontWeight: 600 }}>{b.b},</p>
                      <p style={{ fontFamily: "var(--font-serif)", color: "var(--gold-dark)", fontSize: "0.95rem", fontStyle: "italic", margin: 0 }}>{b.result}</p>
                    </div>
                  </button>
                  {openB === i && (
                    <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)", padding: "1.5rem", background: "rgba(201,168,76,0.03)" }}>
                      <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1rem" }}>{b.meaning}</p>
                      <span style={{ fontSize: "0.75rem", color: "var(--gold-dark)", fontWeight: 600, background: "#fff", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "1px solid rgba(201,168,76,0.3)" }}>{b.ref}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@media(max-width:800px){div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
