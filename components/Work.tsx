import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { RevealWords } from "@/components/RevealWords";
import { VeFlowCaseStudy } from "@/components/VeFlowCaseStudy";

// Work section: intro, the featured VeFlow case study, then the other project cards
export function Work() {
  return (
    <section id="work" className="bg-bg py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section intro */}
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          <span className="text-accent">01</span> / Selected work
        </p>
        <h2 className="mt-5 max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] text-balance text-text">
          <RevealWords text="Work that runs real businesses" />
        </h2>

        <div className="mt-14 sm:mt-20">
          <VeFlowCaseStudy />
        </div>

        {/* Other projects: side by side on wider screens, stacked on phones */}
        <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
