import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import saintsData from "@/data/saints.json";

export const metadata: Metadata = {
  title: "Saints",
  description: "Explore the lives, miracles, and wisdom of Catholic saints. Full biographies, canonization details, patronages, and inspiring quotes.",
};

const categories = ["all", "martyr", "doctor", "confessor", "virgin", "bishop", "apostle", "pope", "other"];

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export default async function SaintsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category || "all";
  const search = params.search || "";
  const page = parseInt(params.page || "1");
  const perPage = 12;

  // Filter from static JSON (works offline)
  let saints = saintsData;
  if (search) {
    saints = saints.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.known_for.toLowerCase().includes(search.toLowerCase()) ||
        s.patron_of.some((p) => p.toLowerCase().includes(search.toLowerCase()))
    );
  }
  if (category !== "all") {
    saints = saints.filter((s) => s.category === category);
  }

  const total = saints.length;
  const pages = Math.ceil(total / perPage);
  const paginated = saints.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-parchment" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✝ Communion of Saints ✝</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)", marginBottom: "1rem" }}>
          The Saints of the Church
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Explore the lives of those who walked before us in holiness — martyrs, doctors, confessors, and virgins — now interceding for us in heaven.
        </p>

        {/* Search */}
        <form method="GET" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search saints by name, patronage..."
              className="sacred-input"
              style={{ flex: 1, background: "rgba(255,255,255,0.1)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.3)" }}
              id="saint-search"
            />
            <button type="submit" className="btn-sacred" style={{ whiteSpace: "nowrap" }}>Search</button>
          </div>
        </form>
      </section>

      {/* Category Filters */}
      <div style={{ background: "var(--navy-light)", borderBottom: "1px solid rgba(201,168,76,0.2)", overflowX: "auto" }}>
        <div className="container-sacred" style={{ display: "flex", gap: "0.25rem", padding: "0.75rem 1.5rem" }}>
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <Link
                key={cat}
                href={`/saints?category=${cat}${search ? `&search=${search}` : ""}`}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                  textTransform: "capitalize",
                  background: isActive ? "var(--gold)" : "transparent",
                  color: isActive ? "var(--navy-dark)" : "rgba(255,255,255,0.7)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.2s",
                }}
              >
                {cat === "all" ? "All Saints" : cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="container-sacred section-sacred">
        {/* Count */}
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          Showing {paginated.length} of {total} saints
          {search && ` matching "${search}"`}
          {category !== "all" && ` in ${category}`}
        </p>

        {paginated.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>✝</p>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "0.5rem" }}>No saints found</h2>
            <p style={{ color: "var(--text-muted)" }}>Try a different search or category.</p>
            <Link href="/saints" className="btn-sacred" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Clear filters</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {paginated.map((saint) => (
              <Link key={saint.slug} href={`/saints/${saint.slug}`} style={{ textDecoration: "none" }}>
                <article className="sacred-card" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* Image */}
                  <div style={{ position: "relative", height: "200px", background: "var(--navy)", overflow: "hidden" }}>
                    {saint.image_url ? (
                      <img
                        src={saint.image_url}
                        alt={`Painting of ${saint.name}`}
                        referrerPolicy="no-referrer"
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                        <span style={{ fontSize: "5rem", opacity: 0.3 }}>✝</span>
                      </div>
                    )}
                    {/* Category badge overlay */}
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
                      <span className={`badge-category badge-${saint.category}`}>
                        {saint.category}
                      </span>
                    </div>
                    {/* Feast day */}
                    {saint.feast_day && (
                      <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: "rgba(26,39,68,0.85)", borderRadius: "6px", padding: "0.2rem 0.6rem" }}>
                        <span style={{ color: "var(--gold)", fontSize: "0.7rem", fontWeight: 600 }}>⚜ {saint.feast_day}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--navy)", marginBottom: "0.4rem", lineHeight: 1.3 }}>
                      {saint.name}
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "0.75rem", flex: 1 }}>
                      {saint.known_for}
                    </p>
                    {saint.patron_of.length > 0 && (
                      <p style={{ fontSize: "0.75rem", color: "var(--gold-dark)", fontWeight: 600 }}>
                        Patron of: {saint.patron_of.slice(0, 2).join(", ")}{saint.patron_of.length > 2 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "3rem" }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/saints?category=${category}&search=${search}&page=${p}`}
                style={{
                  width: "40px", height: "40px", display: "flex", alignItems: "center",
                  justifyContent: "center", borderRadius: "8px", textDecoration: "none",
                  fontWeight: 600, fontSize: "0.875rem", transition: "all 0.2s",
                  background: p === page ? "var(--gold)" : "transparent",
                  color: p === page ? "var(--navy-dark)" : "var(--navy)",
                  border: p === page ? "none" : "1.5px solid rgba(201,168,76,0.3)",
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
