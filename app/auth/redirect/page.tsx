"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ADMIN_EMAILS = [
  "miraclechimdindu2008@gmail.com",
  "miraclechimdindu2025@gmail.com",
];

export default function PostSignInPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      window.location.href = "/auth/login";
      return;
    }

    // Authenticated — check email and redirect
    const email = session?.user?.email ?? "";
    const isAdmin = ADMIN_EMAILS.includes(email);
    window.location.href = isAdmin ? "/admin" : "/dashboard";
  }, [status, session]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "var(--navy-dark)", gap: "1.5rem"
    }}>
      <span style={{ fontSize: "2.5rem" }}>✝</span>
      <p style={{
        fontFamily: "var(--font-serif)", color: "var(--gold)",
        fontSize: "1.3rem", margin: 0
      }}>
        Signing you in...
      </p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: 0 }}>
        Please wait a moment.
      </p>
    </div>
  );
}
