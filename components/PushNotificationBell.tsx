"use client";
import { useState, useEffect } from "react";

export default function PushNotificationBell() {
  const [mounted, setMounted] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      
      // Register service worker if not already
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch(console.error);
      }
    }
    setMounted(true);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm === "granted") {
        // Just a local simulation for now since there's no backend to push from
        new Notification("Corpus Christi", {
          body: "You'll now receive daily reminders for readings and feasts.",
          icon: "/icon-192x192.png",
        });
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
    }
  };

  if (!mounted || permission === "granted" || !("Notification" in window)) {
    return null; // Hide if already granted, not supported, or during SSR
  }

  return (
    <button
      onClick={requestPermission}
      title="Enable Daily Reminders"
      style={{
        background: "none",
        border: "none",
        color: "var(--gold)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        borderRadius: "50%",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    </button>
  );
}
