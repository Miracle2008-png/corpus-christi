"use client";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

const TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export default function SessionTimeoutWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only track timeout if the user is authenticated
    if (status !== "authenticated") return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // Silently log out and redirect to login with reason
        signOut({ callbackUrl: "/auth/login?reason=timeout" });
      }, TIMEOUT_MS);
    };

    // Initialize timer
    resetTimer();

    // Debounce the event listeners to avoid excessive resetting
    let debounceTimer: NodeJS.Timeout;
    const handleActivity = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(resetTimer, 500); // 500ms debounce
    };

    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(debounceTimer);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [status]);

  return <>{children}</>;
}
