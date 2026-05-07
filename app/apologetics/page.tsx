"use client";
import { useState } from "react";

const categories = [
  {
    title: "About the Catholic Church",
    color: "#1a3f5c",
    icon: "",
    questions: [
      {
        q: "Did Jesus really found the Catholic Church?",
        a: "Yes. Jesus explicitly said to Peter: 'You are Peter, and on this rock I will build my Church, and the gates of hell will not prevail against it. I will give you the keys of the kingdom of heaven' (Matthew 16:18-19). This is the foundation of the papacy. The early Church Fathers — including Ignatius of Antioch (c. 107 AD), Irenaeus, and Cyprian — all affirm the primacy of Rome and the succession from Peter. The Church did not gradually become Catholic; it was Catholic from the beginning.",
        refs: ["Matthew 16:18-19", "Luke 22:31-32", "John 21:15-17"],
      },
      {
        q: "Why do Catholics have a Pope?",
        a: "The Pope is the successor of St. Peter, whom Christ appointed as the head of the Apostles and the visible foundation of the Church. The doctrine of papal primacy is rooted in Scripture and affirmed consistently by the early Church. Peter was the first Bishop of Rome; every Bishop of Rome since has inherited this role of leadership and unity. The Pope's infallibility is very limited — it applies only when he defines a doctrine of faith or morals for the whole Church to believe, ex cathedra (from the chair), and this has happened only twice in modern history: the Immaculate Conception (1854) and the Assumption (1950).",
        refs: ["Matthew 16:18-19", "Luke 22:31-32", "John 21:15-17", "CCC 880-882"],
      },
      {
        q: "Why do Catholics have traditions not found in the Bible?",
        a: "Catholics hold that divine Revelation comes through both Sacred Scripture AND Sacred Tradition, not Scripture alone. This is the constant teaching of the early Church, long before the New Testament was compiled as a canon. The Bible itself says: 'Stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter' (2 Thessalonians 2:15). The Church compiled and determined which books belong in the Bible — so to say 'Bible only' is itself a tradition. Sola Scriptura (Scripture alone) is not found in Scripture.",
        refs: ["2 Thessalonians 2:15", "1 Corinthians 11:2", "CCC 80-83"],
      },
    ],
  },
  {
    title: "Mary & the Saints",
    color: "#5c1a3f",
    icon: "✿",
    questions: [
      {
        q: "Why do Catholics pray to Mary and the saints?",
        a: "Catholics don't worship Mary or the saints — they ask them to intercede, just as we ask fellow Christians to pray for us. 'The prayer of a righteous person is powerful and effective' (James 5:16). If we can ask a friend to pray for us, why not ask someone in heaven — where they are more alive, more righteous, and closer to God than ever? The saints are not dead (Luke 20:38: 'He is not the God of the dead but of the living'); they are alive in Christ. Asking for their intercession is simply asking family members to pray.",
        refs: ["James 5:16", "Luke 20:38", "Revelation 5:8", "CCC 956-958"],
      },
      {
        q: "Is Mary the Mother of God? Isn't that too exalted for her?",
        a: "Mary is the Mother of God because the Person she bore is God the Son — the second Person of the Holy Trinity. The Council of Ephesus (431 AD) defined the title Theotokos (God-bearer) to protect the doctrine of the Incarnation. If Mary is only the mother of Jesus' humanity, that implies Christ has two persons — which is the heresy of Nestorianism. The title 'Mother of God' says something primarily about Jesus (He is truly God) and only secondarily honours Mary. St. Elizabeth, filled with the Holy Spirit, called Mary 'the mother of my Lord' (Luke 1:43).",
        refs: ["Luke 1:43", "Council of Ephesus 431", "CCC 495", "CCC 509"],
      },
      {
        q: "What is the Immaculate Conception?",
        a: "The Immaculate Conception refers to Mary being preserved from original sin from the very moment of her conception — not Jesus' conception. It is the teaching that God, in view of Christ's merits, applied the grace of redemption to Mary at the first instant of her existence. This was not Mary 'earning' sinlessness but God's gracious gift. The archangel Gabriel's greeting 'full of grace' (Luke 1:28, kecharitomene in Greek) indicates a unique, permanent state of grace. This doctrine was formally defined by Pope Pius IX in 1854.",
        refs: ["Luke 1:28", "CCC 490-492", "Ineffabilis Deus (1854)"],
      },
    ],
  },
  {
    title: "The Sacraments",
    color: "#3f1a1a",
    icon: "",
    questions: [
      {
        q: "Is the Eucharist really the Body and Blood of Christ?",
        a: "Yes — the Real Presence of Christ in the Eucharist is one of the most clearly taught doctrines in the New Testament. Jesus said 'This is my body' and 'This is my blood' (Matthew 26:26-28). In John 6, after saying 'Unless you eat the flesh of the Son of Man and drink his blood, you have no life in you,' many disciples left because it was too hard to accept — and Jesus did not call them back to explain He was speaking metaphorically. The early Church Fathers uniformly teach the Real Presence: Justin Martyr (c. 150 AD), Ignatius of Antioch, Cyril of Jerusalem. The change in substance (not accidents) is called Transubstantiation.",
        refs: ["Matthew 26:26-28", "John 6:51-58", "1 Corinthians 11:27-29", "CCC 1373-1377"],
      },
      {
        q: "Why do Catholics confess to a priest? Can't I confess directly to God?",
        a: "You can always speak directly to God and He hears you. However, Christ instituted the Sacrament of Penance specifically by giving the Apostles the authority to forgive sins: 'Receive the Holy Spirit. If you forgive anyone's sins, their sins are forgiven; if you do not forgive them, they are not forgiven' (John 20:22-23). To exercise judgment about forgiving or retaining sins, a priest must hear the sins — otherwise the authority is meaningless. In the early Church, public confession and reconciliation was practised. The sacrament is Christ Himself forgiving through His priest.",
        refs: ["John 20:22-23", "James 5:16", "2 Corinthians 5:18", "CCC 1441-1445"],
      },
    ],
  },
  {
    title: "Faith & Reason",
    color: "#1a3f1a",
    icon: "⚖",
    questions: [
      {
        q: "Can a Catholic believe in science?",
        a: "Absolutely. The Catholic Church has been one of the greatest patrons of science in history. The Big Bang Theory was proposed by a Catholic priest, Fr. Georges Lemaître. Gregor Mendel, the father of genetics, was an Augustinian friar. The Church teaches that faith and reason are not in conflict but complementary: 'Truth cannot contradict truth' (John Paul II, Fides et Ratio). The Bible is not a science textbook — it reveals who made the world and why, not the physical mechanisms of how. Catholics hold that both the Book of Scripture and the Book of Nature are authored by God.",
        refs: ["Fides et Ratio (1998)", "Gaudium et Spes 36", "CCC 159", "Galileo's case is more complex than the myth"],
      },
      {
        q: "If God is all-good, why is there evil and suffering?",
        a: "This is the oldest and deepest question in philosophy. The Catholic answer: God created beings with free will — genuine freedom, not mere programmed compliance. Evil is not a thing God created but a privation of good — the absence of what should be there, caused by the misuse of freedom. God permitted evil not because He is indifferent but because He can bring greater good from it — supremely demonstrated in the Cross: the worst evil in history (the murder of the innocent Son of God) became the instrument of the world's salvation. Suffering is not meaningless when united to Christ's suffering (Colossians 1:24).",
        refs: ["Genesis 1:31", "Colossians 1:24", "Romans 8:28", "CCC 309-314"],
      },
      {
        q: "Did the Church really persecute Galileo?",
        a: "The Galileo case is far more nuanced than popular culture suggests. Galileo was a Catholic, supported by the Church for most of his life, and his conflict was partly a clash of personalities and partly scientific: in 1616, heliocentrism could not yet be proven conclusively. His sentence was house arrest (not torture), and he remained a Catholic until his death. In 1992, Pope John Paul II formally acknowledged that the Church officials of the time were wrong in condemning heliocentrism. The lesson the Church draws: the Bible teaches how to go to heaven, not how the heavens go.",
        refs: ["Pontifical Academy of Sciences", "John Paul II, 1992 address", "CCC 159"],
      },
    ],
  },
];

export default function ApologeticsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const category = categories[activeCategory];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f1f3d 0%, var(--navy-dark) 50%, #0a1a2a 100%)", padding: "4.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ Always Be Ready ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>Catholic Apologetics</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          Scripture-backed, charitable answers to the most common questions about the Catholic faith — for Catholics, seekers, and honest inquirers.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)", marginTop: "1.25rem", fontSize: "0.9rem" }}>
          &ldquo;Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have — but do this with gentleness and respect.&rdquo; — 1 Peter 3:15
        </p>
      </section>

      {/* Category tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <div style={{ display: "flex", maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => { setActiveCategory(i); setOpenQuestion(0); }}
              style={{ padding: "1rem 1.1rem", background: "none", border: "none", borderBottom: `3px solid ${activeCategory === i ? c.color : "transparent"}`, color: activeCategory === i ? c.color : "var(--text-muted)", fontSize: "0.82rem", fontWeight: activeCategory === i ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <span>{c.icon}</span> {c.title}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "860px", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {category.questions.map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden", boxShadow: openQuestion === i ? "0 6px 24px rgba(26,39,68,0.1)" : "0 1px 6px rgba(26,39,68,0.04)" }}>
              <button
                onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "1.5rem", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: openQuestion === i ? category.color : "rgba(26,39,68,0.06)", color: openQuestion === i ? "#fff" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0, marginTop: "0.1rem" }}>Q</span>
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.05rem", margin: 0, lineHeight: 1.4 }}>{item.q}</h3>
                </div>
                <span style={{ fontSize: "1.4rem", color: "var(--text-muted)", flexShrink: 0, transition: "transform 0.2s", transform: openQuestion === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>

              {openQuestion === i && (
                <div style={{ borderTop: `3px solid ${category.color}`, padding: "1.75rem", background: "rgba(26,39,68,0.01)" }}>
                  <p style={{ color: "var(--text-primary)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{item.a}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {item.refs.map((ref, ri) => (
                      <span key={ri} style={{ background: `${category.color}15`, border: `1px solid ${category.color}40`, color: category.color, fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.7rem", borderRadius: "999px" }}>{ref}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
