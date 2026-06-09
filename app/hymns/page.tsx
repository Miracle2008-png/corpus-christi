import { headers } from "next/headers";
import HymnsList from "./HymnsList";
import connectDB from "@/lib/mongodb";
import Hymn from "@/models/Hymn";

export const dynamic = "force-dynamic";

export default async function HymnsIndexPage() {
  let hymns = [];
  try {
    await connectDB();
    const dbHymns = await Hymn.find({}).sort({ title: 1 }).lean();
    // Serialize to pass to client component safely
    hymns = JSON.parse(JSON.stringify(dbHymns));
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
