import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export const metadata = { title: "Admin Portal | Corpus Christi" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Check by email — most reliable, role token can be stale
  const ADMIN_EMAILS = [
    "miraclechimdindu2008@gmail.com",
    "miraclechimdindu2025@gmail.com",
  ];

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/auth/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "260px", background: "var(--navy-dark)", borderRight: "1px solid rgba(201,168,76,0.2)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 800, marginBottom: "0.2rem" }}>Restricted</p>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.2rem", margin: 0 }}>Admin Portal</h2>
        </div>
        
        <nav style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { name: "Overview", path: "/admin", icon: "📊" },
            { name: "Manage Readings", path: "/admin/readings", icon: "📖" },
            { name: "Donations", path: "/admin/transactions", icon: "💳" },
            { name: "Prayer Intentions", path: "/admin/intentions", icon: "🙏" },
            { name: "Users", path: "/admin/users", icon: "👥" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1rem", borderRadius: "8px", textDecoration: "none",
                color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontWeight: 600,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Logged in as:<br/><strong style={{ color: "var(--white)" }}>{session?.user?.email}</strong></p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{ background: "#fff", height: "64px", borderBottom: "1px solid rgba(26,39,68,0.08)", display: "flex", alignItems: "center", padding: "0 2rem", justifyContent: "flex-end" }}>
           <Link href="/" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>
             ← Back to Main Site
           </Link>
        </header>
        
        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "2.5rem" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
