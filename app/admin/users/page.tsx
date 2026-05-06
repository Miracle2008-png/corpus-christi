"use client";
import { useEffect, useState, useCallback } from "react";

interface User { _id: string; name: string; email: string; role: string; isBanned: boolean; createdAt: string; }

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const load = useCallback(async (p = 1, q = search) => {
    setLoading(true);
    const r = await fetch(`/api/admin/users?page=${p}&search=${encodeURIComponent(q)}`);
    const d = await r.json();
    setUsers(d.users ?? []); setTotal(d.total ?? 0); setPages(d.pages ?? 1); setPage(p);
    setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const act = async (userId: string, action: string) => {
    setActing(userId + action);
    await fetch("/api/admin/users", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, action }) });
    await load(page);
    setActing(null);
  };

  const del = async (userId: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setActing(userId + "del");
    await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }) });
    await load(page);
    setActing(null);
  };

  const Btn = ({ onClick, color, children, disabled }: { onClick: () => void; color: string; children: React.ReactNode; disabled?: boolean }) => (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: "0.25rem 0.6rem", borderRadius: "4px", border: "none", background: color, color: "#fff", fontSize: "0.7rem", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#1a2744", fontSize: "1.5rem", margin: "0 0 0.2rem" }}>User Management</h1>
          <p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>{total} total users</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(1, search)}
            placeholder="Search name or email..." style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #ddd", fontSize: "0.85rem", width: "220px" }} />
          <button onClick={() => load(1, search)} style={{ padding: "0.5rem 1rem", background: "#1a2744", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer" }}>Search</button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "#f8f8f6", borderBottom: "1px solid #eee" }}>
                {["Name", "Email", "Role", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#888" }}>No users found.</td></tr>
              ) : users.map((u, i) => (
                <tr key={u._id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1a2744" }}>{u.name}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#555" }}>{u.email}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: 700, background: u.role === "admin" ? "#fff3cd" : "#e8f5e9", color: u.role === "admin" ? "#856404" : "#2e7d32" }}>{u.role}</span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.7rem", fontWeight: 700, background: u.isBanned ? "#fde8e8" : "#e8f5e9", color: u.isBanned ? "#c0392b" : "#27ae60" }}>{u.isBanned ? "Banned" : "Active"}</span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#888" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {u.isBanned
                        ? <Btn onClick={() => act(u._id, "unban")} color="#27ae60" disabled={acting === u._id + "unban"}>Unban</Btn>
                        : <Btn onClick={() => act(u._id, "ban")} color="#e67e22" disabled={acting === u._id + "ban"}>Ban</Btn>
                      }
                      {u.role === "admin"
                        ? <Btn onClick={() => act(u._id, "removeAdmin")} color="#7f8c8d" disabled={acting === u._id + "removeAdmin"}>Remove Admin</Btn>
                        : <Btn onClick={() => act(u._id, "makeAdmin")} color="#2980b9" disabled={acting === u._id + "makeAdmin"}>Make Admin</Btn>
                      }
                      <Btn onClick={() => del(u._id, u.name)} color="#e74c3c" disabled={acting === u._id + "del"}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", padding: "1rem", justifyContent: "center", borderTop: "1px solid #eee" }}>
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => load(i + 1)} style={{ padding: "0.4rem 0.75rem", borderRadius: "5px", border: "1px solid #ddd", background: page === i + 1 ? "#1a2744" : "#fff", color: page === i + 1 ? "#fff" : "#333", cursor: "pointer", fontSize: "0.8rem" }}>{i + 1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
