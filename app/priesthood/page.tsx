import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Priesthood & Holy Orders",
  description: "Explore the hierarchy of the Catholic priesthood: from deacon through priest, bishop, archbishop, cardinal, to the Pope.",
};

const orders = [
  {
    title: "Deacon",
    latin: "Diaconus",
    level: 1,
    icon: "D",
    color: "#78909C",
    description: "Deacons are ordained ministers in the first degree of Holy Orders. Permanent deacons may be married. They assist at Mass, preach, baptize, witness marriages, and lead certain liturgical rites. Transitional deacons are seminarians preparing for priesthood.",
    duties: ["Proclaim the Gospel at Mass", "Preach homilies", "Baptize", "Witness marriages", "Preside at funerals", "Serve the poor and vulnerable"],
    vesting: "Stole worn diagonally across the chest",
    scripture: "Acts 6:1-7 — The first deacons are chosen to serve tables",
  },
  {
    title: "Priest",
    latin: "Presbyter / Sacerdos",
    level: 2,
    icon: "✝",
    color: "#1A2744",
    description: "Priests receive the second degree of Holy Orders. They participate in the one priesthood of Christ through the bishop. Priests celebrate Mass, forgive sins in Confession, anoint the sick, and preach. A priest acts in persona Christi — in the person of Christ.",
    duties: ["Celebrate Holy Mass", "Administer Sacraments", "Hear Confessions", "Preach and teach", "Pastoral care of souls", "Visit the sick and dying"],
    vesting: "Stole worn around the neck, vestments",
    scripture: "Hebrews 5:1-4 — Every high priest is selected from among the people",
  },
  {
    title: "Bishop",
    latin: "Episcopus",
    level: 3,
    icon: "+",
    color: "#4A1B6D",
    description: "Bishops receive the fullness of Holy Orders. They are successors of the Apostles, governing a diocese. Only a bishop can ordain priests and deacons. Bishops possess the teaching authority (magisterium) entrusted to the Apostles.",
    duties: ["Ordain priests and deacons", "Confirm the faithful", "Govern a diocese", "Teach with magisterial authority", "Consecrate the sacred chrism", "Oversee liturgy and doctrine"],
    vesting: "Mitre, crozier (pastoral staff), pectoral cross, ring",
    scripture: "Acts 20:28 — 'Guard yourselves and all the flock of which the Holy Spirit has made you overseers'",
  },
  {
    title: "Archbishop",
    latin: "Archiepiscopus",
    level: 4,
    icon: "⚜",
    color: "#6A1B9A",
    description: "An archbishop is a bishop who leads an archdiocese — a principal or metropolitan diocese overseeing a province of dioceses. Archbishops often have advisory roles to the Holy See. Some are appointed by virtue of their historic see (e.g., Archbishop of Canterbury in the context of Catholic history).",
    duties: ["All episcopal duties", "Lead an archdiocese", "Oversee a metropolitan province", "Represent the Church to civil authorities", "Convene provincial councils"],
    vesting: "Pallium — a white wool vestment granted by the Pope",
    scripture: "Matthew 28:19-20 — 'Go and make disciples of all nations'",
  },
  {
    title: "Cardinal",
    latin: "Cardinalis",
    level: 5,
    icon: "C",
    color: "#8B1A1A",
    description: "Cardinals are appointed by the Pope to serve as his closest advisors. They govern major Vatican dicasteries (departments) and lead the world's most significant dioceses. Cardinal-electors (under 80) elect the Pope in the conclave. The word 'cardinal' means 'hinge' — they are the hinge of the universal Church.",
    duties: ["Elect the Pope in conclave (if under 80)", "Advise the Pope in consistories", "Lead Vatican dicasteries", "Govern major archdioceses", "Represent the Pope on special missions"],
    vesting: "Red vestments — symbolizing willingness to shed blood for the faith; Cardinal's hat (galero)",
    scripture: "Matthew 16:18-19 — 'I will give you the keys of the kingdom of heaven'",
  },
  {
    title: "Pope",
    latin: "Pontifex Maximus / Episcopus Romanus",
    level: 6,
    icon: "+",
    color: "#C9A84C",
    description: "The Pope is the Bishop of Rome and universal pastor of the Catholic Church. He is the successor of St. Peter, to whom Christ said: 'You are Peter, and on this rock I will build my church.' The Pope possesses full, supreme, and universal authority over the Church. When speaking ex cathedra on faith and morals, he is preserved from error by the Holy Spirit (infallibility, Vatican I, 1870).",
    duties: ["Universal pastor of 1.3 billion Catholics", "Successor of St. Peter", "Bishop of Rome", "Head of the College of Bishops", "Appoints bishops worldwide", "Convenes ecumenical councils", "Defines dogma"],
    vesting: "White cassock, white zucchetto, fisherman's ring, pallium",
    scripture: "Matthew 16:18-19 — 'You are Peter, and on this rock I will build my church. I will give you the keys of the kingdom of heaven.'",
  },
];

export default function PriesthoodPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Sacra Hierarchia</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          The Hierarchy of Holy Orders
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          From deacon to Pope — the sacred hierarchy instituted by Christ and continued through apostolic succession across 2,000 years.
        </p>
      </section>

      {/* Pyramid visualization */}
      <div style={{ background: "var(--navy-light)", padding: "2rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "0.5rem", maxWidth: "600px", margin: "0 auto" }}>
          {orders.map((order, i) => (
            <div
              key={i}
              title={order.title}
              style={{
                background: order.color,
                width: `${(i + 1) * 14}px`,
                height: `${(i + 1) * 14}px`,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${0.6 + i * 0.1}rem`,
                cursor: "pointer",
                border: "2px solid rgba(201,168,76,0.3)",
                transition: "transform 0.2s",
                flexShrink: 0,
              }}
            >
              {order.icon}
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.75rem" }}>
          Deacon → Priest → Bishop → Archbishop → Cardinal → Pope
        </p>
      </div>

      {/* Orders detail */}
      <div className="container-sacred" style={{ maxWidth: "900px", padding: "4rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[...orders].reverse().map((order, i) => (
            <div key={i} className="sacred-card" style={{ overflow: "hidden" }}>
              <div style={{ background: order.color, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "2rem" }}>{order.icon}</span>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{order.latin}</p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.5rem" }}>{order.title}</h2>
                </div>
              </div>

              <div style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>{order.description}</p>
                  <div style={{ background: "var(--cream)", borderRadius: "8px", padding: "0.875rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700, marginBottom: "0.3rem" }}>Scripture</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>{order.scripture}</p>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", marginBottom: "0.75rem" }}>Duties</h3>
                  <ul style={{ listStyle: "none" }}>
                    {order.duties.map((duty, di) => (
                      <li key={di} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", fontSize: "0.875rem", color: "var(--text-muted)", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--gold)", flexShrink: 0 }}>✦</span>
                        {duty}
                      </li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--gold-dark)", fontStyle: "italic" }}>
                    Vestments: {order.vesting}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
