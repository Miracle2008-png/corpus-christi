"use client";
import { useState } from "react";

export default function AdminReadingsPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSeedReadings = async () => {
    setLoading(true);
    setStatus("Seeding readings to database...");
    try {
      const res = await fetch("/api/seed-readings", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatus(`Success! ${data.message}`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setStatus(`Network error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
          Manage Readings
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Administrative tools for managing the liturgical readings database.
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", padding: "2rem", maxWidth: "600px" }}>
        <h3 style={{ color: "var(--navy)", margin: "0 0 1rem", fontFamily: "var(--font-serif)" }}>Database Actions</h3>
        
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Use the button below to seed the database with the full 365-day liturgical readings data. 
          If the readings already exist, they will be preserved to prevent duplication.
        </p>

        <button
          onClick={handleSeedReadings}
          disabled={loading}
          className="btn-sacred"
          style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Processing..." : "Seed Readings to Database"}
        </button>

        {status && (
          <div style={{ 
            marginTop: "1.5rem", padding: "1rem", borderRadius: "8px",
            background: status.includes("Error") ? "rgba(255,0,0,0.05)" : "rgba(201,168,76,0.1)",
            border: `1px solid ${status.includes("Error") ? "rgba(255,0,0,0.2)" : "rgba(201,168,76,0.3)"}`,
            color: status.includes("Error") ? "var(--crimson)" : "var(--navy-dark)",
            fontSize: "0.9rem", fontWeight: 600
          }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
