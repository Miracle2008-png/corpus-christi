"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ADMIN_EMAILS = [
  "miraclechimdindu2008@gmail.com",
  "miraclechimdindu2025@gmail.com",
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Loading state
  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ivory)" }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>Verifying access...</p>
      </div>
    );
  }

  // Not logged in
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  // Logged in but not an admin email — send to normal dashboard
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
  if (!isAdmin) {
    if (typeof window !== "undefined") window.location.href = "/dashboard";
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ivory)" }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}>Redirecting...</p>
      </div>
    );
  }

  const navItems = [
    { name: "Overview", path: "/admin", icon: "📊" },
    { name: "Manage Readings", path: "/admin/readings", icon: "📖" },
    { name: "Donations", path: "/admin/transactions", icon: "💳" },
    { name: "Prayer Intentions", path: "/admin/intentions", icon: "🙏" },
    { name: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "var(--navy-dark)", borderRight: "1px solid rgba(201,168,76,0.2)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 800, marginBottom: "0.2rem" }}>Restricted</p>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.2rem", margin: 0 }}>Admin Portal</h2>
        </div>

        <nav style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.75rem 1rem", borderRadius: "8px", textDecoration: "none",
                  color: isActive ? "var(--gold)" : "rgba(255,255,255,0.7)",
                  background: isActive ? "rgba(201,168,76,0.12)" : "transparent",
                  fontSize: "0.9rem", fontWeight: 600, transition: "all 0.2s",
                  borderLeft: isActive ? "3px solid var(--gold)" : "3px solid transparent",
                }}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginBottom: "0.25rem" }}>Logged in as:</p>
          <p style={{ color: "var(--gold)", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 0.75rem" }}>{session?.user?.email}</p>
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textDecoration: "none" }}>← Back to Main Site</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ background: "#fff", height: "64px", borderBottom: "1px solid rgba(26,39,68,0.08)", display: "flex", alignItems: "center", padding: "0 2rem", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600, margin: 0 }}>
            {navItems.find(n => n.path === pathname)?.name || "Admin Portal"}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0 }}>Welcome, {session?.user?.name?.split(" ")[0]}</p>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "2.5rem" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
