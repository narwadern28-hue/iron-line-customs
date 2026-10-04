import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import {
  Armchair,
  ArrowRight,
  Bike,
  Check,
  Disc3,
  Fuel,
  Lightbulb,
  Paintbrush,
  RotateCcw,
  Spline,
  Wind,
} from "lucide-react";
import MotoSVG from "./MotoSVG";
import Reveal, { SectionHead } from "./Reveal";
import {
  BASE_PRESETS,
  BASES,
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  DEFAULT_CONFIG,
  formatAUD,
  type BuildConfig,
  type CategoryId,
  type Option,
} from "../data/site";
import { cn } from "../utils/cn";

const TABS: { id: CategoryId; icon: typeof Bike; label: string }[] = [
  { id: "base", icon: Bike, label: "BASE" },
  { id: "tank", icon: Fuel, label: "TANK" },
  { id: "paint", icon: Paintbrush, label: "PAINT" },
  { id: "seat", icon: Armchair, label: "SEAT" },
  { id: "exhaust", icon: Wind, label: "EXHAUST" },
  { id: "wheels", icon: Disc3, label: "WHEELS" },
  { id: "bars", icon: Spline, label: "BARS" },
  { id: "light", icon: Lightbulb, label: "LIGHT" },
];

const ANIM = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function optionOf(cat: CategoryId, id: string): Option | undefined {
  if (cat === "base") return BASES.find((o) => o.id === id);
  return CATEGORY_OPTIONS[cat].find((o) => o.id === id);
}

function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 85, damping: 18 });
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  const text = useTransform(spring, (v) => formatAUD(Math.round(v)));
  return <motion.span>{text}</motion.span>;
}

export default function Builder() {
  const [cfg, setCfg] = useState<BuildConfig>(DEFAULT_CONFIG);
  const [tab, setTab] = useState<CategoryId>("base");

  const total = useMemo(() => {
    return (Object.keys(cfg) as CategoryId[]).reduce((sum, cat) => {
      return sum + (optionOf(cat, cfg[cat])?.price ?? 0);
    }, 0);
  }, [cfg]);

  const buildCode = useMemo(() => {
    const idx = (cat: CategoryId) => {
      const list = cat === "base" ? BASES : CATEGORY_OPTIONS[cat];
      return String(list.findIndex((o) => o.id === cfg[cat]) + 1).padStart(2, "0");
    };
    return `IR-${idx("base")}/${idx("tank")}${idx("paint")}${idx("seat")}-${idx("exhaust")}${idx("wheels")}${idx("bars")}${idx("light")}`;
  }, [cfg]);

  const select = (cat: CategoryId, id: string) => {
    setCfg((prev) =>
      cat === "base" ? { ...prev, base: id, ...(BASE_PRESETS[id] ?? {}) } : { ...prev, [cat]: id }
    );
  };

  const requestBuild = () => {
    const lines = (Object.keys(cfg) as CategoryId[]).map(
      (cat) => `${CATEGORY_LABELS[cat]}: ${optionOf(cat, cfg[cat])?.name}`
    );
    const detail = `Build ${buildCode}\n${lines.join("\n")}\nEstimated price: ${formatAUD(total)} AUD`;
    window.dispatchEvent(new CustomEvent("ir:build-request", { detail }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const options = tab === "base" ? BASES : CATEGORY_OPTIONS[tab];

  return (
    <section id="builder" className="relative overflow-hidden py-24 sm:py-32" aria-label="Custom motorcycle builder">
      {/* backdrop glow */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
      <div aria-hidden="true" className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-ember/6 blur-[140px]" />

      <div className="wrap relative">
        <SectionHead
          index="02"
          kicker="CUSTOMISE"
          title={
            <>
              BUILD YOUR <span className="text-outline-ember">MACHINE</span>
            </>
          }
          sub="Start with one of four platforms and make it yours. Every selection updates the machine and the estimate in real time — final quote confirmed at consultation."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ------------ left: preview + options ------------ */}
          <div className="space-y-5 lg:col-span-7">
            {/* preview */}
            <Reveal className="relative">
              <div className="brushed relative overflow-hidden border hairline">
                <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b hairline px-4 py-3 sm:px-5">
                  <span className="font-mono text-[10px] tracking-[0.32em] text-ash">
                    CONFIGURE / <span className="text-bone">{buildCode}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-ember">
                    <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-ember" />
                    LIVE RENDER
                  </span>
                </div>
                <div className="aspect-[16/10] pt-10 sm:aspect-[16/9]">
                  <MotoSVG config={cfg} />
                </div>
                <div className="flex items-center justify-between border-t hairline px-4 py-3 sm:px-5">
                  <span className="font-display text-sm tracking-[0.18em] text-bone">
                    {BASES.find((b) => b.id === cfg.base)?.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-ash/70">
                    VISUAL GUIDE ONLY — FINAL GEOMETRY SET AT DESIGN
                  </span>
                </div>
              </div>
            </Reveal>

            {/* category tabs */}
            <Reveal delay={0.05}>
              <div
                className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
                role="tablist"
                aria-label="Customisation categories"
              >
                {TABS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 border px-4 py-3 font-mono text-[10px] font-semibold tracking-[0.22em] transition-all duration-300",
                      tab === id
                        ? "border-ember bg-ember/10 text-ember"
                        : "hairline bg-panel/60 text-ash hover:border-bone/30 hover:text-bone"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={ANIM}
                className="grid gap-3 sm:grid-cols-2"
                role="tabpanel"
                aria-label={`${CATEGORY_LABELS[tab]} options`}
              >
                {options.map((opt) => {
                  const active = cfg[tab] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => select(tab, opt.id)}
                      aria-pressed={active}
                      className={cn(
                        "group relative border p-4 text-left transition-all duration-300",
                        active
                          ? "border-ember/80 bg-ember/8"
                          : "hairline bg-panel/60 hover:border-bone/25 hover:bg-panel"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {tab === "paint" && opt.stops ? (
                            <span
                              className="h-9 w-9 shrink-0 rounded-full border border-bone/20"
                              style={{
                                background: `linear-gradient(135deg, ${opt.stops[1]} 0%, ${opt.stops[0]} 100%)`,
                              }}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className={cn(
                                "grid h-9 w-9 shrink-0 place-items-center border font-mono text-[10px]",
                                active ? "border-ember text-ember" : "hairline text-ash"
                              )}
                              aria-hidden="true"
                            >
                              {String(options.indexOf(opt) + 1).padStart(2, "0")}
                            </span>
                          )}
                          <div>
                            <p className="text-sm font-bold tracking-wide text-bone">
                              {opt.name}
                            </p>
                            <p className="mt-0.5 text-xs leading-snug text-ash">
                              {opt.blurb}
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "grid h-6 w-6 shrink-0 place-items-center border transition-all duration-300",
                            active
                              ? "border-ember bg-ember text-ink"
                              : "hairline text-transparent group-hover:border-bone/30"
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      </div>
                      <p className="mt-3 font-mono text-[10px] tracking-[0.25em]">
                        {opt.price === 0 ? (
                          <span className="text-ash">INCLUDED</span>
                        ) : (
                          <span className="text-ember-hi">+ {formatAUD(opt.price)}</span>
                        )}
                      </p>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ------------ right: summary ------------ */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="lg:sticky lg:top-24">
              <div className="brushed relative border hairline">
                <div className="flex items-center justify-between border-b hairline px-5 py-4">
                  <h3 className="font-display text-lg tracking-[0.14em] text-bone">
                    YOUR BUILD
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCfg(DEFAULT_CONFIG)}
                    className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-ash transition-colors hover:text-ember"
                    aria-label="Reset configuration to defaults"
                  >
                    <RotateCcw className="h-3 w-3" /> RESET
                  </button>
                </div>

                <dl className="max-h-[380px] divide-y divide-bone/6 overflow-y-auto px-5">
                  {(Object.keys(cfg) as CategoryId[]).map((cat) => {
                    const opt = optionOf(cat, cfg[cat]);
                    return (
                      <div key={cat} className="flex items-center justify-between gap-4 py-3">
                        <dt className="font-mono text-[9px] tracking-[0.28em] text-ash">
                          {CATEGORY_LABELS[cat].toUpperCase()}
                        </dt>
                        <dd className="flex items-baseline gap-3 text-right">
                          <span className="text-[13px] font-semibold text-bone">
                            {opt?.name}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[9px]",
                              opt && opt.price > 0 ? "text-ember-hi" : "text-ash/50"
                            )}
                          >
                            {opt && opt.price > 0 ? `+${formatAUD(opt.price)}` : "INC."}
                          </span>
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="border-t hairline px-5 py-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] text-ash">
                        ESTIMATED BUILD PRICE
                      </p>
                      <p className="mt-2 font-display text-4xl tracking-wide text-ember">
                        <AnimatedPrice value={total} />
                      </p>
                    </div>
                    <span className="pb-1 font-mono text-[9px] tracking-[0.2em] text-ash/60">
                      AUD, INC. GST
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-ash/80">
                    Estimate only. Final quote, engineering certification and build
                    schedule are confirmed during your consultation.
                  </p>

                  <button
                    type="button"
                    onClick={requestBuild}
                    className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden bg-ember py-4 font-mono text-[11px] font-bold tracking-[0.25em] text-ink transition-colors duration-300"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <span className="relative">REQUEST THIS BUILD</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
