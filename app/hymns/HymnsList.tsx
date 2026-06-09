"use client";

import { useState } from "react";
import Link from "next/link";

function capitalizeWords(str: string) {
  if (!str) return "";
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function HymnsList({ initialHymns }: { initialHymns: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHymns = initialHymns.filter((hymn) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      hymn.title.toLowerCase().includes(searchLower) ||
      (hymn.author && hymn.author.toLowerCase().includes(searchLower)) ||
      (hymn.category && hymn.category.toLowerCase().includes(searchLower))
    );
  });

  // Group by category
  const categories: Record<string, any[]> = {};
  filteredHymns.forEach((hymn) => {
    if (!categories[hymn.category]) {
      categories[hymn.category] = [];
    }
    categories[hymn.category].push(hymn);
  });

  return (
    <>
      {/* Search Bar */}
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search hymns by title, author, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "1rem 1.5rem",
            fontSize: "1.1rem",
            borderRadius: "50px",
            border: "1px solid rgba(26,39,68,0.2)",
            outline: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            fontFamily: "var(--font-sans)",
            color: "var(--navy-dark)",
            background: "#fff"
          }}
        />
      </div>

      {Object.keys(categories).length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "12px", border: "1px solid rgba(26,39,68,0.1)" }}>
          {searchQuery ? "No hymns match your search." : "No hymns available at this time."}
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
    </>
  );
}
