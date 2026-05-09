"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { name: "Overview", path: "/admin" },
  { name: "Readings", path: "/admin/readings" },
  { name: "Saints", path: "/admin/saints" },
  { name: "Popes", path: "/admin/popes" },
  { name: "Prayers", path: "/admin/prayers" },
  { name: "Users", path: "/admin/users" },
  { name: "Intentions", path: "/admin/intentions" },
  { name: "Donations", path: "/admin/donations" },
  { name: "Library", path: "/admin/library" },
  { name: "Mass Finder", path: "/admin/mass-finder" },
  { name: "Holy Sites", path: "/admin/holy-sites" },
  { name: "Analytics", path: "/admin/analytics" },
];

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const name = session?.user?.name?.split(" ")[0] ?? "Admin";
  const email = session?.user?.email ?? "";

  return (
    <>
      <style>{`
        .admin-nav-link { display:flex; align-items:center; gap:0.6rem; padding:0.65rem 0.85rem; border-radius:6px; text-decoration:none; color:rgba(255,255,255,0.65); font-size:0.85rem; font-weight:500; transition:all 0.15s; }
        .admin-nav-link:hover, .admin-nav-link.active { background:rgba(201,168,76,0.12); color:#c9a84c; border-left:3px solid #c9a84c; padding-left:calc(0.85rem - 3px); }
        .admin-nav-link:not(.active) { border-left:3px solid transparent; }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
        {/* Sidebar */}
        <aside style={{
          width: "240px", flexShrink: 0,
          background: "#0f1729",
          borderRight: "1px solid rgba(201,168,76,0.15)",
          display: "flex", flexDirection: "column",
          position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto", zIndex: 50,
        }}>
          <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#c9a84c", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 800, margin: "0 0 0.2rem" }}>Corpus Christi</p>
            <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 600, margin: 0 }}>Admin Portal</p>
          </div>

          <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`admin-nav-link${pathname === item.path ? " active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", margin: "0 0 0.15rem" }}>Signed in as</p>
            <p style={{ color: "#c9a84c", fontSize: "0.72rem", fontWeight: 600, margin: "0 0 0.75rem", wordBreak: "break-all" }}>{email}</p>
            <Link href="/" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", textDecoration: "none", display: "block", marginBottom: "0.4rem" }}>← Back to Site</Link>
            <Link href="/api/auth/signout" style={{ color: "#e74c3c", fontSize: "0.72rem", textDecoration: "none" }}>Sign Out</Link>
          </div>
        </aside>

        {/* Main */}
        <div style={{ marginLeft: "240px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f5f0" }}>
          <header style={{
            height: "56px", background: "#fff",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center",
            padding: "0 2rem", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 40,
          }}>
            <p style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontWeight: 600, margin: 0, fontSize: "0.95rem" }}>Admin Portal</p>
            <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>Welcome, {name}</p>
          </header>
          <main style={{ flex: 1, padding: "2rem" }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
