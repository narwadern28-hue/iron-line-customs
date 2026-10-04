import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";

const STATS = [
  { value: "140+", label: "ONE-OFF BUILDS COMPLETED" },
  { value: "8", label: "STATES & TERRITORIES SHIPPED" },
  { value: "26", label: "NATIONAL SHOW AWARDS" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative py-24 sm:py-32" aria-label="About the workshop">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* image side */}
        <Reveal className="relative">
          <div ref={ref} className="relative overflow-hidden border hairline">
            <div className="aspect-[4/5] overflow-hidden sm:aspect-[5/5]">
              <motion.img
                src="/images/workshop.jpg"
                alt="Mechanic working on a custom motorcycle engine in the IRONLINE workshop"
                loading="lazy"
                style={{ y: imgY, scale: 1.18 }}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] text-ember">
                  THE WORKSHOP
                </p>
                <p className="mt-2 font-display text-2xl tracking-wider text-bone">
                  BRISBANE, QUEENSLAND
                </p>
              </div>
              <span className="border border-ember/50 bg-ink/70 px-3 py-2 font-mono text-[9px] tracking-[0.3em] text-ember backdrop-blur-md">
                EST. 2016
              </span>
            </div>
          </div>
          {/* floating accent frame */}
          <div aria-hidden="true" className="absolute -right-3 -top-3 -z-10 h-full w-full border border-ember/25" />
        </Reveal>

        {/* text side */}
        <div>
          <SectionHead
            index="04"
            kicker="ABOUT THE WORKSHOP"
            title={
              <>
                BUILT BY HAND.
                <br />
                <span className="text-outline">BUILT TO RIDE.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ash">
              <p>
                IRONLINE CUSTOMS is a small team of fabricators, engineers and
                painters who believe a motorcycle should be as individual as
                its rider. Every machine that leaves our bench is tailored to
                one person — its geometry, its finish, its feel.
              </p>
              <p>
                We sweat the details others skip: hand-rolled tanks, TIG-welded
                frames, engines rebuilt to better-than-factory tolerance and
                paint laid down over weeks, not days. Craftsmanship and
                engineering carry equal weight here — because a beautiful bike
                that doesn't ride beautifully is a failure.
              </p>
              <p className="border-l-2 border-ember pl-5 font-semibold text-bone">
                Australian-built custom motorcycles — designed in Brisbane,
                ridden in every corner of the country.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 divide-x divide-bone/8 border-y hairline">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 py-5 first:pl-0">
                  <p className="font-display text-3xl tracking-wide text-bone sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[8px] leading-relaxed tracking-[0.22em] text-ash sm:text-[9px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <a
              href="#workshop"
              className="group mt-9 inline-flex items-center gap-3 font-mono text-[11px] font-semibold tracking-[0.28em] text-ember transition-colors hover:text-bone"
            >
              STEP INSIDE THE WORKSHOP
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
