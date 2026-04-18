"use client";

import { languageOptions } from "@/lib/data";
import Link from "next/link";

export default function Navbar({ ui, currentLanguage, setCurrentLanguage, query, setQuery }) {
  return (
    <header className="agency-topbar">
      <div className="agency-topbar-search">
        <svg
          className="agency-topbar-search-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.searchPlaceholder || "ค้นหาระบบ บริการ หรือพอร์ทัล..."}
          aria-label="ค้นหา"
        />
      </div>

      <div className="agency-topbar-actions">
        <div className="agency-language-switcher" aria-label="Language switcher">
          {languageOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`agency-language-button ${currentLanguage === option.key ? "is-active" : ""}`}
              onClick={() => setCurrentLanguage(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <a href="#contact" className="agency-topbar-link">
          {ui.navContact}
        </a>
        <Link href="/login" className="btn agency-btn-primary agency-topbar-cta">
          {ui.navLogin || "เข้าสู่ระบบ"}
        </Link>
      </div>
    </header>
  );
}
