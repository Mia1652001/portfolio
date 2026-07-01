import Image from "next/image";

// Project data for the preview cards
const projects = [
  {
    name: "Betty Beach",
    description: "Swimwear e-commerce brand",
    image: "/betty-beach.png",
    width: 1932,
    height: 1484,
    borderColor: "#E4DCC8",
  },
  {
    name: "WEARhouse",
    description: "Shopify clothing store",
    image: "/wearhouse.png",
    width: 1974,
    height: 1482,
    borderColor: "#1F1F1F",
  },
  {
    name: "Fleet Manager",
    description: "Rental car management app",
    image: "/fleet-manager.png",
    width: 1984,
    height: 1486,
    borderColor: "#D9DED6",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
        <span
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A1A1A" }}
        >
          Mia Davidson
        </span>
        <div className="flex gap-8 text-sm font-medium">
          <a
            href="#work"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            Work
          </a>
          <a
            href="#about"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            About
          </a>
          <a
            href="#contact"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <h1
          className="text-5xl font-bold leading-tight mb-6 max-w-2xl"
          style={{ color: "#1A1A1A" }}
        >
          Websites built to work as hard as you do.
        </h1>
        <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: "#6B6B66" }}>
          I build clean, fast sites for small businesses that are ready to
          grow — no bloated templates, just work that converts.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium tracking-wide transition-colors hover:bg-[#1A1A1A] hover:text-[#FAF8F5]"
        >
          Let&apos;s work together
        </a>
      </section>

      {/* Project Preview Cards */}
      <section id="work" className="max-w-7xl mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.name} className="group cursor-pointer">
              {/* Project screenshot */}
              <Image
                src={project.image}
                alt={project.name}
                width={project.width}
                height={project.height}
                className="w-full h-auto object-contain rounded-lg border-4"
                style={{ borderColor: project.borderColor }}
              />
              <p
                className="mt-3 text-xl font-bold"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "#1A1A1A",
                }}
              >
                {project.name}
              </p>
              <p className="mt-1 text-sm" style={{ color: "#6B6B66" }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
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
          Got a project in mind? I&apos;d love to hear about it — reach out and let&apos;s chat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:Mia1652001@gmail.com"
            className="inline-block px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium tracking-wide text-center transition-colors hover:bg-[#1A1A1A] hover:text-[#FAF8F5]"
          >
            Mia1652001@gmail.com
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
