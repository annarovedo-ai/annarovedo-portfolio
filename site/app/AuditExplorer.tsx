const findings = [
  {
    number: "01",
    severity: "Critical",
    title: "Too many paths. No clear progress.",
    body: "Users could be sent three or more levels deep, with inconsistent labels and no reliable return path.",
    src: "audit-navigation.png",
    alt: "Annotated navigation walkthrough showing a long sequence of chat screens, repeated menus, and a roadblock",
  },
  {
    number: "02",
    severity: "Critical",
    title: "The flow could simply stop.",
    body: "Mandatory forms, external links, and missing recovery paths turned assistance into a dead end.",
    src: "audit-dead-ends.png",
    alt: "Annotated chat flow showing branches to a mandatory form and a failed live-agent connection",
  },
  {
    number: "03",
    severity: "High",
    title: "Nobody knew who was speaking.",
    body: "Watson, live agents, sales, and passive AI appeared in one experience without a clear handoff.",
    src: "audit-role.png",
    alt: "Annotated comparison of IBM chat interfaces showing inconsistent branding, controls, and assistant identity",
  },
];

export default function AuditExplorer() {
  return (
    <section className="audit-explorer" aria-labelledby="audit-title">
      <div className="audit-heading">
        <div>
          <p className="section-number">Live experience audit</p>
          <h3 id="audit-title">The problems were bigger than the widget.</h3>
        </div>
        <p>
          Across desktop and mobile, the same three patterns kept getting in the way: unclear navigation, broken journeys, and an assistant without a consistent role.
        </p>
      </div>

      <div className="audit-evidence-grid">
        {findings.map((finding) => (
          <article key={finding.number} className={finding.number === "01" ? "audit-evidence-wide" : ""}>
            <div className="audit-evidence-copy">
              <div className="audit-finding-meta">
                <span>{finding.number}</span>
                <span>{finding.severity}</span>
              </div>
              <h4>{finding.title}</h4>
              <p>{finding.body}</p>
            </div>
            <figure>
              <img src={`/case-study/concierge/${finding.src}`} alt={finding.alt} loading="lazy" />
            </figure>
          </article>
        ))}
      </div>

      <figure className="audit-mobile-proof">
        <div>
          <p className="section-number">Cross-platform evidence</p>
          <h4>Mobile made every problem louder.</h4>
          <p>Slow loading, blocked inputs, conflicting labels, and broken continuity exposed the same structural problems in a more constrained space.</p>
        </div>
        <img
          src="/case-study/concierge/audit-mobile.png"
          alt="Annotated mobile chat walkthrough showing load failures, blocked inputs, unclear labels, and a disjointed external handoff"
          loading="lazy"
        />
      </figure>
    </section>
  );
}
