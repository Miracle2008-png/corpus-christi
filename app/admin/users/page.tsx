"use client";
import { useState, useEffect } from "react";

const thStyle: React.CSSProperties = {
  padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.7rem", textTransform: "uppercase",
  letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?page=${page}&limit=25&search=${search}`);
    const data = await res.json();
    setUsers(data.users || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [page, search]);

  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const action = currentRole === "admin" ? "Revoke admin from" : "Grant admin to";
    if (!confirm(`${action} this user?`)) return;
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: newRole }),
    });
    fetchUsers();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>User Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>View all registered accounts and manage privileges. Total: <strong>{total}</strong></p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ ...inputStyle, maxWidth: "400px", marginBottom: 0 }}
        />
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={thStyle}>Joined</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Provider</th>
              <th style={thStyle}>Role</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No users found.</td></tr>
            ) : users.map((u) => (
              <tr key={u._id} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ ...tdStyle, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: "var(--navy)" }}>{u.name}</td>
                <td style={{ ...tdStyle, color: "var(--text-muted)" }}>{u.email}</td>
                <td style={tdStyle}>
                  {u.authProvider === "google" ? (
                    <span style={{ fontSize: "0.7rem", background: "#4285F4", color: "#fff", padding: "0.1rem 0.4rem", borderRadius: "4px", fontWeight: 600 }}>Google</span>
                  ) : (
                    <span style={{ fontSize: "0.7rem", background: "rgba(26,39,68,0.08)", color: "var(--text-muted)", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>Email</span>
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={{
                    background: u.role === "admin" ? "rgba(201,168,76,0.15)" : "rgba(26,39,68,0.05)",
                    color: u.role === "admin" ? "var(--gold-dark)" : "var(--text-muted)",
                    fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", textTransform: "uppercase"
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <button onClick={() => toggleRole(u._id, u.role)} style={btnStyle(u.role === "admin" ? "var(--text-muted)" : "var(--navy)")}>
                    {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
