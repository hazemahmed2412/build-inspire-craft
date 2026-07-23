import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ARTGRAPH Creative Design & Production" },
      {
        name: "description",
        content:
          "Start a project with ARTGRAPH. Tell us about your exhibition booth, fit-out, facade, or turnkey build and our team will reply within one business day.",
      },
      { property: "og:title", content: "Contact ARTGRAPH — Start Your Project" },
      {
        property: "og:description",
        content:
          "Tell us about your exhibition booth, fit-out, or turnkey build. Our team replies within one business day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact ARTGRAPH — Start Your Project" },
      {
        name: "twitter:description",
        content: "Tell us about your project. Our team replies within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const SERVICES = [
  "Exhibition Booth",
  "Custom Wood Manufacturing",
  "Aluminum Cladding",
  "Structural Glass Facade",
  "Acrylic Signage",
  "Interior Fit-Out",
  "Turnkey Construction",
  "Other",
];

const BUDGETS = ["< $25k", "$25k – $75k", "$75k – $200k", "$200k+", "Not sure yet"];

function ContactPage() {
  const submit = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    setStatus("submitting");
    setErrorMsg(null);
    try {
      await submit({ data: payload });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-[92rem] px-6 md:px-10 py-6 flex items-center justify-between">
          <a
            href="/"
            className="text-xs uppercase tracking-[0.32em] text-foreground/70 hover:text-foreground transition-colors"
          >
            ← ARTGRAPH
          </a>
          <a
            href="mailto:Artgraphegy3@gmail.com"
            className="text-xs uppercase tracking-[0.24em] text-foreground/60 hover:text-foreground"
          >
            Artgraphegy3@gmail.com
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-[92rem] px-6 md:px-10 pt-24 md:pt-32 pb-16">
        <div className="eyebrow mb-6">Chapter 09 / Contact</div>
        <h1 className="text-display text-balance text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] max-w-4xl">
          Let's build something <em className="italic font-light">extraordinary.</em>
        </h1>
        <p className="mt-8 max-w-xl text-foreground/70 text-base md:text-lg leading-relaxed">
          Share a few details about your project. Our studio replies within one business day —
          typically with an initial cost band and a shortlist of relevant work.
        </p>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 md:px-10 pb-32">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 border-t border-border pt-16">
          <aside className="space-y-10 text-sm">
            <div>
              <div className="eyebrow mb-3">Studio</div>
              <p className="text-foreground/80 leading-relaxed">
                ARTGRAPH<br />
                Creative Design &amp; Production<br />
                Cairo, Egypt
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Direct</div>
              <a
                href="mailto:Artgraphegy3@gmail.com"
                className="block text-foreground hover:text-foreground/70"
              >
                Artgraphegy3@gmail.com
              </a>
              <a
                href="tel:+201225341205"
                className="mt-2 block text-foreground/70 hover:text-foreground"
              >
                +20 (122) 534-1205
              </a>
            </div>
            <div>
              <div className="eyebrow mb-3">Response time</div>
              <p className="text-foreground/70">Within 1 business day.</p>
            </div>
          </aside>

          <div className="relative min-h-[520px]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="flex flex-col items-start justify-center h-full py-16"
                >
                  <div className="eyebrow mb-6 text-foreground/60">Inquiry received</div>
                  <h2 className="text-display text-[clamp(2rem,5vw,4rem)] leading-[1] max-w-2xl">
                    Thank you. <em className="italic font-light">We'll be in touch.</em>
                  </h2>
                  <p className="mt-8 max-w-md text-foreground/70 leading-relaxed">
                    Your inquiry has landed with our studio. A project lead will reply directly to
                    the email you provided, typically within one business day.
                  </p>
                  <div className="mt-12 flex flex-wrap gap-4">
                    <button
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 text-xs uppercase tracking-[0.24em] text-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      Submit another inquiry
                    </button>
                    <a
                      href="/"
                      className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs uppercase tracking-[0.24em] text-foreground/70 hover:text-foreground"
                    >
                      Return home →
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={onSubmit}
                  className="space-y-10"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <Field label="Name" name="name" required autoComplete="name" />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                    <Field label="Company" name="company" autoComplete="organization" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <SelectField label="Service" name="service" options={SERVICES} />
                    <SelectField label="Budget" name="budget" options={BUDGETS} />
                  </div>

                  <div className="space-y-3">
                    <label className="eyebrow block text-foreground/60" htmlFor="message">
                      Project brief
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      maxLength={4000}
                      placeholder="Tell us about the space, timeline, and any references…"
                      className="w-full bg-transparent border-b border-border py-3 text-base text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && errorMsg ? (
                    <div className="text-sm text-red-400 border border-red-400/30 rounded-md px-4 py-3">
                      {errorMsg}
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-foreground/40 uppercase tracking-[0.18em]">
                      We reply within 1 business day
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center gap-4 rounded-full bg-foreground px-9 py-5 text-sm font-medium uppercase tracking-[0.24em] text-background hover:gap-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Sending…" : "Send inquiry"}
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path
                          d="M1 5h16m0 0L13 1m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-3">
      <label htmlFor={name} className="eyebrow block text-foreground/60">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={255}
        className="w-full bg-transparent border-b border-border py-3 text-base text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="space-y-3">
      <label htmlFor={name} className="eyebrow block text-foreground/60">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full bg-transparent border-b border-border py-3 text-base text-foreground focus:border-foreground focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="bg-background text-foreground">
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background text-foreground">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
