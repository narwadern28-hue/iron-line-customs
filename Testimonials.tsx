import { Quote, Star } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";
import { TESTIMONIALS } from "../data/site";

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32" aria-label="Customer stories">
      <div className="wrap">
        <SectionHead
          index="06"
          kicker="CUSTOMER BUILDS"
          align="center"
          title={
            <>
              WORDS FROM
              <br />
              <span className="text-outline">THE SADDLE</span>
            </>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <figure className="group relative flex h-full flex-col border hairline bg-panel/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-ember/40 hover:bg-panel">
                <Quote
                  className="h-8 w-8 text-ember/70 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-bone/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t hairline pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-lg tracking-wider text-bone">
                        {t.name}
                      </p>
                      <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-ash">
                        {t.meta}
                      </p>
                    </div>
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-ember text-ember" />
                      ))}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.2em] text-ash/50">
            * CUSTOMER STORIES SHOWN ARE ILLUSTRATIVE EXAMPLES OF TYPICAL BUILDS.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
