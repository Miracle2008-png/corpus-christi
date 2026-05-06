"use client";
import { useEffect, useState } from "react";

const SEASONS = ["Ordinary Time", "Advent", "Christmas", "Lent", "Easter"];

export default function AdminAnalytics() {
  const [stats, setStats] = useState<{totalUsers:number; newUsersThisWeek:number; totalDonations:number; totalRevenue:number; totalReadings:number; totalIntentions:number} | null>(null);

  useEffect(() => { fetch("/api/admin/stats").then(r => r.json()).then(setStats); }, []);

  const Card = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
    <div style={{ background: "#fff", borderRadius: "10px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)", borderLeft: `4px solid ${color}` }}>
      <p style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.4rem" }}>{label}</p>
      <p style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2744", margin: 0 }}>{value}</p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.5rem", margin: "0 0 0.2rem" }}>Analytics</h1>
        <p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>Platform overview and statistics</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <Card label="Total Users" value={stats?.totalUsers ?? "—"} color="#c9a84c" />
        <Card label="New This Week" value={stats?.newUsersThisWeek ?? "—"} color="#3498db" />
        <Card label="Total Donations" value={stats?.totalDonations ?? "—"} color="#27ae60" />
        <Card label="Total Revenue" value={`₦${(stats?.totalRevenue ?? 0).toLocaleString()}`} color="#9b59b6" />
        <Card label="Liturgical Readings" value={stats?.totalReadings ?? "—"} color="#e67e22" />
        <Card label="Prayer Intentions" value={stats?.totalIntentions ?? "—"} color="#e74c3c" />
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.07)" }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.1rem", margin: "0 0 1rem" }}>Platform Notes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { text: "Detailed page view analytics require Google Analytics integration.", color: "#3498db" },
            { text: "User growth charts will appear here as your user base grows.", color: "#27ae60" },
            { text: "Donation trends and recurring donor reports available after Paystack live mode.", color: "#c9a84c" },
          ].map((note, i) => (
            <div key={i} style={{ padding: "0.75rem 1rem", borderRadius: "8px", background: "#f8f8f6", borderLeft: `3px solid ${note.color}`, fontSize: "0.85rem", color: "#555" }}>
              {note.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
