"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "3rem", color: "var(--gold)" }}>✝</span>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.75rem", marginTop: "0.5rem" }}>Corpus Christi</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", padding: "2.5rem" }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "rgba(139,26,26,0.15)", border: "1px solid rgba(139,26,26,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
                <p style={{ color: "#ff6b6b", fontSize: "0.875rem" }}>{error}</p>
              </div>
            )}

            <div style={{ marginBottom: "1.25rem" }}>
              <label htmlFor="login-email" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="sacred-input"
                placeholder="your@email.com"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }}
              />
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="login-password" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="sacred-input"
                placeholder="Your password"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }}
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-sacred"
              style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in..." : "✝ Sign In"}
            </button>
          </form>

          <div style={{ margin: "2rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.2)" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.2)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "0.875rem", background: "#fff", color: "#333", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button
              onClick={() => signIn("apple", { callbackUrl: "/" })}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "0.875rem", background: "#000", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 12.0163 7.21808 16.5161 7.21808C16.5161 7.21808 17.0694 2 12 2ZM9.85199 7.42651C7.8188 7.42651 6.51594 8.79093 5.48671 10.3708C3.76633 13.0118 3.5222 17.5855 5.86068 20.8521C6.70034 22.0256 7.6833 23 8.94829 23C10.1554 23 10.5843 22.1872 12.1645 22.1872C13.7144 22.1872 14.1166 23 15.4208 23C16.7118 23 17.7601 21.8488 18.5298 20.7303C19.4673 19.3627 19.8524 18.0401 19.8732 17.9351C19.8247 17.915 16.9248 16.8041 16.897 13.4357C16.8715 10.596 19.2319 9.20815 19.3409 9.14588C17.9388 7.09886 15.6565 6.84074 14.9224 6.81181C13.5678 6.66699 12.247 7.61869 11.5307 7.61869C10.7966 7.61869 9.85199 7.42651 9.85199 7.42651Z"/></svg>
              Apple
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            No account?{" "}
            <Link href="/auth/register" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>
              Create one
            </Link>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.8rem" }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
