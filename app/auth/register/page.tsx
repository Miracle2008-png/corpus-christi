"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
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

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
