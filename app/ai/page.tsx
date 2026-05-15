"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "model";
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What does the Catholic Church teach about purgatory?",
  "Who is the Holy Spirit and what is His role?",
  "What is the significance of the Eucharist?",
  "Why do Catholics pray to saints?",
  "What does the Bible say about confession?",
  "Who was Mary Magdalene?",
  "What are the corporal works of mercy?",
  "How does the Rosary relate to Scripture?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);



  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError("");

    const userMessage: Message = { role: "user", text: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages, // send full history for context
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setMessages(prev => prev.slice(0, -1)); // remove the user message if failed
      } else {
        setMessages(prev => [...prev, { role: "model", text: data.reply }]);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatText = (text: string) => {
    // Convert **bold** to <strong>, and newlines to <br>
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .split("\n")
      .map((line, i) => `<span key="${i}">${line}</span>`)
      .join("<br />");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--parchment)" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy-dark) 0%, #0c1830 100%)",
        padding: "3rem 1.5rem 2rem",
        textAlign: "center",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}></div>
        <h1 style={{
          fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "var(--gold)", marginBottom: "0.5rem", letterSpacing: "0.02em",
        }}>
          Catholic AI Assistant
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto" }}>
          Ask anything about Scripture, the saints, Catholic doctrine, the sacraments, or Church history.
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          marginTop: "1rem", background: "rgba(201,168,76,0.1)",
          border: "1px solid rgba(201,168,76,0.25)", borderRadius: "999px",
          padding: "0.35rem 1rem", fontSize: "0.8rem", color: "rgba(201,168,76,0.9)",
        }}>
          <span style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
          Powered by Google Gemini · Grounded in the Catechism &amp; Scripture
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "2rem 1rem", maxWidth: "780px", width: "100%", margin: "0 auto" }}>

        {/* Welcome / Suggested Questions (shown only when no messages) */}
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1rem" }}>
              Here are some questions to get you started:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem" }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "white", border: "1px solid rgba(201,168,76,0.35)",
                    borderRadius: "10px", padding: "0.85rem 1rem", textAlign: "left",
                    cursor: "pointer", fontSize: "0.9rem", color: "var(--navy)",
                    transition: "all 0.2s", lineHeight: 1.4, fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <span style={{ color: "var(--gold)", marginRight: "0.5rem" }}>✦</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "0.75rem",
              }}
            >
              {msg.role === "model" && (
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, var(--navy-dark), var(--navy))",
                  border: "2px solid rgba(201,168,76,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.9rem", color: "var(--gold)",
                }}>
                                  </div>
              )}
              <div
                style={{
                  maxWidth: "75%", padding: "1rem 1.25rem", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, var(--navy-dark), var(--navy))"
                    : "white",
                  color: msg.role === "user" ? "white" : "var(--navy-dark)",
                  fontSize: "0.95rem", lineHeight: 1.7,
                  boxShadow: msg.role === "model" ? "0 2px 12px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,60,120,0.15)",
                  border: msg.role === "model" ? "1px solid rgba(201,168,76,0.2)" : "none",
                }}
              >
                {msg.role === "model" ? (
                  <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                ) : (
                  msg.text
                )}
              </div>
              {msg.role === "user" && (
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.85rem", color: "var(--navy-dark)", fontWeight: 700,
                }}>
                  You
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, var(--navy-dark), var(--navy))",
                border: "2px solid rgba(201,168,76,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", color: "var(--gold)",
              }}></div>
              <div style={{
                background: "white", border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "18px 18px 18px 4px", padding: "1rem 1.5rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "var(--gold)", display: "inline-block",
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: "10px", padding: "1rem 1.25rem", color: "#991b1b", fontSize: "0.9rem",
            }}>
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div style={{
        background: "white", borderTop: "1px solid rgba(201,168,76,0.2)",
        padding: "1rem", position: "sticky", bottom: 0,
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Scripture, doctrine, the saints..."
              rows={1}
              style={{
                width: "100%", padding: "0.85rem 1rem", borderRadius: "12px",
                border: "2px solid rgba(201,168,76,0.4)", background: "var(--parchment)",
                fontSize: "0.95rem", fontFamily: "inherit", resize: "none",
                outline: "none", lineHeight: 1.5, transition: "border-color 0.2s",
                minHeight: "48px", maxHeight: "120px", overflow: "auto",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)")}
            />
            <p style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: "0.3rem", paddingLeft: "0.25rem" }}>
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            style={{
              width: "50px", height: "50px", borderRadius: "12px", border: "none",
              background: input.trim() && !isLoading
                ? "linear-gradient(135deg, var(--gold-dark), var(--gold))"
                : "rgba(201,168,76,0.3)",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0, marginBottom: "24px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isLoading ? "#1a2744" : "rgba(100,100,100,0.5)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          This assistant provides Catholic theological guidance. Always consult your pastor for personal spiritual direction.{" "}
          <Link href="/catechism" style={{ color: "var(--gold-dark)", textDecoration: "none" }}>Read the Catechism →</Link>
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
