import { services } from "@/lib/projects";
import { RevealWords } from "@/components/RevealWords";
import { ServiceCard } from "@/components/ServiceCard";

// Services section: intro, then three service cards in a row (stacked on phones and tablets)
export function Services() {
  return (
    <section id="services" className="bg-bg pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="border-t border-line pt-20 sm:pt-28">
          {/* Section intro */}
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            <span className="text-accent">02</span> / Services
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] text-balance text-text">
            <RevealWords text="What I can build for you" />
          </h2>

          <div className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
