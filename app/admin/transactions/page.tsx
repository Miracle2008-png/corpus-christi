"use client";
import { useState, useEffect } from "react";

const thStyle: React.CSSProperties = {
  padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.7rem", textTransform: "uppercase",
  letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700
};
const tdStyle: React.CSSProperties = { padding: "0.75rem 1rem", fontSize: "0.85rem", verticalAlign: "middle" };

export default function AdminTransactionsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/donations");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.donations || [];
        setDonations(list);
        setTotalAmount(list.reduce((acc: number, d: any) => acc + (d.amount || 0), 0));
      } catch {
        setDonations([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>Donation Transactions</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>All donations made through the platform.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.15rem" }}>Total Records</p>
            <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>{donations.length}</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", padding: "0.5rem 1rem", borderRadius: "8px" }}>
            <p style={{ color: "var(--navy)", fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.15rem" }}>Total Revenue</p>
            <p style={{ color: "var(--navy-dark)", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>₦{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Donor</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Reference</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading...</td></tr>
            ) : donations.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No donations found.</td></tr>
            ) : donations.map((d, idx) => (
              <tr key={d._id || idx} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ ...tdStyle, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{new Date(d.createdAt).toLocaleString()}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: "var(--navy)" }}>{d.donor_name}</td>
                <td style={{ ...tdStyle, color: "var(--text-muted)" }}>{d.email}</td>
                <td style={{ ...tdStyle, fontWeight: 700, color: "var(--gold-dark)" }}>₦{(d.amount || 0).toLocaleString()}</td>
                <td style={tdStyle}>
                  <span style={{ background: "rgba(26,39,68,0.05)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", color: "var(--navy)" }}>{d.purpose}</span>
                </td>
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(0,0,0,0.4)" }}>{d.reference}</td>
                <td style={tdStyle}>
                  <span style={{ background: d.status === "success" ? "rgba(46,125,50,0.1)" : "rgba(255,0,0,0.05)", color: d.status === "success" ? "#2E7D32" : "var(--crimson)", padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
