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
