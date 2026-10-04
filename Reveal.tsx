import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  sub,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <div
          className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-ember ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span>{index}</span>
          <span className="h-px w-10 bg-ember/60" aria-hidden="true" />
          <span className="text-ash">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-wide uppercase sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 max-w-xl text-[15px] leading-relaxed text-ash ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
