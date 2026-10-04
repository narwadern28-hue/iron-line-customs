import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";
import { cn } from "../utils/cn";

const BUDGETS = ["A$15,000 – A$25,000", "A$25,000 – A$40,000", "A$40,000 – A$60,000", "A$60,000+", "Not sure yet"];

const field =
  "w-full border hairline bg-ink/60 px-4 py-3.5 text-sm text-bone placeholder:text-ash/50 transition-all duration-300 focus:border-ember focus:bg-ink focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bike: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [flash, setFlash] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  /* Prefill from the configurator */
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, message: `I'd like to request the following build:\n\n${detail}` }));
      setFlash(true);
      setSent(false);
      window.setTimeout(() => setFlash(false), 2600);
    };
    window.addEventListener("ir:build-request", onPrefill);
    return () => window.removeEventListener("ir:build-request", onPrefill);
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.name.trim()) errs.push("name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.push("email");
    if (!form.message.trim()) errs.push("message");
    setErrors(errs);
    if (errs.length) return;
    setSent(true);
  };

  const ref = `IR-${String(new Date().getFullYear()).slice(2)}-${String(form.name.length * 7 + form.message.length + 41).padStart(4, "0")}`;

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32" aria-label="Start your build — contact">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
      <div aria-hidden="true" className="absolute -right-48 bottom-0 h-[520px] w-[520px] rounded-full bg-ember/6 blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-10 hidden select-none font-display text-[13rem] leading-none text-outline-faint opacity-40 xl:block">
        RIDE
      </div>

      <div className="wrap relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* left copy */}
        <div>
          <SectionHead
            index="09"
            kicker="CONTACT — START YOUR BUILD"
            title={
              <>
                YOUR BIKE.
                <br />
                <span className="text-outline-ember">YOUR VISION.</span>
              </>
            }
            sub="Tell us what you want to build. We'll come back within two business days with ideas, rough pricing and the next step."
          />

          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-5">
              <li>
                <a
                  href="mailto:builds@ironlinecustoms.com.au"
                  className="group flex items-center gap-4 text-sm text-ash transition-colors hover:text-bone"
                >
                  <span className="grid h-11 w-11 place-items-center border hairline text-ember transition-colors group-hover:border-ember">
                    <Mail className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  builds@ironlinecustoms.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61730000426"
                  className="group flex items-center gap-4 text-sm text-ash transition-colors hover:text-bone"
                >
                  <span className="grid h-11 w-11 place-items-center border hairline text-ember transition-colors group-hover:border-ember">
                    <Phone className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  +61 7 3000 0426
                </a>
              </li>
              <li className="flex items-center gap-4 text-sm text-ash">
                <span className="grid h-11 w-11 place-items-center border hairline text-ember">
                  <MapPin className="h-4 w-4" strokeWidth={1.8} />
                </span>
                Brisbane, Queensland — visits by appointment
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 border hairline bg-panel/50 p-5">
              <p className="font-mono text-[9px] tracking-[0.3em] text-ember">CURRENT LEAD TIME</p>
              <p className="mt-2 text-sm leading-relaxed text-ash">
                We're booking builds <span className="font-semibold text-bone">4–6 months</span> ahead.
                A deposit secures your slot in the fabrication queue.
              </p>
            </div>
          </Reveal>
        </div>

        {/* right form */}
        <Reveal delay={0.15}>
          <div className={cn("brushed relative border p-6 transition-colors duration-700 sm:p-8", flash ? "border-ember/70" : "hairline")}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid h-16 w-16 place-items-center border border-ember/50 bg-ember/10 text-ember">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-7 font-display text-3xl tracking-wider text-bone">
                    BUILD REQUEST RECEIVED
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash">
                    Thanks {form.name.split(" ")[0] || "rider"} — your request is in the
                    queue. Reference <span className="font-mono text-ember">{ref}</span>.
                    We'll be in touch within two business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", phone: "", location: "", bike: "", budget: "", message: "" });
                    }}
                    className="mt-8 border hairline px-6 py-3 font-mono text-[10px] tracking-[0.25em] text-ash transition-colors hover:border-ember hover:text-ember"
                  >
                    SEND ANOTHER REQUEST
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        NAME *
                      </label>
                      <input
                        id="f-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={set("name")}
                        aria-invalid={errors.includes("name")}
                        placeholder="Jack Thompson"
                        className={cn(field, errors.includes("name") && "border-blood/70")}
                      />
                    </div>
                    <div>
                      <label htmlFor="f-email" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        EMAIL *
                      </label>
                      <input
                        id="f-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={set("email")}
                        aria-invalid={errors.includes("email")}
                        placeholder="jack@example.com.au"
                        className={cn(field, errors.includes("email") && "border-blood/70")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-phone" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        PHONE
                      </label>
                      <input
                        id="f-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="04XX XXX XXX"
                        className={field}
                      />
                    </div>
                    <div>
                      <label htmlFor="f-location" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        LOCATION
                      </label>
                      <input
                        id="f-location"
                        type="text"
                        autoComplete="address-level2"
                        value={form.location}
                        onChange={set("location")}
                        placeholder="City / State"
                        className={field}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-bike" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        MOTORCYCLE / BASE MODEL
                      </label>
                      <input
                        id="f-bike"
                        type="text"
                        value={form.bike}
                        onChange={set("bike")}
                        placeholder="e.g. IR-2 Cafe Racer, or your donor bike"
                        className={field}
                      />
                    </div>
                    <div>
                      <label htmlFor="f-budget" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                        BUDGET (AUD)
                      </label>
                      <select
                        id="f-budget"
                        value={form.budget}
                        onChange={set("budget")}
                        className={cn(field, "appearance-none bg-ink", !form.budget && "text-ash/50")}
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="text-bone">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-message" className="mb-2 block font-mono text-[9px] tracking-[0.3em] text-ash">
                      TELL US ABOUT YOUR BUILD *
                    </label>
                    <textarea
                      id="f-message"
                      ref={msgRef}
                      rows={6}
                      value={form.message}
                      onChange={set("message")}
                      aria-invalid={errors.includes("message")}
                      placeholder="Style, stance, colours, how you ride, must-haves… or hit REQUEST THIS BUILD in the configurator to prefill this."
                      className={cn(field, "resize-none leading-relaxed", errors.includes("message") && "border-blood/70")}
                    />
                  </div>

                  {errors.length > 0 && (
                    <p className="font-mono text-[10px] tracking-[0.15em] text-blood" role="alert">
                      PLEASE COMPLETE THE HIGHLIGHTED FIELDS.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-ember py-4 font-mono text-[11px] font-bold tracking-[0.25em] text-ink"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <span className="relative">SUBMIT BUILD REQUEST</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
