import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin Dashboard" };

const sections = [
  { href: "/admin/saints", label: "Saints", icon: "+", count: "Manage saint records" },
  { href: "/admin/popes", label: "Popes", icon: "+", count: "Manage pope records" },
  { href: "/admin/prayers", label: "Prayers", icon: "+", count: "Manage prayer texts" },
  { href: "/admin/miracles", label: "Miracles", icon: "+", count: "Manage miracle records" },
  { href: "/admin/readings", label: "Daily Readings", icon: "+", count: "Add/edit readings" },
  { href: "/admin/sacraments", label: "Sacraments", icon: "+", count: "Manage sacrament content" },
];

export default function AdminPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Admin header */}
      <section style={{ background: "var(--navy)", padding: "3rem 1.5rem 2rem" }}>
        <div className="container-sacred">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "2rem" }}>⚜</span>
            <div>
              <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.75rem", marginBottom: "0.25rem" }}>Admin Dashboard</h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>Manage all content on the Corpus Christi platform</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-sacred section-sacred">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {sections.map((section) => (
            <Link key={section.href} href={section.href} style={{ textDecoration: "none" }}>
              <div className="sacred-card" style={{ padding: "1.75rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                  {section.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.1rem", marginBottom: "0.2rem" }}>{section.label}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{section.count}</p>
                </div>
                <span style={{ marginLeft: "auto", color: "var(--gold)", fontSize: "1.2rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick add reading */}
        <div style={{ marginTop: "3rem", background: "var(--navy)", borderRadius: "16px", padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--gold)", fontSize: "1.2rem", marginBottom: "1.5rem" }}>Quick Add: Daily Reading</h2>
          <form method="POST" action="/api/readings" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Date</label>
              <input type="date" name="date" className="sacred-input" style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Liturgical Season</label>
              <select name="liturgical_season" className="sacred-input" style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }}>
                <option value="ordinary">Ordinary Time</option>
                <option value="advent">Advent</option>
                <option value="christmas">Christmas</option>
                <option value="lent">Lent</option>
                <option value="easter">Easter</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Gospel Reference</label>
              <input type="text" name="gospel_reference" placeholder="e.g. John 3:16-21" className="sacred-input" style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Gospel Text</label>
              <textarea name="gospel_text" rows={4} className="sacred-input" style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)", resize: "vertical" }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button type="submit" className="btn-sacred">+ Add Reading</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
