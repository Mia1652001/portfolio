"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqevyeda";

type Status = "idle" | "loading" | "success" | "error";
type ContactType = "personal" | "business";

// Contact page with a form that posts directly to Formspree
export default function ContactPage() {
  const [contactType, setContactType] = useState<ContactType>("personal");
  const [status, setStatus] = useState<Status>("idle");

  // Sends the form data to Formspree and updates the status message shown to the user
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setContactType("personal");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyles =
    "w-full px-4 py-3 border-2 bg-transparent outline-none transition-colors border-[#1A1A1A]/20 focus:border-[#1A1A1A] text-[#1A1A1A]";
  const labelStyles = "block text-sm font-medium mb-2";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-8 py-6">
        <Link
          href="/"
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A1A1A" }}
        >
          Mia Davidson
        </Link>
        <div className="flex gap-6 sm:gap-8 text-sm font-medium">
          <Link
            href="/#work"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="transition-opacity hover:opacity-60"
            style={{ color: "#1A1A1A" }}
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 sm:px-8 pt-12 pb-24">
        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
          style={{ color: "#1A1A1A" }}
        >
          Contact me
        </h1>
        <p className="text-lg mb-10 leading-relaxed" style={{ color: "#6B6B66" }}>
          Tell me about your project - what you&apos;re building, what you need, and
          I&apos;ll get back to you soon.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={labelStyles} style={{ color: "#1A1A1A" }}>
              Full name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputStyles}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelStyles} style={{ color: "#1A1A1A" }}>
              Email address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputStyles}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <span className={labelStyles} style={{ color: "#1A1A1A" }}>
              This is for
            </span>
            <input type="hidden" name="type" value={contactType} />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContactType("personal")}
                className={`flex-1 px-4 py-3 text-sm font-medium border-2 transition-colors ${
                  contactType === "personal"
                    ? "bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A]"
                    : "border-[#1A1A1A]/20 text-[#1A1A1A]"
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setContactType("business")}
                className={`flex-1 px-4 py-3 text-sm font-medium border-2 transition-colors ${
                  contactType === "business"
                    ? "bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A]"
                    : "border-[#1A1A1A]/20 text-[#1A1A1A]"
                }`}
              >
                Business
              </button>
            </div>
          </div>

          {contactType === "business" && (
            <div>
              <label
                htmlFor="businessName"
                className={labelStyles}
                style={{ color: "#1A1A1A" }}
              >
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                className={inputStyles}
                placeholder="Your business name"
              />
            </div>
          )}

          <div>
            <label htmlFor="needs" className={labelStyles} style={{ color: "#1A1A1A" }}>
              What do you need?
            </label>
            <select id="needs" name="needs" defaultValue="" className={inputStyles}>
              <option value="" disabled>
                Select an option
              </option>
              <option value="Website">Website</option>
              <option value="Online store">Online store</option>
              <option value="Tool or system">Tool or system</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className={labelStyles} style={{ color: "#1A1A1A" }}>
              Budget range (optional)
            </label>
            <select id="budget" name="budget" defaultValue="" className={inputStyles}>
              <option value="">Prefer not to say</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $6,000">$3,000 - $6,000</option>
              <option value="$6,000+">$6,000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className={labelStyles} style={{ color: "#1A1A1A" }}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={`${inputStyles} resize-none`}
              placeholder="Tell me a bit about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-block px-8 py-3 bg-[#1A1A1A] text-[#FAF8F5] text-sm font-medium tracking-wide transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-sm" style={{ color: "#1A1A1A" }}>
              Thanks for reaching out! Your message is on its way - I&apos;ll get back
              to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm" style={{ color: "#1A1A1A" }}>
              Something went wrong sending your message. Please try again, or email me
              directly below.
            </p>
          )}
        </form>

        {/* Direct contact options */}
        <div className="mt-16 pt-10 border-t border-[#1A1A1A]/10">
          <p className="text-sm mb-4" style={{ color: "#6B6B66" }}>
            Prefer to reach out directly?
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
        </div>
      </main>
    </div>
  );
}
