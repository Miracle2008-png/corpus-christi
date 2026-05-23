import Link from "next/link";
import AudioReader from "@/components/AudioReader";

// This is just a helper for formatting
function capitalizeWords(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Fetch the Bible text from public API
async function getChapterText(book: string, chapter: string) {
  try {
    // bible-api.com uses standard book names, e.g. 'genesis 1'
    const query = `${book.replace(/-/g, '')} ${chapter}`;
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=web`, {
      next: { revalidate: 86400 * 30 }, // cache for 30 days
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch chapter");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Bible fetch error:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ book: string; chapter: string }>;
}

export default async function BibleChapterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { book: bookSlug, chapter } = resolvedParams;
  const bookName = capitalizeWords(bookSlug);
  
  const chapterData = await getChapterText(bookSlug, chapter);

  // Fallback for deuterocanonical or API errors
  if (!chapterData) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ivory)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "1rem" }}>
          {bookName} {chapter}
        </h1>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", background: "#fff", borderRadius: "16px", border: "1px solid rgba(26,39,68,0.1)" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📖</span>
          <p style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
            This text is not currently available in our primary offline database. 
            This often happens with the Deuterocanonical books (Tobit, Maccabees, Wisdom, Sirach, etc.) 
            which are not included in the standard open-source API we use.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href={`/bible/${bookSlug}`} className="btn-outline-sacred">
              Back to {bookName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Combine verses for audio reader
  const fullText = chapterData.verses.map((v: any) => v.text).join(" ");
  
  const chapNum = parseInt(chapter);
  const prevChapter = chapNum > 1 ? chapNum - 1 : null;
  const nextChapter = chapNum + 1; // Basic logic, some links might 404 if they go past end, which is fine, they can go back.

  return (
    <div style={{ minHeight: "100vh", background: "#fcfaf7" }}>
      {/* Top Navbar */}
      <div style={{ background: "var(--navy-dark)", padding: "1rem 1.5rem", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href={`/bible/${bookSlug}`} style={{ color: "var(--gold)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>←</span> {bookName} Index
          </Link>
          <div style={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700 }}>
            {bookName} {chapter}
          </div>
          <Link href="/bible" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem" }}>
            Bible Home
          </Link>
        </div>
      </div>

      {/* Reader Body */}
      <div className="container-sacred" style={{ maxWidth: "760px", padding: "3rem 1.5rem 6rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <AudioReader text={fullText} label="Listen to Chapter" />
        </div>

        <div style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontSize: "1.1rem", lineHeight: 2.1 }}>
          {chapterData.verses.map((verse: any) => (
            <span key={verse.verse} style={{ display: "inline" }}>
              <sup style={{ 
                color: "var(--gold-dark)", 
                fontWeight: 700, 
                fontSize: "0.65rem", 
                marginRight: "0.3rem", 
                marginLeft: verse.verse === 1 ? 0 : "0.5rem" 
              }}>
                {verse.verse}
              </sup>
              {verse.text}
            </span>
          ))}
        </div>

        {/* Translation Attribution */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(26,39,68,0.1)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
          <p>Text provided by Bible-API.com ({chapterData.translation_name})</p>
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", gap: "1rem" }}>
          {prevChapter ? (
            <Link 
              href={`/bible/${bookSlug}/${prevChapter}`}
              style={{ background: "#fff", border: "1px solid rgba(26,39,68,0.15)", padding: "0.8rem 1.5rem", borderRadius: "10px", color: "var(--navy)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}
            >
              ← Chapter {prevChapter}
            </Link>
          ) : <div />}
          
          <Link 
            href={`/bible/${bookSlug}/${nextChapter}`}
            style={{ background: "var(--navy)", border: "1px solid var(--navy)", padding: "0.8rem 1.5rem", borderRadius: "10px", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}
          >
            Chapter {nextChapter} →
          </Link>
        </div>
      </div>
    </div>
  );
}
