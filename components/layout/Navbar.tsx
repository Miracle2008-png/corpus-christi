"use client";
import Link from "next/link";
import { useState } from "react";

import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/saints", label: "Saints" },
  { href: "/popes", label: "Popes" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/stations", label: "Stations" },
  { href: "/rosary", label: "Rosary" },
  { href: "/readings", label: "Readings" },
  { href: "/calendar", label: "Calendar" },
  {
    label: "More",
    children: [
      { href: "/history", label: "Church History" },
      { href: "/priesthood", label: "Priesthood" },
      { href: "/miracles", label: "Miracles" },
      { href: "/mass", label: "Mass & Confession" },
      { href: "/bible/passages", label: "Bible Passages" },
      { href: "/bible/stories", label: "Bible Stories" },
      { href: "/prayers", label: "Prayers Library" },
      { href: "/novenas", label: "Novenas" },
      { href: "/confession", label: "Confession Guide" },
      { href: "/marian", label: "Marian Devotions" },
      { href: "/catechism", label: "Catechism" },
      { href: "/apologetics", label: "Apologetics" },
      { href: "/saint-of-the-day", label: "Saint of the Day" },
      { href: "/virtues", label: "Virtues & Beatitudes" },
      { href: "/encyclicals", label: "Papal Encyclicals" },
    ],
  },
];

export default function Navbar({ session }: { session?: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container-sacred" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: "64px" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>✝</span>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1.1, letterSpacing: "0.02em" }}>
              Corpus Christi
            </div>
            <div style={{ fontSize: "0.6rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Catholic Ministry Platform
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} style={{ position: "relative" }}>
                <button
                  id="more-menu-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.8)", fontSize: "0.875rem",
                    padding: "0.5rem 0.75rem", borderRadius: "6px",
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8L1 3h10z"/>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0,
                    background: "var(--navy-dark)", border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "10px", padding: "0.5rem", minWidth: "180px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 200,
                  }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "block", padding: "0.6rem 1rem",
                          color: "rgba(255,255,255,0.85)", textDecoration: "none",
                          fontSize: "0.875rem", borderRadius: "6px",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.15)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                style={{
                  color: "rgba(255,255,255,0.8)", textDecoration: "none",
                  fontSize: "0.875rem", padding: "0.5rem 0.75rem",
                  borderRadius: "6px", transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Auth buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.75rem" }}>
            {session ? (
              <div style={{ position: "relative" }} onMouseLeave={() => setAuthDropdownOpen(false)}>
                <button
                  onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                  onMouseEnter={() => setAuthDropdownOpen(true)}
                  style={{
                    color: "var(--navy-dark)", textDecoration: "none",
                    fontSize: "0.8rem", padding: "0.45rem 1rem",
                    borderRadius: "6px", border: "none", cursor: "pointer",
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    fontWeight: 700, transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: "0.4rem"
                  }}
                >
                  {session.user?.name ? `Hi, ${session.user.name.split(" ")[0]}` : "My Account"}
                  <span style={{ fontSize: "0.6rem" }}>▼</span>
                </button>

                {authDropdownOpen && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0, marginTop: "0.5rem",
                    background: "var(--navy-dark)", border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "8px", padding: "0.5rem 0", minWidth: "180px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 100,
                  }}>
                    <Link
                      href="/dashboard"
                      onClick={() => setAuthDropdownOpen(false)}
                      style={{
                        display: "block", padding: "0.6rem 1.25rem", color: "var(--white)",
                        textDecoration: "none", fontSize: "0.85rem", transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard#donations"
                      onClick={() => setAuthDropdownOpen(false)}
                      style={{
                        display: "block", padding: "0.6rem 1.25rem", color: "var(--white)",
                        textDecoration: "none", fontSize: "0.85rem", transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      My Donations
                    </Link>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "0.5rem 0" }} />
                    <button
                      onClick={() => { setAuthDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "0.6rem 1.25rem",
                        color: "var(--crimson)", background: "transparent", border: "none", cursor: "pointer",
                        fontSize: "0.85rem", transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,0,0,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  style={{
                    color: "rgba(255,255,255,0.85)", textDecoration: "none",
                    fontSize: "0.8rem", padding: "0.45rem 1rem",
                    borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  style={{
                    color: "var(--navy-dark)", textDecoration: "none",
                    fontSize: "0.8rem", padding: "0.45rem 1rem",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    fontWeight: 700, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/donate" className="btn-sacred" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}>
              ✦ Donate
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", color: "var(--gold)", padding: "0.5rem",
          }}
          className="mobile-menu-trigger"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            ) : (
              <>
                <rect y="4" width="24" height="2" rx="1"/>
                <rect y="11" width="24" height="2" rx="1"/>
                <rect y="18" width="24" height="2" rx="1"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "var(--navy-dark)", borderTop: "1px solid rgba(201,168,76,0.2)",
          padding: "1rem",
        }}>
          {navLinks.map((link) => (
            link.children ? (
              link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", padding: "0.75rem 1rem",
                    color: "rgba(255,255,255,0.8)", textDecoration: "none",
                    fontSize: "0.95rem", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {child.label}
                </Link>
              ))
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "0.75rem 1rem",
                  color: "rgba(255,255,255,0.8)", textDecoration: "none",
                  fontSize: "0.95rem", borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </Link>
            )
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "rgba(255,255,255,0.85)", textDecoration: "none", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600 }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "var(--navy-dark)", textDecoration: "none", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 700 }}
            >
              Sign Up
            </Link>
            <Link href="/donate" className="btn-sacred" style={{ display: "block", textAlign: "center" }}>
              ✦ Donate
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-trigger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
