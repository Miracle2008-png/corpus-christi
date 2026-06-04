import Link from "next/link";
import { headers } from "next/headers";

function capitalizeWords(str: string) {
  if (!str) return "";
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export const dynamic = "force-dynamic";

export default async function HymnsIndexPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  let hymns = [];
  try {
    const res = await fetch(`${protocol}://${host}/api/hymns`, {
      cache: "no-store"
    });
    if (res.ok) {
      hymns = await res.json();
    }
  } catch (error) {
    console.error("Failed to load hymns:", error);
  }

  // Group by category
  const categories: Record<string, any[]> = {};
  hymns.forEach((hymn: any) => {
    if (!categories[hymn.category]) {
      categories[hymn.category] = [];
    }
    categories[hymn.category].push(hymn);
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{
        background: "var(--navy-dark)",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
      }}>
        <div className="container-sacred" style={{ maxWidth: "800px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--gold)", marginBottom: "1rem" }}>
            Sacred Hymns
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
            A collection of traditional Catholic hymns, antiphons, and chants spanning centuries of Church history.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <div className="container-sacred" style={{ maxWidth: "1000px", padding: "4rem 1.5rem 6rem" }}>
        
        {Object.keys(categories).length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.1)" }}>
            No hymns available at this time.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {Object.entries(categories).sort().map(([category, catHymns]) => (
              <div key={category}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy-dark)" }}>
                    {capitalizeWords(category)} Hymns
                  </h2>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  {catHymns.map((hymn) => (
                    <Link
                      key={hymn._id}
                      href={`/hymns/${hymn.slug}`}
                      className="hymn-card"
                      style={{
                        background: "#fff",
                        border: "1px solid rgba(26,39,68,0.1)",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                      }}
                    >
                      <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.2rem", fontWeight: 700 }}>
                        {hymn.title}
                      </h3>
                      {hymn.author && (
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>
                          {hymn.author}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
