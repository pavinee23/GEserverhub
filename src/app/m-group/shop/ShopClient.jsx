"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartProvider, useCart } from "@/lib/cartContext";
import { CATEGORIES } from "@/lib/mockProducts";

// ── Alibaba-inspired palette ───────────────────────────────────────
const OG    = "#FF6010";
const OG2   = "#FF8533";
const RED   = "#E53935";
const BG    = "#F5F5F5";
const WHITE = "#FFFFFF";
const DARK  = "#1A1A1A";
const GRAY  = "#555555";
const LGRAY = "#999999";
const BORDER= "#E8E8E8";

function injectStyle(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id; s.textContent = css;
  document.head.appendChild(s);
}

// ─── Cart Drawer ───────────────────────────────────────────────────
function CartDrawer({ lang }) {
  const { items, removeItem, updateQty, total, count, open, setOpen } = useCart();
  const router = useRouter();

  const t = {
    th: { title: "ตะกร้าสินค้า", empty: "ตะกร้าว่าง", checkout: "ดำเนินการสั่งซื้อ", remove: "ลบ", subtotal: "รวมทั้งหมด" },
    en: { title: "Shopping Cart", empty: "Your cart is empty", checkout: "Proceed to Checkout", remove: "Remove", subtotal: "Subtotal" },
    zh: { title: "购物车", empty: "购物车为空", checkout: "前往结算", remove: "删除", subtotal: "小计" },
  }[lang] || {};

  if (!open) return null;

  return (
    <>
      <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 300 }} />
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: "min(440px,100vw)", height: "100dvh",
        background: WHITE, zIndex: 301,
        display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 28px rgba(0,0,0,.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: OG }}>
          <span style={{ color: WHITE, fontWeight: 700, fontSize: 17 }}>
            {t.title}
            {count > 0 && <span style={{ background: WHITE, color: OG, borderRadius: 99, padding: "1px 9px", fontSize: 13, fontWeight: 700, marginLeft: 8 }}>{count}</span>}
          </span>
          <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.2)", border: "none", color: WHITE, borderRadius: "50%", width: 30, height: 30, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <p style={{ color: LGRAY, fontSize: 15 }}>{t.empty}</p>
            </div>
          ) : items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 14, borderBottom: `1px solid ${BORDER}`, paddingBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: BG, border: `1px solid ${BORDER}` }}>
                {item.img
                  ? <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🌿</div>
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: DARK, marginBottom: 4, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lang === "en" ? item.nameEn : lang === "zh" ? item.nameZh : item.name}
                </div>
                <div style={{ fontSize: 12, color: LGRAY, marginBottom: 6 }}>฿{item.price.toLocaleString()} × {item.qty} {item.unit}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 26, height: 26, borderRadius: 4, border: `1px solid ${BORDER}`, background: BG, cursor: "pointer", fontWeight: 700 }}>−</button>
                  <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: 14 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 26, height: 26, borderRadius: 4, border: `1px solid ${BORDER}`, background: BG, cursor: "pointer", fontWeight: 700 }}>+</button>
                  <button onClick={() => removeItem(item.id)} style={{ marginLeft: "auto", fontSize: 11, color: RED, background: "none", border: "none", cursor: "pointer" }}>{t.remove}</button>
                </div>
              </div>
              <div style={{ fontWeight: 700, color: OG, fontSize: 15, whiteSpace: "nowrap" }}>฿{(item.price * item.qty).toLocaleString()}</div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 16, fontWeight: 700 }}>
              <span style={{ color: GRAY }}>{t.subtotal}</span>
              <span style={{ color: OG, fontSize: 20 }}>฿{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => { setOpen(false); router.push("/m-group/checkout"); }}
              style={{ width: "100%", padding: 14, background: OG, color: WHITE, border: "none", borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: "pointer" }}
            >
              {t.checkout} →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Product Card (Alibaba style) ──────────────────────────────────
function ProductCard({ product, lang, onAdd }) {
  const [hover, setHover] = useState(false);
  const name = lang === "en" ? product.nameEn : lang === "zh" ? product.nameZh : product.name;
  const addLabel = lang === "en" ? "Add to Cart" : lang === "zh" ? "加入购物车" : "+ ใส่ตะกร้า";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: WHITE, borderRadius: 6, overflow: "hidden",
        border: `1px solid ${hover ? OG : BORDER}`,
        boxShadow: hover ? "0 4px 20px rgba(255,96,16,.15)" : "0 1px 4px rgba(0,0,0,.06)",
        transition: "border .15s, box-shadow .15s, transform .15s",
        transform: hover ? "translateY(-2px)" : "none",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden", background: WHITE }}>
        {product.img
          ? <img src={product.img} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
          : <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${OG}, ${OG2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>🌿</div>
        }
        {product.stock <= 10 && (
          <span style={{ position: "absolute", top: 6, left: 6, background: RED, color: WHITE, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3 }}>
            {lang === "en" ? "Low Stock" : lang === "zh" ? "库存不足" : "เหลือน้อย"}
          </span>
        )}
      </div>

      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontSize: 13, color: DARK, lineHeight: 1.5, marginBottom: 6,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden", minHeight: 38,
        }}>
          {name}
          {product.sold > 300 && (
            <span style={{ display: "inline-block", background: OG, color: WHITE, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3, marginLeft: 5, verticalAlign: "middle", lineHeight: "16px" }}>
              {lang === "en" ? "Hot" : lang === "zh" ? "热销" : "ขายดี"}
            </span>
          )}
        </div>

        <div style={{ marginBottom: 3 }}>
          <span style={{ color: OG, fontWeight: 800, fontSize: 18 }}>฿{product.price.toLocaleString()}</span>
          <span style={{ color: LGRAY, fontSize: 11, marginLeft: 3 }}>/{product.unit}</span>
        </div>

        {product.priceWholesale && (
          <div style={{ fontSize: 11, color: RED, fontWeight: 600, marginBottom: 4 }}>
            ราคาส่ง ฿{product.priceWholesale.toLocaleString()} (≥{product.minWholesale} {product.unit})
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8, marginTop: "auto", paddingTop: 4 }}>
          <span style={{ color: "#f59e0b", fontSize: 11 }}>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
          <span style={{ color: LGRAY, fontSize: 11 }}>| {lang === "en" ? "Sold" : lang === "zh" ? "已售" : "ขายแล้ว"} {product.sold}</span>
        </div>

        <button
          onClick={() => onAdd(product, 1)}
          style={{
            width: "100%", background: hover ? OG : WHITE,
            color: hover ? WHITE : OG,
            border: `1.5px solid ${OG}`,
            borderRadius: 4, padding: "7px 0",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            transition: "background .15s, color .15s",
          }}
        >{addLabel}</button>
      </div>
    </div>
  );
}

// ─── Category Tile (Alibaba-style 2×2 image grid) ────────────────
function CategoryTile({ cat, products, lang, onClick }) {
  const [hover, setHover] = useState(false);
  const label = lang === "en" ? cat.labelEn : lang === "zh" ? cat.labelZh : cat.label;
  const imgs = products.filter(p => p.category === cat.id && p.img).slice(0, 4);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: WHITE,
        border: `1.5px solid ${hover ? OG : BORDER}`,
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hover ? "0 4px 16px rgba(255,96,16,.15)" : "0 1px 3px rgba(0,0,0,.06)",
        transition: "border .15s, box-shadow .15s, transform .15s",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      {/* 2×2 image grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BORDER }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ aspectRatio: "1", overflow: "hidden", background: BG }}>
            {imgs[i]
              ? <img src={imgs[i].img} alt={imgs[i].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{cat.icon}</div>
            }
          </div>
        ))}
      </div>
      {/* Label */}
      <div style={{
        padding: "8px 10px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: hover ? OG : DARK, lineHeight: 1.4 }}>
          {cat.icon} {label}
        </span>
        <span style={{ color: LGRAY, fontSize: 12 }}>›</span>
      </div>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────
function SectionHeader({ title, onViewAll, viewAllLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 4, height: 22, background: OG, borderRadius: 2 }} />
        <span style={{ fontWeight: 800, fontSize: 17, color: DARK }}>{title}</span>
      </div>
      {viewAllLabel && (
        <button onClick={onViewAll} style={{ color: OG, background: "none", border: `1px solid ${OG}`, borderRadius: 4, padding: "4px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          {viewAllLabel}
        </button>
      )}
    </div>
  );
}

// ─── Inner shop ────────────────────────────────────────────────────
function ShopInner({ embedded = false }) {
  const [lang, setLang] = useState("th");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, count, setOpen } = useCart();
  const router = useRouter();

  const LABELS = {
    th: {
      shop: "M-Group", searchPh: "ค้นหาสินค้า เช่น ถุงมือ, สายยาง...",
      sortDefault: "แนะนำ", sortPriceAsc: "ราคา ต่ำ→สูง", sortPriceDesc: "ราคา สูง→ต่ำ",
      sortSold: "ขายดี", sortRating: "คะแนนสูงสุด",
      loading: "กำลังโหลดสินค้า...", noProduct: "ไม่พบสินค้า",
      backBtn: "← กลับหน้าหลัก", results: "รายการ",
      companyBadge: "บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด (Mahachok Mahachai Intertrade Co., Ltd.)",
      tagline: '"ดูแล ใส่ใจ เกษตรไทย ครบวงจร"',
      heroDesc: "ผู้นำด้านอุปกรณ์การเกษตร อุปกรณ์สวนยาง เชือกและอุปกรณ์ประมง อุปกรณ์ก่อสร้าง อุปกรณ์ SAFETY และสินค้าเบ็ดเตล็ด ด้วยประสบการณ์มากกว่า 40 ปี",
      hotTitle: "สินค้าขายดี 🔥", viewAll: "ดูทั้งหมด →",
      catTitle: "หมวดหมู่สำหรับคุณ",
      cart: "ตะกร้า", clear: "✕ ล้างตัวกรอง", sold: "ขายแล้ว",
    },
    en: {
      shop: "M-Group", searchPh: "Search products...",
      sortDefault: "Recommended", sortPriceAsc: "Price: Low→High", sortPriceDesc: "Price: High→Low",
      sortSold: "Best Selling", sortRating: "Top Rated",
      loading: "Loading...", noProduct: "No products found",
      backBtn: "← Back", results: "items",
      companyBadge: "Mahachok Mahachai Intertrade Co., Ltd.",
      tagline: '"Care. Commit. Complete Thai Agriculture."',
      heroDesc: "Leading supplier of agricultural equipment, rubber plantation tools, fishing rope, construction hardware, safety gear — over 40 years of excellence.",
      hotTitle: "Best Sellers 🔥", viewAll: "View All →",
      catTitle: "Categories for You",
      cart: "Cart", clear: "✕ Clear", sold: "Sold",
    },
    zh: {
      shop: "M-Group", searchPh: "搜索商品...",
      sortDefault: "推荐", sortPriceAsc: "价格从低到高", sortPriceDesc: "价格从高到低",
      sortSold: "热销", sortRating: "好评优先",
      loading: "加载中...", noProduct: "未找到商品",
      backBtn: "← 返回", results: "件",
      companyBadge: "马哈坎·马哈猜进出口有限公司（Mahachok Mahachai Intertrade Co., Ltd.）",
      tagline: '"关爱农业，泰国农业一站式服务"',
      heroDesc: "泰国农业设备、橡胶园工具、渔绳、建筑五金、安全防护用品的领先供应商，拥有逾40年丰富经验。",
      hotTitle: "热销商品 🔥", viewAll: "查看全部 →",
      catTitle: "为您推荐分类",
      cart: "购物车", clear: "✕ 清除", sold: "已售",
    },
  };
  const L = LABELS[lang] || LABELS.th;

  useEffect(() => {
    injectStyle("ali-shop", `
      .ali-catbtn:hover { color: ${OG} !important; background: rgba(255,255,255,.25) !important; }
      .ali-sortbtn:hover { border-color: ${OG} !important; color: ${OG} !important; }
      ::-webkit-scrollbar { height: 4px; width: 4px; }
      ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    `);
    const saved = localStorage.getItem("goeun-agency-language");
    if (saved && ["th","en","zh"].includes(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ category, search, sort, limit: "40" });
    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, search, sort]);

  const isFiltered = !!search || category !== "all";
  const hotProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6);

  function switchLang(l) {
    setLang(l);
    localStorage.setItem("goeun-agency-language", l);
  }

  return (
    <div style={{ background: BG, fontFamily: "'Noto Sans Thai', 'Inter', sans-serif", minHeight: "100vh" }}>

      {/* ── Header (white, Alibaba-style) ─────────────────────── */}
      <div style={{
        background: WHITE,
        position: "sticky", top: embedded ? 60 : 0, zIndex: 100,
        boxShadow: "0 2px 6px rgba(0,0,0,.08)",
      }}>
        {/* Row 1: Logo + Search + Lang/Cart */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {!embedded && (
              <button onClick={() => router.push("/m-group")} style={{
                background: "none", border: `1px solid ${BORDER}`, color: GRAY,
                padding: "5px 10px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 600,
              }}>{L.backBtn}</button>
            )}
            <img src="/m-group-logo.png" alt="M-Group" style={{ height: 38, width: "auto", objectFit: "contain" }} />
          </div>

          {/* Big search bar */}
          <div style={{
            flex: 1, display: "flex", maxWidth: 700,
            border: `2px solid ${OG}`, borderRadius: 4, overflow: "hidden",
          }}>
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setSort("default")}
              placeholder={L.searchPh}
              style={{
                flex: 1, padding: "11px 16px", border: "none",
                fontSize: 14, outline: "none", background: WHITE, color: DARK,
              }}
            />
            <button
              onClick={() => setSort("default")}
              style={{
                background: OG, color: WHITE, border: "none",
                padding: "0 24px", fontWeight: 700, cursor: "pointer", fontSize: 15,
                display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
              }}
            >🔍 {lang === "zh" ? "搜索" : lang === "en" ? "Search" : "ค้นหา"}</button>
          </div>

        </div>

        {/* Row 2: Category tabs (orange bar) */}
        <div style={{ background: OG }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", overflowX: "auto" }}>
            {CATEGORIES.map(cat => {
              const label = lang === "en" ? cat.labelEn : lang === "zh" ? cat.labelZh : cat.label;
              const active = category === cat.id;
              return (
                <button key={cat.id} className="ali-catbtn" onClick={() => setCategory(cat.id)} style={{
                  flexShrink: 0, display: "flex", alignItems: "center", gap: 5,
                  padding: "9px 16px", border: "none", cursor: "pointer",
                  background: active ? "rgba(0,0,0,.18)" : "transparent",
                  color: WHITE, fontWeight: active ? 700 : 500, fontSize: 13,
                  borderBottom: active ? "3px solid #FFD95A" : "3px solid transparent",
                  transition: "all .15s", whiteSpace: "nowrap",
                }}>
                  {cat.icon} {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 16px 48px", display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* Left sidebar */}
        <div style={{
          width: 196, flexShrink: 0, background: WHITE,
          borderRadius: 6, border: `1px solid ${BORDER}`,
          overflow: "hidden", position: "sticky", top: embedded ? 128 : 110,
        }}>
          <div style={{ background: OG, padding: "10px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: WHITE, fontWeight: 700, fontSize: 13 }}>
              {lang === "zh" ? "全部类别" : lang === "en" ? "All Categories" : "หมวดหมู่ทั้งหมด"}
            </span>
          </div>
          {CATEGORIES.filter(c => c.id !== "all").map(cat => {
            const label = lang === "en" ? cat.labelEn : lang === "zh" ? cat.labelZh : cat.label;
            const active = category === cat.id;
            return (
              <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                width: "100%", textAlign: "left", background: active ? "#FFF5EF" : WHITE,
                color: active ? OG : DARK, fontWeight: active ? 700 : 400,
                border: "none", borderBottom: `1px solid ${BORDER}`,
                padding: "10px 14px", fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                borderLeft: active ? `3px solid ${OG}` : "3px solid transparent",
                transition: "all .12s",
              }}>
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                <span>{label}</span>
                <span style={{ marginLeft: "auto", color: LGRAY, fontSize: 11 }}>›</span>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Sort/Filter bar */}
          <div style={{
            background: WHITE, borderRadius: 6, padding: "10px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 14, border: `1px solid ${BORDER}`, flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: LGRAY }}>{products.length} {L.results}</span>
              {isFiltered && (
                <button onClick={() => { setSearch(""); setCategory("all"); }} style={{
                  fontSize: 12, color: OG, background: "none",
                  border: `1px solid ${OG}`, borderRadius: 4, padding: "2px 10px", cursor: "pointer",
                }}>{L.clear}</button>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[["default",L.sortDefault],["sold",L.sortSold],["price_asc",L.sortPriceAsc],["price_desc",L.sortPriceDesc]].map(([v, label]) => (
                <button key={v} className="ali-sortbtn" onClick={() => setSort(v)} style={{
                  padding: "5px 12px", borderRadius: 4,
                  border: `1px solid ${sort === v ? OG : BORDER}`,
                  background: sort === v ? "#FFF5EF" : WHITE,
                  color: sort === v ? OG : GRAY,
                  fontWeight: sort === v ? 700 : 400, fontSize: 12, cursor: "pointer",
                  transition: "all .15s",
                }}>{label}</button>
              ))}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: "center", padding: 80, color: LGRAY }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 16 }}>{L.loading}</div>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, color: LGRAY }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 16 }}>{L.noProduct}</div>
            </div>
          ) : isFiltered ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
              {products.map(p => <ProductCard key={p.id} product={p} lang={lang} onAdd={addItem} />)}
            </div>
          ) : (
            <>
              {/* Category tiles grid (Alibaba-style) */}
              <div style={{ marginBottom: 24 }}>
                <SectionHeader title={L.catTitle} onViewAll={() => {}} viewAllLabel="" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12 }}>
                  {CATEGORIES.filter(c => c.id !== "all").map(cat => (
                    <CategoryTile
                      key={cat.id}
                      cat={cat}
                      products={products}
                      lang={lang}
                      onClick={() => setCategory(cat.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Hot products */}
              <SectionHeader title={L.hotTitle} onViewAll={() => setSort("sold")} viewAllLabel={L.viewAll} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12, marginBottom: 28 }}>
                {hotProducts.map(p => <ProductCard key={p.id} product={p} lang={lang} onAdd={addItem} />)}
              </div>

              {/* Per-category rows */}
              {CATEGORIES.filter(c => c.id !== "all").map(cat => {
                const catProducts = products.filter(p => p.category === cat.id).slice(0, 5);
                if (!catProducts.length) return null;
                const catLabel = lang === "en" ? cat.labelEn : lang === "zh" ? cat.labelZh : cat.label;
                return (
                  <div key={cat.id} style={{ marginBottom: 28 }}>
                    <SectionHeader
                      title={`${cat.icon} ${catLabel}`}
                      onViewAll={() => setCategory(cat.id)}
                      viewAllLabel={L.viewAll}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
                      {catProducts.map(p => <ProductCard key={p.id} product={p} lang={lang} onAdd={addItem} />)}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <CartDrawer lang={lang} />
    </div>
  );
}

export default function ShopClient({ embedded = false }) {
  return (
    <CartProvider>
      <ShopInner embedded={embedded} />
    </CartProvider>
  );
}
