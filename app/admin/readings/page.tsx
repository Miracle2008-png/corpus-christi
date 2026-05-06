"use client";
import { useState, useEffect } from "react";

const cardStyle: React.CSSProperties = {
  background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)", padding: "1.5rem"
};
const thStyle: React.CSSProperties = {
  padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.7rem", textTransform: "uppercase",
  letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700, whiteSpace: "nowrap"
};
const tdStyle: React.CSSProperties = { padding: "0.75rem 1rem", fontSize: "0.85rem", verticalAlign: "middle" };
const btnStyle = (color: string): React.CSSProperties => ({
  background: "transparent", border: `1px solid ${color}`, color, padding: "0.35rem 0.7rem",
  borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600
});
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.6rem 0.8rem", borderRadius: "6px",
  border: "1px solid rgba(26,39,68,0.15)", fontSize: "0.9rem", marginBottom: "0.75rem"
};
const textareaStyle: React.CSSProperties = {
  ...inputStyle, minHeight: "80px", fontFamily: "inherit", resize: "vertical"
};

export default function AdminReadingsPage() {
  const [readings, setReadings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Seed status
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState("");

  // Edit / Create modal
  const [showModal, setShowModal] = useState(false);
  const [editingReading, setEditingReading] = useState<any>(null);
  const [form, setForm] = useState({
    date: "", liturgical_season: "",
    ot_ref: "", ot_text: "",
    psalm_ref: "", psalm_text: "", psalm_response: "",
    nt_ref: "", nt_text: "",
    gospel_ref: "", gospel_text: "", gospel_reflection: ""
  });
  const [saving, setSaving] = useState(false);

  const fetchReadings = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/readings?page=${page}&limit=15&search=${search}`);
    const data = await res.json();
    setReadings(data.readings || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => { fetchReadings(); }, [page, search]);

  const openCreate = () => {
    setEditingReading(null);
    setForm({ date: "", liturgical_season: "", ot_ref: "", ot_text: "", psalm_ref: "", psalm_text: "", psalm_response: "", nt_ref: "", nt_text: "", gospel_ref: "", gospel_text: "", gospel_reflection: "" });
    setShowModal(true);
  };

  const openEdit = (r: any) => {
    setEditingReading(r);
    setForm({
      date: r.date || "",
      liturgical_season: r.liturgical_season || "",
      ot_ref: r.old_testament?.reference || "",
      ot_text: r.old_testament?.text || "",
      psalm_ref: r.psalm?.reference || "",
      psalm_text: r.psalm?.text || "",
      psalm_response: r.psalm?.response || "",
      nt_ref: r.new_testament?.reference || "",
      nt_text: r.new_testament?.text || "",
      gospel_ref: r.gospel?.reference || "",
      gospel_text: r.gospel?.text || "",
      gospel_reflection: r.gospel_reflection || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const body: any = {
      date: form.date,
      liturgical_season: form.liturgical_season,
      old_testament: { reference: form.ot_ref, text: form.ot_text },
      psalm: { reference: form.psalm_ref, text: form.psalm_text, response: form.psalm_response },
      new_testament: { reference: form.nt_ref, text: form.nt_text },
      gospel: { reference: form.gospel_ref, text: form.gospel_text },
      gospel_reflection: form.gospel_reflection,
    };

    if (editingReading) {
      body.id = editingReading._id;
      await fetch("/api/admin/readings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/admin/readings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setSaving(false);
    setShowModal(false);
    fetchReadings();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reading?")) return;
    await fetch(`/api/admin/readings?id=${id}`, { method: "DELETE" });
    fetchReadings();
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedStatus("Seeding readings to database...");
    try {
      const res = await fetch("/api/seed-readings", { method: "POST" });
      const data = await res.json();
      setSeedStatus(res.ok ? `Success! ${data.message}` : `Error: ${data.error}`);
      fetchReadings();
    } catch (e: any) {
      setSeedStatus(`Network error: ${e.message}`);
    }
    setSeedLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>Manage Readings</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Create, edit, and delete daily liturgical readings. Total: <strong>{total}</strong></p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={handleSeed} disabled={seedLoading} style={{ ...btnStyle("var(--navy)"), padding: "0.5rem 1rem" }}>
            {seedLoading ? "Seeding..." : "Seed All Readings"}
          </button>
          <button onClick={openCreate} style={{ background: "var(--navy)", color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}>
            + Add Reading
          </button>
        </div>
      </div>

      {seedStatus && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1.5rem", background: seedStatus.includes("Error") ? "rgba(255,0,0,0.05)" : "rgba(201,168,76,0.1)", border: `1px solid ${seedStatus.includes("Error") ? "rgba(255,0,0,0.2)" : "rgba(201,168,76,0.3)"}`, color: seedStatus.includes("Error") ? "var(--crimson)" : "var(--navy)", fontSize: "0.85rem", fontWeight: 600 }}>
          {seedStatus}
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by date, season, or reference..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ ...inputStyle, maxWidth: "400px", marginBottom: 0 }}
        />
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, padding: 0, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Season</th>
              <th style={thStyle}>Old Testament</th>
              <th style={thStyle}>Psalm</th>
              <th style={thStyle}>New Testament</th>
              <th style={thStyle}>Gospel</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading...</td></tr>
            ) : readings.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No readings found.</td></tr>
            ) : readings.map((r) => (
              <tr key={r._id} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ ...tdStyle, fontWeight: 600, color: "var(--navy)" }}>{r.date}</td>
                <td style={tdStyle}><span style={{ background: "rgba(201,168,76,0.1)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", color: "var(--gold-dark)" }}>{r.liturgical_season || "—"}</span></td>
                <td style={tdStyle}>{r.old_testament?.reference}</td>
                <td style={tdStyle}>{r.psalm?.reference}</td>
                <td style={tdStyle}>{r.new_testament?.reference}</td>
                <td style={tdStyle}>{r.gospel?.reference}</td>
                <td style={{ ...tdStyle, textAlign: "right", whiteSpace: "nowrap" }}>
                  <button onClick={() => openEdit(r)} style={btnStyle("var(--navy)")}>Edit</button>{" "}
                  <button onClick={() => handleDelete(r._id)} style={btnStyle("var(--crimson)")}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={btnStyle("var(--navy)")}>Previous</button>
          <span style={{ padding: "0.35rem 0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={btnStyle("var(--navy)")}>Next</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflow: "auto", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", margin: 0 }}>{editingReading ? "Edit Reading" : "Add New Reading"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-muted)" }}>×</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Date (YYYY-MM-DD)</label>
                <input style={inputStyle} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="2025-01-01" />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Liturgical Season</label>
                <input style={inputStyle} value={form.liturgical_season} onChange={e => setForm({ ...form, liturgical_season: e.target.value })} placeholder="Ordinary Time" />
              </div>
            </div>

            <h4 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem", fontSize: "0.9rem" }}>Old Testament</h4>
            <input style={inputStyle} value={form.ot_ref} onChange={e => setForm({ ...form, ot_ref: e.target.value })} placeholder="Reference (e.g. Genesis 1:1-5)" />
            <textarea style={textareaStyle} value={form.ot_text} onChange={e => setForm({ ...form, ot_text: e.target.value })} placeholder="Full reading text..." />

            <h4 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem", fontSize: "0.9rem" }}>Responsorial Psalm</h4>
            <input style={inputStyle} value={form.psalm_ref} onChange={e => setForm({ ...form, psalm_ref: e.target.value })} placeholder="Reference (e.g. Psalm 23)" />
            <textarea style={textareaStyle} value={form.psalm_text} onChange={e => setForm({ ...form, psalm_text: e.target.value })} placeholder="Psalm text..." />
            <input style={inputStyle} value={form.psalm_response} onChange={e => setForm({ ...form, psalm_response: e.target.value })} placeholder="Response (e.g. The Lord is my shepherd...)" />

            <h4 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem", fontSize: "0.9rem" }}>New Testament / Epistle</h4>
            <input style={inputStyle} value={form.nt_ref} onChange={e => setForm({ ...form, nt_ref: e.target.value })} placeholder="Reference (e.g. Romans 8:28-30)" />
            <textarea style={textareaStyle} value={form.nt_text} onChange={e => setForm({ ...form, nt_text: e.target.value })} placeholder="Epistle text..." />

            <h4 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem", fontSize: "0.9rem" }}>Gospel</h4>
            <input style={inputStyle} value={form.gospel_ref} onChange={e => setForm({ ...form, gospel_ref: e.target.value })} placeholder="Reference (e.g. Matthew 5:1-12)" />
            <textarea style={textareaStyle} value={form.gospel_text} onChange={e => setForm({ ...form, gospel_text: e.target.value })} placeholder="Gospel text..." />

            <h4 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem", fontSize: "0.9rem" }}>Gospel Reflection (Optional)</h4>
            <textarea style={textareaStyle} value={form.gospel_reflection} onChange={e => setForm({ ...form, gospel_reflection: e.target.value })} placeholder="Reflection on today's gospel..." />

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button onClick={() => setShowModal(false)} style={btnStyle("var(--text-muted)")}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ background: "var(--navy)", color: "#fff", border: "none", padding: "0.6rem 1.5rem", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", opacity: saving ? 0.7 : 1 }}>
                {saving ? "Saving..." : editingReading ? "Save Changes" : "Create Reading"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
