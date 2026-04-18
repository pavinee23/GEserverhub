export default function JourneySection({ ui }) {
  return (
    <section className="agency-section agency-section-plain" id="journey">
      <div className="container-xxl agency-shell">
        <div className="agency-section-shell agency-section-shell-plain">
          <div className="section-intro text-center" data-reveal>
            <span className="section-kicker">{ui.journeyKicker}</span>
            <h2 className="section-title">{ui.journeyTitle}</h2>
            <p className="section-subtitle">{ui.journeySubtitle}</p>
          </div>

          <div className="journey-timeline">
            {ui.journeySteps.map((step, index) => (
              <div
                key={step.phase}
                data-reveal
                data-delay={Math.min(index + 1, 4)}
                className={`journey-item ${index % 2 === 0 ? "journey-item-left" : "journey-item-right"}`}
              >
                <div className="journey-node">{step.phase}</div>
                <article className="journey-card">
                  <span className="journey-kicker">{step.kicker}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
