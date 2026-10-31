"use client";

import { useState, FormEvent } from "react";
import { Nav } from "@/components/Nav";

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
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-text outline-none transition-colors placeholder:text-faint focus:border-text";
  const labelStyles = "block text-sm font-medium mb-2 text-text";

  return (
    <div className="min-h-screen bg-bg">
      <Nav />

      <main className="max-w-2xl mx-auto px-6 sm:px-8 pt-12 pb-24">
        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-semibold leading-tight tracking-[-0.03em] mb-4 text-text"
        >
          Contact me
        </h1>
        <p className="text-lg mb-10 leading-relaxed text-muted">
          Tell me about your project - what you&apos;re building, what you need, and
          I&apos;ll get back to you soon.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={labelStyles}>
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
            <label htmlFor="email" className={labelStyles}>
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
            <span className={labelStyles}>
              This is for
            </span>
            <input type="hidden" name="type" value={contactType} />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContactType("personal")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium border transition-colors ${
                  contactType === "personal"
                    ? "bg-text text-bg border-text"
                    : "border-line text-text hover:bg-panel"
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setContactType("business")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium border transition-colors ${
                  contactType === "business"
                    ? "bg-text text-bg border-text"
                    : "border-line text-text hover:bg-panel"
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
            <label htmlFor="needs" className={labelStyles}>
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
            <label htmlFor="budget" className={labelStyles}>
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
            <label htmlFor="message" className={labelStyles}>
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
            className="w-full sm:w-auto inline-block rounded-full px-7 py-3 bg-text text-bg text-[15px] font-medium transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-text">
              Thanks for reaching out! Your message is on its way - I&apos;ll get back
              to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-text">
              Something went wrong sending your message. Please try again, or email me
              directly below.
            </p>
          )}
        </form>

        {/* Direct contact options */}
        <div className="mt-16 pt-10 border-t border-line">
          <p className="text-sm mb-4 text-muted">
            Prefer to reach out directly?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:Mia1652001@gmail.com"
              className="inline-block rounded-full px-7 py-3 border border-line bg-bg text-text text-[15px] font-medium text-center shadow-soft transition-colors hover:bg-panel"
            >
              Email me
            </a>
            <a
              href="https://wa.me/4746440713"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-7 py-3 bg-text text-bg text-[15px] font-medium text-center transition-opacity hover:opacity-85"
            >
              Message me on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
