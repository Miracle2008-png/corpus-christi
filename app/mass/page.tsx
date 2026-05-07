import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Holy Mass & Confession",
  description: "A complete guide to the Catholic Mass — the Liturgy of the Word, Liturgy of the Eucharist, and the Order of Mass in Latin and English. Also includes a step-by-step guide to Confession.",
};

import massData from "@/data/mass.json";

const confessionSteps = [
  { num: "1", title: "Examination of Conscience", desc: "Before going to Confession, spend time in quiet prayer reflecting on your sins since your last Confession. Use the Ten Commandments, the Beatitudes, or a Catholic examination of conscience guide." },
  { num: "2", title: "Act of Contrition", desc: "Stir up genuine sorrow in your heart for your sins — not just fear of punishment, but sorrow for having offended God who loves you." },
  { num: "3", title: "Enter the Confessional", desc: "You may choose face-to-face with the priest or behind the screen — both are valid. Make the Sign of the Cross." },
  { num: "4", title: "Greet the Priest", desc: "The priest may greet you with a Scripture reading or a brief blessing. You respond. He is acting in the person of Christ at this moment." },
  { num: "5", title: "Confess Your Sins", desc: "Begin: 'Bless me, Father, for I have sinned. It has been [time] since my last Confession. These are my sins...' Confess all mortal sins by kind and number. Venial sins can also be confessed." },
  { num: "6", title: "Receive Counsel & Penance", desc: "The priest may offer brief counsel or encouragement. He assigns a penance — usually prayers or an act of service — to help make reparation." },
  { num: "7", title: "Act of Contrition", desc: "Pray the Act of Contrition aloud: 'O my God, I am heartily sorry...'" },
  { num: "8", title: "Absolution", desc: "The priest extends his hand and says: 'I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit.' This is the moment of forgiveness. Respond: 'Amen.'" },
  { num: "9", title: "Complete Your Penance", desc: "After leaving, complete the penance assigned by the priest. Go in the peace of Christ — your sins are forgiven." },
];

export default function MassPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>The Holy Sacrifice</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          The Holy Mass & Confession
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          The Mass is the source and summit of the Christian life. Here is the full Order of Mass — the sacred liturgy of the Catholic Church — with Latin and explanation.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          <a href="#order-of-mass" className="btn-sacred">Order of Mass</a>
          <a href="#confession-guide" className="btn-outline-sacred">Confession Guide</a>
        </div>
      </section>

      {/* Order of Mass */}
      <section id="order-of-mass" className="container-sacred section-sacred">
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.5rem", textAlign: "center" }}>
          The Order of Mass
        </h2>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "3rem" }}>
          Ordinary Form (Novus Ordo) — Roman Rite
        </p>
        <hr className="gold-divider" />

        {/* New Grid for Mass Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
          {massData.map((part) => (
            <Link key={part.slug} href={`/mass/${part.slug}`} style={{ textDecoration: "none" }}>
              <article className="sacred-card hover-zoom" style={{ height: "100%", display: "flex", flexDirection: "column", padding: "2rem", textAlign: "center" }}>
                <div style={{ 
                  width: "48px", height: "48px", borderRadius: "50%", background: "var(--navy)", color: "var(--gold)", 
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, 
                  margin: "0 auto 1.5rem" 
                }}>
                  {part.order}
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
                  {part.section}
                </h3>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.875rem", fontStyle: "italic", marginBottom: "1rem" }}>
                  {part.latin}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, flexGrow: 1 }}>
                  {part.summary}
                </p>
                <div style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  View Full Detail →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Confession Guide */}
      <section id="confession-guide" style={{ background: "var(--navy)", padding: "5rem 1.5rem" }}>
        <div className="container-sacred" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--white)", marginBottom: "0.5rem", textAlign: "center" }}>
            Guide to Confession
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: "3rem" }}>
            The Sacrament of Reconciliation — Step by Step
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {confessionSteps.map((step, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ color: "var(--navy-dark)", fontWeight: 800, fontSize: "0.875rem" }}>{step.num}</span>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1rem", marginBottom: "0.4rem" }}>{step.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Act of Contrition */}
          <div style={{ marginTop: "2.5rem", background: "rgba(201,168,76,0.1)", border: "2px solid rgba(201,168,76,0.3)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.25rem", marginBottom: "1rem" }}>Act of Contrition</h3>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.9, fontSize: "1rem" }}>
              O my God, I am heartily sorry for having offended Thee,<br />
              and I detest all my sins because I dread the loss of heaven<br />
              and the pains of hell; but most of all because they offend Thee,<br />
              my God, who art all good and deserving of all my love.<br />
              I firmly resolve, with the help of Thy grace, to confess my sins,<br />
              to do penance, and to amend my life. Amen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
