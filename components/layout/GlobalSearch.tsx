"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchResult = {
  title: string;
  type: string;
  url: string;
};

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced Search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search failed", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setQuery("");
      setResults([]);
    } else if (query.length === 0) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: isOpen ? "rgba(255,255,255,0.06)" : "transparent",
          border: isOpen ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
          borderRadius: "999px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: isOpen ? "220px" : "36px",
          height: "36px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={toggleOpen}
          style={{
            background: "none", border: "none", color: isOpen ? "var(--gold)" : "rgba(255,255,255,0.85)",
            width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={{
            background: "none", border: "none", color: "white", outline: "none",
            width: "100%", height: "100%", padding: "0 0.5rem 0 0",
            fontSize: "0.85rem", opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
            fontFamily: "inherit",
          }}
        />

        {isOpen && query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              padding: "0 0.5rem", cursor: "pointer", display: "flex", alignItems: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          width: "280px", background: "var(--navy-dark)",
          border: "1px solid rgba(201,168,76,0.3)", borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 9999, overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "16px", height: "16px", border: "2px solid rgba(201,168,76,0.2)", borderTopColor: "var(--gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div style={{ maxHeight: "350px", overflowY: "auto", padding: "0.5rem 0" }}>
              {results.map((res, i) => (
                <Link
                  key={i}
                  href={res.url}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block", padding: "0.6rem 1rem", textDecoration: "none",
                    borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.1rem" }}>
                    <span style={{ color: "var(--gold)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{res.type}</span>
                  </div>
                  <div style={{ color: "white", fontSize: "0.85rem", fontWeight: 500 }}>{res.title}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
