"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (form.password.length < 8) {
      setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "เกิดข้อผิดพลาด");
    } else {
      router.push("/login?registered=1");
    }
  }

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: 440 }}>
        <h4 className="mb-4 text-center fw-bold">สมัครสมาชิก</h4>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              ชื่อ
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              autoComplete="name"
              required
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              autoComplete="email"
              required
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              รหัสผ่าน
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={onChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="confirm">
              ยืนยันรหัสผ่าน
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              className="form-control"
              autoComplete="new-password"
              required
              value={form.confirm}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          มีบัญชีแล้ว?{" "}
          <Link href="/login" className="text-primary">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </main>
  );
}
