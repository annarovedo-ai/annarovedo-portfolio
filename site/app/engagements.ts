/**
 * Ways to work together: the three engagement shapes, defined once.
 *
 * The client homepage shows the short form (title, summary, duration) and the
 * Client services page shows the long form (expanded, best-for) under
 * /resume#engagements. Both read from this array so the two surfaces cannot
 * drift apart, which is exactly what happened to the old capability cards
 * this section replaced.
 *
 * No prices here, deliberately. The CTA under each rendering asks for the
 * situation, not the budget: a prospective client should be able to describe
 * what they are working on without first diagnosing which engagement model
 * they need.
 */
export type Engagement = {
  id: string;
  title: string;
  /** Scannable but subordinate to the title wherever it renders. */
  duration: string;
  /** One-card summary for the homepage. */
  summary: string;
  /** Full description for the services page. */
  expanded: string;
  /** "Best for" line on the services page. */
  bestFor: string;
};

export const engagements: Engagement[] = [
  {
    id: "sprint",
    title: "Product Direction Sprint",
    duration: "2–3 weeks",
    summary:
      "Turn an important but poorly defined initiative into a direction your team can evaluate and act on.",
    expanded:
      "A focused two-to-three-week engagement for a product, feature, or initiative that is important but poorly defined. It can include stakeholder conversations, an experience audit, opportunity framing, prototype directions, and a recommended path forward.",
    bestFor:
      "A new product, feature, AI opportunity, or redesign that matters but is not yet clearly defined.",
  },
  {
    id: "embedded",
    title: "Embedded Principal Design Lead",
    duration: "3–6 months",
    summary:
      "Add senior, hands-on design leadership to an important product initiative without adding agency layers.",
    expanded:
      "Anna joins the product team for three to six months, normally three or four days per week. She can own an ambiguous area, establish direction, create prototypes, support decisions, and stay through detailed design and implementation.",
    bestFor:
      "Teams facing an important product initiative without the senior design capacity to lead it.",
  },
  {
    id: "system",
    title: "Experience System or Launch",
    duration: "6–12 weeks",
    summary:
      "Take a connected product, platform, system, or launch from early direction through delivery.",
    expanded:
      "A defined six-to-twelve-week engagement involving a platform redesign, product experience, design system, website, brand, campaign, or connected launch. Anna leads the work and brings in trusted specialists when the scope requires them.",
    bestFor:
      "Work that crosses disciplines and needs one clear point of view from early direction through launch.",
  },
];
