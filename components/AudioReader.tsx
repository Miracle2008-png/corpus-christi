"use client";
import { useState, useEffect, useRef } from "react";

interface AudioReaderProps {
  text: string;
  label?: string;
}

export default function AudioReader({ text, label = "Listen" }: AudioReaderProps) {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => { if (typeof window !== "undefined") window.speechSynthesis.cancel(); };
  }, []);

  const toggle = () => {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.88;
    utt.pitch = 1;
    // Try to use a natural-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("google"))
      || voices.find(v => v.lang.startsWith("en"))
      || voices[0];
    if (preferred) utt.voice = preferred;
    utt.onend = () => setPlaying(false);
    utt.onerror = () => setPlaying(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setPlaying(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: playing ? "var(--crimson)" : "rgba(201,168,76,0.12)",
        border: "1px solid rgba(201,168,76,0.3)",
        color: playing ? "#fff" : "var(--gold)",
        borderRadius: "999px", padding: "0.4rem 1rem",
        fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
        transition: "all 0.2s", letterSpacing: "0.05em",
      }}
    >
      {playing ? (
        <>
          <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "inline-block", width: "3px", background: "#fff",
                borderRadius: "2px", animation: `soundbar 0.6s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.2}s`,
                height: `${8 + i * 4}px`
              }} />
            ))}
          </span>
          Stop
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 1.5l9 4.5-9 4.5V1.5z"/>
          </svg>
          {label}
        </>
      )}
      <style>{`
        @keyframes soundbar {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1.5); }
        }
      `}</style>
    </button>
  );
}
