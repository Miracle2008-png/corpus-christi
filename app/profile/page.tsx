"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Bookmark { _id: string; item_type: string; item_title: string; item_url: string; createdAt: string; }

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetch("/api/user/bookmarks")
        .then(r => r.json())
        .then(d => { setBookmarks(Array.isArray(d) ? d : []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const removeBookmark = async (id: string) => {
    await fetch("/api/user/bookmarks", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) });
    setBookmarks(bookmarks.filter(b => b._id !== id));
  };

  if (status === "loading" || loading) return <div style={{ minHeight: "100vh", padding: "6rem 2rem", textAlign: "center", color: "var(--navy)", fontFamily: "var(--font-serif)" }}>Loading your profile...</div>;
  if (!session) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: "4rem" }}>
      <section style={{ background: "var(--navy)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--gold)", color: "var(--navy-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700, margin: "0 auto 1rem" }}>
          {session.user?.name?.charAt(0) || "U"}
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--white)", marginBottom: "0.5rem" }}>
          {session.user?.name}
        </h1>
        <p style={{ color: "var(--gold)", fontSize: "0.9rem" }}>{session.user?.email}</p>
        {(session.user as any)?.role === "admin" && (
          <Link href="/admin" style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1.5rem", border: "1px solid var(--gold)", color: "var(--gold)", borderRadius: "999px", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 }}>Go to Admin Portal</Link>
        )}
      </section>

      <div className="container-sacred" style={{ maxWidth: "800px", marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontSize: "1.5rem", margin: 0 }}>My Bookmarks</h2>
          <span style={{ background: "rgba(201,168,76,0.2)", color: "var(--gold-dark)", padding: "0.15rem 0.6rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>{bookmarks.length}</span>
        </div>

        {bookmarks.length === 0 ? (
          <div style={{ background: "#fff", padding: "3rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>You haven&apos;t saved anything yet.</p>
            <Link href="/library" className="btn-sacred">Explore the Library</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {bookmarks.map(b => (
              <div key={b._id} style={{ background: "#fff", padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-dark)", fontWeight: 700 }}>{b.item_type}</span>
                  <Link href={b.item_url} style={{ display: "block", color: "var(--navy)", fontFamily: "var(--font-serif)", fontSize: "1.1rem", textDecoration: "none", marginTop: "0.25rem" }}>{b.item_title}</Link>
                </div>
                <button onClick={() => removeBookmark(b._id)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline" }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
