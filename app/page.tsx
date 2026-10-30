import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Nav />

      <Hero />

      <Work />

      <Services />

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-8 pt-24 sm:pt-32 pb-28">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
          About me
        </h2>
        <p className="text-lg max-w-prose leading-relaxed" style={{ color: "#6B6B66" }}>
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
      <section id="contact" className="max-w-6xl mx-auto px-8 pb-28">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "#1A1A1A" }}
        >
          Contact me
        </h2>
        <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: "#6B6B66" }}>
          Got a project in mind? I&apos;d love to hear about it - reach out and let&apos;s chat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:Mia1652001@gmail.com"
            className="inline-block px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium tracking-wide text-center transition-colors hover:bg-[#1A1A1A] hover:text-[#FAF8F5]"
          >
            Email me
          </a>
          <a
            href="https://wa.me/4746440713"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FAF8F5] text-sm font-medium tracking-wide text-center transition-opacity hover:opacity-80"
          >
            Message me on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
