import { ArrowUpRight } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";
import { BUILDS, type Build } from "../data/site";
import { cn } from "../utils/cn";

function BuildCard({ build, wide }: { build: Build; wide?: boolean }) {
  return (
    <Reveal
      className={cn(wide && "md:col-span-2")}
      delay={Number(build.no) % 2 === 0 ? 0.08 : 0}
    >
      <a
        href="#builder"
        className="group relative block overflow-hidden border hairline bg-panel focus-visible:outline-ember"
        aria-label={`View build — ${build.name}, ${build.model}`}
      >
        <div className={cn("relative overflow-hidden", wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/11]")}>
          <img
            src={build.img}
            alt={`${build.name} — ${build.model} custom motorcycle`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          {/* graded veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
          {/* ember edge light */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember/80 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* top meta */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
            <span className="font-display text-sm tracking-[0.2em] text-bone/50">
              {build.no}
            </span>
            <span className="border border-bone/15 bg-ink/60 px-3 py-1.5 font-mono text-[9px] tracking-[0.3em] text-bone/80 backdrop-blur-md">
              {build.model}
            </span>
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-display text-4xl tracking-wide text-bone transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl">
                {build.name}
              </h3>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-bone/20 text-bone transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
              {build.desc}
            </p>

            {/* hover reveal — extra build info */}
            <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <dl className="mt-5 grid grid-cols-3 gap-3 border-t hairline pt-5">
                  {(
                    [
                      ["ENGINE", build.specs.engine],
                      ["FINISH", build.specs.finish],
                      ["STANCE", build.specs.stance],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[9px] tracking-[0.3em] text-ember">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-[11px] font-semibold tracking-wide text-bone/90">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-5 inline-flex items-center gap-3 font-mono text-[11px] font-semibold tracking-[0.3em] text-ember">
                  VIEW BUILD
                  <span className="h-px w-8 bg-ember transition-all duration-500 group-hover:w-14" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export default function FeaturedBuilds() {
  return (
    <section id="builds" className="relative py-24 sm:py-32" aria-label="Featured builds">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            index="01"
            kicker="FEATURED BUILDS"
            title={
              <>
                MACHINES THAT
                <br />
                <span className="text-outline">LEFT THE SHOP</span>
              </>
            }
          />
          <Reveal delay={0.2} className="pb-2">
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              Every commission is a one-off. Six recent builds, six very
              different answers to the same question —{" "}
              <span className="text-bone">what's your perfect machine?</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {BUILDS.map((b, i) => (
            <BuildCard key={b.id} build={b} wide={i === 0 || i === 5} />
          ))}
        </div>
      </div>
    </section>
  );
}
