"use client";
import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

// Replace with your Paystack public key from https://dashboard.paystack.com
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_live_REPLACE_WITH_YOUR_KEY";

const purposes = [
  { id: "platform", label: "Platform Maintenance", desc: "Keep this platform free, fast, and growing for all Catholics worldwide.", presets: [3, 7, 15, 25] },
  { id: "church", label: "Church Support", desc: "Support operational costs — servers, content creation, and development.", presets: [5, 10, 25, 50] },
  { id: "charity", label: "Catholic Charity", desc: "Fund Catholic charitable initiatives: feeding the poor and supporting missionaries.", presets: [10, 25, 50, 100] },
];

export default function DonatePage() {
  const [purpose, setPurpose] = useState(purposes[0]);
  const [amount, setAmount] = useState<number | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function pay() {
    if (!name.trim() || !email.trim() || !amount) { setError("Please fill in all fields and choose an amount."); return; }
    if (typeof amount !== "number" || amount < 1) { setError("Minimum donation is $1."); return; }
    setError("");
    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round((amount as number) * 100), // Paystack takes kobo/cents
      currency: "USD",
      metadata: { custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: name }, { display_name: "Purpose", variable_name: "purpose", value: purpose.label }] },
      callback: (response: { reference: string }) => {
        setLoading(false);
        if (response.reference) setSuccess(true);
      },
      onClose: () => setLoading(false),
    });
    handler.openIframe();
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div>
          <div style={{ fontSize: "4rem", color: "var(--gold)", marginBottom: "1rem" }}>+</div>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "2rem", marginBottom: "1rem" }}>God bless you, {name}.</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Your gift of <strong style={{ color: "var(--gold)" }}>${amount}</strong> to <strong style={{ color: "var(--gold)" }}>{purpose.label}</strong> has been received. A receipt has been sent to {email}. Thank you for supporting this mission.
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)", marginBottom: "2rem" }}>
            &ldquo;Give, and it will be given to you.&rdquo; — Luke 6:38
          </p>
          <button onClick={() => { setSuccess(false); setAmount(""); setName(""); setEmail(""); }} style={{ background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", color: "var(--navy-dark)", border: "none", padding: "0.75rem 2rem", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
            Make Another Gift
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
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

            {/* Right — Payment form */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 24px rgba(26,39,68,0.1)", border: "1px solid rgba(26,39,68,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.15rem", marginBottom: "1.5rem" }}>
                Donating to: <span style={{ color: "var(--gold-dark)" }}>{purpose.label}</span>
              </h3>

              {error && (
                <div style={{ background: "rgba(139,26,26,0.08)", border: "1px solid rgba(139,26,26,0.2)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
                  <p style={{ color: "var(--crimson)", fontSize: "0.85rem" }}>{error}</p>
                </div>
              )}

              {/* Preset amounts */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>Select Amount</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                  {purpose.presets.map((a) => (
                    <button key={a} onClick={() => setAmount(a)} style={{
                      padding: "0.6rem", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", transition: "all 0.2s",
                      border: `2px solid ${amount === a ? "var(--gold)" : "rgba(26,39,68,0.15)"}`,
                      background: amount === a ? "linear-gradient(135deg,var(--gold-dark),var(--gold))" : "#fff",
                      color: amount === a ? "var(--navy-dark)" : "var(--navy)",
                    }}>
                      ${a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="donate-amount" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Or Enter Custom Amount (USD)
                </label>
                <input
                  id="donate-amount"
                  type="number"
                  min="1"
                  placeholder="e.g. 20"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                  className="sacred-input"
                  style={{ fontSize: "1.1rem", fontWeight: 700 }}
                />
              </div>

              {/* Name */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="donor-name" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Your Name
                </label>
                <input id="donor-name" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="sacred-input" />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="donor-email" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Email Address
                </label>
                <input id="donor-email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="sacred-input" />
              </div>

              <button
                onClick={pay}
                disabled={loading}
                style={{
                  width: "100%", padding: "0.9rem", borderRadius: "10px",
                  background: loading ? "rgba(26,39,68,0.5)" : "linear-gradient(135deg,var(--gold-dark),var(--gold))",
                  color: "var(--navy-dark)", border: "none", fontWeight: 800,
                  fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.04em", transition: "all 0.2s",
                }}
              >
                {loading ? "Processing..." : `Donate ${amount ? `$${amount}` : ""} Securely`}
              </button>

              <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", textAlign: "center", marginTop: "0.75rem" }}>
                Secured by Paystack. Your payment is encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
