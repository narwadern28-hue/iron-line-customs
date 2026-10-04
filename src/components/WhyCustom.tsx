import { Fingerprint, Flag, Gauge, Hammer } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";

const FEATURES = [
  {
    icon: Hammer,
    title: "HANDCRAFTED",
    desc: "Every build is individually developed — shaped, welded and finished by hand on a single bench.",
  },
  {
    icon: Gauge,
    title: "ENGINEERED",
    desc: "Designed with performance and reliability in mind. Geometry, braking and electrics done right.",
  },
  {
    icon: Fingerprint,
    title: "UNIQUE",
    desc: "No two builds need to look the same. Yours is drawn from scratch, never repeated.",
  },
  {
    icon: Flag,
    title: "AUSTRALIAN",
    desc: "Designed and built for riders in Australia — our roads, our distances, our conditions.",
  },
];

export default function WhyCustom() {
  return (
    <section className="relative bg-coal py-24 sm:py-32" aria-label="Why choose a custom build">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
      <div className="wrap">
        <SectionHead
          index="05"
          kicker="WHY CUSTOM"
          align="center"
          title={
            <>
              WHY RIDE SOMETHING
              <br />
              <span className="text-outline">EVERYONE ELSE HAS</span>
            </>
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden border hairline bg-panel/60 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-ember/40">
                <span
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ember/0 blur-2xl transition-all duration-700 group-hover:bg-ember/15"
                />
                <span className="font-mono text-[10px] tracking-[0.3em] text-ash/50">
                  0{i + 1}
                </span>
                <span className="mt-6 grid h-14 w-14 place-items-center border hairline bg-ink text-ember transition-all duration-500 group-hover:rotate-6 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                  <f.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-7 font-display text-2xl tracking-wider text-bone">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{f.desc}</p>
                <span className="mt-6 block h-px w-full bg-gradient-to-r from-ember/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
