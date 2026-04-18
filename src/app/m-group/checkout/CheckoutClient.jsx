"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CartProvider, useCart } from "@/lib/cartContext";

const GREEN = "#15803d";
const DARK = "#14532d";
const GOLD = "#ca8a04";
const NAVY = "#0f172a";

// ── ORDER CONFIRMATION VIEW ──────────────────────────────────────
function OrderConfirmation({ order, lang, onUploadSlip }) {
  const [slip, setSlip] = useState(null);
  const [slipName, setSlipName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(order.paymentSlip != null);
  const fileRef = useRef();

  const t = {
    th: { title: "สั่งซื้อสำเร็จ!", orderId: "หมายเลขออเดอร์", total: "ยอดรวม", status: "สถานะ", uploadTitle: "แนบสลิปโอนเงิน", uploadBtn: "เลือกไฟล์สลิป", submitSlip: "ส่งหลักฐานการชำระ", slipSent: "ส่งสลิปแล้ว ✓", bankInfo: "ข้อมูลบัญชีธนาคาร", bankName: "ธนาคารกสิกรไทย", bankAccName: "บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด", bankAcc: "xxx-x-xxxxx-x", note: "หมายเหตุ: กรุณาโอนเงินและแนบสลิปภายใน 24 ชั่วโมง" },
    en: { title: "Order Placed!", orderId: "Order ID", total: "Total", status: "Status", uploadTitle: "Upload Payment Slip", uploadBtn: "Select Slip File", submitSlip: "Submit Payment Proof", slipSent: "Slip Submitted ✓", bankInfo: "Bank Account Info", bankName: "Kasikorn Bank (KBank)", bankAccName: "Mahachok Mahachai Intertrade Co.,Ltd.", bankAcc: "xxx-x-xxxxx-x", note: "Please transfer and upload slip within 24 hours." },
    zh: { title: "下单成功！", orderId: "订单号", total: "合计", status: "状态", uploadTitle: "上传付款凭证", uploadBtn: "选择转账截图", submitSlip: "提交付款证明", slipSent: "已提交凭证 ✓", bankInfo: "银行账户信息", bankName: "开泰银行 (KBank)", bankAccName: "Mahachok Mahachai Intertrade Co.,Ltd.", bankAcc: "xxx-x-xxxxx-x", note: "请在24小时内完成转账并上传凭证。" },
  }[lang] || {};

  const statusMap = {
    pending_payment: { th: "รอชำระเงิน", en: "Pending Payment", zh: "待付款", color: GOLD },
    confirming: { th: "กำลังตรวจสอบ", en: "Confirming", zh: "确认中", color: "#3b82f6" },
    confirmed: { th: "ยืนยันแล้ว", en: "Confirmed", zh: "已确认", color: GREEN },
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSlipName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setSlip(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!slip) return;
    setUploading(true);
    await onUploadSlip(order.id, slip, slipName);
    setUploaded(true);
    setUploading(false);
  };

  const st = statusMap[order.status] || statusMap.pending_payment;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ background: GREEN, padding: "28px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>✅</div>
          <h1 style={{ color: "#fff", margin: "8px 0 4px", fontSize: 22, fontWeight: 800 }}>{t.title}</h1>
          <div style={{ color: "#bbf7d0", fontSize: 15 }}>{t.orderId}: <strong style={{ color: "#fff" }}>{order.id}</strong></div>
        </div>

        <div style={{ padding: "24px 32px" }}>
          {/* Order items */}
          <div style={{ marginBottom: 20 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                <span style={{ color: NAVY }}>{item.name} × {item.qty}</span>
                <span style={{ color: GREEN, fontWeight: 600 }}>฿{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontWeight: 700, fontSize: 16 }}>
              <span>{t.total}</span>
              <span style={{ color: GREEN }}>฿{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "10px 16px", background: "#f9fafb", borderRadius: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{t.status}:</span>
            <span style={{ color: st.color, fontWeight: 700, fontSize: 14 }}>{st[lang] || st.th}</span>
          </div>

          {/* Bank info */}
          <div style={{ background: "#f0fdf4", border: `1px solid #bbf7d0`, borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: GREEN, marginBottom: 8 }}>🏦 {t.bankInfo}</div>
            <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.8 }}>
              <div>{t.bankName}</div>
              <div>{t.bankAccName}</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{t.bankAcc}</div>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>{t.note}</div>
          </div>

          {/* Slip upload */}
          {!uploaded ? (
            <div>
              <div style={{ fontWeight: 700, color: NAVY, marginBottom: 12 }}>📤 {t.uploadTitle}</div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
              <button onClick={() => fileRef.current.click()}
                style={{ padding: "10px 20px", border: `2px dashed ${GREEN}`, background: "#f0fdf4", color: GREEN, borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14, marginBottom: 10, width: "100%" }}>
                📷 {slipName || t.uploadBtn}
              </button>
              {slip && (
                <img src={slip} alt="slip preview" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8, border: "1px solid #d1fae5", marginBottom: 10 }} />
              )}
              <button onClick={handleSubmit} disabled={!slip || uploading}
                style={{ width: "100%", padding: "14px", background: slip ? GREEN : "#d1d5db", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: slip ? "pointer" : "default" }}>
                {uploading ? "กำลังส่ง..." : t.submitSlip}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px", background: "#f0fdf4", borderRadius: 10, color: GREEN, fontWeight: 700, fontSize: 16 }}>
              {t.slipSent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT FORM ────────────────────────────────────────────────
function CheckoutInner() {
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();
  const [lang, setLang] = useState("th");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("goeun-agency-language");
    if (saved) setLang(saved);
  }, []);

  const t = {
    th: { title: "สั่งซื้อสินค้า", name: "ชื่อ-นามสกุล", phone: "เบอร์โทรศัพท์", address: "ที่อยู่จัดส่ง", note: "หมายเหตุ (ถ้ามี)", submit: "ยืนยันออเดอร์", subtotal: "รวม", emptyCart: "ตะกร้าว่าง กรุณาเลือกสินค้าก่อน", backShop: "← กลับไปช้อปปิ้ง", items: "รายการสินค้า" },
    en: { title: "Checkout", name: "Full Name", phone: "Phone Number", address: "Shipping Address", note: "Note (optional)", submit: "Confirm Order", subtotal: "Total", emptyCart: "Cart is empty. Please add items first.", backShop: "← Back to Shop", items: "Order Items" },
    zh: { title: "结算", name: "姓名", phone: "电话号码", address: "收货地址", note: "备注（可选）", submit: "确认下单", subtotal: "合计", emptyCart: "购物车为空，请先添加商品", backShop: "← 返回购物", items: "商品列表" },
  }[lang] || {};

  const handleUploadSlip = async (orderId, slipData, slipName) => {
    await fetch(`/api/orders/${orderId}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slipData, slipName }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setSubmitting(true);

    const orderItems = items.map((i) => ({
      id: i.id, name: i.name, nameEn: i.nameEn, price: i.price, qty: i.qty, unit: i.unit,
    }));

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: orderItems,
        customer: { name: form.name, phone: form.phone },
        shippingAddress: form.address,
        note: form.note,
        total,
      }),
    });

    if (res.ok) {
      const newOrder = await res.json();
      clearCart();
      setOrder(newOrder);
    }
    setSubmitting(false);
  };

  if (order) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Noto Sans Thai', sans-serif", paddingTop: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <button onClick={() => router.push("/m-group/shop")} style={{ background: "none", border: "none", color: GREEN, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            ← กลับไปช้อปต่อ
          </button>
        </div>
        <OrderConfirmation order={order} lang={lang} onUploadSlip={handleUploadSlip} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Noto Sans Thai', sans-serif" }}>
      {/* Header */}
      <div style={{ background: DARK, padding: "0 24px", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => router.push("/m-group/shop")} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
          {t.backShop}
        </button>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>M-Group — {t.title}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["th", "en", "zh"].map((l) => (
            <button key={l} onClick={() => { setLang(l); localStorage.setItem("goeun-agency-language", l); }}
              style={{ background: lang === l ? GOLD : "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
              {l === "th" ? "TH" : l === "en" ? "EN" : "中文"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "32px auto", padding: "0 16px", display: "flex", gap: 24, flexWrap: "wrap" }}>
        {/* Form */}
        <div style={{ flex: "1 1 380px" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            <h2 style={{ margin: "0 0 20px", color: NAVY, fontSize: 20, fontWeight: 800 }}>{t.title}</h2>
            {count === 0 ? (
              <p style={{ color: "#9ca3af" }}>{t.emptyCart}</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { field: "name", label: t.name, type: "text", required: true },
                  { field: "phone", label: t.phone, type: "tel", required: true },
                  { field: "address", label: t.address, type: "textarea", required: true },
                  { field: "note", label: t.note, type: "textarea", required: false },
                ].map(({ field, label, type, required }) => (
                  <div key={field} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: NAVY, marginBottom: 6 }}>
                      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        required={required} rows={3}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                      />
                    ) : (
                      <input
                        type={type} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        required={required}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" }}
                      />
                    )}
                  </div>
                ))}

                <button type="submit" disabled={submitting}
                  style={{ width: "100%", padding: "14px", background: submitting ? "#d1d5db" : GREEN, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: submitting ? "default" : "pointer", marginTop: 8 }}>
                  {submitting ? "กำลังส่ง..." : `${t.submit} →`}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", position: "sticky", top: 80 }}>
            <h3 style={{ margin: "0 0 16px", color: NAVY, fontSize: 16, fontWeight: 700 }}>{t.items}</h3>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                <span style={{ color: "#374151" }}>{item.name} <span style={{ color: "#9ca3af" }}>×{item.qty}</span></span>
                <span style={{ color: GREEN, fontWeight: 600 }}>฿{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontWeight: 800, fontSize: 18 }}>
              <span>{t.subtotal}</span>
              <span style={{ color: GREEN }}>฿{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutClient() {
  return (
    <CartProvider>
      <CheckoutInner />
    </CartProvider>
  );
}
