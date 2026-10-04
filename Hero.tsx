import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function HeadlineLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
      aria-label="IRONLINE CUSTOMS — hero"
    >
      {/* --- backdrop --- */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <div className="hero-drift absolute inset-x-0 -top-[8%] h-[118%]">
          <img
            src="/images/hero.jpg"
            alt="Custom black cafe racer motorcycle in a dark workshop with orange rim light"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* graded overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* moving ember light sweep */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="ember-sweep absolute top-[-20%] h-[140%] w-1/3 bg-gradient-to-r from-transparent via-ember/12 to-transparent blur-2xl" />
      </div>

      {/* --- content --- */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="wrap relative z-10 flex flex-1 flex-col justify-center pt-28 pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-ash sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-ember" />
          CUSTOM MOTORCYCLE WORKSHOP — AUSTRALIA
        </motion.p>

        <h1 className="font-display uppercase leading-[0.86] tracking-[0.01em]">
          <HeadlineLine
            delay={0.35}
            className="text-[19vw] text-bone sm:text-[15vw] lg:text-[10.5rem]"
          >
            BUILT
          </HeadlineLine>
          <HeadlineLine
            delay={0.48}
            className="text-outline text-[19vw] sm:text-[15vw] lg:text-[10.5rem]"
          >
            DIFFERENT<span className="text-ember [-webkit-text-stroke:0]">.</span>
          </HeadlineLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="mt-7 max-w-md text-base leading-relaxed text-bone/85 sm:text-lg"
        >
          Handcrafted custom motorcycles, built in Australia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#builder"
            className="group relative flex items-center gap-3 overflow-hidden bg-ember px-7 py-4 font-mono text-xs font-semibold tracking-[0.22em] text-ink transition-colors duration-300"
          >
            <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">START YOUR BUILD</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#builds"
            className="group flex items-center gap-3 border border-bone/25 px-7 py-4 font-mono text-xs font-semibold tracking-[0.22em] text-bone backdrop-blur-sm transition-all duration-300 hover:border-ember hover:text-ember"
          >
            EXPLORE BUILDS
            <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-9" />
          </a>
        </motion.div>
      </motion.div>

      {/* --- bottom strip --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{ opacity: fade }}
        className="wrap relative z-10 flex items-end justify-between pb-8"
      >
        <a
          href="#builds"
          className="group flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] text-ash transition-colors hover:text-bone"
          aria-label="Scroll to featured builds"
        >
          <span className="relative h-12 w-px overflow-hidden bg-bone/15">
            <span className="animate-scroll-line absolute inset-0 bg-ember" />
          </span>
          SCROLL
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
        <div className="hidden gap-8 font-mono text-[10px] tracking-[0.3em] text-ash/80 sm:flex">
          <span>ONE-OFF BUILDS</span>
          <span className="text-ember">/</span>
          <span>EST. 2016</span>
          <span className="text-ember">/</span>
          <span className="hidden md:inline">RIDDEN NATIONWIDE</span>
        </div>
      </motion.div>
    </section>
  );
}
