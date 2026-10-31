import { veflow } from "@/lib/projects";
import { CountUp } from "@/components/CountUp";
import { VeFlowShowcase } from "@/components/VeFlowShowcase";

// Featured VeFlow case study: header, numbers, laptop and phone showcase, and customer quote
export function VeFlowCaseStudy() {
  const { quote } = veflow;

  return (
    <article id={veflow.id} className="rounded-[2rem] border border-line bg-panel px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      {/* Header */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-5xl sm:text-7xl font-semibold tracking-[-0.04em] text-text">
            {veflow.name}
          </h3>
          <p className="mt-4 max-w-xl text-lg sm:text-xl leading-relaxed text-muted">{veflow.line}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {veflow.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-line bg-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={veflow.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-text px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85 lg:self-auto"
        >
          {veflow.link.label}
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      {/* Numbers row */}
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {veflow.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2 bg-bg p-5 sm:p-7">
            <dt className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted">{stat.label}</dt>
            <dd className="flex flex-wrap items-baseline gap-x-2 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text">
              {stat.prefix && <span className="text-[0.55em]">{stat.prefix}</span>}
              <span>
                <CountUp value={stat.value} suffix={stat.suffix} isYear={stat.isYear} />
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Laptop and phone showcase */}
      <div className="mt-14 sm:mt-20">
        <VeFlowShowcase />
      </div>

      {/* Customer quote */}
      <figure className="mt-16 rounded-3xl border border-line bg-bg p-7 sm:p-12 shadow-soft">
        <span aria-hidden="true" className="block text-7xl font-semibold leading-none text-accent">
          &ldquo;
        </span>
        <blockquote className="mt-2 max-w-3xl text-lg sm:text-2xl leading-relaxed text-text">
          {quote.text}
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent"
          >
            {quote.name.charAt(0)}
          </span>
          <span>
            <span className="block font-semibold text-text">{quote.name}</span>
            <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted">
              {quote.company} · {quote.detail}
            </span>
          </span>
        </figcaption>
      </figure>
    </article>
  );
}
