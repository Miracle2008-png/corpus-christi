"use client";
import { useState } from "react";

const steps = [
  {
    step: 1,
    title: "Examination of Conscience",
    icon: "📖",
    content: "Before going to Confession, take quiet time to examine your conscience honestly. Ask the Holy Spirit to illuminate your soul and help you see your sins clearly and with contrition.",
    detail: "A good examination reviews your thoughts, words, actions, and omissions since your last Confession. Go through the Ten Commandments and the Precepts of the Church as your guide.",
  },
  {
    step: 2,
    title: "Contrition (Sorrow for Sin)",
    icon: "💔",
    content: "True sorrow for your sins is essential. Perfect contrition arises from love of God; imperfect contrition from fear of punishment — both are valid for Confession.",
    detail: "Pray the Act of Contrition from your heart: 'O my God, I am heartily sorry for having offended thee, and I detest all my sins...' Mean it.",
  },
  {
    step: 3,
    title: "Enter the Confessional",
    icon: "🚪",
    content: "You may confess face-to-face with the priest or behind the screen — both are valid. The priest is bound by the seal of Confession and may never reveal what he hears.",
    detail: "Begin by making the Sign of the Cross and saying: 'Bless me, Father, for I have sinned. It has been [length of time] since my last Confession.' Then confess your sins.",
  },
  {
    step: 4,
    title: "Confession of Sins",
    icon: "🗣",
    content: "Confess all mortal sins by number and kind. For venial sins, confess as many as you wish. Be honest, clear, and humble — the priest is there to help, not to judge.",
    detail: "You are required to confess all mortal sins (grave matter, full knowledge, deliberate consent). If you forget one, the Confession is still valid — mention it in your next Confession. Do not be afraid.",
  },
  {
    step: 5,
    title: "Penance",
    icon: "🙏",
    content: "The priest will give you a penance — usually prayers or a charitable act. This is not punishment but a means of repairing the damage caused by sin and growing in virtue.",
    detail: "Listen carefully to your penance and perform it as soon as possible, ideally before leaving the church.",
  },
  {
    step: 6,
    title: "Act of Contrition",
    icon: "❤",
    content: "The priest will ask you to pray an Act of Contrition. Pray it sincerely, expressing your sorrow for sin and firm resolve to avoid sin and its occasions in the future.",
    detail: "Act of Contrition: 'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of heaven, and the pains of hell; but most of all because they offend Thee, my God, Who art all-good and deserving of all my love. I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.'",
  },
  {
    step: 7,
    title: "Absolution",
    icon: "✝",
    content: "The priest extends his hand and pronounces the words of absolution. At this moment, your sins are truly forgiven by Christ through His minister. This is one of the greatest miracles in the world.",
    detail: "Absolution formula: 'God the Father of mercies, through the death and resurrection of His Son, has reconciled the world to Himself and sent the Holy Spirit among us for the forgiveness of sins. Through the ministry of the Church, may God give you pardon and peace, and I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit.' You respond: Amen.",
  },
  {
    step: 8,
    title: "Thanksgiving",
    icon: "🌟",
    content: "After Confession, spend time in prayer thanking God for His mercy. This is a powerful moment — you are in the state of grace. Offer a prayer of gratitude.",
    detail: "A good thanksgiving prayer: 'Lord Jesus, thank you for the gift of your mercy. I am grateful for the forgiveness I have received. Help me to sin no more and to avoid the near occasions of sin. Mary, help me to persevere. Amen.'",
  },
];

const examination = [
  {
    commandment: "1st Commandment",
    title: "You shall have no other gods before Me",
    sins: [
      "Have I doubted or denied my faith?",
      "Have I given priority to money, pleasure, or people over God?",
      "Have I consulted horoscopes, psychics, or the occult?",
      "Have I neglected prayer for long periods?",
      "Have I tempted God by putting myself in needless danger?",
    ],
  },
  {
    commandment: "2nd Commandment",
    title: "You shall not take the name of the Lord in vain",
    sins: [
      "Have I used the name of God or Jesus as a curse word?",
      "Have I made a false oath in God's name?",
      "Have I spoken irreverently about God, Mary, or the saints?",
      "Have I cursed, or used crude and blasphemous language?",
    ],
  },
  {
    commandment: "3rd Commandment",
    title: "Keep holy the Sabbath",
    sins: [
      "Have I missed Mass on Sunday or a holy day of obligation without a serious reason?",
      "Have I been deliberately late or left early from Mass?",
      "Have I worked unnecessarily on Sunday, causing others to miss Mass?",
      "Have I treated Sunday as a day of rest and family, or filled it with commerce?",
    ],
  },
  {
    commandment: "4th Commandment",
    title: "Honour your father and mother",
    sins: [
      "Have I disobeyed or disrespected my parents?",
      "Have I neglected my duties to my children?",
      "Have I been disrespectful to authority figures?",
      "Have I failed to care for elderly parents?",
    ],
  },
  {
    commandment: "5th Commandment",
    title: "You shall not kill",
    sins: [
      "Have I physically harmed another person?",
      "Have I harboured hatred, unforgiveness, or violent anger in my heart?",
      "Have I bullied, insulted, or humiliated others?",
      "Have I abused alcohol or drugs?",
      "Have I harmed my own body?",
      "Have I driven recklessly?",
    ],
  },
  {
    commandment: "6th & 9th Commandment",
    title: "You shall not commit adultery / covet your neighbour's wife",
    sins: [
      "Have I engaged in sexual activity outside of marriage?",
      "Have I used pornography?",
      "Have I entertained impure thoughts deliberately?",
      "Have I been immodest in dress or behaviour?",
      "Have I been unfaithful in marriage in thought or action?",
    ],
  },
  {
    commandment: "7th & 10th Commandment",
    title: "You shall not steal / covet your neighbour's goods",
    sins: [
      "Have I stolen, cheated, or defrauded anyone?",
      "Have I failed to pay a fair wage or return borrowed items?",
      "Have I wasted time at work or cheated in school?",
      "Have I been consumed by envy or jealousy of others?",
      "Have I been excessively greedy or materialistic?",
    ],
  },
  {
    commandment: "8th Commandment",
    title: "You shall not bear false witness",
    sins: [
      "Have I lied, deceived, or been dishonest?",
      "Have I gossiped or spread rumours?",
      "Have I damaged someone's reputation unjustly?",
      "Have I failed to keep secrets or confidences?",
      "Have I exaggerated or manipulated the truth?",
    ],
  },
];

export default function ConfessionPage() {
  const [activeTab, setActiveTab] = useState<"guide" | "examination">("guide");
  const [activeStep, setActiveStep] = useState(0);
  const [openCommandment, setOpenCommandment] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "5rem" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, var(--navy-dark) 50%, #2a1a0a 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>
          ✦ The Sacrament of Mercy ✦
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Guide to Confession
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          The Sacrament of Penance is one of the greatest gifts Christ left to His Church. No sin is too great for God's mercy. This guide will walk you through every step.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)", marginTop: "1.25rem", fontSize: "0.9rem" }}>
          &ldquo;Go and sin no more.&rdquo; — John 8:11
        </p>
      </section>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
        <div className="container-sacred" style={{ maxWidth: "1000px", display: "flex" }}>
          {([["guide", "Step-by-Step Guide"], ["examination", "Examination of Conscience"]] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "1rem 1.5rem", background: "none", border: "none",
                borderBottom: `3px solid ${activeTab === tab ? "var(--gold)" : "transparent"}`,
                color: activeTab === tab ? "var(--navy)" : "var(--text-muted)",
                fontWeight: activeTab === tab ? 700 : 500, fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "1000px", padding: "2.5rem 1.5rem" }}>

        {/* Guide Tab */}
        {activeTab === "guide" && (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem" }}>
            {/* Step list */}
            <div>
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: "100%", textAlign: "left", padding: "0.7rem 0.9rem",
                    background: activeStep === i ? "var(--navy-dark)" : "transparent",
                    border: "none", borderRadius: "8px", cursor: "pointer",
                    marginBottom: "0.2rem", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                  }}
                >
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: activeStep === i ? "var(--gold)" : "rgba(26,39,68,0.1)", color: activeStep === i ? "var(--navy-dark)" : "var(--text-muted)", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {s.step}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: activeStep === i ? 700 : 500, color: activeStep === i ? "var(--gold)" : "var(--text-muted)", lineHeight: 1.3 }}>
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Step content */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
              <div style={{ background: "var(--navy-dark)", padding: "2rem 2.5rem" }}>
                <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Step {steps[activeStep].step} of {steps.length}
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.6rem", margin: 0 }}>
                  {steps[activeStep].title}
                </h2>
              </div>
              <div style={{ padding: "2rem 2.5rem" }}>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
                  {steps[activeStep].content}
                </p>
                <div style={{ background: "rgba(26,39,68,0.03)", borderLeft: "4px solid var(--gold)", borderRadius: "0 10px 10px 0", padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", lineHeight: 1.8, color: "var(--navy)", margin: 0, fontStyle: "italic" }}>
                    {steps[activeStep].detail}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", justifyContent: "space-between" }}>
                  <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} style={{ padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid rgba(26,39,68,0.15)", background: "#fff", color: "var(--navy)", fontSize: "0.85rem", fontWeight: 600, cursor: activeStep === 0 ? "not-allowed" : "pointer", opacity: activeStep === 0 ? 0.4 : 1 }}>
                    ← Previous
                  </button>
                  <button onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1} style={{ padding: "0.65rem 1.5rem", borderRadius: "8px", border: "none", background: activeStep === steps.length - 1 ? "rgba(26,39,68,0.1)" : "linear-gradient(135deg,var(--gold-dark),var(--gold))", color: activeStep === steps.length - 1 ? "var(--text-muted)" : "var(--navy-dark)", fontSize: "0.85rem", fontWeight: 700, cursor: activeStep === steps.length - 1 ? "not-allowed" : "pointer" }}>
                    {activeStep === steps.length - 1 ? "Complete ✓" : "Next Step →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examination Tab */}
        {activeTab === "examination" && (
          <div>
            <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <p style={{ color: "var(--navy)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                <strong>How to use this:</strong> Before Confession, quietly read through each commandment and honestly ask yourself each question. This is a tool for personal reflection, not a checklist for the priest. Be honest with yourself and trust in God&apos;s mercy.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {examination.map((item, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenCommandment(openCommandment === i ? null : i)}
                    style={{ width: "100%", textAlign: "left", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <div>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.2rem" }}>{item.commandment}</p>
                      <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1rem", margin: 0, fontWeight: 600 }}>{item.title}</p>
                    </div>
                    <span style={{ fontSize: "1.2rem", color: "var(--text-muted)", transition: "transform 0.2s", transform: openCommandment === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                  </button>
                  {openCommandment === i && (
                    <div style={{ borderTop: "1px solid rgba(26,39,68,0.06)", padding: "1.25rem 1.5rem 1.5rem" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {item.sins.map((sin, si) => (
                          <li key={si} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <span style={{ color: "var(--gold)", fontSize: "0.8rem", marginTop: "0.2rem", flexShrink: 0 }}>✦</span>
                            <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: 1.6 }}>{sin}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 700px) {
          div[style*="gridTemplateColumns: \"200px 1fr\""] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
