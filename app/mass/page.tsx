import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Holy Mass & Confession",
  description: "A complete guide to the Catholic Mass — the Liturgy of the Word, Liturgy of the Eucharist, and the Order of Mass in Latin and English. Also includes a step-by-step guide to Confession.",
};

const massOrder = [
  { section: "Introductory Rites", latin: "Ritus Initiales", steps: [
    { name: "Entrance Procession", latin: "Processio ad Altare", desc: "The priest and ministers process to the altar. The congregation stands and sings the entrance hymn. The sacred space is prepared." },
    { name: "Greeting", latin: "Salutatio", desc: "The priest makes the Sign of the Cross with the people: 'In the name of the Father, and of the Son, and of the Holy Spirit.' The Lord is acknowledged as present." },
    { name: "Penitential Rite", latin: "Actus Paenitentialis", desc: "The Confiteor ('I confess to Almighty God...') is prayed. We acknowledge our sinfulness and ask for God's mercy before approaching the altar." },
    { name: "Kyrie Eleison", latin: "Kyrie Eleison", desc: "Lord, have mercy. Christ, have mercy. Lord, have mercy. This ancient Greek acclamation calls upon Christ's mercy three times." },
    { name: "Gloria", latin: "Gloria in Excelsis Deo", desc: "'Glory to God in the highest...' This ancient hymn of praise, said or sung on Sundays and feast days, echoes the angels' song at Bethlehem." },
    { name: "Opening Prayer (Collect)", latin: "Collecta", desc: "The priest invites the people to silent prayer, then 'collects' the prayers of all and presents them to God." },
  ]},
  { section: "Liturgy of the Word", latin: "Liturgia Verbi", steps: [
    { name: "First Reading", latin: "Lectio Prima", desc: "A reading from the Old Testament (or Acts during Easter). The reader proclaims: 'The Word of the Lord.' The people respond: 'Thanks be to God.'" },
    { name: "Responsorial Psalm", latin: "Psalmus Responsorius", desc: "A psalm sung or recited between readings. The cantor or reader chants the psalm with the congregation responding to the antiphon." },
    { name: "Second Reading", latin: "Lectio Secunda", desc: "A reading from the New Testament letters (epistles). 'The Word of the Lord.' — 'Thanks be to God.'" },
    { name: "Gospel Acclamation (Alleluia)", latin: "Alleluia", desc: "The congregation stands and sings Alleluia. During Lent, a different acclamation is used. We prepare our hearts to receive the Gospel." },
    { name: "Gospel", latin: "Evangelium", desc: "The deacon or priest proclaims the Gospel. 'The Lord be with you... A reading from the Holy Gospel according to...' The congregation responds: 'Glory to you, O Lord.' After: 'The Gospel of the Lord.' — 'Praise to you, Lord Jesus Christ.'" },
    { name: "Homily", latin: "Homilia", desc: "The priest or deacon preaches on the readings, breaking open the Word of God for the faithful." },
    { name: "Nicene Creed", latin: "Symbolum Nicaenum", desc: "The congregation professes the faith handed down from the Council of Nicaea (325 AD). 'I believe in one God, the Father almighty...'" },
    { name: "Prayers of the Faithful", latin: "Oratio Universalis", desc: "General intercessions are offered for the Church, the world, and those in need. 'Lord, hear our prayer.'" },
  ]},
  { section: "Liturgy of the Eucharist", latin: "Liturgia Eucharistica", steps: [
    { name: "Preparation of the Gifts", latin: "Praeparatio Donorum", desc: "Bread and wine are brought to the altar. The priest prepares them with prayers. A collection is taken. The altar cloth and chalice represent Christ's sacrifice." },
    { name: "Prayer over the Offerings", latin: "Oratio super Oblata", desc: "The priest asks God to accept the gifts being offered. The congregation responds: 'Blessed be God for ever.'" },
    { name: "Eucharistic Prayer — Preface", latin: "Praefatio", desc: "The central prayer of the Mass begins. 'The Lord be with you... Lift up your hearts... Let us give thanks to the Lord our God. It is right and just.' The preface thanks God for specific reasons according to the liturgical season." },
    { name: "Sanctus (Holy, Holy, Holy)", latin: "Sanctus", desc: "'Holy, Holy, Holy Lord God of hosts. Heaven and earth are full of your glory. Hosanna in the highest.' This angelic hymn joins the worship of heaven." },
    { name: "Epiclesis", latin: "Epiclesis", desc: "The priest extends his hands over the bread and wine and invokes the Holy Spirit to transform them into the Body and Blood of Christ." },
    { name: "Words of Institution — Consecration", latin: "Consecratio", desc: "'Take this, all of you, and eat of it, for this is my Body...' 'Take this, all of you, and drink from it, for this is the chalice of my Blood...' At this moment, transubstantiation occurs — the bread and wine become truly the Body, Blood, Soul, and Divinity of Christ." },
    { name: "Memorial Acclamation", latin: "Mysterium Fidei", desc: "The priest sings: 'The mystery of faith.' The people respond with one of three acclamations: 'We proclaim your death, O Lord...' or 'When we eat this Bread...' or 'Save us, Savior of the world...'" },
    { name: "Lord's Prayer", latin: "Pater Noster", desc: "'Our Father, who art in heaven...' The prayer Christ Himself taught us, prayed together as one family of God." },
    { name: "Sign of Peace", latin: "Ritus Pacis", desc: "The priest extends Christ's peace to the congregation. The people exchange a sign of peace — a handshake or bow — as a sign of communion." },
    { name: "Breaking of the Bread (Lamb of God)", latin: "Fractio Panis — Agnus Dei", desc: "'Lamb of God, you take away the sins of the world, have mercy on us... grant us peace.' The priest breaks the consecrated host, a sign of the one bread of life." },
    { name: "Communion", latin: "Communio", desc: "The priest receives Communion first, then distributes to the faithful. The minister says: 'The Body of Christ.' The communicant responds: 'Amen.' — the most important Amen a Catholic ever says." },
  ]},
  { section: "Concluding Rites", latin: "Ritus Conclusionis", steps: [
    { name: "Final Blessing", latin: "Benedictio", desc: "The priest blesses the congregation: 'May almighty God bless you, the Father, and the Son, and the Holy Spirit.' The congregation responds: 'Amen.'" },
    { name: "Dismissal", latin: "Dimissio", desc: "'Go forth, the Mass is ended.' The people are sent to live the Eucharist they have received. 'Thanks be to God.' (or 'Deo gratias')" },
  ]},
];

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
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✝ The Holy Sacrifice</p>
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

        {massOrder.map((section, si) => (
          <div key={si} style={{ marginBottom: "3rem" }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ height: "2px", flex: 1, background: "rgba(201,168,76,0.3)" }} />
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--navy)", marginBottom: "0.2rem" }}>{section.section}</h3>
                <p style={{ color: "var(--gold-dark)", fontSize: "0.8rem", fontStyle: "italic" }}>{section.latin}</p>
              </div>
              <div style={{ height: "2px", flex: 1, background: "rgba(201,168,76,0.3)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {section.steps.map((step, i) => (
                <div key={i} className="sacred-card" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "var(--navy)", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ color: "var(--gold)", fontSize: "0.8rem", fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                      <h4 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem" }}>{step.name}</h4>
                      <span style={{ color: "var(--gold-dark)", fontSize: "0.78rem", fontStyle: "italic" }}>{step.latin}</span>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
