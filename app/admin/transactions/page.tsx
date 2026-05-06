import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const metadata = { title: "Transactions | Admin Portal" };

export default async function TransactionsAdminPage() {
  await connectToDatabase();
  const donations = await Donation.find().sort({ createdAt: -1 });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
            Donation Transactions
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            View all successful donations made through Paystack.
          </p>
        </div>
        <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
          <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.9rem" }}>Total: {donations.length}</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "rgba(26,39,68,0.02)", borderBottom: "1px solid rgba(26,39,68,0.08)" }}>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Date</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Donor</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Email</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Amount (₦)</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Purpose</th>
              <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 700 }}>Reference</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d: any) => (
              <tr key={d._id.toString()} style={{ borderBottom: "1px solid rgba(26,39,68,0.04)" }}>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {new Date(d.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--navy)", fontWeight: 600 }}>
                  {d.donor_name}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {d.email}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.95rem", color: "var(--gold-dark)", fontWeight: 700 }}>
                  ₦{d.amount.toLocaleString()}
                </td>
                <td style={{ padding: "1rem", fontSize: "0.85rem" }}>
                  <span style={{ background: "rgba(26,39,68,0.05)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "var(--navy)" }}>{d.purpose}</span>
                </td>
                <td style={{ padding: "1rem", fontSize: "0.75rem", color: "rgba(0,0,0,0.4)", fontFamily: "monospace" }}>
                  {d.reference}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No donations have been made yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
