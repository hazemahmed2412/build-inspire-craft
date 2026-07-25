import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/hooks/use-lenis";

import hero from "@/assets/hero.jpg";
import sBooth from "@/assets/service-booth.jpg";
import sRetail from "@/assets/service-retail.jpg";
import sOffice from "@/assets/service-office.jpg";
import sCladding from "@/assets/service-cladding.jpg";
import sGlass from "@/assets/service-glass.jpg";
import sSignage from "@/assets/service-signage.jpg";
import sTurnkey from "@/assets/service-turnkey.jpg";
import mCnc from "@/assets/mfg-cnc.jpg";
import mLaser from "@/assets/mfg-laser.jpg";
import mWood from "@/assets/mfg-wood.jpg";
import materialWood from "@/assets/material-wood.jpg";
import mPaint from "@/assets/mfg-paint.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import mAssembly from "@/assets/mfg-assembly.jpg";
import mQc from "@/assets/mfg-qc.jpg";
import arabOrganizers from "@/assets/clients/arab-organizers.png.asset.json";
import adoMena from "@/assets/clients/ado-mena.png.asset.json";
import arabLeague from "@/assets/clients/arab-league.png.asset.json";
import ainShams from "@/assets/clients/ain-shams.png.asset.json";
import auc from "@/assets/clients/auc.png.asset.json";
import uccma from "@/assets/clients/uccma.webp.asset.json";
import alfaCure from "@/assets/clients/alfa-cure.png.asset.json";
import geely from "@/assets/clients/geely.png.asset.json";
import mini from "@/assets/clients/mini.svg.asset.json";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  component: Home,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Home() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground grain">
      <Nav />
      <Hero />
      <Marquee />
      <SectionBlueprint />
      <SectionMaterials />
      <SectionManufacturing />
      <SectionServices />
      <SectionGallery />
      <SectionStats />
      <SectionTestimonials />
      <SectionClients />
      <SectionCTA />
      <Footer />
    </main>
  );
}

/* ────────────────── NAV ────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[92rem] items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled ? "glass rounded-full py-2.5 px-4 md:px-6 max-w-6xl" : ""
        }`}
      >
        <a href="#top" className="flex items-center" aria-label="Home">
          <img src={logoAsset.url} alt="Logo" className="h-7 md:h-8 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-foreground/70">
          {["Work", "Craft", "Services", "Studio"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
          <Link to="/clients" className="hover:text-foreground transition-colors">
            Clients
          </Link>
        </nav>
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          Start a project
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </header>
  );
}

/* ────────────────── HERO ────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={hero}
          alt="Cinematic exhibition booth interior"
          className="h-full w-full object-cover opacity-70"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background" />
      </motion.div>

      {/* animated architectural lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40 pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((p, i) => (
          <motion.line
            key={i}
            x1={p * 1600}
            y1="0"
            x2={p * 1600 - 200}
            y2="900"
            stroke="white"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2.4, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[92rem] flex-col justify-end px-6 pb-24 md:px-10 md:pb-32"
      >
        <div className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-fog" />
          Est. 2009 — Concept to Reality
        </div>
        <h1 className="text-display text-balance text-[clamp(3rem,10vw,10.5rem)]">
          <MaskLine delay={0.1}>We Build Spaces</MaskLine>
          <MaskLine delay={0.25}>
            That <em className="italic font-light">Inspire.</em>
          </MaskLine>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="max-w-md text-lg text-foreground/70">
            From the first sketch to the final rivet — a design-and-build atelier for exhibition, retail
            and architectural spaces.
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-4 self-start rounded-full bg-foreground px-7 py-4 text-sm font-medium uppercase tracking-[0.24em] text-background transition-all hover:gap-6 hover:pr-9"
          >
            Start Your Project
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M1 5h16m0 0L13 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/50">
        <div className="mx-auto mb-3 h-10 w-px animate-pulse bg-foreground/40" />
        Scroll
      </div>
    </section>
  );
}

function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ────────────────── MARQUEE ────────────────── */
function Marquee() {
  const items = [
    "Exhibition Booths",
    "Custom Joinery",
    "Aluminum Cladding",
    "Structural Glass",
    "Acrylic Signage",
    "Interior Fit-Out",
    "Turnkey Construction",
  ];
  return (
    <section className="border-y border-border overflow-hidden py-6">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-8 font-display text-2xl md:text-4xl text-foreground/70 flex items-center gap-16">
            {it}
            <span className="text-foreground/30">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ────────────────── SECTION 1 — Blueprint morph ────────────────── */
function SectionBlueprint() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const wire = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const solid = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={ref} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        <div className="mx-auto flex w-full max-w-[92rem] items-start justify-between px-6 pt-28 md:px-10">
          <div>
            <div className="eyebrow mb-4">Chapter 01 / The Idea</div>
            <h2 className="text-display text-balance text-[clamp(2rem,5.5vw,5.5rem)] max-w-2xl">
              Every great space starts with one idea.
            </h2>
          </div>
          <div className="hidden md:block max-w-xs text-sm text-foreground/60">
            Draft. Draw. Detail. Every project begins on paper — a single line, drawn with intent.
          </div>
        </div>

        <div className="relative flex-1 mx-auto w-full max-w-[92rem] px-6 md:px-10">
          <motion.svg
            style={{ rotate: rot }}
            viewBox="0 0 800 500"
            className="absolute inset-0 m-auto h-[70%] w-[92%] md:w-[70%]"
          >
            {/* blueprint frame */}
            <motion.rect
              x="120" y="140" width="560" height="240"
              fill="none" stroke="white" strokeWidth="1"
              style={{ pathLength: draw, opacity: draw }}
            />
            {/* pillars */}
            {[120, 300, 500, 680].map((x) => (
              <motion.line
                key={x} x1={x} y1="140" x2={x} y2="380"
                stroke="white" strokeWidth="1"
                style={{ pathLength: draw, opacity: draw }}
              />
            ))}
            {/* diagonals — wireframe stage */}
            <motion.line x1="120" y1="140" x2="680" y2="380" stroke="white" strokeWidth="0.7" style={{ pathLength: wire, opacity: wire }} />
            <motion.line x1="680" y1="140" x2="120" y2="380" stroke="white" strokeWidth="0.7" style={{ pathLength: wire, opacity: wire }} />
            <motion.line x1="120" y1="90" x2="680" y2="90" stroke="white" strokeWidth="0.7" style={{ pathLength: wire, opacity: wire }} />
            <motion.line x1="120" y1="90" x2="120" y2="140" stroke="white" strokeWidth="0.7" style={{ pathLength: wire, opacity: wire }} />
            <motion.line x1="680" y1="90" x2="680" y2="140" stroke="white" strokeWidth="0.7" style={{ pathLength: wire, opacity: wire }} />
            {/* fill — solid booth */}
            <motion.rect x="120" y="140" width="560" height="240" fill="white" style={{ opacity: solid }} />
            <motion.rect x="120" y="90" width="560" height="50" fill="white" style={{ opacity: solid }} />
            <motion.rect x="300" y="260" width="80" height="120" fill="black" style={{ opacity: solid }} />
            <motion.rect x="440" y="220" width="120" height="80" fill="black" style={{ opacity: solid }} />

            {/* dimensions */}
            <motion.text x="120" y="130" fill="white" fontSize="10" fontFamily="monospace" style={{ opacity: draw }}>
              A—01 · 12.4M
            </motion.text>
            <motion.text x="620" y="130" fill="white" fontSize="10" fontFamily="monospace" style={{ opacity: draw }}>
              H · 4.8M
            </motion.text>
          </motion.svg>

          {/* grid overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>

        <div className="mx-auto w-full max-w-[92rem] px-6 pb-10 md:px-10 flex items-end justify-between text-xs uppercase tracking-[0.3em] text-foreground/50">
          <span>Blueprint</span><span>→ Wireframe</span><span>→ Reality</span>
        </div>
      </div>
      <div className="h-[120vh]" />
    </section>
  );
}

/* ────────────────── SECTION 2 — Materials ────────────────── */
function SectionMaterials() {
  const materials = [
    { n: "01", name: "Wood Panels", note: "European oak, walnut, veneer", img: materialWood },
    { n: "02", name: "Steel Structure", note: "Powder-coated, laser-cut" },
    { n: "03", name: "Structural Glass", note: "Tempered, low-iron" },
    { n: "04", name: "Aluminum Cladding", note: "Brushed, anodized" },
    { n: "05", name: "Acrylic", note: "Cast, edge-lit" },
    { n: "06", name: "Lighting", note: "Architectural, cinematic" },
  ];
  return (
    <section id="craft" className="relative py-32 md:py-48 border-t border-border">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="eyebrow mb-4">Chapter 02 / The Matter</div>
            <h2 className="text-display text-balance text-[clamp(2.4rem,7vw,7rem)] max-w-4xl">
              Crafted with <em className="italic font-light">precision.</em>
            </h2>
          </div>
          <p className="max-w-sm text-foreground/60">
            The booth breaks apart. Six materials, six disciplines — each one held to a single, uncompromising
            standard of finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {materials.map((m, i) => (
            <MaterialTile key={m.n} idx={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialTile({ n, name, note, idx, img }: { n: string; name: string; note: string; idx: number; img?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-background p-8 md:p-10 aspect-[4/5] flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-start justify-between relative z-10">
        <span className="font-mono text-xs text-foreground/50">{n}</span>
        <span className="h-2 w-2 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {img ? (
          <>
            <img
              src={img}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover opacity-40 group-hover:opacity-65 group-hover:scale-105 transition-all duration-1000"
              width={1024}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </>
        ) : (
          <span className="font-display text-[14rem] leading-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">{n}</span>
        )}
      </div>
      <div className="relative z-10">
        <h3 className="font-display text-3xl md:text-4xl mb-2">{name}</h3>
        <p className="text-sm text-foreground/50">{note}</p>
      </div>
    </motion.div>
  );
}

/* ────────────────── SECTION 3 — Manufacturing (horizontal scroll) ────────────────── */
function SectionManufacturing() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const t = track.current!;
      const distance = t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  const cards = [
    { img: mWood, t: "Wood Factory", n: "01" },
    { img: mCnc, t: "CNC Machines", n: "02" },
    { img: mLaser, t: "Laser Cutting", n: "03" },
    { img: mPaint, t: "Painting", n: "04" },
    { img: mAssembly, t: "Assembly", n: "05" },
    { img: mQc, t: "Quality Control", n: "06" },
  ];

  return (
    <section ref={wrap} className="relative bg-background border-t border-border overflow-hidden">
      <div className="h-[100svh] flex items-center">
        <div ref={track} className="flex items-center gap-10 pl-6 md:pl-10 will-change-transform">
          <div className="w-[85vw] md:w-[36rem] shrink-0">
            <div className="eyebrow mb-4">Chapter 03 / The Making</div>
            <h2 className="text-display text-balance text-[clamp(2.2rem,5vw,5rem)] mb-6">
              An 8,000 m² floor. Six stages. Zero shortcuts.
            </h2>
            <p className="text-foreground/60 max-w-md">
              Everything we build is produced in-house. Draw a line horizontally through our workshop and you'll
              trace a project from timber to torque wrench.
            </p>
          </div>
          {cards.map((c, i) => (
            <div key={c.n} className="w-[80vw] md:w-[38rem] shrink-0 group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  width={1400}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
                  <span>Stage {c.n}</span>
                  <span>0{i + 1} / 06</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-4xl md:text-5xl">{c.t}</h3>
                </div>
              </div>
            </div>
          ))}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────── SECTION 4 — Services timeline ────────────────── */
const services = [
  { t: "Exhibition Booths", img: sBooth, k: "Custom stands from 20 to 2000 m²" },
  { t: "Retail Stores", img: sRetail, k: "Flagship boutiques & shop-in-shop" },
  { t: "Corporate Offices", img: sOffice, k: "Headquarters, showrooms, lounges" },
  { t: "Aluminum Cladding", img: sCladding, k: "Ventilated facades & envelopes" },
  { t: "Structural Glass", img: sGlass, k: "Curtain walls, skylights, floors" },
  { t: "Acrylic Signage", img: sSignage, k: "Illuminated wayfinding & brand" },
  { t: "Turnkey Construction", img: sTurnkey, k: "Concept, build, hand-over" },
];

function SectionServices() {
  return (
    <section id="services" className="relative border-t border-border">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10 pt-32 pb-16">
        <div className="eyebrow mb-4">Chapter 04 / The Practice</div>
        <h2 className="text-display text-balance text-[clamp(2.4rem,7vw,7rem)] max-w-4xl">
          Seven disciplines. <em className="italic font-light">One studio.</em>
        </h2>
      </div>
      <div>
        {services.map((s, i) => (
          <ServicePanel key={s.t} idx={i} total={services.length} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServicePanel({ t, img, k, idx, total }: { t: string; img: string; k: string; idx: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden border-t border-border">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={img} alt={t} loading="lazy" className="h-full w-full object-cover" width={1600} height={1000} />
        <div className="absolute inset-0 bg-background/45" />
      </motion.div>
      <div className="relative z-10 mx-auto flex h-full max-w-[92rem] flex-col justify-between px-6 py-24 md:px-10">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
          <span>Service · 0{idx + 1}</span>
          <span>{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
        <div className="max-w-4xl">
          <motion.h3
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-display text-[clamp(3rem,10vw,10rem)]"
          >
            {t}
          </motion.h3>
          <p className="mt-6 max-w-md text-lg text-foreground/70">{k}</p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────── SECTION 5 — Gallery masonry ────────────────── */
function SectionGallery() {
  return (
    <section id="work" className="border-t border-border py-32 md:py-48">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10 mb-16">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="eyebrow mb-4">Chapter 05 / The Portfolio</div>
            <h2 className="text-display text-balance text-[clamp(2.4rem,6vw,6rem)] max-w-3xl">
              A decade of built work.
            </h2>
          </div>
          <a href="#" className="text-sm uppercase tracking-[0.24em] text-foreground/70 hover:text-foreground">
            View archive →
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[92rem] px-6 md:px-10 grid grid-cols-2 md:grid-cols-3 auto-rows-[22vh] md:auto-rows-[28vh] gap-4 md:gap-6">
        {projects.map((p, i) => (
          <TiltCard key={p.id} project={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

function TiltCard({ project, idx }: { project: import("@/data/projects").Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <Link to="/work/$projectId" params={{ projectId: project.id }} className="contents">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
          const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
          setTilt({ x, y });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
        className={`group relative overflow-hidden ${project.span} transition-transform duration-300`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Project · {project.id}</span>
          <span>View →</span>
        </div>
      </motion.div>
    </Link>
  );
}

/* ────────────────── SECTION 6 — Stats ────────────────── */
function SectionStats() {
  const stats = [
    { n: 300, s: "+", l: "Projects delivered" },
    { n: 120, s: "+", l: "Global clients" },
    { n: 15, s: "+", l: "Years of practice" },
    { n: 42, s: "", l: "Countries served" },
  ];
  return (
    <section id="studio" className="border-t border-border py-32 md:py-48">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10">
        <div className="eyebrow mb-4">Chapter 06 / The Record</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 mt-12">
          {stats.map((s, i) => <Counter key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function Counter({ n, s, l }: { n: number; s: string; l: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * n));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, n]);
  return (
    <div ref={ref} className="border-t border-border pt-6">
      <div className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-none">
        {val}
        <span className="text-foreground/50">{s}</span>
      </div>
      <div className="mt-4 text-sm uppercase tracking-[0.24em] text-foreground/60">{l}</div>
    </div>
  );
}

/* ────────────────── SECTION 7 — Testimonials ────────────────── */
const testimonials = [
  {
    q: "They translated a napkin sketch into the most talked-about pavilion of the show.",
    who: "Elena Vasquez",
    role: "Creative Director, KAIROS Watches",
  },
  {
    q: "Precision I have only seen in aerospace. Zero punch-list at hand-over.",
    who: "Marcus Reid",
    role: "Head of Retail, NORTH Studios",
  },
  {
    q: "A rare studio that treats the last screw with the same care as the first sketch.",
    who: "Ayesha Rahman",
    role: "Principal, Rahman Arquitectos",
  },
];

function SectionTestimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = testimonials[i];
  return (
    <section className="border-t border-border py-32 md:py-56">
      <div className="mx-auto max-w-6xl px-6 md:px-10 text-center">
        <div className="eyebrow mb-10">Chapter 07 / Voices</div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-display text-balance text-[clamp(1.8rem,4vw,4rem)]"
          >
            <span className="text-foreground/40">“</span>
            {cur.q}
            <span className="text-foreground/40">”</span>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-14 flex flex-col items-center gap-2 text-sm">
          <div className="uppercase tracking-[0.24em]">{cur.who}</div>
          <div className="text-foreground/50">{cur.role}</div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Testimonial ${j + 1}`}
              className={`h-px transition-all duration-500 ${i === j ? "w-14 bg-foreground" : "w-8 bg-foreground/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── SECTION 8 — Clients ────────────────── */
const clients = [
  { name: "Arab Organizers", logo: arabOrganizers.url },
  { name: "ADO MENA", logo: adoMena.url },
  { name: "League of Arab States", logo: arabLeague.url },
  { name: "Ain Shams University", logo: ainShams.url },
  { name: "The American University in Cairo", logo: auc.url },
  { name: "UCCMA", logo: uccma.url },
  { name: "Alfa Cure Centers", logo: alfaCure.url },
  { name: "Geely", logo: geely.url },
  { name: "MINI", logo: mini.url },
];

function SectionClients() {
  return (
    <section id="clients" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <div>
            <div className="eyebrow mb-4">Chapter 08 / Clients</div>
            <h2 className="text-display text-balance text-[clamp(1.8rem,3vw,3rem)] leading-[1]">
              Trusted by brands we build alongside.
            </h2>
            <p className="mt-6 text-foreground/60 max-w-sm leading-relaxed">
              From government institutions to luxury automotive and healthcare, the organizations who choose ARTGRAPH.
            </p>
            <Link
              to="/clients"
              className="inline-flex mt-8 items-center gap-2 text-xs uppercase tracking-[0.24em] text-foreground/70 hover:text-foreground transition-colors"
            >
              View all clients <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-border/40">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-background aspect-[4/3] flex items-center justify-center p-8 md:p-10 hover:bg-foreground/[0.03] transition-colors"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  className="max-h-16 md:max-h-20 max-w-[75%] w-auto object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-6 bottom-4 text-center text-[10px] uppercase tracking-[0.25em] text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────── SECTION 9 — CTA ────────────────── */
function SectionCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-40 md:py-56 border-t border-border">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div className="relative mx-auto max-w-[92rem] px-6 md:px-10 text-center">
        <div className="eyebrow mb-8">Chapter 09 / Begin</div>
        <h2 className="text-display text-balance text-[clamp(2.8rem,11vw,11rem)] leading-[0.9]">
          <MaskLine>Let's build</MaskLine>
          <MaskLine delay={0.15}>
            something <em className="italic font-light">extraordinary.</em>
          </MaskLine>
        </h2>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="mailto:Artgraphegy3@gmail.com"
            className="group inline-flex items-center gap-4 rounded-full bg-foreground px-9 py-5 text-sm font-medium uppercase tracking-[0.24em] text-background hover:gap-6 transition-all"
          >
            Contact Us
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M1 5h16m0 0L13 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
          <a href="tel:+201225341205" className="text-sm uppercase tracking-[0.24em] text-foreground/70 hover:text-foreground">
            OR CALL +20 (122) 534-1205
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────── FOOTER ────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-[92rem] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs uppercase tracking-[0.24em] text-foreground/50">
        <div className="flex items-center">
          <img src={logoAsset.url} alt="Logo" className="h-7 w-auto object-contain" />
        </div>
        <div>© {new Date().getFullYear()} Monolith Atelier — All rights reserved</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">LinkedIn</a>
          <a href="#" className="hover:text-foreground">Behance</a>
        </div>
      </div>
    </footer>
  );
}
