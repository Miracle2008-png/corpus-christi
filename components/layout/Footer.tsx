import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  Devotion: [
    { href: "/rosary", label: "Holy Rosary" },
    { href: "/stations", label: "Stations of the Cross" },
    { href: "/readings", label: "Daily Readings" },
    { href: "/mass", label: "The Holy Mass" },
  ],
  Knowledge: [
    { href: "/saints", label: "Saints" },
    { href: "/popes", label: "Popes" },
    { href: "/sacraments", label: "Sacraments" },
    { href: "/history", label: "Church History" },
  ],
  Community: [
    { href: "/miracles", label: "Miracles" },
    { href: "/priesthood", label: "Priesthood" },
    { href: "/donate", label: "Support Us" },
    { href: "/auth/login", label: "Sign In" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <footer style={{ background: "var(--navy-dark)", color: "rgba(255,255,255,0.7)", paddingTop: "4rem" }}>
      <div className="container-sacred">
        {/* Top grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem", color: "var(--gold)" }}>✝</span>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--gold)", fontWeight: 700 }}>
                  Corpus Christi
                </div>
                <div style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Catholic Ministry Platform
                </div>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "300px", marginBottom: "1.5rem" }}>
              A sacred digital home for the Catholic faithful. Free, offline-first, and built with love for the Church.
            </p>
            <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "var(--gold)", fontFamily: "var(--font-serif)" }}>
              &ldquo;I am the way, the truth, and the life.&rdquo; — John 14:6
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="footer-heading">{heading}</h4>
              <ul style={{ listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.href} style={{ marginBottom: "0.5rem" }}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(0,0,0,0.15)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: "400px" }}>
            <h4 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>The Daily Saint</h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>Join our newsletter to receive the Saint of the Day and daily readings right in your inbox every morning.</p>
          </div>
          <form onSubmit={subscribe} style={{ display: "flex", gap: "0.5rem", flex: "1 1 300px", maxWidth: "400px" }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "0.9rem" }} />
            <button type="submit" disabled={status === "loading"} style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", background: "var(--gold)", color: "var(--navy-dark)", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
              {status === "loading" ? "..." : status === "success" ? "✓ Done" : "Subscribe"}
            </button>
          </form>
        </div>

        <hr className="gold-divider" style={{ margin: "2rem 0 0" }} />

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            © {year} Corpus Christi Ministry Platform. Built for God&apos;s glory. All content for educational use.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            Images from Wikimedia Commons · Unsplash · Pexels (CC licensed)
          </p>
        </div>
      </div>
    </footer>
  );
}
