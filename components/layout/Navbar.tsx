"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import PushNotificationBell from "@/components/PushNotificationBell";
import GlobalSearch from "@/components/layout/GlobalSearch";
const navGroups = [
  {
    label: "Pray",
    icon: "✦",
    children: [
      { href: "/readings", label: "Daily Readings", desc: "Today's Scripture" },
      { href: "/rosary", label: "Holy Rosary", desc: "Guided mysteries" },
      { href: "/stations", label: "Stations of the Cross", desc: "Way of the Cross" },
      { href: "/novenas", label: "Novenas", desc: "9-day devotions" },
      { href: "/prayers", label: "Prayers Library", desc: "Classic Catholic prayers" },
      { href: "/liturgy", label: "Liturgy of the Hours", desc: "Divine Office" },
      { href: "/intentions", label: "Prayer Intentions", desc: "Submit & pray together" },
    ],
  },
  {
    label: "Learn",
    icon: "✦",
    children: [
      { href: "/saints", label: "Saints", desc: "Lives & miracles" },
      { href: "/popes", label: "Popes", desc: "St. Peter to today" },
      { href: "/sacraments", label: "Sacraments", desc: "The 7 sacraments" },
      { href: "/history", label: "Church History", desc: "2,000 years" },
      { href: "/priesthood", label: "Holy Orders", desc: "The sacred hierarchy" },
      { href: "/catechism", label: "Catechism", desc: "What the Church teaches" },
      { href: "/apologetics", label: "Apologetics", desc: "Defend the faith" },
      { href: "/encyclicals", label: "Papal Encyclicals", desc: "Voice of Peter" },
    ],
  },
  {
    label: "Explore",
    icon: "✦",
    children: [
      { href: "/bible", label: "Holy Bible", desc: "Read the 73 books" },
      { href: "/bible/stories", label: "Bible Stories", desc: "Narrative retellings" },
      { href: "/miracles", label: "Miracles", desc: "Signs & wonders" },
      { href: "/incorruptibles", label: "Incorruptible Saints", desc: "Bodies that defy decay" },
      { href: "/marian", label: "Marian Devotions", desc: "Our Lady" },
      { href: "/library", label: "Catholic Library", desc: "Free classic texts" },
      { href: "/pilgrimage", label: "Virtual Pilgrimage", desc: "Holy sites worldwide" },
    ],
  },
  {
    label: "Community",
    icon: "✦",
    children: [
      { href: "/mass", label: "Mass & Confession", desc: "Liturgical guide" },
      { href: "/confession", label: "Confession Guide", desc: "Examine your conscience" },
      { href: "/mass-finder", label: "Find Mass Near Me", desc: "Locate a parish" },
      { href: "/calendar", label: "Liturgical Calendar", desc: "Seasons & feasts" },
      { href: "/saint-of-the-day", label: "Saint of the Day", desc: "Today's patron" },
      { href: "/virtues", label: "Virtues & Beatitudes", desc: "Path to holiness" },
      { href: "/ai", label: "AI Assistant", desc: "Ask about the faith" },
    ],
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ADMIN_EMAILS = ["miraclechimdindu2008@gmail.com", "miraclechimdindu2025@gmail.com"];
  const isAdmin = !!(session?.user?.email && ADMIN_EMAILS.includes(session.user.email));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) {
        setMobileOpen(false);
        setOpenMobileGroup(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container-sacred" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: "64px" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <span style={{ fontSize: "1.75rem", lineHeight: 1 }}></span>
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
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
          {/* Quick links */}
          <Link
            href="/readings"
            className="nav-quick-link"
            style={{
              color: "rgba(255,255,255,0.85)", textDecoration: "none",
              fontSize: "0.82rem", padding: "0.45rem 0.7rem",
              borderRadius: "6px", transition: "color 0.2s, background 0.2s",
              fontWeight: 600,
            }}
          >
            Readings
          </Link>
          <Link
            href="/rosary"
            className="nav-quick-link"
            style={{
              color: "rgba(255,255,255,0.85)", textDecoration: "none",
              fontSize: "0.82rem", padding: "0.45rem 0.7rem",
              borderRadius: "6px", transition: "color 0.2s, background 0.2s",
              fontWeight: 600,
            }}
          >
            Rosary
          </Link>

          {/* Category dropdowns */}
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="nav-dropdown-container"
              style={{ position: "relative" }}
              onMouseEnter={() => handleDropdownEnter(group.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                style={{
                  background: openDropdown === group.label ? "rgba(201,168,76,0.12)" : "none",
                  border: "none", cursor: "pointer",
                  color: openDropdown === group.label ? "var(--gold)" : "rgba(255,255,255,0.75)",
                  fontSize: "0.82rem",
                  padding: "0.45rem 0.65rem", borderRadius: "6px",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  transition: "all 0.2s", fontWeight: 500,
                }}
              >
                {group.label}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" style={{ opacity: 0.6, transition: "transform 0.2s", transform: openDropdown === group.label ? "rotate(180deg)" : "none" }}>
                  <path d="M6 8L1 3h10z"/>
                </svg>
              </button>

              {openDropdown === group.label && (
                <div style={{
                  position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                  background: "var(--navy-dark)", border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "12px", padding: "0.5rem", minWidth: "260px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.5)", zIndex: 200,
                  marginTop: "0.25rem",
                }}>
                  {/* Invisible bridge */}
                  <div style={{ position: "absolute", top: "-10px", left: 0, right: 0, height: "10px" }} />
                  
                  <div style={{ padding: "0.5rem 0.75rem 0.4rem", borderBottom: "1px solid rgba(201,168,76,0.15)", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {group.icon} {group.label}
                    </span>
                  </div>

                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenDropdown(null)}
                      className="nav-dropdown-item"
                      style={{
                        display: "block", padding: "0.55rem 0.75rem",
                        textDecoration: "none", borderRadius: "8px",
                        transition: "background 0.15s",
                      }}
                    >
                      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", fontWeight: 500 }}>
                        {child.label}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginTop: "0.1rem" }}>
                        {child.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Auth buttons & Push */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.5rem" }}>
            <GlobalSearch />
            <PushNotificationBell />
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
                    position: "absolute", top: "100%", right: 0, marginTop: "0",
                    background: "var(--navy-dark)", border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "8px", padding: "0.5rem 0", minWidth: "180px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 100,
                  }}>
                    {/* Invisible bridge */}
                    <div style={{ position: "absolute", top: "-10px", left: 0, right: 0, height: "10px", background: "transparent" }} />
                    
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setAuthDropdownOpen(false)}
                        style={{
                          display: "block", padding: "0.6rem 1.25rem", color: "var(--gold)",
                          textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.background = "rgba(201,168,76,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "transparent"; }}
                      >
                        ✦ Admin Portal
                      </Link>
                    )}

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
                    transition: "all 0.2s", whiteSpace: "nowrap",
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
                    borderRadius: "6px", whiteSpace: "nowrap",
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
            <Link href="/donate" className="btn-sacred" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem", whiteSpace: "nowrap" }}>
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

      {mobileOpen && (
        <div style={{
          background: "var(--navy-dark)", borderTop: "1px solid rgba(201,168,76,0.2)",
          padding: "1rem",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
          <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
            <GlobalSearch />
          </div>

          {/* Prominent CTA */}
          <Link
            href="/readings"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block", padding: "0.85rem 1rem",
              background: "rgba(201,168,76,0.15)", color: "var(--gold)",
              textDecoration: "none", fontSize: "1rem", fontWeight: 700,
              borderRadius: "8px", marginBottom: "1rem", textAlign: "center",
              border: "1px solid rgba(201,168,76,0.3)"
            }}
          >
            ✦ Today&apos;s Readings
          </Link>

          {/* Grouped sections — only one open at a time */}
          {navGroups.map((group) => {
            const isGroupOpen = openMobileGroup === group.label;
            return (
              <div key={group.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "0.25rem" }}>
                <button
                  onClick={() => setOpenMobileGroup(isGroupOpen ? null : group.label)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    padding: "0.75rem 1rem", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.9rem" }}>{group.icon}</span>
                    {group.label}
                  </span>
                  <span style={{
                    fontSize: "0.65rem", opacity: 0.5, color: "var(--gold)",
                    transition: "transform 0.2s",
                    display: "inline-block",
                    transform: isGroupOpen ? "rotate(180deg)" : "none"
                  }}>▼</span>
                </button>
                {isGroupOpen && (
                  <div style={{ background: "rgba(0,0,0,0.15)", padding: "0.5rem 0", borderRadius: "0 0 8px 8px" }}>
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => { setMobileOpen(false); setOpenMobileGroup(null); }}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "0.6rem 1.5rem",
                          color: "rgba(255,255,255,0.75)", textDecoration: "none",
                          fontSize: "0.9rem", transition: "color 0.2s"
                        }}
                      >
                        <span>{child.label}</span>
                        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Auth section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
            {session ? (
              <>
                <div style={{ padding: "0.5rem 0", color: "var(--gold)", fontWeight: 700, fontSize: "0.95rem", textAlign: "center" }}>
                  {session.user?.name ? `Hi, ${session.user.name.split(" ")[0]}` : "My Account"}
                </div>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "var(--gold)", textDecoration: "none", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 700 }}>
                    ✦ Admin Portal
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "var(--white)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600 }}>
                  Dashboard
                </Link>
                <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }} style={{ display: "block", width: "100%", textAlign: "center", padding: "0.75rem", color: "var(--crimson)", background: "transparent", border: "1px solid rgba(255,0,0,0.3)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "rgba(255,255,255,0.85)", textDecoration: "none", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600 }}>
                  Sign In
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} style={{ display: "block", textAlign: "center", padding: "0.75rem", color: "var(--navy-dark)", textDecoration: "none", background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 700 }}>
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/donate" onClick={() => setMobileOpen(false)} className="btn-sacred" style={{ display: "block", textAlign: "center", marginTop: "0.5rem" }}>
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
        .nav-quick-link:hover {
          color: var(--gold) !important;
          background: rgba(201,168,76,0.1);
        }
        .nav-dropdown-item:hover {
          background: rgba(201,168,76,0.12);
        }
      `}</style>
    </nav>
  );
}
