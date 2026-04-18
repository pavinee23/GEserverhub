export default function Footer({ ui, profile }) {
  return (
    <footer className="agency-footer">
      <div className="container-xxl agency-shell">
        <div className="agency-footer-shell">
          <div className="agency-footer-brand">
            <img
              src="/logo-mark.svg"
              alt="GOEUN SERVER HUB"
              width="56"
              height="56"
              className="agency-footer-logo"
            />
            <div>
              <strong>{profile.brand_name}</strong>
              <span>{ui.footerSubtitle}</span>
            </div>
          </div>
          <div className="agency-footer-meta">
            <span>{ui.footerFrontend}</span>
            <span>{ui.footerBackend}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
