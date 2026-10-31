import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />

      <Hero />

      <Work />

      <Services />

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-28">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          <span className="text-accent">03</span> / About
        </p>
        <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text">
          About me
        </h2>
        <p className="mt-6 text-lg max-w-prose leading-relaxed text-muted">
          I build websites and systems for businesses and brands. Working
          with me means clear communication, creative solutions, and
          genuine collaboration from start to finish. My path here was
          hands-on: I started coding a few years ago on personal projects,
          began building sites for friends, and now take on client work. I
          love that this job lets me combine creativity and technology to
          help brands grow.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-5 sm:px-8 pb-28">
        <div className="rounded-[2rem] border border-line bg-panel px-6 py-12 sm:px-12 sm:py-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text">
            Contact me
          </h2>
          <p className="mt-4 mb-10 text-lg max-w-md leading-relaxed text-muted">
            Got a project in mind? I&apos;d love to hear about it - reach out and let&apos;s chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:Mia1652001@gmail.com"
              className="rounded-full bg-text px-6 py-3 text-center text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              Email me
            </a>
            <a
              href="https://wa.me/4746440713"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-bg px-6 py-3 text-center text-[15px] font-medium text-text shadow-soft transition-colors hover:bg-panel"
            >
              Message me on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
