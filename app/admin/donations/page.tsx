"use client";
import { useEffect, useState } from "react";

interface Donation { _id: string; name: string; email: string; amount: number; currency: string; reference: string; status: string; createdAt: string; }

export default function AdminDonations() {
  const [items, setItems] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [totalRevenue, setTotalRevenue] = useState(0); const [loading, setLoading] = useState(true);

  const load = async (p = 1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/donations?page=${p}`);
    const d = await r.json(); setItems(d.items ?? []); setTotal(d.total ?? 0); setPages(d.pages ?? 1); setPage(p); setTotalRevenue(d.totalRevenue ?? 0); setLoading(false);
  };

  useEffect(() => { load(1); }, []);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Amount", "Currency", "Reference", "Status", "Date"];
    const rows = items.map(d => [d.name, d.email, d.amount, d.currency, d.reference, d.status, new Date(d.createdAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "donations.csv"; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div><h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.5rem", margin: "0 0 0.2rem" }}>Donations</h1><p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>{total} donations · Total: ₦{totalRevenue.toLocaleString()}</p></div>
        <button onClick={exportCSV} style={{ padding: "0.5rem 1rem", background: "#27ae60", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>Export CSV</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: "#fff", borderRadius: "10px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", borderLeft: "4px solid #27ae60" }}>
          <p style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.4rem" }}>Total Revenue</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a2744", margin: 0 }}>₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "10px", padding: "1.25rem", border: "1px solid rgba(0,0,0,0.07)", borderLeft: "4px solid #3498db" }}>
          <p style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.4rem" }}>Total Donations</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a2744", margin: 0 }}>{total}</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead><tr style={{ background: "#f8f8f6", borderBottom: "1px solid #eee" }}>
              {["Donor", "Email", "Amount", "Status", "Reference", "Date"].map(h => <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.75rem", textTransform: "uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading...</td></tr>
                : items.length === 0 ? <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>No donations recorded yet.</td></tr>
                : items.map((item, i) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1a2744" }}>{item.name || "Anonymous"}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#555" }}>{item.email || "—"}</td>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#27ae60" }}>₦{(item.amount || 0).toLocaleString()}</td>
                    <td style={{ padding: "0.75rem 1rem" }}><span style={{ padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", background: item.status === "success" ? "#e8f5e9" : "#fde8e8", color: item.status === "success" ? "#2e7d32" : "#c0392b" }}>{item.status}</span></td>
                    <td style={{ padding: "0.75rem 1rem", color: "#888", fontSize: "0.75rem" }}>{item.reference}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#888" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && <div style={{ display: "flex", gap: "0.5rem", padding: "1rem", justifyContent: "center", borderTop: "1px solid #eee" }}>
          {[...Array(pages)].map((_, i) => <button key={i} onClick={() => load(i + 1)} style={{ padding: "0.4rem 0.75rem", borderRadius: "5px", border: "1px solid #ddd", background: page === i + 1 ? "#1a2744" : "#fff", color: page === i + 1 ? "#fff" : "#333", cursor: "pointer", fontSize: "0.8rem" }}>{i + 1}</button>)}
        </div>}
      </div>
    </div>
  );
}
