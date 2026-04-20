"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";

const CATEGORIES = [
  { id: "all",          icon: "🛒", label: "ทั้งหมด" },
  { id: "agri",         icon: "🌾", label: "อุปกรณ์การเกษตร" },
  { id: "rubber",       icon: "🌿", label: "อุปกรณ์สวนยาง" },
  { id: "fishing",      icon: "🎣", label: "เชือก & ประมง" },
  { id: "construction", icon: "🔧", label: "ก่อสร้าง & ฮาร์ดแวร์" },
  { id: "safety",       icon: "⛑️", label: "อุปกรณ์ Safety" },
  { id: "misc",         icon: "📦", label: "สินค้าเบ็ดเตล็ด" },
];

const EMPTY_FORM = {
  sku: "", category: "agri", name: "", nameEn: "", nameZh: "",
  price: "", priceWholesale: "", unit: "ชิ้น", minOrder: "1",
  minWholesale: "10", desc: "", img: "", stock: "0", active: true,
};

export default function AdminProductsClient() {
  const { data: session } = useSession();
  const [tab, setTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const fileRef = useRef();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const qs = new URLSearchParams({ all: "1", limit: "200", ...(tab !== "all" ? { category: tab } : {}), ...(search ? { search } : {}) });
    const res = await fetch(`/api/products?${qs}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [tab, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function openAdd() {
    setEditId(null);
    setForm({ ...EMPTY_FORM, category: tab === "all" ? "agri" : tab });
    setModalOpen(true);
  }

  function openEdit(p) {
    setEditId(p.id);
    setForm({
      sku: p.sku, category: p.category, name: p.name,
      nameEn: p.nameEn || "", nameZh: p.nameZh || "",
      price: String(p.price), priceWholesale: String(p.priceWholesale),
      unit: p.unit, minOrder: String(p.minOrder), minWholesale: String(p.minWholesale),
      desc: p.desc || "", img: p.img || "", stock: String(p.stock),
      active: p.active,
    });
    setModalOpen(true);
  }

  async function handleUploadImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setImgUploading(false);
    if (data.url) {
      setForm(f => ({ ...f, img: data.url }));
      showToast("อัพโหลดรูปสำเร็จ");
    } else {
      showToast(data.error || "อัพโหลดไม่สำเร็จ", "error");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      priceWholesale: parseFloat(form.priceWholesale || form.price),
      minOrder: parseInt(form.minOrder),
      minWholesale: parseInt(form.minWholesale),
      stock: parseInt(form.stock),
      img: form.img || null,
    };

    const url = editId ? `/api/products/${editId}` : "/api/products";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      showToast(data.error || "บันทึกไม่สำเร็จ", "error");
      return;
    }
    setModalOpen(false);
    showToast(editId ? "แก้ไขสินค้าแล้ว ✓" : "เพิ่มสินค้าแล้ว ✓");
    fetchProducts();
  }

  async function handleDelete(id) {
    if (!confirm("ลบสินค้านี้?")) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeleting(null);
    showToast("ลบสินค้าแล้ว");
    fetchProducts();
  }

  async function toggleActive(p) {
    await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !p.active }),
    });
    fetchProducts();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FA", fontFamily: "'Noto Sans Thai', sans-serif" }}>
      {/* Topbar */}
      <div style={{ background: "#1a1a2e", color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🛒</span>
          <span style={{ fontWeight: 700, fontSize: 17 }}>M-Group Admin — จัดการสินค้า</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 13, opacity: 0.75 }}>{session?.user?.name || session?.user?.email}</span>
          <a href="/m-group" target="_blank" style={{ color: "#aaa", fontSize: 13 }}>ดูร้านค้า ↗</a>
          <button onClick={() => signOut({ callbackUrl: "/login" })} style={{ background: "none", border: "1px solid #555", color: "#ccc", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 13 }}>ออกจากระบบ</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "สินค้าทั้งหมด", value: total, color: "#1a73e8" },
            { label: "หมวดหมู่", value: CATEGORIES.length - 1, color: "#34a853" },
            { label: "กำลังแสดง", value: products.length, color: "#ea4335" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "14px 24px", flex: "1 1 160px" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="text"
              placeholder="🔍 ค้นหา ชื่อ / SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: "1 1 220px", padding: "8px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none" }}
            />
            <button onClick={openAdd} style={{ background: "#1a73e8", color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontWeight: 700, cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}>
              + เพิ่มสินค้า
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setTab(c.id)} style={{
              padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
              background: tab === c.id ? "#1a73e8" : "#fff",
              color: tab === c.id ? "#fff" : "#444",
              border: tab === c.id ? "none" : "1px solid #ddd",
              transition: "all .15s",
            }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Product table */}
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: "#999" }}>กำลังโหลด...</div>
          ) : products.length === 0 ? (
            <div style={{ padding: 60, textAlign: "center", color: "#bbb" }}>ยังไม่มีสินค้าในหมวดนี้</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#F5F7FA", borderBottom: "2px solid #e0e0e0" }}>
                    {["รูป", "SKU", "ชื่อสินค้า", "หมวด", "ราคา (฿)", "สต็อก", "สถานะ", "จัดการ"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: "#444", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ width: 52, height: 52, borderRadius: 8, overflow: "hidden", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {p.img
                            ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span style={{ fontSize: 22, opacity: 0.35 }}>📷</span>}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#555", whiteSpace: "nowrap" }}>{p.sku}</td>
                      <td style={{ padding: "10px 14px", maxWidth: 200 }}>
                        <div style={{ fontWeight: 600, color: "#222" }}>{p.name}</div>
                        {p.nameEn && <div style={{ fontSize: 12, color: "#888" }}>{p.nameEn}</div>}
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                        {CATEGORIES.find(c => c.id === p.category)?.icon} {CATEGORIES.find(c => c.id === p.category)?.label || p.category}
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: 700, color: "#e53935" }}>฿{Number(p.price).toLocaleString()}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>ส่ง ฿{Number(p.priceWholesale).toLocaleString()}</div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ fontWeight: 600, color: p.stock > 0 ? "#34a853" : "#ea4335" }}>{p.stock}</span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => toggleActive(p)} style={{
                          padding: "3px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                          background: p.active ? "#e8f5e9" : "#fce4ec",
                          color: p.active ? "#2e7d32" : "#c62828",
                        }}>
                          {p.active ? "แสดง" : "ซ่อน"}
                        </button>
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                        <button onClick={() => openEdit(p)} style={{ marginRight: 8, padding: "5px 14px", borderRadius: 6, border: "1px solid #1a73e8", background: "#fff", color: "#1a73e8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>แก้ไข</button>
                        <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} style={{ padding: "5px 14px", borderRadius: 6, border: "none", background: "#ea4335", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                          {deleting === p.id ? "..." : "ลบ"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 620, maxHeight: "92vh", overflow: "auto", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{editId ? "✏️ แก้ไขสินค้า" : "➕ เพิ่มสินค้าใหม่"}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#888", lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleSave}>
              {/* Image section */}
              <div style={{ marginBottom: 20, textAlign: "center" }}>
                <div style={{ width: 120, height: 120, margin: "0 auto 12px", borderRadius: 12, border: "2px dashed #ddd", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer" }} onClick={() => fileRef.current?.click()}>
                  {form.img
                    ? <img src={form.img} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ textAlign: "center", color: "#bbb" }}><div style={{ fontSize: 32 }}>📷</div><div style={{ fontSize: 12 }}>คลิกเพื่ออัพโหลด</div></div>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUploadImage} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={imgUploading} style={{ padding: "6px 18px", borderRadius: 8, border: "1px solid #1a73e8", background: "#fff", color: "#1a73e8", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  {imgUploading ? "กำลังอัพโหลด..." : "📁 อัพโหลดรูปสินค้า"}
                </button>
                {form.img && <div style={{ marginTop: 6, fontSize: 12, color: "#888" }}>{form.img}</div>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="SKU *" value={form.sku} onChange={v => setForm(f => ({ ...f, sku: v }))} placeholder="AG-001" required />
                <div>
                  <label style={labelStyle}>หมวดหมู่ *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle} required>
                    {CATEGORIES.filter(c => c.id !== "all").map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                    ))}
                  </select>
                </div>
                <Field label="ชื่อสินค้า (ไทย) *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required span={2} />
                <Field label="ชื่อสินค้า (อังกฤษ)" value={form.nameEn} onChange={v => setForm(f => ({ ...f, nameEn: v }))} />
                <Field label="ชื่อสินค้า (จีน)" value={form.nameZh} onChange={v => setForm(f => ({ ...f, nameZh: v }))} />
                <Field label="ราคาขายปลีก (฿) *" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="890" required />
                <Field label="ราคาขายส่ง (฿)" type="number" value={form.priceWholesale} onChange={v => setForm(f => ({ ...f, priceWholesale: v }))} placeholder="750" />
                <Field label="หน่วย" value={form.unit} onChange={v => setForm(f => ({ ...f, unit: v }))} placeholder="ชิ้น / ถัง / เมตร" />
                <Field label="สต็อก" type="number" value={form.stock} onChange={v => setForm(f => ({ ...f, stock: v }))} placeholder="0" />
                <Field label="สั่งขั้นต่ำ (ชิ้น)" type="number" value={form.minOrder} onChange={v => setForm(f => ({ ...f, minOrder: v }))} placeholder="1" />
                <Field label="ขั้นต่ำราคาส่ง (ชิ้น)" type="number" value={form.minWholesale} onChange={v => setForm(f => ({ ...f, minWholesale: v }))} placeholder="10" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>คำอธิบายสินค้า</label>
                  <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="รายละเอียดสินค้า..." />
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 16, height: 16 }} />
                  <label htmlFor="active" style={{ fontSize: 14, color: "#444", cursor: "pointer" }}>แสดงสินค้าในหน้าร้าน</label>
                </div>
              </div>

              <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "9px 24px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontWeight: 600 }}>ยกเลิก</button>
                <button type="submit" disabled={saving} style={{ padding: "9px 28px", borderRadius: 8, border: "none", background: "#1a73e8", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  {saving ? "กำลังบันทึก..." : editId ? "💾 บันทึก" : "➕ เพิ่มสินค้า"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 2000,
          background: toast.type === "error" ? "#ea4335" : "#34a853",
          color: "#fff", borderRadius: 10, padding: "12px 22px",
          fontWeight: 600, fontSize: 14, boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          animation: "fadeIn .2s ease",
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 5 };
const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

function Field({ label, value, onChange, type = "text", placeholder, required, span }) {
  return (
    <div style={span === 2 ? { gridColumn: "1 / -1" } : {}}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "any" : undefined}
      />
    </div>
  );
}
