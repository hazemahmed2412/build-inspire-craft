import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import logoAsset from "@/assets/logo.png.asset.json";
import arabOrganizers from "@/assets/clients/arab-organizers.png.asset.json";
import adoMena from "@/assets/clients/ado-mena.png.asset.json";
import arabLeague from "@/assets/clients/arab-league.png.asset.json";
import ainShams from "@/assets/clients/ain-shams.png.asset.json";
import auc from "@/assets/clients/auc.png.asset.json";
import uccma from "@/assets/clients/uccma.webp.asset.json";
import alfaCure from "@/assets/clients/alfa-cure.png.asset.json";
import geely from "@/assets/clients/geely.png.asset.json";
import mini from "@/assets/clients/mini.svg.asset.json";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — ARTGRAPH" },
      { name: "description", content: "Brands and partners who trust ARTGRAPH for creative design, fabrication, and turnkey production." },
      { property: "og:title", content: "Clients — ARTGRAPH" },
      { property: "og:description", content: "Brands and partners who trust ARTGRAPH for creative design, fabrication, and turnkey production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientsPage,
});

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

function ClientsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground grain">
      <header className="fixed inset-x-0 top-0 z-50 py-5">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-6 md:px-10">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img src={logoAsset.url} alt="ARTGRAPH" className="h-7 md:h-8 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm text-foreground/70">
            <Link to="/" className="hover:text-foreground transition-colors">Work</Link>
            <Link to="/" hash="craft" className="hover:text-foreground transition-colors">Craft</Link>
            <Link to="/" hash="services" className="hover:text-foreground transition-colors">Services</Link>
            <Link to="/clients" className="text-foreground font-medium">Clients</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </header>

      <section className="relative pt-40 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-[#00d26a]"
          >
            Partners & Collaborators
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl leading-[0.95] text-foreground mb-8 max-w-4xl"
          >
            Brands we've built alongside.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed"
          >
            From luxury houses to government institutions, these are the organizations
            who trust us to turn their vision into built reality.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-border/40">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-background aspect-[4/3] flex items-center justify-center p-10 hover:bg-foreground/[0.03] transition-colors"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  className="max-h-20 md:max-h-24 max-w-[70%] w-auto object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-6 bottom-4 text-center text-[10px] uppercase tracking-[0.25em] text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-foreground/10 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoAsset.url} alt="ARTGRAPH" className="h-6 w-auto object-contain opacity-80" />
          <div className="text-sm text-foreground/40">
            © {new Date().getFullYear()} ARTGRAPH. Creative Design & Production.
          </div>
          <Link to="/contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
            Start a project →
          </Link>
        </div>
      </footer>
    </main>
  );
}
