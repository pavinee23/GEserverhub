"use client";
import { useState, useEffect, useRef } from "react";

const OG     = "#F97316";
const OG_D   = "#EA580C";
const AMBER  = "#F59E0B";
const DARK   = "#1C0A00";
const WHITE  = "#FFFFFF";

const UI = {
  th: { title: "แชทกับเรา", placeholder: "พิมพ์ข้อความ...", send: "ส่ง", greeting: "สวัสดีครับ! 👋 มีอะไรให้ช่วยได้บ้างครับ?\nสามารถสอบถามเรื่องสินค้า ราคา หรือการสั่งซื้อได้เลยครับ" },
  en: { title: "Chat with Us", placeholder: "Type a message...", send: "Send", greeting: "Hello! 👋 How can I help you today?\nFeel free to ask about our products, pricing, or orders." },
  zh: { title: "在线咨询", placeholder: "输入消息...", send: "发送", greeting: "您好！👋 有什么可以帮助您的吗？\n欢迎咨询产品、价格或订单相关问题。" },
};

function BubbleBot({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", background: WHITE,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.12)",
        padding: 4,
      }}>
        <img src="/m-group-logo.png" alt="M-Group" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{
        background: WHITE, color: DARK, borderRadius: "16px 16px 16px 4px",
        padding: "10px 14px", fontSize: 14, lineHeight: 1.6,
        maxWidth: "78%", boxShadow: "0 1px 4px rgba(0,0,0,.08)",
        whiteSpace: "pre-wrap", wordBreak: "break-word",
      }}>{text}</div>
    </div>
  );
}

function BubbleUser({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
      <div style={{
        background: OG, color: WHITE, borderRadius: "16px 16px 4px 16px",
        padding: "10px 14px", fontSize: 14, lineHeight: 1.6,
        maxWidth: "78%", boxShadow: "0 1px 4px rgba(0,0,0,.12)",
        whiteSpace: "pre-wrap", wordBreak: "break-word",
      }}>{text}</div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", background: WHITE,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.12)", padding: 4,
      }}>
        <img src="/m-group-logo.png" alt="M-Group" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{
        background: WHITE, borderRadius: "16px 16px 16px 4px",
        padding: "12px 16px", boxShadow: "0 1px 4px rgba(0,0,0,.08)",
        display: "flex", gap: 4, alignItems: "center",
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: "50%", background: "#9ca3af",
            display: "inline-block",
            animation: "dot-bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("th");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", content: string }
  const [greeted, setGreeted] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const LANG_KEY = "goeun-agency-language";

  // Inject keyframe for typing dots
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "fchat-style";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
      @keyframes fchat-pop { from{opacity:0;transform:scale(.85) translateY(16px)} to{opacity:1;transform:none} }
      @keyframes fchat-badge { 0%{transform:scale(1)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }
    `;
    document.head.appendChild(s);
  }, []);

  // Sync language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && UI[saved]) setLang(saved);
  }, [open]);

  // Show greeting on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setMessages([{ role: "assistant", content: UI[lang]?.greeting || UI.th.greeting }]);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const uiLabel = UI[lang] || UI.th;

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Build history for context (exclude greeting)
    const history = newMessages
      .filter((_, i) => i > 0 || newMessages[0].role !== "assistant") // skip auto-greeting from history
      .slice(-12)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang }),
      });
      const data = await res.json();
      const reply = data.text || data.error || "ขออภัย ไม่สามารถตอบได้ในขณะนี้";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      if (!open) setUnread(v => v + 1);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 88, right: 20, width: "min(380px, calc(100vw - 32px))",
          height: "min(540px, calc(100dvh - 120px))",
          background: "#f9fafb", borderRadius: 20, zIndex: 9999,
          boxShadow: "0 8px 40px rgba(0,0,0,.22)",
          display: "flex", flexDirection: "column",
          animation: "fchat-pop .25s ease",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${OG_D}, ${OG})`,
            padding: "10px 14px 8px", flexShrink: 0,
          }}>
            {/* Row 1: logo + title + close */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: WHITE, borderRadius: 6, padding: "3px 7px", display: "flex", alignItems: "center" }}>
                  <img src="/m-group-logo.png" alt="M-Group" style={{ height: 22, width: "auto", objectFit: "contain" }} />
                </div>
                <span style={{ color: WHITE, fontWeight: 700, fontSize: 14 }}>{uiLabel.title}</span>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "rgba(255,255,255,.15)", border: "none", color: WHITE,
                borderRadius: "50%", width: 26, height: 26, fontSize: 15,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>
            </div>
            {/* Row 2: lang switcher */}
            <div style={{ display: "flex", gap: 4 }}>
              {[["th","TH"],["en","EN"],["zh","中"]].map(([l, label]) => (
                <button key={l} onClick={() => { setLang(l); localStorage.setItem(LANG_KEY, l); }} style={{
                  background: lang === l ? AMBER : "rgba(255,255,255,.18)",
                  color: lang === l ? DARK : WHITE,
                  border: "none", borderRadius: 5,
                  padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>{label}</button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px 4px" }}>
            {messages.map((m, i) =>
              m.role === "assistant"
                ? <BubbleBot key={i} text={m.content} />
                : <BubbleUser key={i} text={m.content} />
            )}
            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "10px 12px", background: WHITE,
            borderTop: "1px solid #e5e7eb", display: "flex", gap: 8, flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={uiLabel.placeholder}
              rows={1}
              style={{
                flex: 1, border: "1px solid #d1d5db", borderRadius: 10,
                padding: "9px 12px", fontSize: 14, resize: "none",
                outline: "none", fontFamily: "inherit", lineHeight: 1.5,
                maxHeight: 80, overflowY: "auto",
              }}
            />
            <button onClick={send} disabled={!input.trim() || loading} style={{
              background: input.trim() && !loading ? OG : "#d1d5db",
              color: WHITE, border: "none", borderRadius: 10,
              padding: "0 16px", fontWeight: 700, fontSize: 14, cursor: input.trim() && !loading ? "pointer" : "default",
              transition: "background .15s", flexShrink: 0,
            }}>{uiLabel.send}</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 9999,
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${OG_D}, ${OG})`,
          border: `3px solid ${AMBER}`,
          boxShadow: "0 4px 20px rgba(249,115,22,.5)",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 24,
          transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(249,115,22,.7)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,.5)"; }}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -4,
            background: "#ef4444", color: WHITE,
            borderRadius: "50%", width: 20, height: 20,
            fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fchat-badge .4s ease",
          }}>{unread}</span>
        )}
      </button>
    </>
  );
}
