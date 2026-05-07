import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Catholic Library | Corpus Christi",
  description: "A curated library of classic Catholic texts — free, public domain, and readable in your browser. Augustine, Aquinas, Fulton Sheen, and more.",
};

const library = [
  {
    category: "Church Fathers",
    color: "#1a3f5c",
    icon: "",
    books: [
      {
        title: "Confessions",
        author: "St. Augustine of Hippo",
        year: "400 AD",
        desc: "The world's first spiritual autobiography — a raw, honest account of Augustine's journey from sin to God. One of the greatest books ever written.",
        pages: "~300 pages",
        url: "https://www.gutenberg.org/ebooks/3296",
        readUrl: "https://www.newadvent.org/fathers/1101.htm",
        quote: "Our heart is restless, until it repose in Thee.",
      },
      {
        title: "City of God",
        author: "St. Augustine of Hippo",
        year: "413–426 AD",
        desc: "Augustine's monumental defense of Christianity against pagan charges that Christianity caused the fall of Rome — and a profound theology of history.",
        pages: "~1,000 pages",
        url: "https://www.gutenberg.org/ebooks/45304",
        readUrl: "https://www.newadvent.org/fathers/1201.htm",
        quote: "Thou madest us for Thyself, and our heart is restless until it repose in Thee.",
      },
      {
        title: "On the Incarnation",
        author: "St. Athanasius",
        year: "318 AD",
        desc: "The seminal defense of the Incarnation and Resurrection — C.S. Lewis called it one of the greatest theological works of all time.",
        pages: "~80 pages",
        url: "https://www.ccel.org/ccel/athanasius/incarnation.html",
        readUrl: "https://www.ccel.org/ccel/athanasius/incarnation.html",
        quote: "The Son of God became man so that we might become God.",
      },
    ],
  },
  {
    category: "Scholastic Theology",
    color: "#3f1a5c",
    icon: "✦",
    books: [
      {
        title: "Summa Theologica (Selections)",
        author: "St. Thomas Aquinas",
        year: "1265–1274 AD",
        desc: "The greatest systematic work of Catholic theology. The Five Ways, the nature of God, the virtues, the sacraments — all in one encyclopedic masterwork.",
        pages: "~3,500 pages (full)",
        url: "https://www.gutenberg.org/ebooks/17897",
        readUrl: "https://www.newadvent.org/summa/",
        quote: "Love takes up where knowledge leaves off.",
      },
      {
        title: "The Imitation of Christ",
        author: "Thomas à Kempis",
        year: "1418 AD",
        desc: "After the Bible, the most widely read Christian book in history. A simple, direct guide to interior life and union with God — timeless across 600 years.",
        pages: "~200 pages",
        url: "https://www.gutenberg.org/ebooks/1653",
        readUrl: "https://www.ccel.org/ccel/kempis/imitation.html",
        quote: "What doth it profit thee to enter into deep discussion concerning the Holy Trinity, if thou lack humility?",
      },
    ],
  },
  {
    category: "Spiritual Classics",
    color: "#1a5c3f",
    icon: "+",
    books: [
      {
        title: "The Interior Castle",
        author: "St. Teresa of Ávila",
        year: "1577 AD",
        desc: "Teresa's masterpiece of mystical theology — a description of the soul's journey through seven 'mansions' toward union with God. Essential reading.",
        pages: "~230 pages",
        url: "https://www.gutenberg.org/ebooks/11644",
        readUrl: "https://www.ccel.org/ccel/teresa/castle2.html",
        quote: "The Lord doesn't care so much for the importance of our works as for the love with which they are done.",
      },
      {
        title: "Dark Night of the Soul",
        author: "St. John of the Cross",
        year: "1578 AD",
        desc: "A profound exploration of the soul's purification through spiritual desolation — one of the most psychologically penetrating works in Christian literature.",
        pages: "~130 pages",
        url: "https://www.gutenberg.org/ebooks/6206",
        readUrl: "https://www.ccel.org/ccel/john_of_the_cross/dark_night.html",
        quote: "In the evening of life, we will be judged on love alone.",
      },
      {
        title: "Introduction to the Devout Life",
        author: "St. Francis de Sales",
        year: "1609 AD",
        desc: "A practical guide to holiness for people living in the world — not just monks. One of the most accessible and warm works of Catholic spirituality.",
        pages: "~250 pages",
        url: "https://www.gutenberg.org/ebooks/17346",
        readUrl: "https://www.ccel.org/ccel/desales/devout_life.html",
        quote: "Be patient with everyone, but above all with yourself.",
      },
    ],
  },
  {
    category: "Modern Masters",
    color: "#5c1a1a",
    icon: "✦",
    books: [
      {
        title: "The Spirit of Catholicism",
        author: "Karl Adam",
        year: "1929",
        desc: "One of the finest introductions to Catholicism ever written — clear, joyful, and deeply theological. A book that has converted many.",
        pages: "~280 pages",
        url: "https://archive.org/details/spiritofcatholic00adamuoft",
        readUrl: "https://archive.org/details/spiritofcatholic00adamuoft",
        quote: "The Church is the living Christ in the world.",
      },
      {
        title: "Life of Christ",
        author: "Fulton J. Sheen",
        year: "1958",
        desc: "Bishop Sheen's luminous, literary retelling of the life of Jesus — more than biography, it is a meditation on the meaning of the Incarnation.",
        pages: "~400 pages",
        url: "https://archive.org/details/fulton-sheen-life-of-christ",
        readUrl: "https://archive.org/details/fulton-sheen-life-of-christ",
        quote: "The Incarnation is the meeting point of time and eternity.",
      },
      {
        title: "Orthodoxy",
        author: "G.K. Chesterton",
        year: "1908",
        desc: "Chesterton's brilliant, witty, paradoxical defense of Christianity — one of the most readable apologetics ever written. Joyful and razor-sharp.",
        pages: "~180 pages",
        url: "https://www.gutenberg.org/ebooks/130",
        readUrl: "https://www.gutenberg.org/ebooks/130",
        quote: "The Christian ideal has not been tried and found wanting; it has been found difficult and left untried.",
      },
    ],
  },
  {
    category: "Papal Documents",
    color: "#5c4a1a",
    icon: "+",
    books: [
      {
        title: "Rerum Novarum",
        author: "Pope Leo XIII",
        year: "1891",
        desc: "The founding document of Catholic Social Teaching — on the rights of workers, the limits of capitalism, and the dignity of labour.",
        pages: "~30 pages",
        url: "https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html",
        readUrl: "https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html",
        quote: "So important is this that the whole question of social conditions cannot be rightly understood without it.",
      },
      {
        title: "Fides et Ratio",
        author: "Pope John Paul II",
        year: "1998",
        desc: "John Paul II's masterful encyclical on the relationship between faith and reason — arguing they are not opposed but complementary.",
        pages: "~100 pages",
        url: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_15101998_fides-et-ratio.html",
        readUrl: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_15101998_fides-et-ratio.html",
        quote: "Faith and reason are like two wings on which the human spirit rises to the contemplation of truth.",
      },
    ],
  },
];

export default function LibraryPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #2d1a00 50%, #1a2740 100%)",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>✦ Public Domain ✦</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff", marginBottom: "1rem" }}>
          Free Catholic Library
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.75, fontSize: "0.97rem" }}>
          Two thousand years of Catholic genius — Augustine, Aquinas, Teresa, Sheen, Chesterton — available free, online, right now.
          Every book here is in the public domain or freely accessible.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {library.map(c => (
            <a key={c.category} href={`#${c.category.replace(/\s+/g,"-").toLowerCase()}`}
              style={{ color: "rgba(201,168,76,0.8)", fontSize: "0.78rem", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", textDecoration: "none", transition: "all 0.2s" }}>
              {c.category}
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {library.map(cat => (
          <section key={cat.category} id={cat.category.replace(/\s+/g,"-").toLowerCase()} style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: `2px solid ${cat.color}22` }}>
              <span style={{ fontSize: "1.5rem", color: cat.color }}>{cat.icon}</span>
              <h2 style={{ fontFamily: "var(--font-serif)", color: cat.color, fontSize: "1.5rem", margin: 0 }}>{cat.category}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {cat.books.map(book => (
                <article key={book.title} style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}>
                  <div style={{ background: cat.color, padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{book.year} · {book.pages}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.2rem", margin: "0 0 0.2rem" }}>{book.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", margin: 0 }}>{book.author}</p>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>{book.desc}</p>
                    <blockquote style={{
                      borderLeft: `3px solid ${cat.color}`,
                      paddingLeft: "0.75rem",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      color: "#444",
                      fontSize: "0.85rem",
                      margin: "0 0 1.25rem",
                      lineHeight: 1.6,
                    }}>
                      &ldquo;{book.quote}&rdquo;
                    </blockquote>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <a href={book.readUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: cat.color, color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        Read Online
                      </a>
                      <a href={book.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", border: `1px solid ${cat.color}`, color: cat.color, padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
                        onMouseEnter={e => { e.currentTarget.style.background = cat.color; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = cat.color; }}
                      >
                        ⬇ Download
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Know a great book we&apos;re missing?</p>
        <h2 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.75rem", marginBottom: "1rem" }}>More being added regularly</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          This library will grow continuously. Our goal is to make the entire Catholic intellectual tradition accessible to everyone, for free, forever.
        </p>
        <Link href="/intentions" className="btn-sacred">Submit a Prayer Intention</Link>
      </section>
    </div>
  );
}
