"use client";
import { useState, useRef, useEffect } from "react";

type Track = {
  title: string;
  label: string;
  src: string;
};

type AudioPlayerProps = {
  tracks: Track[];
  title?: string;
};

export default function AudioPlayer({ tracks, title = "Audio Guide" }: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      if (currentTrack < tracks.length - 1) {
        setCurrentTrack(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (dir: 1 | -1) => {
    const next = currentTrack + dir;
    if (next >= 0 && next < tracks.length) {
      setCurrentTrack(next);
      setIsPlaying(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration) {
      audioRef.current.currentTime = pct * duration;
    }
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{
      background: "linear-gradient(135deg, var(--navy-dark) 0%, #0a1628 100%)",
      border: "1px solid rgba(201,168,76,0.3)", borderRadius: "16px",
      padding: "1.25rem 1.5rem", marginTop: "1.5rem",
    }}>
      <audio ref={audioRef} src={tracks[currentTrack]?.src} preload="metadata" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>🎵</span>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {title}
            </div>
            <div style={{ fontSize: "0.95rem", color: "white", fontWeight: 600 }}>
              {tracks[currentTrack]?.label || tracks[currentTrack]?.title}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}
        >
          {isExpanded ? "▲ Less" : "▼ Tracklist"}
        </button>
      </div>

      {/* Progress Bar */}
      <div
        onClick={seek}
        style={{
          height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px",
          cursor: "pointer", position: "relative", marginBottom: "0.75rem",
        }}
      >
        <div style={{
          height: "100%", width: `${progress}%`, background: "var(--gold)",
          borderRadius: "2px", transition: "width 0.1s linear",
        }} />
      </div>

      {/* Time + Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => skipTrack(-1)}
            disabled={currentTrack === 0}
            style={{
              background: "none", border: "none", cursor: currentTrack === 0 ? "not-allowed" : "pointer",
              color: currentTrack === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
              fontSize: "1.1rem", padding: "0.25rem",
            }}
          >⏮</button>
          <button
            onClick={togglePlay}
            style={{
              width: "44px", height: "44px", borderRadius: "50%", border: "none",
              background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", color: "var(--navy-dark)", fontWeight: 700,
              boxShadow: "0 4px 15px rgba(201,168,76,0.3)", transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => skipTrack(1)}
            disabled={currentTrack === tracks.length - 1}
            style={{
              background: "none", border: "none", cursor: currentTrack === tracks.length - 1 ? "not-allowed" : "pointer",
              color: currentTrack === tracks.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
              fontSize: "1.1rem", padding: "0.25rem",
            }}
          >⏭</button>
        </div>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          {currentTrack + 1} / {tracks.length}
        </span>
      </div>

      {/* Expandable Tracklist */}
      {isExpanded && (
        <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
          {tracks.map((track, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentTrack(idx); setIsPlaying(true); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                width: "100%", background: idx === currentTrack ? "rgba(201,168,76,0.12)" : "transparent",
                border: idx === currentTrack ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
                borderRadius: "8px", padding: "0.6rem 0.75rem", cursor: "pointer",
                textAlign: "left", marginBottom: "0.4rem", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (idx !== currentTrack) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { if (idx !== currentTrack) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "0.8rem", color: "rgba(201,168,76,0.7)", minWidth: "1.5rem" }}>
                {idx === currentTrack && isPlaying ? "▶" : idx + 1}
              </span>
              <span style={{ fontSize: "0.9rem", color: idx === currentTrack ? "var(--gold)" : "rgba(255,255,255,0.8)" }}>
                {track.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
