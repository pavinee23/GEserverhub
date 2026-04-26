"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    if (!res?.ok || res?.error) {
      setLoading(false);
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    // Fetch session to verify admin role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    setLoading(false);

    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      router.push("/admin/clients");
    } else {
      await signOut({ redirect: false });
      setError("บัญชีนี้ไม่มีสิทธิ์เข้าถึงระบบผู้ดูแล");
    }
  }

  const S = {
    page: {
      minHeight: "100vh",
      background: "#0a0c12",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    card: {
      background: "#16181f",
      border: "1px solid #2a2d3a",
      borderRadius: 14,
      padding: "40px 36px",
      width: "100%",
      maxWidth: 420,
      boxShadow: "0 8px 40px rgba(0,0,0,.5)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "#1e1b4b",
      color: "#a78bfa",
      borderRadius: 20,
      padding: "4px 14px",
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 20,
    },
    title: { color: "#e8eaf0", fontWeight: 800, fontSize: 22, margin: "0 0 6px" },
    sub: { color: "#8b8fa8", fontSize: 13, margin: "0 0 28px" },
    label: { color: "#8b8fa8", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 },
    input: {
      width: "100%",
      background: "#1e2130",
      border: "1px solid #2a2d3a",
      color: "#e8eaf0",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: { borderColor: "#7c3aed" },
    error: {
      background: "#3b0000",
      border: "1px solid #7f1d1d",
      color: "#fca5a5",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 13,
      marginBottom: 18,
    },
    btn: {
      width: "100%",
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "12px",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
      marginTop: 8,
      letterSpacing: 0.3,
    },
    btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
    divider: { borderColor: "#2a2d3a", margin: "24px 0" },
    backLink: { color: "#8b8fa8", fontSize: 12, textDecoration: "none", display: "block", textAlign: "center", marginTop: 20 },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚙️</div>
          <div style={{ ...S.badge, margin: "0 auto 16px" }}>
            <span>🔒</span> Admin Panel
          </div>
          <h1 style={S.title}>เข้าสู่ระบบผู้ดูแล</h1>
          <p style={S.sub}>GOEUN SERVER HUB — Admin System</p>
        </div>

        {error && <div style={S.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Username / Email</label>
            <input
              style={S.input}
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="กรอก username หรือ email"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>รหัสผ่าน</label>
            <div style={{ position: "relative" }}>
              <input
                style={{ ...S.input, paddingRight: 42 }}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#8b8fa8",
                }}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{ ...S.btn, ...(loading ? S.btnDisabled : {}) }}
            disabled={loading}
          >
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <hr style={S.divider} />

        <a href="/login" style={S.backLink}>
          ← กลับหน้าล็อกอินผู้ใช้ทั่วไป
        </a>
      </div>
    </div>
  );
}
