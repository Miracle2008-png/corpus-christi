"use client";
import { useState } from "react";

const purposes = [
  { id: "church", label: "Church Support", desc: "Support operational costs — servers, content creation, and development." },
  { id: "charity", label: "Catholic Charity", desc: "Fund Catholic charitable initiatives: feeding the poor and supporting missionaries." },
];

export default function DonatePage() {
  const [purpose, setPurpose] = useState(purposes[0]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-dark), var(--navy))", padding: "4.5rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Support the Work</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginBottom: "1rem" }}>Support This Ministry</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
          Corpus Christi is entirely free — no ads, no paywalls. Your gift keeps it running for Catholics everywhere.
        </p>
        <div style={{ display: "inline-flex", marginTop: "1.5rem", gap: "0.5rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "999px", padding: "0.4rem 1.2rem" }}>
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>100% of donations go to their stated purpose</span>
        </div>
      </section>

      {/* Methods Strip */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(26,39,68,0.08)", padding: "0.9rem 1.5rem" }}>
        <div className="container-sacred" style={{ maxWidth: "820px", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Accepted Payment Methods:
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Bank Transfer */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(26,39,68,0.04)", borderRadius: "8px", padding: "0.35rem 0.85rem", border: "1px solid rgba(26,39,68,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--navy)" }}>Direct Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-sacred" style={{ maxWidth: "820px", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}>

          {/* Left — Purpose selector */}
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.2rem", marginBottom: "1.25rem" }}>Choose a Purpose</h2>
            {purposes.map((p) => (
              <button key={p.id} onClick={() => setPurpose(p)} style={{
                width: "100%", textAlign: "left", padding: "1rem 1.125rem",
                border: `2px solid ${p.id === purpose.id ? "var(--gold)" : "rgba(26,39,68,0.12)"}`,
                background: p.id === purpose.id ? "rgba(201,168,76,0.07)" : "#fff",
                borderRadius: "10px", marginBottom: "0.75rem", cursor: "pointer", transition: "all 0.2s",
              }}>
                <p style={{ color: "var(--navy)", fontWeight: 700, marginBottom: "0.2rem" }}>{p.label}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.5 }}>{p.desc}</p>
              </button>
            ))}

            <div style={{ background: "var(--navy)", borderRadius: "12px", padding: "1.25rem", marginTop: "1rem" }}>
              <p style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.6 }}>
                &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.&rdquo;
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.5rem" }}>Luke 6:38</p>
            </div>
          </div>

          {/* Right — Account Details */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 24px rgba(26,39,68,0.1)", border: "1px solid rgba(26,39,68,0.08)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.15rem", marginBottom: "1.5rem" }}>
              Donating to: <span style={{ color: "var(--gold-dark)" }}>{purpose.label}</span>
            </h3>

            <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ color: "var(--navy)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Bank Details</p>
              
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Bank Name</span>
                <span style={{ display: "block", color: "var(--navy)", fontSize: "1.1rem", fontWeight: 600 }}>[Enter Bank Name]</span>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Account Name</span>
                <span style={{ display: "block", color: "var(--navy)", fontSize: "1.1rem", fontWeight: 600 }}>[Enter Account Name]</span>
              </div>

              <div>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Account Number</span>
                <span style={{ display: "block", color: "var(--navy)", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "0.05em", background: "rgba(26,39,68,0.05)", padding: "0.5rem 0.75rem", borderRadius: "6px", display: "inline-block" }}>[0000000000]</span>
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, textAlign: "center" }}>
              Please make your direct transfer to the account above. God bless you for your generosity!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
