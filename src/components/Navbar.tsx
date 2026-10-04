import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/site";
import { cn } from "../utils/cn";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label="IRONLINE CUSTOMS — home"
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[4px] border border-bone/15 bg-steel">
        <span className="font-display text-sm tracking-widest text-bone">
          IR
        </span>
        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-ember transition-transform duration-500 group-hover:scale-x-50 origin-left" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-[0.14em] text-bone">
          IRONLINE
        </span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.5em] text-ember">
          CUSTOMS
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b hairline bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.slice(1).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] tracking-[0.28em] text-ash transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-400 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#builder"
              className="group hidden items-center gap-2.5 bg-ember px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.22em] text-ink transition-all duration-300 hover:bg-bone sm:flex"
            >
              START YOUR BUILD
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center border hairline text-bone transition-colors hover:border-ember hover:text-ember lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="wrap flex h-[72px] items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center border hairline text-bone transition-colors hover:border-ember hover:text-ember"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav
              aria-label="Mobile"
              className="wrap flex flex-1 flex-col justify-center gap-1"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b hairline py-4"
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-ember">
                    0{i + 1}
                  </span>
                  <span className="font-display text-4xl tracking-wide text-bone transition-all duration-300 group-hover:translate-x-2 group-hover:text-ember sm:text-5xl">
                    {l.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#builder"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex items-center justify-center gap-3 bg-ember py-4 font-mono text-xs font-semibold tracking-[0.25em] text-ink"
              >
                START YOUR BUILD <ArrowRight className="h-4 w-4" />
              </motion.a>
            </nav>
            <p className="wrap pb-8 font-mono text-[10px] tracking-[0.3em] text-ash/60">
              HANDCRAFTED IN AUSTRALIA
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
