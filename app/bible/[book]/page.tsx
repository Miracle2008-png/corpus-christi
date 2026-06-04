import Link from "next/link";

const BIBLE_BOOKS = [
  // Old Testament (Pentateuch)
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  
  // Historical Books
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Tobit", chapters: 14, deuterocanonical: true },
  { name: "Judith", chapters: 16, deuterocanonical: true },
  { name: "Esther", chapters: 16 },
  { name: "1 Maccabees", chapters: 16, deuterocanonical: true },
  { name: "2 Maccabees", chapters: 15, deuterocanonical: true },

  // Wisdom Books
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Wisdom", chapters: 19, deuterocanonical: true },
  { name: "Sirach", chapters: 51, deuterocanonical: true },

  // Prophetic Books
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Baruch", chapters: 6, deuterocanonical: true },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 14 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },

  // New Testament
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
];

export async function generateStaticParams() {
  return BIBLE_BOOKS.map((book) => ({
    book: book.name.toLowerCase().replace(/ /g, "-"),
  }));
}

interface PageProps {
  params: Promise<{ book: string }>;
}

export default async function BookIndexPage({ params }: PageProps) {
  const resolvedParams = await params;
  const bookSlug = resolvedParams.book;
  
  const book = BIBLE_BOOKS.find(b => b.name.toLowerCase().replace(/ /g, "-") === bookSlug);
  
  if (!book) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ivory)" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Book not found</h2>
          <Link href="/bible" className="btn-sacred">Return to Bible Index</Link>
        </div>
      </div>
    );
  }

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Header */}
      <section style={{
        background: "var(--navy-dark)",
        padding: "4.5rem 1.5rem 3.5rem",
        textAlign: "center",
      }}>
        <div className="container-sacred" style={{ maxWidth: "800px" }}>
          <Link href="/bible" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", display: "inline-block", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.2)", padding: "0.3rem 0.8rem", borderRadius: "999px" }}>
            ← Back to Bible Index
          </Link>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--gold)", marginBottom: "0.5rem" }}>
            {book.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {book.chapters} Chapters
          </p>
          {book.deuterocanonical && (
            <p style={{ color: "#ff8080", fontSize: "0.85rem", marginTop: "1rem", background: "rgba(255,0,0,0.1)", padding: "0.5rem", borderRadius: "8px", display: "inline-block" }}>
              Note: The text for Deuterocanonical books may not be available in the default open API yet.
            </p>
          )}
        </div>
      </section>

      {/* Chapters Grid */}
      <div className="container-sacred" style={{ maxWidth: "1000px", padding: "4rem 1.5rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "1rem" }}>
          {chapters.map(chapter => (
            <Link
              key={chapter}
              href={`/bible/${bookSlug}/${chapter}`}
              className="chapter-link"
              style={{
                background: "#fff",
                border: "1px solid rgba(26,39,68,0.15)",
                borderRadius: "12px",
                padding: "1.25rem 0",
                textAlign: "center",
                textDecoration: "none",
                color: "var(--navy)",
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "var(--font-serif)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.2s"
              }}
            >
              {chapter}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
