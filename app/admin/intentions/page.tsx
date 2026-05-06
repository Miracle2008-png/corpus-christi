"use client";
import { useState, useEffect } from "react";

const cardStyle: React.CSSProperties = {
  background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)", padding: 0
};
const thStyle: React.CSSProperties = {
  padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.7rem", textTransform: "uppercase",
  letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700
};
const tdStyle: React.CSSProperties = { padding: "0.75rem 1rem", fontSize: "0.85rem", verticalAlign: "middle" };
const btnStyle = (color: string): React.CSSProperties => ({
  background: "transparent", border: `1px solid ${color}`, color, padding: "0.35rem 0.7rem",
  borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600
});

export default function AdminIntentionsPage() {
  const [intentions, setIntentions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchIntentions = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/intentions?page=${page}&limit=20`);
    const data = await res.json();
    setIntentions(data.intentions || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => { fetchIntentions(); }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this prayer intention? This cannot be undone.")) return;
    await fetch(`/api/admin/intentions?id=${id}`, { method: "DELETE" });
    fetchIntentions();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>Prayer Intentions</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>View and moderate all prayer requests. Total: <strong>{total}</strong></p>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "750px" }}>
            <thead>
              <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Content</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Prayers</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading...</td></tr>
              ) : intentions.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No prayer intentions found.</td></tr>
              ) : intentions.map((i) => (
                <tr key={i._id} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                  <td style={{ ...tdStyle, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{new Date(i.created_at).toLocaleDateString()}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "var(--navy)" }}>{i.author_name}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: "var(--navy)" }}>{i.title}</td>
                  <td style={{ ...tdStyle, color: "var(--text-muted)", maxWidth: "300px" }}>
                    <p style={{ margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>{i.description}</p>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <span style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.8rem" }}>{i.prayer_count}</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <button onClick={() => handleDelete(i._id)} style={btnStyle("var(--crimson)")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={btnStyle("var(--navy)")}>Previous</button>
          <span style={{ padding: "0.35rem 0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={btnStyle("var(--navy)")}>Next</button>
        </div>
      )}
    </div>
  );
}
