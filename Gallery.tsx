import Reveal, { SectionHead } from "./Reveal";
import { GALLERY } from "../data/site";
import { cn } from "../utils/cn";

export default function Gallery() {
  return (
    <section id="workshop" className="relative bg-coal py-24 sm:py-32" aria-label="Workshop gallery">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            index="07"
            kicker="WORKSHOP GALLERY"
            title={
              <>
                INSIDE THE
                <br />
                <span className="text-outline">FAB SHOP</span>
              </>
            }
          />
          <Reveal delay={0.15} className="pb-2">
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              Welding, machining, paint and final assembly — every stage of
              your build happens under one roof.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
              <figure className="group relative overflow-hidden border hairline bg-panel">
                <div className={cn("overflow-hidden", g.tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-[0.72] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:saturate-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 border border-bone/15 bg-ink/60 px-2.5 py-1 font-mono text-[8px] tracking-[0.3em] text-bone/80 backdrop-blur-md">
                  {g.tag}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-display text-lg tracking-wider text-bone">
                    {g.title}
                  </span>
                  <span className="h-px w-8 shrink-0 bg-ember" />
                </figcaption>
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
