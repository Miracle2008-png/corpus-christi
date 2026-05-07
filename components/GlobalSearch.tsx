"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult { title: string; type: string; url: string; }

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setResults(await res.json());
      } catch {}
      setLoading(false);
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "0.4rem 1rem", width: "220px", transition: "all 0.2s" }}>
        <span style={{ fontSize: "0.8rem", marginRight: "0.5rem", opacity: 0.5 }}>�</span>
        <input 
          type="text" 
          placeholder="Search..." 
          value={query} 
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          style={{ background: "transparent", border: "none", color: "var(--white)", width: "100%", fontSize: "0.85rem", outline: "none" }}
        />
      </div>

      {isOpen && query.length >= 2 && (
        <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", right: 0, width: "300px", background: "var(--white)", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
          {loading ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>Searching...</div>
          ) : results.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>No results found</div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem 0" }}>
              {results.map((r, i) => (
                <li key={i}>
                  <Link href={r.url} onClick={() => setIsOpen(false)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", textDecoration: "none", transition: "background 0.15s" }}>
                    <span style={{ color: "var(--navy)", fontSize: "0.9rem", fontWeight: 500, fontFamily: "var(--font-serif)" }}>{r.title}</span>
                    <span style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold-dark)", fontSize: "0.65rem", padding: "0.2rem 0.5rem", borderRadius: "10px", textTransform: "uppercase", fontWeight: 700 }}>{r.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
