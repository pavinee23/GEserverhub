import { backendBaseUrl } from "@/lib/data";

export default function ContactSection({ ui, profile }) {
  return (
    <section className="agency-section agency-section-dark" id="contact">
      <div className="container-xxl agency-shell">
        <div className="contact-banner" data-reveal>
          <div className="contact-banner-copy">
            <span className="section-kicker section-kicker-light">{ui.contactKicker}</span>
            <h2>{ui.contactTitle}</h2>
            <p>{ui.contactText}</p>
          </div>
          <div className="contact-banner-side">
            <div className="contact-strip">
              <span>{ui.emailLabel}</span>
              <strong>{profile.email}</strong>
            </div>
            <div className="contact-strip">
              <span>{ui.phoneLabel}</span>
              <strong>{profile.phone}</strong>
            </div>
            <div className="contact-strip">
              <span>{ui.addressLabel}</span>
              <strong>{profile.address}</strong>
            </div>
            <div className="contact-actions">
              <a className="btn agency-btn-primary btn-lg" href={`mailto:${profile.email}`}>
                {ui.sendEmail}
              </a>
              <a className="btn agency-btn-outline btn-lg" href={`${backendBaseUrl}/clients`}>
                {ui.openDirectory}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
