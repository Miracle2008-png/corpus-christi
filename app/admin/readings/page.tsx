"use client";
import { useEffect, useState, useCallback } from "react";

interface Reading { _id: string; date: string; liturgical_season?: string; old_testament?: { reference: string; text: string }; psalm?: { reference: string; text: string; response?: string }; new_testament?: { reference: string; text: string }; gospel?: { reference: string; text: string }; gospel_reflection?: string; }

const emptyForm = { date: "", liturgical_season: "Ordinary Time", old_testament: { reference: "", text: "" }, psalm: { reference: "", text: "", response: "" }, new_testament: { reference: "", text: "" }, gospel: { reference: "", text: "" }, gospel_reflection: "" };

export default function AdminReadings() {
  const [items, setItems] = useState<Reading[]>([]);
  const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string, unknown>>(emptyForm); const [editing, setEditing] = useState<string | null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/readings?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items ?? []); setTotal(d.total ?? 0); setPages(d.pages ?? 1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/readings", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { ...form, _id: editing } : form) });
    setSaving(false); setShowForm(false); setEditing(null); setForm(emptyForm); load(page);
  };

  const del = async (_id: string) => {
    if (!confirm("Delete this reading?")) return;
    await fetch("/api/admin/readings", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id }) }); load(page);
  };

  const edit = (item: Reading) => { setForm(item as unknown as Record<string, unknown>); setEditing(item._id); setShowForm(true); };

  const inputStyle = { width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", boxSizing: "border-box" as const };
  const labelStyle = { display: "block" as const, fontSize: "0.75rem", fontWeight: 600 as const, color: "#555", marginBottom: "0.25rem" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div><h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.5rem", margin: "0 0 0.2rem" }}>Liturgical Readings</h1><p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>{total} total readings</p></div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load(1)} placeholder="Search by date (YYYY-MM-DD)..." style={{ ...inputStyle, width: "220px" }} />
          <button onClick={() => load(1)} style={{ padding: "0.5rem 1rem", background: "#1a2744", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>Search</button>
          <button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }} style={{ padding: "0.5rem 1rem", background: "#c9a84c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>+ Add Reading</button>
        </div>
      </div>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#1a2744", margin: "0 0 1.5rem" }}>{editing ? "Edit" : "Add"} Reading</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div><label style={labelStyle}>Date (YYYY-MM-DD)</label><input style={inputStyle} value={(form.date as string) || ""} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="2026-05-06" /></div>
              <div><label style={labelStyle}>Liturgical Season</label>
                <select style={inputStyle} value={(form.liturgical_season as string) || "Ordinary Time"} onChange={e => setForm(f => ({ ...f, liturgical_season: e.target.value }))}>
                  {["Ordinary Time", "Advent", "Christmas", "Lent", "Easter", "Pentecost"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            
            {/* Old Testament */}
            <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f8f8f6", borderRadius: "8px" }}>
              <p style={{ fontWeight: 700, color: "#1a2744", margin: "0 0 0.75rem", fontSize: "0.85rem" }}>Old Testament (First Reading)</p>
              <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Reference</label><input style={inputStyle} value={((form.old_testament as Record<string, string>)?.reference) || ""} onChange={e => setForm(f => ({ ...f, old_testament: { ...(f.old_testament as Record<string, string>), reference: e.target.value } }))} placeholder="e.g. Genesis 1:1-2"/></div>
              <label style={labelStyle}>Text</label><textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={((form.old_testament as Record<string, string>)?.text) || ""} onChange={e => setForm(f => ({ ...f, old_testament: { ...(f.old_testament as Record<string, string>), text: e.target.value } }))} />
            </div>

            {/* Psalm */}
            <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f8f8f6", borderRadius: "8px" }}>
              <p style={{ fontWeight: 700, color: "#1a2744", margin: "0 0 0.75rem", fontSize: "0.85rem" }}>Responsorial Psalm</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div><label style={labelStyle}>Reference</label><input style={inputStyle} value={((form.psalm as Record<string, string>)?.reference) || ""} onChange={e => setForm(f => ({ ...f, psalm: { ...(f.psalm as Record<string, string>), reference: e.target.value } }))} placeholder="e.g. Psalm 23:1-3"/></div>
                <div><label style={labelStyle}>Response</label><input style={inputStyle} value={((form.psalm as Record<string, string>)?.response) || ""} onChange={e => setForm(f => ({ ...f, psalm: { ...(f.psalm as Record<string, string>), response: e.target.value } }))} placeholder="e.g. The Lord is my shepherd."/></div>
              </div>
              <label style={labelStyle}>Text</label><textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={((form.psalm as Record<string, string>)?.text) || ""} onChange={e => setForm(f => ({ ...f, psalm: { ...(f.psalm as Record<string, string>), text: e.target.value } }))} />
            </div>

            {/* New Testament */}
            <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f8f8f6", borderRadius: "8px" }}>
              <p style={{ fontWeight: 700, color: "#1a2744", margin: "0 0 0.75rem", fontSize: "0.85rem" }}>New Testament (Second Reading)</p>
              <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Reference</label><input style={inputStyle} value={((form.new_testament as Record<string, string>)?.reference) || ""} onChange={e => setForm(f => ({ ...f, new_testament: { ...(f.new_testament as Record<string, string>), reference: e.target.value } }))} placeholder="e.g. Romans 8:28"/></div>
              <label style={labelStyle}>Text</label><textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={((form.new_testament as Record<string, string>)?.text) || ""} onChange={e => setForm(f => ({ ...f, new_testament: { ...(f.new_testament as Record<string, string>), text: e.target.value } }))} />
            </div>

            {/* Gospel */}
            <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f8f8f6", borderRadius: "8px" }}>
              <p style={{ fontWeight: 700, color: "#1a2744", margin: "0 0 0.75rem", fontSize: "0.85rem" }}>Gospel</p>
              <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Reference</label><input style={inputStyle} value={((form.gospel as Record<string, string>)?.reference) || ""} onChange={e => setForm(f => ({ ...f, gospel: { ...(f.gospel as Record<string, string>), reference: e.target.value } }))} placeholder="e.g. John 3:16"/></div>
              <label style={labelStyle}>Text</label><textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={((form.gospel as Record<string, string>)?.text) || ""} onChange={e => setForm(f => ({ ...f, gospel: { ...(f.gospel as Record<string, string>), text: e.target.value } }))} />
            </div>

            <div style={{ marginBottom: "1rem" }}><label style={labelStyle}>Gospel Reflection</label><textarea style={{ ...inputStyle, height: "100px", resize: "vertical" }} value={(form.gospel_reflection as string) || ""} onChange={e => setForm(f => ({ ...f, gospel_reflection: e.target.value }))} /></div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: "0.6rem 1.25rem", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>Cancel</button>
              <button onClick={save} disabled={saving || !form.date} style={{ padding: "0.6rem 1.25rem", background: "#1a2744", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600, opacity: (!form.date)?0.5:1 }}>{saving ? "Saving..." : "Save Reading"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead><tr style={{ background: "#f8f8f6", borderBottom: "1px solid #eee" }}>
              {["Date", "Season", "Gospel", "Actions"].map(h => <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.75rem", textTransform: "uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading...</td></tr>
                : items.length === 0 ? <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>No readings yet. Add one above.</td></tr>
                : items.map((item, i) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1a2744" }}>{item.date}</td>
                    <td style={{ padding: "0.75rem 1rem" }}><span style={{ padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", background: "#e8f5e9", color: "#2e7d32" }}>{item.liturgical_season || "—"}</span></td>
                    <td style={{ padding: "0.75rem 1rem", color: "#555" }}>{item.gospel?.reference || "—"}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button onClick={() => edit(item)} style={{ padding: "0.25rem 0.6rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => del(item._id)} style={{ padding: "0.25rem 0.6rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.7rem", cursor: "pointer" }}>Delete</button>
                      </div>
                    </td>
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
