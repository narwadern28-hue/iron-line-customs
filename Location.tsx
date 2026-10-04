import { MapPin, Navigation, Phone, Truck } from "lucide-react";
import Reveal, { SectionHead } from "./Reveal";

const CITIES = ["BNE", "SYD", "MEL", "PER", "ADE", "HBA", "DRW"];

function AustraliaMap() {
  return (
    <svg
      viewBox="0 0 600 520"
      className="h-full w-full"
      role="img"
      aria-label="Stylised map of Australia with the workshop marked in Brisbane, Queensland"
    >
      <defs>
        <radialGradient id="mapGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff4d15" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ff4d15" stopOpacity="0" />
        </radialGradient>
        <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 0 40" fill="none" stroke="#f4f2ee" strokeOpacity="0.05" />
        </pattern>
      </defs>

      <rect width="600" height="520" fill="url(#mapGrid)" />
      <ellipse cx="300" cy="260" rx="270" ry="230" fill="url(#mapGlow)" />

      {/* Australia — stylised outline */}
      <g>
        <path
          d="M468 66 C480 96 498 132 482 180 C475 210 468 240 476 290 C478 320 465 350 445 380 C430 400 415 425 398 440 C375 432 355 418 338 402 C330 385 332 365 322 348 C305 360 285 365 268 352 C235 352 190 350 152 342 C120 340 92 348 78 330 C68 300 70 260 80 210 C92 175 105 155 126 150 C150 130 170 105 205 88 C235 68 260 72 285 80 C300 60 330 62 350 74 C375 95 385 118 398 132 C420 110 445 88 468 66 Z"
          fill="#f4f2ee"
          fillOpacity="0.045"
          stroke="#f4f2ee"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Tasmania */}
        <path
          d="M395 470 C405 462 420 462 426 472 C430 482 420 495 406 495 C394 494 388 480 395 470 Z"
          fill="#f4f2ee"
          fillOpacity="0.045"
          stroke="#f4f2ee"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>

      {/* internal route hints */}
      <g stroke="#f4f2ee" strokeOpacity="0.1" strokeDasharray="2 6" strokeWidth="1">
        <path d="M477 296 L330 415" fill="none" />
        <path d="M477 296 L210 250" fill="none" />
        <path d="M477 296 L433 305" fill="none" />
      </g>

      {/* workshop pin — Brisbane */}
      <g>
        <line x1="477" y1="296" x2="530" y2="238" stroke="#ff4d15" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="477" cy="296" r="26" fill="#ff4d15" fillOpacity="0.14" className="animate-ping-soft" />
        <circle cx="477" cy="296" r="13" fill="#ff4d15" fillOpacity="0.25" />
        <circle cx="477" cy="296" r="5.5" fill="#ff4d15" stroke="#0a0a0b" strokeWidth="2" />
        <text x="536" y="234" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2.5" fill="#f4f2ee">
          WORKSHOP HQ
        </text>
        <text x="536" y="249" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2.5" fill="#a3a09a">
          BRISBANE, QLD
        </text>
      </g>

      {/* corner + figure marks */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="3" fill="#6a6a6e">
        <text x="24" y="34">FIG. 01 — AUS</text>
        <text x="24" y="496">27.4705° S / 153.0260° E</text>
        <text x="470" y="496">SERVICE: NATIONWIDE</text>
      </g>
      <g stroke="#f4f2ee" strokeOpacity="0.25" strokeWidth="1">
        <path d="M24 46 h24 M24 46 v24" fill="none" />
        <path d="M576 470 h-24 M576 470 v-24" fill="none" />
      </g>
    </svg>
  );
}

export default function Location() {
  return (
    <section id="location" className="relative py-24 sm:py-32" aria-label="Workshop location">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            index="08"
            kicker="LOCATION"
            title={
              <>
                AUSTRALIA
                <br />
                <span className="text-outline">WORKSHOP HQ</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ash">
              Custom Motorcycle Workshop. Our fabrication shop is based in
              Brisbane, Queensland — and our builds are delivered and supported
              across the entire country.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <ul className="mt-9 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border hairline text-ember">
                  <MapPin className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide text-bone">Brisbane, Queensland</p>
                  <p className="mt-1 text-sm text-ash">Workshop visits by appointment only.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border hairline text-ember">
                  <Truck className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide text-bone">Australia-wide delivery</p>
                  <p className="mt-1 text-sm text-ash">Enclosed transport to every state and territory.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border hairline text-ember">
                  <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide text-bone">Remote consults</p>
                  <p className="mt-1 text-sm text-ash">Phone and video consultations for interstate builds.</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-ash/70">
                <Navigation className="h-3 w-3 text-ember" /> BUILD DELIVERIES:
              </span>
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="border hairline px-2.5 py-1.5 font-mono text-[9px] tracking-[0.25em] text-ash transition-colors hover:border-ember/60 hover:text-bone"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="brushed relative border hairline p-2">
            <div className="aspect-[6/5]">
              <AustraliaMap />
            </div>
            <span className="absolute bottom-4 right-4 border border-bone/10 bg-ink/70 px-3 py-1.5 font-mono text-[8px] tracking-[0.3em] text-ash backdrop-blur-sm">
              STYLISED MAP — NOT TO SCALE
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
