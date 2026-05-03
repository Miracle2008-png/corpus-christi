import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2,000 Years of Church History",
  description: "Explore the history of the Catholic Church from the early Church in Rome through the great Councils, the medieval period, and into the modern age.",
};

const timeline = [
  { year: "c. 33 AD", event: "Pentecost — Birth of the Church", desc: "The Holy Spirit descends on the Apostles and Mary in the Upper Room. Peter preaches and 3,000 are baptized. The Church is born.", icon: "🔥" },
  { year: "c. 64-68 AD", event: "Martyrdom of Peter and Paul in Rome", desc: "The great Apostles Peter and Paul are martyred in Rome under Emperor Nero. Peter is crucified upside down; Paul is beheaded. Their tombs anchor the Church in Rome.", icon: "✝" },
  { year: "313 AD", event: "Edict of Milan", desc: "Emperor Constantine I issues the Edict of Milan, granting religious tolerance throughout the Empire. Christianity emerges from the catacombs into the public square.", icon: "+" },
  { year: "325 AD", event: "First Council of Nicaea", desc: "The first ecumenical council defines the divinity of Christ against Arianism. The Nicene Creed is composed: 'God from God, Light from Light, true God from true God.'", icon: "+" },
  { year: "380 AD", event: "Christianity becomes State Religion of Rome", desc: "Emperor Theodosius declares Nicene Christianity the official religion of the Roman Empire. The Church enters a new era of cultural influence and responsibility.", icon: "+" },
  { year: "431 AD", event: "Council of Ephesus — Mary declared Theotokos", desc: "The Council of Ephesus defines Mary as Theotokos ('God-bearer'). This confirms Christ's full divinity: if He is fully God, His Mother is the Mother of God.", icon: "🌹" },
  { year: "451 AD", event: "Council of Chalcedon", desc: "Defines Christ as one Person with two natures — fully human and fully divine. The Chalcedonian Definition becomes the cornerstone of Christology.", icon: "+" },
  { year: "590 AD", event: "Pontificate of St. Gregory the Great", desc: "Pope Gregory the Great sends missionaries to England, reforms the liturgy, and writes pastoral and theological masterpieces. The medieval papacy begins to take shape.", icon: "📝" },
  { year: "1054 AD", event: "The Great Schism", desc: "The mutual excommunication between Rome and Constantinople divides Christianity into Catholic and Eastern Orthodox. Attempts at reunion continue to this day.", icon: "⚡" },
  { year: "1095 AD", event: "The Crusades Begin", desc: "Pope Urban II calls the First Crusade at Clermont. A complex chapter of Church history begins — motivated by faith, but also marked by violence and tragedy.", icon: "+" },
  { year: "1215 AD", event: "Fourth Lateran Council", desc: "The greatest council of the medieval Church. Defines transubstantiation. Mandates annual Confession and Communion. Establishes inquisition procedures.", icon: "+" },
  { year: "1517 AD", event: "The Protestant Reformation", desc: "Martin Luther posts his 95 Theses, sparking the Reformation. The unity of Western Christianity is fractured. The Church faces its greatest internal crisis in a millennium.", icon: "⚡" },
  { year: "1545-1563 AD", event: "Council of Trent", desc: "The Catholic response to the Reformation. Clarifies doctrine on Scripture, Tradition, justification, the sacraments. The Tridentine Mass is codified. Catholic Reform begins.", icon: "✝" },
  { year: "1870 AD", event: "First Vatican Council — Papal Infallibility", desc: "Vatican I defines the dogma of papal infallibility: when the Pope speaks ex cathedra on faith and morals, he is preserved from error by the Holy Spirit.", icon: "+" },
  { year: "1962-1965 AD", event: "Second Vatican Council", desc: "The 21st ecumenical council. 2,500 bishops. Produced 16 documents including Lumen Gentium, Dei Verbum, and Gaudium et Spes. Reformed the liturgy and opened dialogue with the modern world.", icon: "+" },
  { year: "2000 AD", event: "Great Jubilee of the Year 2000", desc: "Pope John Paul II leads the Church into the third millennium with the Great Jubilee. He publishes Novo Millennio Ineunte, charting the course of the Church in the new century.", icon: "⭐" },
];

export default function HistoryPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Historia Ecclesiae</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          2,000 Years of Church History
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
          From the Upper Room in Jerusalem to the Vatican today — the most remarkable institution in human history.
        </p>
      </section>

      <div className="container-sacred" style={{ maxWidth: "900px", padding: "4rem 1.5rem" }}>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "30px", top: 0, bottom: 0, width: "2px", background: "linear-gradient(180deg, var(--gold), rgba(201,168,76,0.2))" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                {/* Icon dot */}
                <div style={{
                  width: "60px", height: "60px", borderRadius: "50%",
                  background: "var(--navy)", border: "3px solid var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", flexShrink: 0, zIndex: 1, position: "relative",
                }}>
                  {item.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: "0.5rem" }}>
                  <p style={{ color: "var(--gold)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.25rem" }}>{item.year}</p>
                  <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.15rem", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                    {item.event}
                  </h2>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.9rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
