import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export const metadata = { title: "User Management | Admin Portal" };

async function toggleRole(formData: FormData) {
  "use server";
  await connectToDatabase();
  const id = formData.get("id");
  const currentRole = formData.get("currentRole");
  
  if (id && currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await User.findByIdAndUpdate(id, { role: newRole });
    revalidatePath("/admin/users");
  }
}

export default async function UsersAdminPage() {
  await connectToDatabase();
  const users = await User.find().sort({ createdAt: -1 });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
            User Management
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            View all registered accounts and manage administrative privileges.
          </p>
        </div>
        <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
          <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.9rem" }}>Total Users: {users.length}</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Joined</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Name</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Email</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Role</th>
              <th style={{ padding: "1rem", textAlign: "right", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id.toString()} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", verticalAlign: "middle" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--navy)", fontWeight: 600, verticalAlign: "middle" }}>
                  {u.name}
                  {u.authProvider === "google" && <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "#4285F4", color: "white", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>G</span>}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", verticalAlign: "middle" }}>
                  {u.email}
                </td>
                <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                  <span style={{ 
                    display: "inline-block", 
                    background: u.role === "admin" ? "rgba(201,168,76,0.15)" : "rgba(26,39,68,0.05)", 
                    color: u.role === "admin" ? "var(--gold-dark)" : "var(--text-muted)", 
                    fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem", textTransform: "uppercase" 
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right", verticalAlign: "middle" }}>
                  <form action={toggleRole}>
                    <input type="hidden" name="id" value={u._id.toString()} />
                    <input type="hidden" name="currentRole" value={u.role} />
                    <button type="submit" style={{ 
                      background: "transparent", 
                      color: u.role === "admin" ? "var(--text-muted)" : "var(--navy)", 
                      border: `1px solid ${u.role === "admin" ? "rgba(0,0,0,0.2)" : "var(--navy)"}`, 
                      padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, transition: "all 0.2s" 
                    }}>
                      {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
