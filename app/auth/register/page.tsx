"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed."); setLoading(false); return; }
      router.push("/auth/login?registered=1");
    } catch { setError("Network error. Please try again."); setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "3rem", color: "var(--gold)" }}>✝</span>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--white)", fontSize: "1.75rem", marginTop: "0.5rem" }}>Join Corpus Christi</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>Create your free account</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", padding: "2.5rem" }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "rgba(139,26,26,0.15)", border: "1px solid rgba(139,26,26,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
                <p style={{ color: "#ff6b6b", fontSize: "0.875rem" }}>{error}</p>
              </div>
            )}

            {[
              { id: "reg-name", label: "Full Name", type: "text", key: "name", placeholder: "Your name" },
              { id: "reg-email", label: "Email", type: "email", key: "email", placeholder: "your@email.com" },
              { id: "reg-password", label: "Password", type: "password", key: "password", placeholder: "Min. 8 characters" },
              { id: "reg-confirm", label: "Confirm Password", type: "password", key: "confirm", placeholder: "Repeat password" },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: "1.25rem" }}>
                <label htmlFor={field.id} style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="sacred-input"
                  placeholder={field.placeholder}
                  style={{ background: "rgba(255,255,255,0.08)", color: "var(--white)", border: "1.5px solid rgba(201,168,76,0.25)" }}
                />
              </div>
            ))}

            <button id="register-submit" type="submit" disabled={loading} className="btn-sacred" style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}>
              {loading ? "Creating account..." : "✝ Create Account"}
            </button>
          </form>

          <div style={{ margin: "2rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.2)" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.2)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "0.875rem", background: "#fff", color: "#333", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
