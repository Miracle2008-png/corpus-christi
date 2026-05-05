import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "My Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Mock data for the dashboard until backend integration is complete
  const mockDonations = [
    { id: "DON-8492", date: "May 1, 2026", amount: "₦5,000", status: "Successful", project: "General Ministry Fund" },
    { id: "DON-7310", date: "April 15, 2026", amount: "₦2,000", status: "Successful", project: "E-Library Expansion" },
  ];

  const mockSavedPrayers = [
    { title: "The Holy Rosary", path: "/rosary" },
    { title: "Novena to St. Jude", path: "/novenas" },
    { title: "Prayer of St. Francis", path: "/prayers" },
  ];

  return (
    <div className="bg-parchment" style={{ minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div className="container-sacred" style={{ maxWidth: "1000px", marginTop: "2rem" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--navy)", marginBottom: "0.5rem" }}>
            My Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Welcome back, {session.user.name || "faithful friend"}.
          </p>
          <div className="gold-divider" style={{ marginLeft: 0, marginTop: "1rem" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          {/* Profile Overview Card */}
          <div className="sacred-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--gold)" }}>✦</span> Account Details
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Name</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>{session.user.name}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Email</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>{session.user.email}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Member Since</p>
                <p style={{ fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 600 }}>2026</p>
              </div>
            </div>
          </div>

          {/* Saved Content Card */}
          <div className="sacred-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--gold)" }}>✦</span> Saved Prayers
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {mockSavedPrayers.map((prayer, i) => (
                <Link key={i} href={prayer.path} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "1rem", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "rgba(255,255,255,0.5)", transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.background = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.5)"; }}
                  >
                    <span style={{ color: "var(--navy-dark)", fontWeight: 600 }}>{prayer.title}</span>
                    <span style={{ color: "var(--gold)" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <Link href="/prayers" style={{ color: "var(--gold-dark)", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                Browse more prayers
              </Link>
            </div>
          </div>
        </div>

        {/* Donation History Section */}
        <div id="donations" style={{ marginTop: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--navy)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--gold)" }}>✦</span> My Donations
          </h2>
          
          <div className="sacred-card" style={{ overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ background: "rgba(201,168,76,0.1)", borderBottom: "2px solid rgba(201,168,76,0.3)" }}>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--navy-dark)", fontSize: "0.9rem", fontWeight: 700 }}>Reference</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--navy-dark)", fontSize: "0.9rem", fontWeight: 700 }}>Date</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--navy-dark)", fontSize: "0.9rem", fontWeight: 700 }}>Amount</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--navy-dark)", fontSize: "0.9rem", fontWeight: 700 }}>Project</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--navy-dark)", fontSize: "0.9rem", fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDonations.map((donation, i) => (
                    <tr key={donation.id} style={{ borderBottom: i === mockDonations.length - 1 ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>{donation.id}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--navy)", fontSize: "0.9rem", fontWeight: 600 }}>{donation.date}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--navy)", fontSize: "1rem", fontWeight: 700 }}>{donation.amount}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>{donation.project}</td>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <span style={{ 
                          background: "rgba(34, 197, 94, 0.1)", color: "#166534", 
                          padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 
                        }}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <Link href="/donate" className="btn-sacred" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
              Make a New Donation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
