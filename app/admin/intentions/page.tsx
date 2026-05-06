import connectToDatabase from "@/lib/mongodb";
import Intention from "@/models/Intention";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Prayer Intentions | Admin Portal" };

async function deleteIntention(formData: FormData) {
  "use server";
  await connectToDatabase();
  const id = formData.get("id");
  if (id) {
    await Intention.findByIdAndDelete(id);
    revalidatePath("/admin/intentions");
    revalidatePath("/intentions");
  }
}

export default async function IntentionsAdminPage() {
  await connectToDatabase();
  const intentions = await Intention.find().sort({ created_at: -1 });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
            Prayer Intentions
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            View and moderate all prayer requests posted by users.
          </p>
        </div>
        <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
          <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.9rem" }}>Total: {intentions.length}</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Date</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Author</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Title & Content</th>
              <th style={{ padding: "1rem", textAlign: "center", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Prayers</th>
              <th style={{ padding: "1rem", textAlign: "right", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {intentions.map((i: any) => (
              <tr key={i._id.toString()} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", verticalAlign: "top" }}>
                  {new Date(i.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--navy)", fontWeight: 600, verticalAlign: "top" }}>
                  {i.author_name}
                </td>
                <td style={{ padding: "1rem", verticalAlign: "top" }}>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{i.title}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5, maxWidth: "400px" }}>{i.description}</p>
                </td>
                <td style={{ padding: "1rem", textAlign: "center", verticalAlign: "top" }}>
                  <span style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", color: "var(--gold-dark)", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.85rem" }}>
                    {i.prayer_count}
                  </span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right", verticalAlign: "top" }}>
                  <form action={deleteIntention}>
                    <input type="hidden" name="id" value={i._id.toString()} />
                    <button type="submit" style={{ background: "rgba(139,26,26,0.1)", color: "var(--crimson)", border: "1px solid rgba(139,26,26,0.2)", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(139,26,26,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(139,26,26,0.1)"}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {intentions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No prayer intentions have been posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
