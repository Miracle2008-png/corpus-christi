"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const errorMessages: Record<string, { title: string; msg: string }> = {
  OAuthSignin:        { title: "OAuth Error",           msg: "There was a problem starting the sign-in process. This usually means the OAuth credentials are not yet configured on the server." },
  OAuthCallback:      { title: "OAuth Callback Error",  msg: "There was a problem with the sign-in callback. Make sure the redirect URI is correctly set in Google/Apple Console." },
  OAuthCreateAccount: { title: "Account Creation Error",msg: "Could not create your account via OAuth. Please try registering with email and password." },
  Callback:           { title: "Callback Error",        msg: "Something went wrong during the sign-in callback. Please try again." },
  OAuthAccountNotLinked: { title: "Account Not Linked", msg: "An account already exists with this email address using a different sign-in method. Please sign in with the original method." },
  EmailSignin:        { title: "Email Sign-In Error",   msg: "There was a problem sending the sign-in email. Please try again." },
  CredentialsSignin:  { title: "Invalid Credentials",   msg: "The email or password you entered is incorrect. Please try again." },
  SessionRequired:    { title: "Sign In Required",      msg: "You must be signed in to access this page." },
  default:            { title: "Authentication Error",  msg: "An unexpected error occurred during sign-in. Please try again or use email and password." },
};

function ErrorContent() {
  const params = useSearchParams();
  const errorCode = params.get("error") || "default";
  const info = errorMessages[errorCode] || errorMessages.default;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ fontSize: "3.5rem" }}></span>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", padding: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>
            {info.title}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.93rem" }}>
            {info.msg}
          </p>

          {(errorCode === "OAuthSignin" || errorCode === "OAuthCallback") && (
            <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>To enable Google Sign-In:</p>
              <ol style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: 1.8, paddingLeft: "1.2rem", margin: 0 }}>
                <li>Go to <strong style={{ color: "#fff" }}>console.cloud.google.com</strong></li>
                <li>Create an OAuth 2.0 Client ID</li>
                <li>Add <code style={{ color: "var(--gold)", fontSize: "0.75rem" }}>your-domain/api/auth/callback/google</code> as redirect URI</li>
                <li>Add <code style={{ color: "var(--gold)", fontSize: "0.75rem" }}>GOOGLE_CLIENT_ID</code> and <code style={{ color: "var(--gold)", fontSize: "0.75rem" }}>GOOGLE_CLIENT_SECRET</code> to Vercel environment variables</li>
              </ol>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link
              href="/auth/login"
              style={{ display: "block", padding: "0.875rem", background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "var(--navy-dark)", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}
            >
              ← Back to Sign In
            </Link>
            <Link
              href="/auth/register"
              style={{ display: "block", padding: "0.875rem", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Create Account with Email
            </Link>
          </div>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.8rem" }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff" }}>Loading...</span></div>}>
      <ErrorContent />
    </Suspense>
  );
}
