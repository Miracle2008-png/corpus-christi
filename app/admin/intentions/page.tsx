"use client";
import { useEffect, useState, useCallback } from "react";

interface Intention { _id: string; name: string; intention: string; isFeatured: boolean; isAnswered: boolean; prayCount: number; createdAt: string; }

export default function AdminIntentions() {
  const [items, setItems] = useState<Intention[]>([]);
  const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(""); const [loading, setLoading] = useState(true); const [acting, setActing] = useState<string | null>(null);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/intentions?page=${p}&filter=${filter}`);
    const d = await r.json(); setItems(d.items ?? []); setTotal(d.total ?? 0); setPages(d.pages ?? 1); setPage(p); setLoading(false);
  }, [filter]);

  useEffect(() => { load(1); }, [filter]);

  const act = async (_id: string, action: string) => {
    setActing(_id + action);
    await fetch("/api/admin/intentions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id, action }) });
    load(page); setActing(null);
  };

  const del = async (_id: string) => {
    if (!confirm("Delete this intention?")) return;
    await fetch("/api/admin/intentions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id }) }); load(page);
  };

  const Btn = ({ onClick, color, children, disabled }: { onClick: () => void; color: string; children: React.ReactNode; disabled?: boolean }) => (
    <button onClick={onClick} disabled={disabled} style={{ padding: "0.25rem 0.6rem", background: color, color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer", opacity: disabled ? 0.5 : 1 }}>{children}</button>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div><h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.5rem", margin: "0 0 0.2rem" }}>Prayer Intentions</h1><p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>{total} intentions</p></div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[["", "All"], ["featured", "Featured"], ["answered", "Answered"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ padding: "0.4rem 0.85rem", borderRadius: "6px", border: "1px solid #ddd", background: filter === v ? "#1a2744" : "#fff", color: filter === v ? "#fff" : "#333", cursor: "pointer", fontSize: "0.8rem" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead><tr style={{ background: "#f8f8f6", borderBottom: "1px solid #eee" }}>
            {["Name", "Intention", "Prayers", "Status", "Date", "Actions"].map(h => <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.75rem", textTransform: "uppercase" }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading...</td></tr>
              : items.length === 0 ? <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>No intentions found.</td></tr>
              : items.map((item, i) => (
                <tr key={item._id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1a2744" }}>{item.name || "Anonymous"}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#555", maxWidth: "300px" }}><p style={{ margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.intention}</p></td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>{item.prayCount}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {item.isAnswered && <span style={{ padding: "0.15rem 0.5rem", borderRadius: "20px", fontSize: "0.65rem", background: "#e8f5e9", color: "#2e7d32", marginRight: "0.25rem" }}>Answered</span>}
                    {item.isFeatured && <span style={{ padding: "0.15rem 0.5rem", borderRadius: "20px", fontSize: "0.65rem", background: "#fff3cd", color: "#856404" }}>Featured</span>}
                    {!item.isAnswered && !item.isFeatured && <span style={{ color: "#aaa", fontSize: "0.75rem" }}>—</span>}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#888" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                      {!item.isFeatured ? <Btn onClick={() => act(item._id, "feature")} color="#c9a84c" disabled={acting === item._id + "feature"}>Feature</Btn> : <Btn onClick={() => act(item._id, "unfeature")} color="#7f8c8d" disabled={acting === item._id + "unfeature"}>Unfeature</Btn>}
                      {!item.isAnswered && <Btn onClick={() => act(item._id, "markAnswered")} color="#27ae60" disabled={acting === item._id + "markAnswered"}>Answered</Btn>}
                      <Btn onClick={() => del(item._id)} color="#e74c3c">Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {pages > 1 && <div style={{ display: "flex", gap: "0.5rem", padding: "1rem", justifyContent: "center", borderTop: "1px solid #eee" }}>
          {[...Array(pages)].map((_, i) => <button key={i} onClick={() => load(i + 1)} style={{ padding: "0.4rem 0.75rem", borderRadius: "5px", border: "1px solid #ddd", background: page === i + 1 ? "#1a2744" : "#fff", color: page === i + 1 ? "#fff" : "#333", cursor: "pointer", fontSize: "0.8rem" }}>{i + 1}</button>)}
        </div>}
      </div>
    </div>
  );
}
