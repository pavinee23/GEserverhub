import { statusClassName } from "@/lib/data";

const PROMO_CONFIGS = [
  {
    accentClass: "agency-promo-blue",
    kicker: "WORKFLOW",
    titleKey: "promoWorkflow",
    defaultTitle: "พัฒนาระบบเฉพาะธุรกิจ",
    defaultSub: "Custom ERP / CRM / POS",
  },
  {
    accentClass: "agency-promo-cyan",
    kicker: "DATABASE",
    titleKey: "promoDatabase",
    defaultTitle: "เชื่อมฐานข้อมูลและรายงาน",
    defaultSub: "MySQL · Analytics · Reports",
  },
  {
    accentClass: "agency-promo-purple",
    kicker: "ACCESS",
    titleKey: "promoAccess",
    defaultTitle: "ศูนย์กลางการเข้าถึงระบบ",
    defaultSub: "Multi-Portal · Role-Based",
  },
];

const FILTER_TABS = [
  { key: "all", labelKey: "filterAll", defaultLabel: "ทั้งหมด" },
  { key: "online", labelKey: "filterOnline", defaultLabel: "พร้อมใช้งาน" },
  { key: "maintenance", labelKey: "filterMaintenance", defaultLabel: "บำรุงรักษา" },
  { key: "coming-soon", labelKey: "filterComingSoon", defaultLabel: "เร็ว ๆ นี้" },
];

export default function Hero({
  ui,
  profile,
  services,
  clients,
  onlineCount,
  maintenanceCount,
  comingSoonCount,
  loading,
  query,
  setQuery,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <section className="agency-hero" id="top">
      {/* ── Banner ── */}
      <div className="agency-hero-banner">
        {/* Decorative logo watermark */}
        <img
          src="/logo-mark.svg"
          alt=""
          aria-hidden="true"
          className="agency-hero-logo-deco"
        />
        <div className="agency-hero-banner-inner">
          <span className="agency-hero-kicker">{ui.heroKicker}</span>
          <h1 className="agency-hero-title">{ui.heroTitle}</h1>
          <p className="agency-hero-subtitle">{ui.heroSubtitle}</p>
          <div className="agency-hero-stats">
            <div className="agency-hero-stat">
              <strong>{clients.length}</strong>
              <span>{ui.statPortals}</span>
            </div>
            <div className="agency-hero-stat-divider" />
            <div className="agency-hero-stat">
              <strong>{onlineCount}</strong>
              <span>{ui.statLive}</span>
            </div>
            <div className="agency-hero-stat-divider" />
            <div className="agency-hero-stat">
              <strong>{services.length}</strong>
              <span>{ui.statServices}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search card (Trip.com form) ── */}
      <div className="agency-hero-box container-xxl">
        <div className="agency-hero-search-card">
          <div className="agency-hero-tabs" role="tablist">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.key}
                className={`agency-hero-tab ${activeFilter === tab.key ? "is-active" : ""}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {(ui && ui[tab.labelKey]) || tab.defaultLabel}
              </button>
            ))}
          </div>
          <div className="agency-hero-form">
            <div className="agency-hero-field">
              <label htmlFor="hero-search">{ui.searchLabel || "ค้นหาระบบ"}</label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.searchPlaceholder || "ชื่อบริษัท, slug หรือระบบ..."}
              />
            </div>
            <div className="agency-hero-field-divider" />
            <div className="agency-hero-field">
              <label>{ui.statLive || "สถานะ"}</label>
              <span className="agency-hero-field-value">
                {loading
                  ? (ui.syncing || "กำลังซิงก์...")
                  : `${onlineCount} ${ui.filterOnline || "พร้อมใช้งาน"}`}
                <span className={`hero-live-dot ${loading ? "" : "is-live"}`} aria-hidden="true" />
              </span>
            </div>
            <div className="agency-hero-field-divider" />
            <div className="agency-hero-field">
              <label>{ui.statPortals || "พอร์ทัลทั้งหมด"}</label>
              <span className="agency-hero-field-value">
                {clients.length} {ui.statPortals || "ระบบ"}
              </span>
            </div>
            <button
              type="button"
              className="agency-hero-search-btn"
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
            >
              {ui.heroPrimaryButton || "ค้นหา"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Promo cards ── */}
      <div className="agency-hero-promos container-xxl">
        {PROMO_CONFIGS.map((promo, i) => {
          const svc = services[i];
          return (
            <a
              key={promo.kicker}
              href="#services"
              className={`agency-promo-card ${promo.accentClass}`}
            >
              <div className="agency-promo-card-inner">
                <span className="agency-promo-kicker">{promo.kicker}</span>
                <strong className="agency-promo-title">
                  {svc?.title || promo.defaultTitle}
                </strong>
                <span className="agency-promo-sub">
                  {svc?.highlight || promo.defaultSub}
                </span>
              </div>
              <svg
                className="agency-promo-arrow"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          );
        })}
      </div>
    </section>
  );
}

