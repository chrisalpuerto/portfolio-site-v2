import RevealSection from "@/components/RevealSection";

// Placeholder roles — replace with real history.
const ROLES = [
  {
    period: "2023 — Present",
    company: "Company Name",
    description:
      "Short description of the work — the systems owned, what was built, and the outcome.",
    location: "City, State",
  },
  {
    period: "2021 — 2023",
    company: "Company Name",
    description:
      "Short description of the work — the systems owned, what was built, and the outcome.",
    location: "City, State",
  },
  {
    period: "2019 — 2021",
    company: "Company Name",
    description:
      "Short description of the work — the systems owned, what was built, and the outcome.",
    location: "City, State",
  },
];

// Rows step 100ms behind the heading. Capped at the largest delay
// utility that exists, so a longer list degrades to a shared delay
// rather than an undefined class.
const rowDelay = (i: number) => Math.min((i + 2) * 100, 900);

export default function Work() {
  return (
    <RevealSection id="work" className="ca-container ca-work">
      <h2 className="ca-work-heading ca-animate-element ca-animate-delay-100">
        Work Experience
      </h2>

      <ol className="ca-work-list">
        {ROLES.map((role, i) => (
          <li
            key={`${role.company}-${role.period}`}
            className={`ca-work-item ca-animate-element ca-animate-delay-${rowDelay(i)}`}
          >
            <time className="ca-work-period">{role.period}</time>
            <div className="ca-work-body">
              <h3 className="ca-work-company">{role.company}</h3>
              <p className="ca-work-desc">{role.description}</p>
            </div>
            <span className="ca-work-location">{role.location}</span>
          </li>
        ))}
      </ol>
    </RevealSection>
  );
}
