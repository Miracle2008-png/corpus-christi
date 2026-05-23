"use client";
import Link from "next/link";
import { useState } from "react";

const BIBLE_BOOKS = [
  // Old Testament (Pentateuch)
  { name: "Genesis", chapters: 50, category: "Pentateuch", type: "OT" },
  { name: "Exodus", chapters: 40, category: "Pentateuch", type: "OT" },
  { name: "Leviticus", chapters: 27, category: "Pentateuch", type: "OT" },
  { name: "Numbers", chapters: 36, category: "Pentateuch", type: "OT" },
  { name: "Deuteronomy", chapters: 34, category: "Pentateuch", type: "OT" },
  
  // Historical Books
  { name: "Joshua", chapters: 24, category: "Historical", type: "OT" },
  { name: "Judges", chapters: 21, category: "Historical", type: "OT" },
  { name: "Ruth", chapters: 4, category: "Historical", type: "OT" },
  { name: "1 Samuel", chapters: 31, category: "Historical", type: "OT" },
  { name: "2 Samuel", chapters: 24, category: "Historical", type: "OT" },
  { name: "1 Kings", chapters: 22, category: "Historical", type: "OT" },
  { name: "2 Kings", chapters: 25, category: "Historical", type: "OT" },
  { name: "1 Chronicles", chapters: 29, category: "Historical", type: "OT" },
  { name: "2 Chronicles", chapters: 36, category: "Historical", type: "OT" },
  { name: "Ezra", chapters: 10, category: "Historical", type: "OT" },
  { name: "Nehemiah", chapters: 13, category: "Historical", type: "OT" },
  { name: "Tobit", chapters: 14, category: "Historical", type: "OT", deuterocanonical: true },
  { name: "Judith", chapters: 16, category: "Historical", type: "OT", deuterocanonical: true },
  { name: "Esther", chapters: 16, category: "Historical", type: "OT" },
  { name: "1 Maccabees", chapters: 16, category: "Historical", type: "OT", deuterocanonical: true },
  { name: "2 Maccabees", chapters: 15, category: "Historical", type: "OT", deuterocanonical: true },

  // Wisdom Books
  { name: "Job", chapters: 42, category: "Wisdom", type: "OT" },
  { name: "Psalms", chapters: 150, category: "Wisdom", type: "OT" },
  { name: "Proverbs", chapters: 31, category: "Wisdom", type: "OT" },
  { name: "Ecclesiastes", chapters: 12, category: "Wisdom", type: "OT" },
  { name: "Song of Solomon", chapters: 8, category: "Wisdom", type: "OT" },
  { name: "Wisdom", chapters: 19, category: "Wisdom", type: "OT", deuterocanonical: true },
  { name: "Sirach", chapters: 51, category: "Wisdom", type: "OT", deuterocanonical: true },

  // Prophetic Books
  { name: "Isaiah", chapters: 66, category: "Prophetic", type: "OT" },
  { name: "Jeremiah", chapters: 52, category: "Prophetic", type: "OT" },
  { name: "Lamentations", chapters: 5, category: "Prophetic", type: "OT" },
  { name: "Baruch", chapters: 6, category: "Prophetic", type: "OT", deuterocanonical: true },
  { name: "Ezekiel", chapters: 48, category: "Prophetic", type: "OT" },
  { name: "Daniel", chapters: 14, category: "Prophetic", type: "OT" },
  { name: "Hosea", chapters: 14, category: "Prophetic", type: "OT" },
  { name: "Joel", chapters: 3, category: "Prophetic", type: "OT" },
  { name: "Amos", chapters: 9, category: "Prophetic", type: "OT" },
  { name: "Obadiah", chapters: 1, category: "Prophetic", type: "OT" },
  { name: "Jonah", chapters: 4, category: "Prophetic", type: "OT" },
  { name: "Micah", chapters: 7, category: "Prophetic", type: "OT" },
  { name: "Nahum", chapters: 3, category: "Prophetic", type: "OT" },
  { name: "Habakkuk", chapters: 3, category: "Prophetic", type: "OT" },
  { name: "Zephaniah", chapters: 3, category: "Prophetic", type: "OT" },
  { name: "Haggai", chapters: 2, category: "Prophetic", type: "OT" },
  { name: "Zechariah", chapters: 14, category: "Prophetic", type: "OT" },
  { name: "Malachi", chapters: 4, category: "Prophetic", type: "OT" },

  // New Testament - Gospels & Acts
  { name: "Matthew", chapters: 28, category: "Gospels", type: "NT" },
  { name: "Mark", chapters: 16, category: "Gospels", type: "NT" },
  { name: "Luke", chapters: 24, category: "Gospels", type: "NT" },
  { name: "John", chapters: 21, category: "Gospels", type: "NT" },
  { name: "Acts", chapters: 28, category: "History", type: "NT" },

  // Epistles of Paul
  { name: "Romans", chapters: 16, category: "Pauline Epistles", type: "NT" },
  { name: "1 Corinthians", chapters: 16, category: "Pauline Epistles", type: "NT" },
  { name: "2 Corinthians", chapters: 13, category: "Pauline Epistles", type: "NT" },
  { name: "Galatians", chapters: 6, category: "Pauline Epistles", type: "NT" },
  { name: "Ephesians", chapters: 6, category: "Pauline Epistles", type: "NT" },
  { name: "Philippians", chapters: 4, category: "Pauline Epistles", type: "NT" },
  { name: "Colossians", chapters: 4, category: "Pauline Epistles", type: "NT" },
  { name: "1 Thessalonians", chapters: 5, category: "Pauline Epistles", type: "NT" },
  { name: "2 Thessalonians", chapters: 3, category: "Pauline Epistles", type: "NT" },
  { name: "1 Timothy", chapters: 6, category: "Pauline Epistles", type: "NT" },
  { name: "2 Timothy", chapters: 4, category: "Pauline Epistles", type: "NT" },
  { name: "Titus", chapters: 3, category: "Pauline Epistles", type: "NT" },
  { name: "Philemon", chapters: 1, category: "Pauline Epistles", type: "NT" },
  { name: "Hebrews", chapters: 13, category: "Pauline Epistles", type: "NT" },

  // Catholic Epistles & Revelation
  { name: "James", chapters: 5, category: "Catholic Epistles", type: "NT" },
  { name: "1 Peter", chapters: 5, category: "Catholic Epistles", type: "NT" },
  { name: "2 Peter", chapters: 3, category: "Catholic Epistles", type: "NT" },
  { name: "1 John", chapters: 5, category: "Catholic Epistles", type: "NT" },
  { name: "2 John", chapters: 1, category: "Catholic Epistles", type: "NT" },
  { name: "3 John", chapters: 1, category: "Catholic Epistles", type: "NT" },
  { name: "Jude", chapters: 1, category: "Catholic Epistles", type: "NT" },
  { name: "Revelation", chapters: 22, category: "Apocalyptic", type: "NT" },
];

export default function BibleIndexPage() {
  const [filter, setFilter] = useState<"ALL" | "OT" | "NT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = BIBLE_BOOKS.filter(book => {
    if (filter !== "ALL" && book.type !== filter) return false;
    if (searchQuery && !book.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categories = Array.from(new Set(filteredBooks.map(b => b.category)));

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "4rem" }}>
      {/* Header */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy-dark) 0%, #0f1f3d 50%, #1a0a0a 100%)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
        position: "relative"
      }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ The Word of God ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Holy Bible
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
          The complete Catholic Bible with all 73 canonical books. Read, reflect, and listen to the Living Word.
        </p>

        {/* Filters */}
        <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.05)", padding: "0.4rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)" }}>
            {(["ALL", "OT", "NT"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? "var(--gold)" : "transparent",
                  color: filter === f ? "var(--navy-dark)" : "#fff",
                  border: "none", padding: "0.4rem 1.2rem", borderRadius: "999px",
                  fontSize: "0.8rem", fontWeight: filter === f ? 700 : 500, cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {f === "ALL" ? "All Books" : f === "OT" ? "Old Testament" : "New Testament"}
              </button>
            ))}
          </div>
          
          <input 
            type="text" 
            placeholder="Search book..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: "0.6rem 1.2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", 
              background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none", fontSize: "0.85rem",
              width: "100%", maxWidth: "250px"
            }}
          />
        </div>
      </section>

      {/* Book Grid */}
      <div className="container-sacred" style={{ maxWidth: "1100px", padding: "3rem 1.5rem" }}>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.5rem", marginBottom: "1rem", borderBottom: "2px solid rgba(26,39,68,0.1)", paddingBottom: "0.5rem" }}>
              {category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {filteredBooks.filter(b => b.category === category).map(book => (
                <Link
                  key={book.name}
                  href={`/bible/${book.name.toLowerCase().replace(/ /g, "-")}`}
                  style={{
                    background: "#fff", border: "1px solid rgba(26,39,68,0.1)", borderRadius: "12px",
                    padding: "1.25rem", textDecoration: "none", display: "flex", justifyContent: "space-between",
                    alignItems: "center", transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    position: "relative", overflow: "hidden"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,39,68,0.1)"; e.currentTarget.style.transform = "none"; }}
                >
                  {book.deuterocanonical && (
                    <div style={{ position: "absolute", top: 0, right: 0, background: "var(--gold)", color: "#fff", fontSize: "0.5rem", fontWeight: 700, padding: "0.1rem 0.4rem", borderBottomLeftRadius: "8px", textTransform: "uppercase" }}>
                      Deuterocanonical
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.1rem", margin: "0 0 0.25rem" }}>
                      {book.name}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {book.chapters} Chapters
                    </p>
                  </div>
                  <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            <p>No books found matching "{searchQuery}".</p>
            <button onClick={() => setSearchQuery("")} style={{ background: "var(--navy)", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", marginTop: "1rem", cursor: "pointer" }}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
