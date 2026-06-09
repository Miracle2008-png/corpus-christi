import { headers } from "next/headers";
import HymnsList from "./HymnsList";

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
        <HymnsList initialHymns={hymns} />
      </div>
    </div>
  );
}
