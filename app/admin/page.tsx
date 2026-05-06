import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Intention from "@/models/Intention";
import Donation from "@/models/Donation";

export default async function AdminDashboardOverview() {
  await connectToDatabase();
  
  // Fetch high-level stats
  const totalUsers = await User.countDocuments();
  const totalIntentions = await Intention.countDocuments();
  
  const donations = await Donation.find({ status: "success" });
  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  // Recent activity
  const recentDonations = await Donation.find({ status: "success" }).sort({ createdAt: -1 }).limit(5);
  const recentIntentions = await Intention.find().sort({ created_at: -1 }).limit(5);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
        Dashboard Overview
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
        Here is what is happening across the Corpus Christi platform today.
      </p>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {/* KPI 1 */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(26,39,68,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Total Users
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy)", lineHeight: 1 }}>
            {totalUsers.toLocaleString()}
          </p>
        </div>
        {/* KPI 2 */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(26,39,68,0.08)", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Total Prayers Posted
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy)", lineHeight: 1 }}>
            {totalIntentions.toLocaleString()}
          </p>
        </div>
        {/* KPI 3 */}
        <div style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 15px rgba(201,168,76,0.3)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Total Donations (NGN)
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", color: "var(--navy-dark)", lineHeight: 1 }}>
            ₦{totalDonationAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Recent Donations */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(26,39,68,0.08)", background: "rgba(26,39,68,0.02)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", margin: 0, fontSize: "1.1rem" }}>Recent Donations</h3>
          </div>
          <div style={{ padding: "1.5rem" }}>
            {recentDonations.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No donations yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {recentDonations.map((d: any) => (
                  <li key={d._id.toString()} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(26,39,68,0.05)", paddingBottom: "1rem" }}>
                    <div>
                      <p style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.95rem" }}>{d.donor_name}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{new Date(d.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700, color: "var(--gold-dark)" }}>₦{d.amount.toLocaleString()}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", background: "rgba(26,39,68,0.05)", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>{d.purpose}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Intentions */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(26,39,68,0.08)", background: "rgba(26,39,68,0.02)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", margin: 0, fontSize: "1.1rem" }}>Recent Prayer Posts</h3>
          </div>
          <div style={{ padding: "1.5rem" }}>
             {recentIntentions.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No intentions posted yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {recentIntentions.map((i: any) => (
                  <li key={i._id.toString()} style={{ borderBottom: "1px solid rgba(26,39,68,0.05)", paddingBottom: "1rem" }}>
                    <p style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{i.title}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{i.description}</p>
                    <p style={{ color: "rgba(201,168,76,0.9)", fontSize: "0.75rem", marginTop: "0.4rem", fontWeight: 600 }}>By: {i.author_name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
