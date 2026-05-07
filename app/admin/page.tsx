"use client";
import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  newUsersThisWeek: number;
  totalDonations: number;
  totalRevenue: number;
  totalReadings: number;
  totalIntentions: number;
  pendingIntentions: number;
}

const StatCard = ({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) => (
  <div style={{
    background: "#fff", borderRadius: "10px", padding: "1.5rem",
    border: "1px solid rgba(0,0,0,0.07)",
    borderLeft: `4px solid ${color}`,
  }}>
    <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>{label}</p>
    <p style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2744", margin: "0 0 0.25rem" }}>{value}</p>
    {sub && <p style={{ color: "#aaa", fontSize: "0.75rem", margin: 0 }}>{sub}</p>}
  </div>
);

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.6rem", margin: "0 0 0.25rem" }}>Dashboard Overview</h1>
        <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>Corpus Christi platform at a glance</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "10px", height: "110px", border: "1px solid rgba(0,0,0,0.07)", animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          <StatCard label="Total Users" value={stats?.totalUsers ?? 0} sub={`+${stats?.newUsersThisWeek ?? 0} this week`} color="#c9a84c" />
          <StatCard label="Total Donations" value={stats?.totalDonations ?? 0} color="#2ecc71" />
          <StatCard label="Total Revenue" value={`₦${(stats?.totalRevenue ?? 0).toLocaleString()}`} color="#3498db" />
          <StatCard label="Liturgical Readings" value={stats?.totalReadings ?? 0} color="#9b59b6" />
          <StatCard label="Prayer Intentions" value={stats?.totalIntentions ?? 0} sub={`${stats?.pendingIntentions ?? 0} pending`} color="#e67e22" />
        </div>
      )}

      {/* Quick links */}
      <div style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.1rem", margin: "0 0 1rem" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
          {[
            { label: "Add Reading", href: "/admin/readings", color: "#9b59b6" },
            { label: "Add Library Book", href: "/admin/library", color: "#8e44ad" },
            { label: "Add Saint", href: "/admin/saints", color: "#c9a84c" },
            { label: "Add Prayer", href: "/admin/prayers", color: "#3498db" },
            { label: "Manage Parishes", href: "/admin/mass-finder", color: "#16a085" },
            { label: "Manage Holy Sites", href: "/admin/holy-sites", color: "#f39c12" },
            { label: "Manage Users", href: "/admin/users", color: "#2ecc71" },
            { label: "View Donations", href: "/admin/donations", color: "#e67e22" },
            { label: "Review Intentions", href: "/admin/intentions", color: "#e74c3c" },
          ].map((q) => (
            <a key={q.href} href={q.href} style={{
              display: "block", padding: "1rem", borderRadius: "8px",
              background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
              textDecoration: "none", color: "#1a2744", fontSize: "0.85rem",
              fontWeight: 600, borderLeft: `3px solid ${q.color}`,
              transition: "box-shadow 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {q.label} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
