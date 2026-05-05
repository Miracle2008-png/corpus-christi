"use client";
import { useState } from "react";

const catechismParts = [
  {
    part: "Part One",
    title: "The Profession of Faith",
    subtitle: "What we believe",
    color: "#1a3f5c",
    sections: [
      {
        title: "God reveals Himself",
        ccc: "CCC 50–141",
        summary: "God, by nature invisible and beyond human grasp, has revealed Himself step by step — through creation, through the patriarchs and prophets, and fully and definitively in His Son Jesus Christ. Sacred Scripture and Sacred Tradition together make up the single deposit of the Word of God.",
        keyPoints: ["God's revelation is complete in Jesus Christ", "Scripture and Tradition are two modes of one Deposit of Faith", "The Church is the authoritative interpreter of Revelation"],
      },
      {
        title: "The Holy Trinity",
        ccc: "CCC 232–267",
        summary: "The central mystery of Christian faith and life. God is one Being in three co-equal, co-eternal Persons: Father, Son, and Holy Spirit. The Trinity is not a mystery invented by the Church — it is the revealed reality of who God is. This mystery is inseparable from all others of faith and light.",
        keyPoints: ["One God in three divine Persons", "The Father is the source and origin of all divinity", "The Son is eternally begotten, not created", "The Spirit proceeds from the Father and the Son"],
      },
      {
        title: "The Incarnation",
        ccc: "CCC 461–483",
        summary: "The Son of God became man — true God and true man — without confusion, change, division, or separation (Council of Chalcedon, 451). He took on our human nature through the Blessed Virgin Mary to accomplish our salvation. 'The Word became flesh and dwelt among us.'",
        keyPoints: ["Jesus Christ is one Person with two natures: divine and human", "He was conceived by the Holy Spirit and born of the Virgin Mary", "His becoming man is called the Incarnation"],
      },
      {
        title: "The Resurrection",
        ccc: "CCC 638–658",
        summary: "The Resurrection of Christ is the cornerstone of Christian faith. 'If Christ has not been raised, your faith is futile' (1 Cor 15:17). The Risen Christ appeared to His disciples in a real though glorified body. The Resurrection confirms who Jesus is, fulfils all prophecy, and opens the way to our own resurrection.",
        keyPoints: ["The Resurrection is a historical and transcendent event", "Christ rose bodily — the tomb was empty", "His glorified body is real but transformed beyond death's reach"],
      },
      {
        title: "Mary, Mother of God",
        ccc: "CCC 484–511",
        summary: "Mary is called Theotokos — God-bearer — a title defined at the Council of Ephesus (431 AD). She was preserved from all sin from the moment of her conception (Immaculate Conception). She conceived Christ by the Holy Spirit while remaining a Virgin. She is the model of faith and the Mother of all the faithful.",
        keyPoints: ["Theotokos: Mother of God, not merely of Jesus' humanity", "Immaculate Conception: free from original sin from conception", "Perpetual Virginity", "Her Assumption into heaven, body and soul"],
      },
    ],
  },
  {
    part: "Part Two",
    title: "The Celebration of the Christian Mystery",
    subtitle: "What we celebrate",
    color: "#3d1a5c",
    sections: [
      {
        title: "The Seven Sacraments",
        ccc: "CCC 1210–1211",
        summary: "Christ instituted seven sacraments — Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, and Matrimony. Each is an outward sign instituted by Christ to give grace. They are actions of Christ Himself, made present through the minister of the Church.",
        keyPoints: ["Sacraments of Initiation: Baptism, Confirmation, Eucharist", "Sacraments of Healing: Penance, Anointing of the Sick", "Sacraments of Vocation: Holy Orders, Matrimony"],
      },
      {
        title: "The Holy Eucharist",
        ccc: "CCC 1322–1419",
        summary: "The Eucharist is 'the source and summit of the Christian life' (Lumen Gentium 11). At Mass, the bread and wine truly become the Body, Blood, Soul, and Divinity of Jesus Christ — a change called Transubstantiation. The Mass is the same sacrifice as Calvary, made present in an unbloody manner.",
        keyPoints: ["The Real Presence: Christ is truly present — body, blood, soul, divinity", "Transubstantiation: substance changes, appearances remain", "The Mass is both a sacrifice and a sacred meal", "Worthy reception requires freedom from mortal sin"],
      },
      {
        title: "Baptism",
        ccc: "CCC 1213–1284",
        summary: "Baptism is the first and fundamental sacrament. It forgives original sin and all personal sins, incorporates the person into Christ and His Church, and makes them a child of God. It imprints a permanent spiritual mark (character) on the soul and is necessary for salvation.",
        keyPoints: ["Forgives original sin and all personal sin", "Incorporates into the Body of Christ (the Church)", "Imprints an indelible character on the soul", "Can be administered by immersion or infusion"],
      },
    ],
  },
  {
    part: "Part Three",
    title: "Life in Christ",
    subtitle: "What we live",
    color: "#1a5c3f",
    sections: [
      {
        title: "The Moral Life & Conscience",
        ccc: "CCC 1776–1802",
        summary: "Conscience is the interior voice of God within each person, directing them to do good and avoid evil. A well-formed conscience is essential — it must be educated in truth, not merely in personal feeling. The Church has the role of forming consciences through her moral teaching.",
        keyPoints: ["Conscience must always be followed — but it must also be formed", "An erroneous conscience can still bind subjectively", "Natural moral law is accessible to all through reason"],
      },
      {
        title: "Sin and Its Kinds",
        ccc: "CCC 1849–1876",
        summary: "Sin is an offence against God and right reason. Mortal sin destroys charity in the heart — it requires grave matter, full knowledge, and deliberate consent. Venial sin weakens but does not destroy charity. The Capital Sins (Seven Deadly Sins) are pride, covetousness, envy, anger, gluttony, lust, and sloth.",
        keyPoints: ["Mortal sin: grave matter + full knowledge + deliberate consent", "Venial sin: weakens but does not break charity", "The Seven Capital Sins are the roots of all other sins"],
      },
      {
        title: "The Ten Commandments",
        ccc: "CCC 2052–2557",
        summary: "The Decalogue (Ten Commandments) given to Moses summarises the entire moral law. They are not arbitrary rules but an expression of God's wisdom and our own human nature. Jesus summarised all ten in two: love God with your whole heart, and love your neighbour as yourself.",
        keyPoints: ["The Commandments are a gift, not a burden", "Jesus did not abolish but fulfilled the Law (Mt 5:17)", "The first three govern our relationship with God; the last seven govern our relationships with others"],
      },
    ],
  },
  {
    part: "Part Four",
    title: "Christian Prayer",
    subtitle: "What we pray",
    color: "#5c3f1a",
    sections: [
      {
        title: "What is Prayer?",
        ccc: "CCC 2558–2649",
        summary: "Prayer is the raising of the heart and mind to God. It is both God's gift and our response to His initiative. The Church recognises three expressions of prayer: vocal prayer (speaking to God), meditation (engaging mind and heart with revealed truth), and contemplation (a wordless, loving gaze on God).",
        keyPoints: ["Prayer is a covenant relationship with God", "Three expressions: vocal, meditative, contemplative", "The great figures of prayer: Abraham, Moses, David, Mary, Jesus"],
      },
      {
        title: "The Lord's Prayer (Our Father)",
        ccc: "CCC 2759–2865",
        summary: "The Our Father is 'the summary of the whole gospel' (Tertullian) and the perfect prayer. It has seven petitions: three glorifying God (Thy Name, Kingdom, Will) and four asking for our needs (Daily Bread, Forgiveness, Deliverance from temptation, Deliverance from evil).",
        keyPoints: ["'Our Father' — we pray as adopted children", "Seven petitions, none selfish in themselves", "It is the model for all Christian prayer"],
      },
    ],
  },
];

export default function CatechismPage() {
  const [activePart, setActivePart] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [openPoints, setOpenPoints] = useState(true);

  const part = catechismParts[activePart];
  const section = part.sections[activeSection];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #1a2a0a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ The Catechism of the Catholic Church ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>Catechism Explorer</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          The CCC (1992), commissioned by Pope John Paul II, is the most comprehensive summary of Catholic teaching. Explore its four pillars: Creed, Sacraments, Moral Life, and Prayer.
        </p>
      </section>

      {/* Part tabs */}
      <div style={{ background: "var(--navy-dark)", overflowX: "auto" }}>
        <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {catechismParts.map((p, i) => (
            <button
              key={i}
              onClick={() => { setActivePart(i); setActiveSection(0); }}
              style={{ padding: "1rem 1.25rem", background: "none", border: "none", borderBottom: `3px solid ${activePart === i ? "var(--gold)" : "transparent"}`, color: activePart === i ? "var(--gold)" : "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: activePart === i ? 700 : 500, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
            >
              {p.part}: {p.subtitle}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "1200px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem" }}>

          {/* Section list */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>{part.title}</p>
            {part.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                style={{ width: "100%", textAlign: "left", padding: "0.85rem 1rem", background: activeSection === i ? part.color : "#fff", border: `1px solid ${activeSection === i ? "transparent" : "rgba(26,39,68,0.1)"}`, borderRadius: "10px", cursor: "pointer", marginBottom: "0.5rem", transition: "all 0.2s" }}
              >
                <p style={{ fontWeight: 600, fontSize: "0.85rem", color: activeSection === i ? "#fff" : "var(--navy)", margin: "0 0 0.15rem", lineHeight: 1.3 }}>{s.title}</p>
                <p style={{ fontSize: "0.7rem", color: activeSection === i ? "rgba(255,255,255,0.5)" : "var(--text-muted)", margin: 0 }}>{s.ccc}</p>
              </button>
            ))}
          </div>

          {/* Section content */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
            <div style={{ background: part.color, padding: "2rem 2.5rem" }}>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 700 }}>{section.ccc}</p>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.7rem", margin: 0 }}>{section.title}</h2>
            </div>
            <div style={{ padding: "2rem 2.5rem" }}>
              <p style={{ color: "var(--text-primary)", lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "2rem" }}>{section.summary}</p>
              <div style={{ background: "rgba(26,39,68,0.03)", borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Key Points</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {section.keyPoints.map((kp, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.8rem", marginTop: "0.2rem", flexShrink: 0 }}>✦</span>
                      <span style={{ fontSize: "0.9rem", color: "var(--navy)", lineHeight: 1.6 }}>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", justifyContent: "space-between" }}>
                <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))} disabled={activeSection === 0} style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.85rem", fontWeight: 600, cursor: activeSection === 0 ? "not-allowed" : "pointer", opacity: activeSection === 0 ? 0.4 : 1 }}>← Previous</button>
                <button onClick={() => setActiveSection(Math.min(part.sections.length - 1, activeSection + 1))} disabled={activeSection === part.sections.length - 1} style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", border: "none", background: activeSection === part.sections.length - 1 ? "rgba(26,39,68,0.08)" : `linear-gradient(135deg, ${part.color}dd, ${part.color})`, color: activeSection === part.sections.length - 1 ? "var(--text-muted)" : "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: activeSection === part.sections.length - 1 ? "not-allowed" : "pointer" }}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="gridTemplateColumns: \"240px 1fr\""]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
