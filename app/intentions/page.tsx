"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Intention = {
  _id: string;
  author_name: string;
  title: string;
  description: string;
  prayer_count: number;
  prayed_by: string[];
  created_at: string;
};

export default function IntentionsPage() {
  const { data: session } = useSession();
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchIntentions();
  }, []);

  const fetchIntentions = async () => {
    try {
      const res = await fetch("/api/intentions");
      const data = await res.json();
      if (Array.isArray(data)) setIntentions(data);
    } catch (err) {
      console.error("Failed to load intentions");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostIntention = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/intentions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        fetchIntentions(); // Refresh list
      }
    } catch (err) {
      console.error("Failed to post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePray = async (id: string) => {
    if (!session?.user?.email) {
      alert("Please sign in to pray for intentions.");
      return;
    }

    // Optimistic UI update
    setIntentions(prev => prev.map(int => {
      if (int._id === id) {
        return {
          ...int,
          prayer_count: int.prayer_count + 1,
          prayed_by: [...int.prayed_by, session.user!.email!]
        };
      }
      return int;
    }));

    try {
      const res = await fetch(`/api/intentions/${id}/pray`, { method: "PUT" });
      if (!res.ok) {
        // Revert if failed (like if they already prayed)
        fetchIntentions();
      }
    } catch (err) {
      fetchIntentions();
    }
  };

  return (
    <div className="bg-parchment" style={{ minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div className="container-sacred" style={{ maxWidth: "800px", marginTop: "2rem" }}>
        
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--navy)", marginBottom: "0.5rem" }}>
            Prayer Intentions
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            "For where two or three gather in my name, there am I with them." (Matthew 18:20)
            <br /> Share your burdens and let the community pray for you.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Post Form */}
        <div className="sacred-card" style={{ padding: "2rem", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--navy)", marginBottom: "1rem" }}>
            Request a Prayer
          </h2>
          
          {session ? (
            <form onSubmit={handlePostIntention} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="text"
                placeholder="Title (e.g., For my mother's health)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
                  border: "1px solid rgba(201,168,76,0.5)", background: "rgba(255,255,255,0.8)",
                  fontSize: "1rem", fontFamily: "inherit"
                }}
              />
              <textarea
                placeholder="Describe your intention..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
                  border: "1px solid rgba(201,168,76,0.5)", background: "rgba(255,255,255,0.8)",
                  fontSize: "1rem", fontFamily: "inherit", resize: "vertical"
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-sacred"
                style={{ alignSelf: "flex-end", opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Posting..." : "Post Intention"}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", background: "rgba(201,168,76,0.1)", borderRadius: "8px" }}>
              <p style={{ color: "var(--navy)", marginBottom: "1rem" }}>You must be signed in to post a prayer request.</p>
              <Link href="/auth/login" className="btn-sacred">Sign In to Post</Link>
            </div>
          )}
        </div>

        {/* Intentions Feed */}
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--navy)", marginBottom: "1.5rem" }}>
          Community Intentions
        </h2>

        {isLoading ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading intentions...</p>
        ) : intentions.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No intentions posted yet. Be the first to share one.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {intentions.map((intention) => {
              const hasPrayed = session?.user?.email ? intention.prayed_by.includes(session.user.email) : false;
              const date = new Date(intention.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              
              return (
                <div key={intention._id} className="sacred-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--navy-dark)", marginBottom: "0.25rem", fontWeight: 700 }}>
                        {intention.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        Posted by <span style={{ fontWeight: 600 }}>{intention.author_name}</span> • {date}
                      </p>
                    </div>
                  </div>
                  
                  <p style={{ color: "var(--navy)", lineHeight: 1.6 }}>{intention.description}</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}></span>
                      <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
                        {intention.prayer_count} {intention.prayer_count === 1 ? "candle lit" : "candles lit"}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handlePray(intention._id)}
                      disabled={hasPrayed || !session}
                      style={{
                        padding: "0.5rem 1rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 700,
                        border: hasPrayed ? "1px solid transparent" : "1px solid var(--gold)",
                        background: hasPrayed ? "rgba(255, 153, 0, 0.1)" : "transparent",
                        color: hasPrayed ? "#d35400" : "var(--gold-dark)",
                        cursor: hasPrayed || !session ? "default" : "pointer",
                        transition: "all 0.3s ease",
                        display: "flex", alignItems: "center", gap: "0.4rem"
                      }}
                      onMouseEnter={(e) => {
                        if (!hasPrayed && session) {
                          e.currentTarget.style.background = "var(--gold)";
                          e.currentTarget.style.color = "var(--navy-dark)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!hasPrayed && session) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--gold-dark)";
                        }
                      }}
                    >
                      {hasPrayed ? (
                        <>
                          <span style={{ fontSize: "1.1rem" }}>�</span> Amen (Lit)
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: "1rem" }}></span> Light Candle
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
