import Link from "next/link";

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

        <hr className="gold-divider" style={{ margin: 0 }} />

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
