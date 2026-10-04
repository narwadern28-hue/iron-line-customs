import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { NAV_LINKS } from "../data/site";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5" aria-hidden="true">
    <path d="M15.5 3.5h-2.8a3.7 3.7 0 0 0-3.7 3.7v2.6H6.5v3.6H9v7.1h3.7v-7.1h2.8l.5-3.6h-3.3V7.6a1 1 0 0 1 1-1h2.8Z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5" aria-hidden="true">
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="M10.2 9.3v5.4l4.8-2.7Z" fill="currentColor" stroke="none" />
  </svg>
);

type Doc = "privacy" | "terms" | null;

const DOCS: Record<Exclude<Doc, null>, { title: string; body: string[] }> = {
  privacy: {
    title: "PRIVACY POLICY",
    body: [
      "IRONLINE CUSTOMS collects only the information you provide in our build request form — your name, contact details and project description — and uses it solely to respond to your enquiry and plan your build.",
      "We never sell or share your details with third parties. Photos of your build may be used in our portfolio and social channels only with your written permission.",
      "You can request a copy or deletion of your personal information at any time by emailing builds@ironlinecustoms.com.au.",
    ],
  },
  terms: {
    title: "TERMS OF SERVICE",
    body: [
      "All build estimates shown on this website, including configurator pricing, are indicative only and are confirmed in a written fixed-price quotation before any work begins.",
      "A deposit is required to secure a position in the fabrication queue. Build timelines of 4–6 months are typical and confirmed at deposit.",
      "Every completed motorcycle is supplied with engineering certification where applicable, a shakedown service schedule and a 12-month workmanship warranty on IRONLINE-fabricated components.",
    ],
  },
};

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/" },
];

export default function Footer() {
  const [doc, setDoc] = useState<Doc>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDoc(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <footer className="relative border-t hairline bg-coal" aria-label="Footer">
      {/* CTA strip */}
      <div className="wrap flex flex-wrap items-center justify-between gap-6 border-b hairline py-10">
        <p className="font-display text-2xl tracking-wide text-bone sm:text-3xl">
          READY WHEN <span className="text-ember">YOU ARE.</span>
        </p>
        <a
          href="#contact"
          className="group flex items-center gap-3 border border-ember px-6 py-3.5 font-mono text-[10px] font-bold tracking-[0.25em] text-ember transition-all duration-300 hover:bg-ember hover:text-ink"
        >
          START YOUR BUILD
          <ArrowUp className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-12">
        {/* brand */}
        <div className="lg:col-span-5">
          <p className="font-display text-4xl leading-none tracking-wide text-bone sm:text-5xl">
            IRONLINE
            <br />
            <span className="text-outline">CUSTOMS</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            Custom motorcycles built in Australia. One book, one bench, one
            bike at a time since 2016.
          </p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`IRONLINE CUSTOMS on ${s.label}`}
                className="grid h-11 w-11 place-items-center border hairline text-ash transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:text-ember"
              >
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        {/* nav */}
        <nav className="lg:col-span-3" aria-label="Footer">
          <p className="font-mono text-[9px] tracking-[0.35em] text-ash/60">SITEMAP</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
                >
                  <span className="h-px w-4 bg-ember/60 transition-all duration-300 group-hover:w-6" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* legal + contact */}
        <div className="lg:col-span-4">
          <p className="font-mono text-[9px] tracking-[0.35em] text-ash/60">WORKSHOP</p>
          <ul className="mt-5 space-y-3 text-sm text-ash">
            <li>
              <a href="mailto:builds@ironlinecustoms.com.au" className="transition-colors hover:text-bone">
                builds@ironlinecustoms.com.au
              </a>
            </li>
            <li>
              <a href="tel:+61730000426" className="transition-colors hover:text-bone">
                +61 7 3000 0426
              </a>
            </li>
            <li>Brisbane, Queensland — by appointment</li>
          </ul>
          <div className="mt-7 flex gap-3">
            {(Object.keys(DOCS) as Exclude<Doc, null>[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDoc(d)}
                className="border hairline px-4 py-2.5 font-mono text-[9px] tracking-[0.25em] text-ash transition-colors hover:border-ember hover:text-ember"
              >
                {d === "privacy" ? "PRIVACY" : "TERMS"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono text-[9px] tracking-[0.25em] text-ash/60">
            © {new Date().getFullYear()} IRONLINE CUSTOMS — CUSTOM MOTORCYCLES BUILT IN AUSTRALIA
          </p>
          <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-ash/60">
            <span className="h-1.5 w-1.5 rounded-full bg-ember animate-glow-pulse" />
            DESIGNED & FABRICATED ON COUNTRY
          </p>
        </div>
      </div>

      {/* legal modal */}
      <AnimatePresence>
        {doc && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDoc(null)}
            role="dialog"
            aria-modal="true"
            aria-label={DOCS[doc].title}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="brushed w-full max-w-lg border hairline p-7 sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl tracking-wider text-bone">
                  {DOCS[doc].title}
                </h2>
                <button
                  type="button"
                  onClick={() => setDoc(null)}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 place-items-center border hairline text-ash transition-colors hover:border-ember hover:text-ember"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ash">
                {DOCS[doc].body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-7 border-t hairline pt-5 font-mono text-[9px] tracking-[0.25em] text-ash/50">
                LAST UPDATED — JAN {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
