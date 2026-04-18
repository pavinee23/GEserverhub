"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GREEN      = "#15803d";
const DARK_GREEN = "#14532d";
const GOLD       = "#ca8a04";
const NAVY       = "#0f172a";
const WHITE      = "#ffffff";
const LIGHT      = "#f0fdf4";
const BORDER     = "#d1fae5";
const GRAY       = "#6b7280";
const BG         = "#f9fafb";

const STATUS_CONFIG = {
  pending_payment: { label: { th: "รอชำระเงิน", en: "Pending Payment", zh: "待付款" }, color: "#b45309", bg: "#fef3c7" },
  paid:            { label: { th: "ชำระเงินแล้ว", en: "Paid", zh: "已付款" }, color: "#065f46", bg: "#d1fae5" },
  processing:      { label: { th: "กำลังเตรียมสินค้า", en: "Processing", zh: "备货中" }, color: "#1d4ed8", bg: "#dbeafe" },
  shipped:         { label: { th: "จัดส่งแล้ว", en: "Shipped", zh: "已发货" }, color: "#7c3aed", bg: "#ede9fe" },
  delivered:       { label: { th: "ได้รับสินค้าแล้ว", en: "Delivered", zh: "已签收" }, color: "#15803d", bg: "#dcfce7" },
  cancelled:       { label: { th: "ยกเลิก", en: "Cancelled", zh: "已取消" }, color: "#b91c1c", bg: "#fee2e2" },
};

const LABELS = {
  th: {
    title: "ติดตามสินค้า",
    subtitle: "ตรวจสอบรายการสั่งซื้อและสถานะการจัดส่ง",
    searchPh: "ค้นหาหมายเลขออร์เดอร์ หรือ ชื่อลูกค้า...",
    empty: "ยังไม่มีรายการสั่งซื้อ",
    emptyHint: "เมื่อคุณสั่งซื้อสินค้า รายการจะปรากฏที่นี่",
    orderNo: "หมายเลขออร์เดอร์",
    date: "วันที่สั่งซื้อ",
    customer: "ลูกค้า",
    phone: "โทรศัพท์",
    items: "รายการสินค้า",
    total: "ยอดรวม",
    status: "สถานะ",
    shopBtn: "🛒 เลือกซื้อสินค้า",
    backBtn: "← กลับหน้าหลัก",
    itemUnit: "รายการ",
  },
  en: {
    title: "Track Orders",
    subtitle: "Check your order list and delivery status",
    searchPh: "Search order number or customer name...",
    empty: "No orders yet",
    emptyHint: "Once you place an order, it will appear here",
    orderNo: "Order No.",
    date: "Date",
    customer: "Customer",
    phone: "Phone",
    items: "Items",
    total: "Total",
    status: "Status",
    shopBtn: "🛒 Shop Now",
    backBtn: "← Back",
    itemUnit: "item(s)",
  },
  zh: {
    title: "追踪订单",
    subtitle: "查看订单列表与配送状态",
    searchPh: "搜索订单号或客户姓名...",
    empty: "暂无订单",
    emptyHint: "下单后，订单将显示在此处",
    orderNo: "订单号",
    date: "下单日期",
    customer: "客户",
    phone: "电话",
    items: "商品",
    total: "合计",
    status: "状态",
    shopBtn: "🛒 去购物",
    backBtn: "← 返回",
    itemUnit: "件",
  },
};

function StatusBadge({ status, lang }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending_payment;
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      borderRadius: 999, padding: "3px 12px",
      fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
    }}>
      {cfg.label[lang] || status}
    </span>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const [lang, setLang] = useState("th");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("goeun-agency-language");
    if (saved && LABELS[saved]) setLang(saved);
    fetch("/api/orders")
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const L = LABELS[lang];

  const filtered = orders.filter(o => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.id?.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q) ||
      o.customer?.phone?.includes(q)
    );
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function formatDate(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (lang === "zh") return d.toLocaleDateString("zh-CN");
    if (lang === "en") return d.toLocaleDateString("en-GB");
    return d.toLocaleDateString("th-TH");
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Noto Sans Thai','Inter',sans-serif" }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`, padding: "3.5rem 1.5rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button
            onClick={() => router.push("/m-group")}
            style={{ background: "rgba(255,255,255,.15)", border: "none", color: WHITE, padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}
          >
            {L.backBtn}
          </button>
          <h1 style={{ color: WHITE, fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: "0 0 8px" }}>
            📦 {L.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,.8)", margin: 0, fontSize: 15 }}>{L.subtitle}</p>

          {/* Lang switcher */}
          <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
            {[["th","TH"],["en","EN"],["zh","中文"]].map(([l, label]) => (
              <button key={l} onClick={() => { setLang(l); localStorage.setItem("goeun-agency-language", l); }}
                style={{
                  background: lang === l ? GOLD : "rgba(255,255,255,.15)",
                  color: lang === l ? NAVY : WHITE,
                  border: "none", borderRadius: 5, padding: "4px 12px",
                  fontWeight: 700, cursor: "pointer", fontSize: 12,
                }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={L.searchPh}
            style={{
              width: "100%", padding: "12px 18px", border: `1.5px solid ${BORDER}`,
              borderRadius: 8, fontSize: 14, outline: "none", background: WHITE,
              boxSizing: "border-box",
            }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: GRAY }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
            <div>กำลังโหลด...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: WHITE, borderRadius: 12, border: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
            <h3 style={{ color: DARK_GREEN, margin: "0 0 8px", fontWeight: 700 }}>{L.empty}</h3>
            <p style={{ color: GRAY, margin: "0 0 24px", fontSize: 14 }}>{L.emptyHint}</p>
            <Link href="/m-group/shop" style={{
              background: GREEN, color: WHITE, borderRadius: 8, padding: "12px 28px",
              fontWeight: 700, textDecoration: "none", fontSize: 15,
            }}>{L.shopBtn}</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(order => (
              <div key={order.id} style={{
                background: WHITE, borderRadius: 10, border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 8px rgba(0,0,0,.05)", overflow: "hidden",
              }}>
                {/* Order header */}
                <div style={{
                  background: LIGHT, padding: "12px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 8, borderBottom: `1px solid ${BORDER}`,
                }}>
                  <div style={{ display: "flex", align: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, color: DARK_GREEN, fontSize: 15 }}>{order.id}</span>
                    <span style={{ color: GRAY, fontSize: 13 }}>{formatDate(order.createdAt)}</span>
                  </div>
                  <StatusBadge status={order.status} lang={lang} />
                </div>

                {/* Order body */}
                <div style={{ padding: "14px 20px", display: "flex", flexWrap: "wrap", gap: 24 }}>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ fontSize: 11, color: GRAY, fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{L.customer}</div>
                    <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{order.customer?.name || "-"}</div>
                    <div style={{ color: GRAY, fontSize: 13 }}>{order.customer?.phone || "-"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: GRAY, fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{L.items}</div>
                    <div style={{ color: NAVY, fontSize: 14, fontWeight: 600 }}>{order.items?.length || 0} {L.itemUnit}</div>
                    <div style={{ color: GRAY, fontSize: 12, maxWidth: 300 }}>
                      {order.items?.slice(0, 2).map(i => i.name).join(", ")}
                      {order.items?.length > 2 ? "..." : ""}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{ fontSize: 11, color: GRAY, fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{L.total}</div>
                    <div style={{ fontWeight: 800, color: GREEN, fontSize: 20 }}>฿{(order.total || 0).toLocaleString()}</div>
                  </div>
                </div>

                {/* Shipping address */}
                {order.shippingAddress && (
                  <div style={{ padding: "0 20px 14px", color: GRAY, fontSize: 13 }}>
                    📍 {order.shippingAddress}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
