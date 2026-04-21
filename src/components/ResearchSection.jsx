export default function ResearchSection({ ui }) {
  return (
    <section className="agency-section agency-section-alt" id="research">
      <div className="container-xxl agency-shell">
        <div className="agency-section-shell agency-section-shell-soft">
          <div className="section-intro text-center" data-reveal>
            <span className="section-kicker">{ui.researchKicker}</span>
            <h2 className="section-title">{ui.researchTitle}</h2>
            <p className="section-subtitle">{ui.researchSubtitle}</p>
          </div>

          <div className="row g-4">
            {ui.researchItems.map((item, index) => (
              <div key={item.title} className="col-12 col-md-6 col-xl-4">
                <article
                  data-reveal
                  data-delay={index + 1}
                  className="research-card"
                >
                  <div className="research-icon">{item.icon}</div>
                  <span className="research-tag">{item.tag}</span>
                  <h3 className="research-title">{item.title}</h3>
                  <p className="research-desc">{item.description}</p>
                  <div className="research-status">
                    <span className="research-dot" />
                    กำลังพัฒนา
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .research-card {
          background: var(--agency-surface);
          border: 1.5px solid var(--agency-line);
          border-radius: var(--agency-radius-xl);
          padding: 2rem 1.75rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
        }
        .research-card:hover {
          box-shadow: var(--agency-shadow-deep);
          border-color: var(--agency-primary);
          transform: translateY(-4px);
        }
        .research-icon {
          font-size: 2.4rem;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        .research-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--agency-primary);
          background: var(--agency-accent-soft);
          border-radius: var(--agency-radius-pill);
          padding: 0.2rem 0.75rem;
          width: fit-content;
        }
        .research-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--agency-ink);
          margin: 0;
          line-height: 1.4;
        }
        .research-desc {
          font-size: 0.9rem;
          color: var(--agency-muted);
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }
        .research-status {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--agency-maintenance);
          margin-top: auto;
          padding-top: 0.5rem;
          border-top: 1px solid var(--agency-line);
        }
        .research-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--agency-maintenance);
          animation: research-pulse 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes research-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}
