"use client";

import Link from "next/link";

const NAV_ITEMS = [
  {
    labelKey: "navHome",
    defaultLabel: "หน้าแรก",
    href: "#top",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    labelKey: "navPortals",
    defaultLabel: "พอร์ทัลลูกค้า",
    href: "#showcase",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    labelKey: "navServices",
    defaultLabel: "บริการ",
    href: "#services",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
      </svg>
    ),
  },
  {
    labelKey: "navJourney",
    defaultLabel: "เส้นทางงาน",
    href: "#journey",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    labelKey: "navContact",
    defaultLabel: "ติดต่อ",
    href: "#contact",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8l10 6 10-6" />
      </svg>
    ),
  },
];

export default function Sidebar({ ui, profile }) {
  return (
    <aside className="agency-sidebar">
      <div className="agency-sidebar-brand">
        <img src="/logo-mark.svg" width="36" height="36" alt="GOEUN" />
        <div className="agency-sidebar-brand-copy">
          <strong>{profile?.brand_name || "GOEUN HUB"}</strong>
          <span>Server Hub</span>
        </div>
      </div>

      <nav className="agency-sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="agency-sidebar-item">
            <span className="agency-sidebar-icon">{item.icon}</span>
            <span>{(ui && ui[item.labelKey]) || item.defaultLabel}</span>
          </a>
        ))}
      </nav>

      <div className="agency-sidebar-divider" />

      <div className="agency-sidebar-bottom">
        <Link href="/login" className="agency-sidebar-item agency-sidebar-login-item">
          <span className="agency-sidebar-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </span>
          <span>{(ui && ui.navLogin) || "เข้าสู่ระบบ"}</span>
        </Link>
      </div>
    </aside>
  );
}
