import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sacrament of Holy Orders",
  description: "The three degrees of Holy Orders in the Catholic Church: Diaconate, Presbyterate, and Episcopate — with their sub-roles and offices explained.",
};

const holyOrders = [
  {
    degree: "First Degree",
    title: "The Diaconate",
    latin: "Ordo Diaconatus",
    color: "#78909C",
    icon: "D",
    description: "The diaconate is the first degree of the Sacrament of Holy Orders. Deacons are ordained not to the priesthood but to a ministry of service. They are configured to Christ the Servant. The diaconate exists in two forms: transitional (for men preparing for priesthood) and permanent (for men who will remain deacons, who may be married).",
    scripture: "Acts 6:1-7 — 'The Twelve gathered all the disciples together and said: It would not be right for us to neglect the ministry of the word of God in order to wait on tables. Brothers and sisters, choose seven men from among you who are known to be full of the Spirit and wisdom.'",
    keyTeaching: "Deacons are ordained ministers who share in Christ's mission of service. They cannot celebrate Mass, hear Confessions, or anoint the sick — but they proclaim the Gospel, preach, baptize, witness marriages, and lead funeral rites.",
    subRoles: [
      {
        title: "Transitional Deacon",
        desc: "A seminarian ordained to the diaconate as the final step before priestly ordination. Transitional deacons serve in parishes for approximately one year. They must be celibate.",
      },
      {
        title: "Permanent Deacon",
        desc: "A man ordained to remain in the diaconate permanently. Permanent deacons may be married (if married before ordination). If their wife dies, they may not remarry. They often serve in parishes, hospitals, prisons, and charitable ministries while maintaining secular employment.",
      },
    ],
    duties: ["Proclaim the Gospel at Mass", "Preach homilies", "Baptize", "Witness marriages", "Preside at funerals and burial rites", "Serve the poor, sick, and imprisoned", "Distribute Holy Communion"],
    vesting: "Dalmatic; stole worn diagonally across the chest",
  },
  {
    degree: "Second Degree",
    title: "The Presbyterate",
    latin: "Ordo Presbyteratus",
    color: "#1A2744",
    icon: "",
    description: "The presbyterate is the second degree of Holy Orders. Priests (presbyters) are co-workers of the bishop, sharing in his priesthood. Through ordination, they are configured to Christ the Priest and act in persona Christi capitis — in the person of Christ the Head — when celebrating the sacraments, especially the Eucharist and Confession.",
    scripture: "Hebrews 5:1 — 'Every high priest is selected from among the people and is appointed to represent the people in matters related to God, to offer gifts and sacrifices for sins.'",
    keyTeaching: "Only a priest (or bishop) can celebrate the Holy Mass, absolve sins in Confession, and administer the Anointing of the Sick. The priest acts in persona Christi — he does not act in his own person but in the person of Christ.",
    subRoles: [
      {
        title: "Parish Priest (Pastor / Curate)",
        desc: "The ordinary form of priestly ministry. A pastor leads a parish community, celebrates daily Mass, hears Confessions, and provides pastoral care. Curates (associate/assistant pastors) assist the pastor.",
      },
      {
        title: "Monsignor",
        desc: "An honorary title granted by the Pope to certain priests in recognition of distinguished service. A Monsignor is NOT a separate degree of Holy Orders — he remains a priest sacramentally. The title is purely honorary and carries no additional sacramental power. Addressed as 'Monsignor' or 'Msgr.'",
      },
      {
        title: "Vicar General / Vicar Forane",
        desc: "Administrative offices within a diocese. A Vicar General is the bishop's chief deputy and shares in the bishop's ordinary executive authority. A Vicar Forane (Dean) oversees a deanery (group of parishes). These are offices, not separate orders — holders remain priests.",
      },
      {
        title: "Canon",
        desc: "A priest who is a member of a cathedral chapter — a body of clergy attached to a cathedral who assist the bishop with the solemn liturgy and governance of the diocese. An honorary distinction, not a separate sacramental degree.",
      },
    ],
    duties: ["Celebrate the Holy Sacrifice of the Mass", "Hear Confessions and grant absolution", "Anoint the sick and dying", "Preach and teach the faith", "Provide pastoral care of souls", "Celebrate Baptisms, weddings, and funerals", "Lead and serve a parish community"],
    vesting: "Chasuble; stole worn around the neck hanging down in front",
  },
  {
    degree: "Third Degree",
    title: "The Episcopate",
    latin: "Ordo Episcopatus",
    color: "#4A1B6D",
    icon: "+",
    description: "The episcopate is the fullness of the Sacrament of Holy Orders. Bishops are the successors of the Apostles, receiving the complete charism of apostolic authority. Only a bishop can ordain priests and deacons. Together with the Pope, the bishops form the College of Bishops, which has supreme authority over the universal Church when united with the Bishop of Rome.",
    scripture: "Acts 20:28 — 'Keep watch over yourselves and all the flock of which the Holy Spirit has made you overseers. Be shepherds of the church of God, which He bought with His own blood.'",
    keyTeaching: "The bishop possesses the fullness of the priesthood. He alone can ordain, confirm (ordinarily), and consecrate the sacred chrism. The Pope, Cardinals, Archbishops, and all bishops share in this same third degree of Holy Orders — their different titles reflect different offices and jurisdictions, not different sacramental realities.",
    subRoles: [
      {
        title: "Bishop",
        desc: "The ordinary form of the episcopate. Each bishop governs a diocese (a territorial jurisdiction of the Church). He teaches with magisterial authority, sanctifies through the sacraments, and governs the faithful entrusted to him. He is the chief liturgist, teacher, and shepherd of his diocese.",
      },
      {
        title: "Archbishop",
        desc: "A bishop who leads an archdiocese — a principal or metropolitan see that oversees a province of surrounding dioceses. The Archbishop wears the pallium, a white wool vestment granted by the Pope as a sign of communion with Rome and metropolitan authority. Sacramentally, an archbishop is a bishop.",
      },
      {
        title: "Cardinal",
        desc: "A senior churchman appointed by the Pope to serve as his closest advisor. Most Cardinals are bishops, but some are Cardinal-Priests (priests elevated to the cardinalate without episcopal ordination) or even Cardinal-Deacons. Cardinals under 80 years of age elect the next Pope in a conclave. The word 'cardinal' means 'hinge' — they are the hinges on which the governance of the universal Church turns. Their red vestments symbolize willingness to shed blood for the faith.",
      },
      {
        title: "The Pope — Bishop of Rome",
        desc: "The Pope is the Bishop of Rome, the successor of St. Peter, and the universal pastor of the entire Catholic Church. He is NOT a separate degree of Holy Orders — sacramentally, the Pope is a bishop. His unique authority comes not from a higher ordination but from his office as the Vicar of Christ and successor of the Apostle to whom Christ said: 'You are Peter, and on this rock I will build my Church' (Mt 16:18). When speaking ex cathedra on matters of faith and morals, he is preserved from error by the Holy Spirit (papal infallibility, Vatican I, 1870).",
      },
    ],
    duties: ["Ordain priests and deacons", "Confirm the faithful", "Govern a diocese with full authority", "Teach with magisterial authority", "Consecrate the sacred chrism", "Convene diocesan synods", "Appoint pastors and oversee parishes"],
    vesting: "Mitre, crozier (pastoral staff), pectoral cross, episcopal ring",
  },
];

export default function PriesthoodPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Sacra Hierarchia</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          The Sacrament of Holy Orders
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "650px", margin: "0 auto", lineHeight: 1.7 }}>
          Holy Orders is one of the seven sacraments instituted by Christ. It has <strong style={{ color: "var(--gold)" }}>three degrees</strong> — Diaconate, Presbyterate, and Episcopate — through which men are consecrated for sacred ministry. All other titles (Monsignor, Archbishop, Cardinal, Pope) are offices or honours within these three degrees.
        </p>
      </section>

      {/* Three Degrees Visual */}
      <div style={{ background: "var(--navy-light)", padding: "2.5rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "1.5rem", maxWidth: "600px", margin: "0 auto", flexWrap: "wrap" }}>
          {holyOrders.map((order, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: order.color,
                  width: `${60 + i * 25}px`,
                  height: `${60 + i * 25}px`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${1.2 + i * 0.3}rem`,
                  border: "3px solid rgba(201,168,76,0.4)",
                  margin: "0 auto 0.5rem",
                  color: "var(--gold)",
                }}
              >
                {order.icon}
              </div>
              <p style={{ color: "var(--gold)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{order.degree}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>{order.title}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "1.25rem", fontStyle: "italic" }}>
          Only these three degrees exist sacramentally. All other titles are offices within them.
        </p>
      </div>

      {/* Orders detail */}
      <div className="container-sacred" style={{ maxWidth: "950px", padding: "4rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {holyOrders.map((order, i) => (
            <div key={i} className="sacred-card" style={{ overflow: "hidden" }}>
              {/* Header */}
              <div style={{ background: order.color, padding: "1.75rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "2.5rem", color: "var(--gold)" }}>{order.icon}</span>
                <div>
                  <p style={{ color: "var(--gold)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>{order.degree}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{order.latin}</p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.6rem", marginTop: "0.25rem" }}>{order.title}</h2>
                </div>
              </div>

              <div style={{ padding: "2rem" }}>
                {/* Description */}
                <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.5rem", fontSize: "0.95rem" }}>{order.description}</p>

                {/* Key Teaching */}
                <div style={{ background: "rgba(201,168,76,0.08)", borderLeft: "4px solid var(--gold)", borderRadius: "0 10px 10px 0", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700, marginBottom: "0.4rem" }}>Key Teaching</p>
                  <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: 1.75, fontStyle: "italic" }}>{order.keyTeaching}</p>
                </div>

                {/* Sub-roles */}
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: order.color }}>✦</span>
                  Roles &amp; Offices within the {order.title}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {order.subRoles.map((role, ri) => (
                    <div key={ri} style={{ background: "var(--cream)", borderRadius: "10px", padding: "1.25rem", border: `1px solid ${order.color}15` }}>
                      <h4 style={{ fontFamily: "var(--font-serif)", color: order.color, fontSize: "0.95rem", marginBottom: "0.4rem" }}>{role.title}</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7 }}>{role.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Duties and Scripture - two column */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.75rem" }}>Duties</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {order.duties.map((duty, di) => (
                        <li key={di} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", fontSize: "0.85rem", color: "var(--text-muted)", alignItems: "flex-start" }}>
                          <span style={{ color: "var(--gold)", flexShrink: 0 }}>✦</span>
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ background: "var(--cream)", borderRadius: "10px", padding: "1rem" }}>
                      <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700, marginBottom: "0.4rem" }}>Scripture</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.7 }}>{order.scripture}</p>
                    </div>
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--gold-dark)", fontStyle: "italic" }}>
                      Vestments: {order.vesting}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: "3rem", background: "var(--navy)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.75rem" }}>A Note on Terminology</p>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto", fontSize: "0.92rem" }}>
            The Catechism of the Catholic Church (§1536) teaches that Holy Orders has <strong style={{ color: "var(--gold)" }}>three degrees</strong>: the episcopate, the presbyterate, and the diaconate. Titles such as Monsignor, Archbishop, Cardinal, and even Pope are <em>offices, jurisdictions, or honours</em> within these three sacramental degrees — they do not constitute additional levels of ordination. A Cardinal is sacramentally a bishop (or in some cases a priest). The Pope is sacramentally a bishop — the Bishop of Rome.
          </p>
        </div>
      </div>

      <style>{`@media(max-width:700px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important;}div[style*="minmax(280px"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
