import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "My Dashboard",
};

const ADMIN_EMAILS = [
  "miraclechimdindu2008@gmail.com",
  "miraclechimdindu2025@gmail.com",
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Admins should always be in the Admin Portal, not the user dashboard
  if (session.user.email && ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/admin");
  }

  return (
    <div className="bg-parchment" style={{ minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div className="container-sacred" style={{ maxWidth: "1000px", marginTop: "2rem" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--navy)", marginBottom: "0.5rem" }}>
            My Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Welcome back, {session.user.name || "faithful friend"}.
          </p>
          <div className="gold-divider" style={{ marginLeft: 0, marginTop: "1rem" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          {/* Profile Overview Card */}
          <div className="sacred-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--gold)" }}>✦</span> Account Details
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Name</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>{session.user.name}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Email</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>{session.user.email}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Member Since</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>2026</p>
              </div>
            </div>
          </div>

          {/* Saved Content Card */}
          <div className="sacred-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--gold)" }}>✦</span> Saved Prayers
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "2rem", textAlign: "center", border: "1px dashed rgba(201,168,76,0.3)", borderRadius: "8px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1rem" }}>
                  You haven&apos;t saved any prayers yet.
                </p>
                <Link href="/prayers" className="btn-outline-sacred" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
                  Browse Prayers Library
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History Section */}
        <div id="donations" style={{ marginTop: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--gold)" }}>✦</span> My Donations
          </h2>
          
          <div className="sacred-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              You don&apos;t have any donation history yet. Your support helps us maintain this platform and spread the Catholic faith globally.
            </p>
            <Link href="/donate" className="btn-sacred" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
              Make a Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
