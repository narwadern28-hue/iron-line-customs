import { motion } from "framer-motion";
import { KeyRound, MessagesSquare, PenTool, Wrench } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";

const STEPS = [
  {
    no: "01",
    icon: MessagesSquare,
    title: "CONSULTATION",
    desc: "Tell us your vision. A real conversation about how you ride, what you love and what the bike needs to do.",
  },
  {
    no: "02",
    icon: PenTool,
    title: "DESIGN",
    desc: "We create your custom build concept — sketches, renderings, parts list and a fixed quoted price.",
  },
  {
    no: "03",
    icon: Wrench,
    title: "BUILD",
    desc: "Our workshop transforms the motorcycle. You get photo updates as it comes together on the bench.",
  },
  {
    no: "04",
    icon: KeyRound,
    title: "DELIVERY",
    desc: "Your finished machine is ready to ride. Full walkthrough, servicing plan and Australia-wide transport.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 sm:py-32" aria-label="The build process">
      <div className="wrap">
        <SectionHead
          index="03"
          kicker="THE PROCESS"
          title={
            <>
              FROM CONVERSATION
              <br />
              <span className="text-outline">TO KICKSTART</span>
            </>
          }
        />

        <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-6 left-0 hidden h-px w-full origin-left bg-gradient-to-r from-ember/70 via-bone/15 to-transparent lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.12}>
              <div className="group relative h-full border hairline bg-panel/50 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-ember/50 hover:bg-panel sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl text-outline-faint transition-colors duration-500 group-hover:text-ember/60 sm:text-6xl">
                    {s.no}
                  </span>
                  <span className="animate-float grid h-12 w-12 place-items-center border border-ember/30 bg-ember/8 text-ember transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-ink" style={{ animationDelay: `${i * 0.6}s` }}>
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-wider text-bone">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{s.desc}</p>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-ember transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
