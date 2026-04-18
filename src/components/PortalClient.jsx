"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const STATUS_LABEL = {
  online: "พร้อมใช้งาน",
  maintenance: "กำลังบำรุงรักษา",
  "coming-soon": "เตรียมเปิดใช้งาน",
};

const STATUS_CLASS = {
  online: "success",
  maintenance: "warning",
  "coming-soon": "secondary",
};

export default function PortalClient({ client, products, session }) {
  const [query, setQuery] = useState("");
  const accent = client.accent_color || "#1F7A8C";

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-vh-100 bg-dark text-white">
      {/* Topbar */}
      <nav
        className="navbar px-4 py-3 border-bottom border-secondary"
        style={{ background: "#111" }}
      >
        <Link href="/portal" className="navbar-brand fw-bold text-white">
          ← Portal
        </Link>
        <span className="text-muted small">
          {session?.user?.name || session?.user?.email}
        </span>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          ออกจากระบบ
        </button>
      </nav>

      <div className="container py-5">
        {/* Header */}
        <div
          className="rounded-3 p-4 mb-5"
          style={{ background: accent + "22", borderLeft: `4px solid ${accent}` }}
        >
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div>
              <h1 className="h3 fw-bold mb-1">{client.name}</h1>
              {client.company && (
                <p className="text-muted small mb-1" style={{ fontStyle: "italic" }}>{client.company}</p>
              )}
              <p className="text-muted mb-2">{client.description}</p>
              <span className={`badge bg-${STATUS_CLASS[client.status] ?? "secondary"} me-2`}>
                {STATUS_LABEL[client.status] ?? client.status}
              </span>
              {client.contact_email && (
                <span className="text-muted small me-3">
                  ✉ {client.contact_email}
                </span>
              )}
              {client.contact_phone && (
                <span className="text-muted small">
                  📞 {client.contact_phone}
                </span>
              )}
              {client.contact_fax && (
                <span className="text-muted small ms-3">
                  📠 {client.contact_fax}
                </span>
              )}
            </div>
            {client.status === "online" && client.system_url && (
              <a
                href={client.system_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm ms-auto"
                style={{ background: accent, color: "#fff" }}
              >
                เปิดระบบ ↗
              </a>
            )}
          </div>
        </div>

        {/* Products */}
        {products.length > 0 && (
          <section>
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <h2 className="h5 fw-bold mb-0">สินค้า / บริการ</h2>
              <input
                type="search"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                style={{ maxWidth: 240 }}
                placeholder="ค้นหาสินค้า..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted">ไม่พบสินค้าที่ตรงกับคำค้น</p>
            ) : (
              <div className="row g-3">
                {filtered.map((p) => (
                  <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                    <div className="card bg-black border-secondary h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <span className="badge bg-secondary small">{p.category}</span>
                          {p.is_featured && (
                            <span className="badge" style={{ background: accent }}>
                              แนะนำ
                            </span>
                          )}
                        </div>
                        <h6 className="card-title fw-semibold mt-2">{p.name}</h6>
                        <p className="text-muted small mb-2">{p.sku}</p>
                        <p className="card-text small text-secondary">{p.description}</p>
                        <div className="mt-auto pt-2 d-flex justify-content-between align-items-center">
                          <span className="fw-bold">
                            {Number(p.price).toLocaleString("th-TH")} {p.currency}
                          </span>
                          <span className="text-muted small">
                            คงเหลือ {p.stock_quantity} {p.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
