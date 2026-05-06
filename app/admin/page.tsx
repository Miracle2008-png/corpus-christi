"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const cardStyle: React.CSSProperties = {
  background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
};

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return <p style={{ color: "var(--crimson)" }}>Failed to load dashboard data.</p>;
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
        Dashboard Overview
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
        Here is what is happening across the Corpus Christi platform.
      </p>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
        <div style={{ ...cardStyle, padding: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Total Users</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy)", lineHeight: 1 }}>{stats.totalUsers}</p>
        </div>
        <div style={{ ...cardStyle, padding: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Prayers Posted</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy)", lineHeight: 1 }}>{stats.totalIntentions}</p>
        </div>
        <div style={{ ...cardStyle, padding: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Donations</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy)", lineHeight: 1 }}>{stats.totalDonations}</p>
        </div>
        <div style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 15px rgba(201,168,76,0.3)" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Revenue (NGN)</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy-dark)", lineHeight: 1 }}>₦{(stats.totalDonationAmount || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "3rem" }}>
        <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "1rem", fontSize: "1.1rem" }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Add a Reading", href: "/admin/readings", desc: "Create or edit liturgical readings" },
            { label: "Manage Users", href: "/admin/users", desc: "Search, view, and promote users" },
            { label: "View Donations", href: "/admin/transactions", desc: "See all Paystack transactions" },
            { label: "Moderate Prayers", href: "/admin/intentions", desc: "Review and delete prayer posts" },
          ].map((a) => (
            <Link key={a.href} href={a.href} style={{ ...cardStyle, padding: "1.25rem", textDecoration: "none", display: "block", transition: "all 0.2s", borderLeft: "3px solid var(--gold)" }}>
              <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>{a.label}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0 }}>{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Recent Donations */}
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(26,39,68,0.08)", background: "rgba(26,39,68,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", margin: 0, fontSize: "1rem" }}>Recent Donations</h3>
            <Link href="/admin/transactions" style={{ fontSize: "0.75rem", color: "var(--gold-dark)", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ padding: "1.25rem" }}>
            {(!stats.recentDonations || stats.recentDonations.length === 0) ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No donations yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {stats.recentDonations.map((d: any, i: number) => (
                  <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                    <div>
                      <p style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem" }}>{d.donor_name}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{new Date(d.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p style={{ fontWeight: 700, color: "var(--gold-dark)", fontSize: "0.9rem" }}>₦{(d.amount || 0).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Intentions */}
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(26,39,68,0.08)", background: "rgba(26,39,68,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", margin: 0, fontSize: "1rem" }}>Recent Prayer Posts</h3>
            <Link href="/admin/intentions" style={{ fontSize: "0.75rem", color: "var(--gold-dark)", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ padding: "1.25rem" }}>
            {(!stats.recentIntentions || stats.recentIntentions.length === 0) ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No intentions posted yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {stats.recentIntentions.map((intent: any, i: number) => (
                  <li key={i} style={{ paddingBottom: "0.75rem", borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                    <p style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem", marginBottom: "0.15rem" }}>{intent.title}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{intent.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:800px){div[style*="1fr 1fr"]{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
