import ProjectCard from "@/components/ProjectCard";
import RevealSection from "@/components/RevealSection";

// Placeholder projects — replace with real work. Add an `image`
// ({ src, alt }) to any entry to swap out the "coming soon" panel.
const PROJECTS = [
  {
    title: "Project One.",
    description:
      "Short description of the project — what it does, what it was built with, and why it mattered.",
  },
  {
    title: "Project Two.",
    description:
      "Short description of the project — what it does, what it was built with, and why it mattered.",
  },
  {
    title: "Project Three.",
    description:
      "Short description of the project — what it does, what it was built with, and why it mattered.",
  },
  {
    title: "Project Four.",
    description:
      "Short description of the project — what it does, what it was built with, and why it mattered.",
  },
];

// Cards step 100ms behind the heading, capped at the largest delay
// utility that exists.
const cardDelay = (i: number) => Math.min((i + 2) * 100, 900);

export default function Projects() {
  return (
    <RevealSection id="projects" className="ca-container ca-projects">
      <h2 className="ca-projects-heading ca-animate-element ca-animate-delay-100">
        Projects
      </h2>

      <div className="ca-projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.title}
            index={i + 1}
            title={project.title}
            description={project.description}
            className={`ca-animate-element ca-animate-delay-${cardDelay(i)}`}
          />
        ))}
      </div>
    </RevealSection>
  );
}
