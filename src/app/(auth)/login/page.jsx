"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
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

    // Redirect based on role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    setLoading(false);

    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      router.push("/admin/clients");
    } else {
      router.push("/mct-product");
    }
  }

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: 420 }}>
        <h4 className="mb-4 text-center fw-bold">เข้าสู่ระบบ</h4>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Username / Email
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              autoComplete="username"
              placeholder="กรอก username หรือ email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              รหัสผ่าน
            </label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <hr className="my-4" />
        <div className="text-center">
          <a href="/admin/login" className="text-muted small" style={{ textDecoration: "none" }}>
            ⚙️ เข้าสู่ระบบสำหรับผู้ดูแลระบบ
          </a>
        </div>

      </div>
    </main>
  );
}
