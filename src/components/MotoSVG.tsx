import type { BuildConfig } from "../data/site";
import { PAINTS } from "../data/site";

/* Geometry constants — bike faces right, viewBox 0 0 960 620 */
const GROUND = 488;
const REAR = { x: 250, y: 398 };
const FRONT = { x: 706, y: 398 };

const TANK_PATHS: Record<string, string> = {
  classic:
    "M366 288 C362 260 388 236 434 228 C480 220 548 224 588 236 C610 242 619 255 611 269 C601 285 566 294 520 296 C472 298 404 297 380 293 C372 291 367 290 366 288 Z",
  tracker:
    "M366 286 C366 261 392 241 440 236 L562 240 C594 242 612 251 610 263 C608 275 581 285 540 288 L402 291 C382 291 368 289 366 286 Z",
  peanut:
    "M394 282 C390 255 414 234 454 230 C494 226 540 234 553 250 C561 261 553 275 532 282 C500 292 432 292 408 289 C400 287 395 285 394 282 Z",
};

const TANK_CAPS: Record<string, [number, number]> = {
  classic: [496, 232],
  tracker: [506, 243],
  peanut: [478, 234],
};

const SEAT_PATHS: Record<string, { d: string; stitch?: string }> = {
  cafe: {
    d: "M252 296 L380 296 L380 280 L318 276 L316 262 C316 250 306 244 292 244 L268 248 C256 250 250 258 250 272 Z",
    stitch: "M258 264 L312 258 L376 274",
  },
  brat: {
    d: "M246 296 L380 294 L380 278 L254 276 C248 276 244 284 246 296 Z",
    stitch: "M252 284 L374 282",
  },
  solo: {
    d: "M288 322 C288 302 304 292 322 292 C342 292 354 304 352 318 C350 328 340 332 326 332 L304 330 C294 329 288 328 288 322 Z",
    stitch: "M296 306 C306 298 336 298 346 308",
  },
  trackerpad: {
    d: "M240 290 L380 288 L380 276 L252 274 C246 274 240 280 240 290 Z",
    stitch: "M248 281 L374 279",
  },
};

const CSS = `
@keyframes partIn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes partInL { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes partInY { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
@keyframes shineX {
  0% { transform: translateX(-180px) skewX(-18deg); opacity: 0; }
  14% { opacity: .85; }
  68%, 100% { transform: translateX(820px) skewX(-18deg); opacity: 0; }
}
.part-in { animation: partIn .55s cubic-bezier(.22,1,.36,1) both; }
.part-in-l { animation: partInL .55s cubic-bezier(.22,1,.36,1) both; }
.part-in-y { animation: partInY .55s cubic-bezier(.22,1,.36,1) both; }
.shine-loop { animation: shineX 6.5s ease-in-out infinite; }
`;

/* ------------------------------------------------------------------ */

function Wheel({
  cx,
  cy,
  type,
  fat,
}: {
  cx: number;
  cy: number;
  type: string;
  fat?: boolean;
}) {
  const tireW = fat ? 40 : 26;
  const spokes = Array.from({ length: 18 }, (_, i) => (i * 360) / 18);
  const mags = Array.from({ length: 6 }, (_, i) => i * 60);
  const forged = Array.from({ length: 5 }, (_, i) => i * 72);
  const disc = Array.from({ length: 6 }, (_, i) => i * 60);

  return (
    <g key={type + (fat ? "-fat" : "")} className="part-in-y">
      {/* tyre */}
      <circle cx={cx} cy={cy} r={90} fill="none" stroke="#0d0d10" strokeWidth={tireW} />
      <circle cx={cx} cy={cy} r={90} fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={90 - tireW / 2 - 3} fill="none" stroke="#1c1d21" strokeWidth="2.5" strokeDasharray="7 5" />
      {/* rim bed */}
      <circle cx={cx} cy={cy} r={49} fill="#121216" stroke={type === "bronze" ? "#a0713c" : type === "spoked" ? "#d6d9e0" : "#1f2024"} strokeWidth={type === "mag" ? 6 : 4.5} />

      {type === "mag" &&
        mags.map((a) => (
          <rect
            key={a}
            x={cx - 8}
            y={cy - 47}
            width="16"
            height="42"
            rx="6"
            fill="#18191d"
            stroke="#2b2c31"
            strokeWidth="1.5"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}

      {type === "spoked" &&
        spokes.map((a) => (
          <line
            key={a}
            x1={cx + 9 * Math.cos((a * Math.PI) / 180)}
            y1={cy + 9 * Math.sin((a * Math.PI) / 180)}
            x2={cx + 46 * Math.cos(((a + 14) * Math.PI) / 180)}
            y2={cy + 46 * Math.sin(((a + 14) * Math.PI) / 180)}
            stroke="#c9ccd4"
            strokeOpacity="0.75"
            strokeWidth="1.6"
          />
        ))}

      {type === "bronze" &&
        forged.map((a) => (
          <g key={a} transform={`rotate(${a} ${cx} ${cy})`}>
            <line x1={cx} y1={cy} x2={cx - 6} y2={cy - 46} stroke="#a0713c" strokeWidth="7" strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={cx + 6} y2={cy - 46} stroke="#8a5f33" strokeWidth="7" strokeLinecap="round" />
          </g>
        ))}

      {/* brake disc + hub */}
      <circle cx={cx} cy={cy} r={30} fill="#1d1e23" stroke="#34353b" strokeWidth="1.5" />
      {disc.map((a) => (
        <circle
          key={a}
          cx={cx + 22 * Math.cos((a * Math.PI) / 180)}
          cy={cy + 22 * Math.sin((a * Math.PI) / 180)}
          r="2.4"
          fill="#0b0b0d"
        />
      ))}
      <circle cx={cx} cy={cy} r={9} fill="#2b2c31" stroke="#43444a" strokeWidth="1.5" />
    </g>
  );
}

/* ------------------------------------------------------------------ */

export default function MotoSVG({ config }: { config: BuildConfig }) {
  const paint = PAINTS.find((p) => p.id === config.paint) ?? PAINTS[0];
  const [top, bottom] = [paint.stops![1], paint.stops![0]];
  const base = config.base;
  const fatRear = base === "bobber";
  const paintedRearFender = base === "bobber" || base === "cafe" || base === "roadster";
  const tankD = TANK_PATHS[config.tank] ?? TANK_PATHS.classic;
  const capAt = TANK_CAPS[config.tank] ?? TANK_CAPS.classic;
  const seat = SEAT_PATHS[config.seat] ?? SEAT_PATHS.cafe;

  return (
    <svg
      viewBox="0 0 960 620"
      className="h-full w-full"
      role="img"
      aria-label="Live preview of your custom motorcycle configuration"
    >
      <style>{CSS}</style>
      <defs>
        <linearGradient id="paintGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} className="stop-anim" />
          <stop offset="1" stopColor={bottom} className="stop-anim" />
        </linearGradient>
        <linearGradient id="chromeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#585a60" />
          <stop offset="0.45" stopColor="#cfd2d8" />
          <stop offset="1" stopColor="#33343a" />
        </linearGradient>
        <linearGradient id="steelG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2c31" />
          <stop offset="1" stopColor="#141518" />
        </linearGradient>
        <linearGradient id="seatG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a3628" />
          <stop offset="1" stopColor="#221a13" />
        </linearGradient>
        <linearGradient id="tankSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shineG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="spotG" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f4f2ee" stopOpacity="0.13" />
          <stop offset="1" stopColor="#f4f2ee" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lensWarm" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#ffe9c4" />
          <stop offset="0.6" stopColor="#ffb35c" />
          <stop offset="1" stopColor="#8a4a12" />
        </radialGradient>
        <linearGradient id="fadeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <filter id="softGlow" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="blurS" x="-40%" y="-300%" width="180%" height="700%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <pattern id="bpGrid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0 L0 0 0 44" fill="none" stroke="#f4f2ee" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <clipPath id="tankClip">
          <path d={tankD} />
        </clipPath>
        <mask id="reflMask">
          <rect x="0" y={GROUND} width="960" height="132" fill="url(#fadeG)" />
        </mask>
      </defs>

      {/* stage */}
      <rect width="960" height="620" fill="url(#bpGrid)" />
      <ellipse cx="480" cy="150" rx="520" ry="270" fill="url(#spotG)" />

      {/* blueprint dimension lines */}
      <g stroke="#f4f2ee" strokeOpacity="0.16" strokeWidth="1">
        <line x1={REAR.x} y1="556" x2={FRONT.x} y2="556" strokeDasharray="3 4" />
        <line x1={REAR.x} y1="548" x2={REAR.x} y2="564" />
        <line x1={FRONT.x} y1="548" x2={FRONT.x} y2="564" />
        <line x1="888" y1="170" x2="888" y2={GROUND} strokeDasharray="3 4" />
        <line x1="880" y1="170" x2="896" y2="170" />
        <line x1="880" y1={GROUND} x2="896" y2={GROUND} />
      </g>
      <text x="478" y="578" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3" fill="#6a6a6e">
        WHEELBASE 1,456 MM
      </text>
      <text x="906" y="330" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3" fill="#6a6a6e" transform="rotate(-90 906 330)">
        HEIGHT 1,120 MM
      </text>

      {/* ground shadow */}
      <ellipse cx="478" cy={GROUND + 4} rx="352" ry="13" fill="#000" fillOpacity="0.6" filter="url(#blurS)" />

      <g id="bikeG" className="animate-float">
        {/* ---------- rear section ---------- */}

        {/* subframe + swingarm + shock */}
        <g stroke="#26272b" strokeWidth="8" strokeLinecap="round">
          <line x1="332" y1="274" x2="256" y2="298" />
          <line x1="446" y1="388" x2="262" y2="396" strokeWidth="13" stroke="#1d1e22" />
        </g>
        <line x1="308" y1="296" x2="268" y2="382" stroke="#3a3b41" strokeWidth="7" strokeLinecap="round" />
        <line x1="308" y1="296" x2="268" y2="382" stroke="#4a4b52" strokeWidth="2" strokeDasharray="4 3" />

        {/* chain */}
        <line x1="428" y1="384" x2="252" y2="396" stroke="#38393f" strokeWidth="3" strokeDasharray="5 4" strokeOpacity="0.85" />

        {/* rear wheel */}
        <g transform={`translate(${REAR.x} ${REAR.y})`}>
          <circle r="104" fill="none" stroke="#f4f2ee" strokeOpacity="0.06" strokeDasharray="2 6" />
        </g>
        <Wheel cx={REAR.x} cy={REAR.y} type={config.wheels} fat={fatRear} />

        {/* rear fender */}
        {paintedRearFender && base === "bobber" && (
          <path d="M146 380 A106 106 0 0 1 268 294" fill="none" stroke="url(#paintGrad)" strokeWidth="14" strokeLinecap="round" className="part-in" key="rf-b" />
        )}
        {paintedRearFender && base !== "bobber" && (
          <path d="M158 345 A106 106 0 0 1 241 292" fill="none" stroke="url(#paintGrad)" strokeWidth="9" strokeLinecap="round" className="part-in" key="rf-s" />
        )}
        {base === "scrambler" && (
          <path d="M164 338 A104 104 0 0 1 244 296" fill="none" stroke="#1b1c1f" strokeWidth="9" strokeLinecap="round" className="part-in" key="rf-sc" />
        )}

        {/* ---------- engine ---------- */}
        <g>
          <rect x="398" y="332" width="150" height="70" rx="12" fill="url(#steelG)" stroke="#2e2f34" strokeWidth="1.5" />
          {[344, 354, 364, 374, 384, 394].map((yy) => (
            <line key={yy} x1="404" y1={yy} x2="542" y2={yy} stroke="#0b0b0d" strokeWidth="3" strokeOpacity="0.8" />
          ))}
          {/* cylinder */}
          <g transform="rotate(-10 545 308)">
            <rect x="514" y="274" width="64" height="66" rx="8" fill="#232429" stroke="#33343a" strokeWidth="1.5" />
            {[284, 294, 304, 314, 324, 334].map((yy) => (
              <line key={yy} x1="518" y1={yy} x2="574" y2={yy} stroke="#0e0e10" strokeWidth="3" />
            ))}
          </g>
          {/* crankcase */}
          <circle cx="468" cy="392" r="48" fill="url(#steelG)" stroke="#34353b" strokeWidth="1.5" />
          <circle cx="468" cy="392" r="30" fill="#191a1d" stroke="#2e2f34" strokeWidth="1.5" />
          <circle cx="468" cy="392" r="10" fill="#26272c" stroke="#3d3e44" strokeWidth="1.5" />
          {/* intake */}
          <circle cx="420" cy="322" r="16" fill="#141518" stroke="#2e2f34" strokeWidth="1.5" />
          <circle cx="420" cy="322" r="7" fill="#0b0b0d" />
          {/* skid plate (scrambler) */}
          {base === "scrambler" && (
            <g className="part-in" key="skid">
              <line x1="406" y1="424" x2="540" y2="424" stroke="#26272b" strokeWidth="10" strokeLinecap="round" />
              <line x1="416" y1="419" x2="422" y2="402" stroke="#26272b" strokeWidth="6" strokeLinecap="round" />
              <line x1="530" y1="419" x2="536" y2="402" stroke="#26272b" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* ---------- exhaust ---------- */}
        <g key={config.exhaust} className="part-in-l" strokeLinecap="round" fill="none">
          {config.exhaust === "slash" && (
            <>
              <path d="M606 296 C640 306 652 336 636 358 C618 382 560 392 496 395 L320 399" stroke="url(#chromeG)" strokeWidth="15" />
              <path d="M320 399 L238 403" stroke="url(#chromeG)" strokeWidth="26" />
              <ellipse cx="232" cy="403" rx="7" ry="14" fill="#0a0a0c" stroke="#2e2f34" strokeWidth="2" />
            </>
          )}
          {config.exhaust === "high" && (
            <>
              <path d="M606 296 C638 304 648 328 636 344 C620 364 566 370 508 368 C432 366 352 352 304 331" stroke="url(#chromeG)" strokeWidth="15" />
              <path d="M304 331 L240 313" stroke="url(#chromeG)" strokeWidth="23" />
              <path d="M296 322 L246 307" stroke="#26272b" strokeWidth="7" strokeDasharray="3 7" />
              <ellipse cx="234" cy="311" rx="6.5" ry="12" fill="#0a0a0c" stroke="#2e2f34" strokeWidth="2" />
            </>
          )}
          {config.exhaust === "twin" && (
            <>
              <path d="M606 296 C640 308 646 332 632 348 C612 368 560 372 500 371 L272 352" stroke="url(#chromeG)" strokeWidth="12" />
              <path d="M606 306 C636 316 640 344 622 362 C600 382 548 388 492 387 L276 372" stroke="url(#chromeG)" strokeWidth="12" />
              <path d="M272 352 L242 346" stroke="url(#chromeG)" strokeWidth="15" />
              <path d="M276 372 L246 368" stroke="url(#chromeG)" strokeWidth="15" />
              <circle cx="240" cy="346" r="5" fill="#0a0a0c" />
              <circle cx="244" cy="368" r="5" fill="#0a0a0c" />
            </>
          )}
          {config.exhaust === "shorty" && (
            <>
              <path d="M606 296 C646 308 652 342 630 362 C606 384 540 390 476 390 L428 390" stroke="url(#chromeG)" strokeWidth="15" />
              <path d="M428 390 L362 391" stroke="url(#chromeG)" strokeWidth="32" />
              <ellipse cx="356" cy="391" rx="8" ry="15" fill="#0a0a0c" stroke="#2e2f34" strokeWidth="2" />
            </>
          )}
        </g>

        {/* ---------- frame ---------- */}
        <g stroke="#222327" strokeLinecap="round" fill="none">
          <line x1="648" y1="240" x2="334" y2="274" strokeWidth="10" />
          <line x1="638" y1="252" x2="545" y2="396" strokeWidth="10" />
          <line x1="334" y1="274" x2="446" y2="392" strokeWidth="9" />
          <line x1="446" y1="392" x2="545" y2="396" strokeWidth="9" />
          <circle cx="640" cy="248" r="10" fill="#17181b" stroke="#33343a" strokeWidth="2" />
        </g>

        {/* ---------- front end ---------- */}
        <g transform={`translate(${FRONT.x} ${FRONT.y})`}>
          <circle r="104" fill="none" stroke="#f4f2ee" strokeOpacity="0.06" strokeDasharray="2 6" />
        </g>
        <Wheel cx={FRONT.x} cy={FRONT.y} type={config.wheels} />

        {/* front fender */}
        {(base === "roadster" || base === "cafe") && (
          <path d="M616 346 A104 104 0 0 1 796 346" fill="none" stroke="url(#paintGrad)" strokeWidth="11" strokeLinecap="round" className="part-in" key="ff-low" />
        )}
        {(base === "scrambler" || base === "bobber") && (
          <path d="M657 313 A98 98 0 0 1 755 313" fill="none" stroke={base === "bobber" ? "url(#paintGrad)" : "#1b1c1f"} strokeWidth="10" strokeLinecap="round" className="part-in" key="ff-high" />
        )}

        {/* forks */}
        <g strokeLinecap="round">
          <line x1="638" y1="244" x2="704" y2="396" stroke="#26272b" strokeWidth="13" />
          <line x1="642" y1="254" x2="700" y2="382" stroke="#3c3d43" strokeWidth="4" />
          {/* triple clamp */}
          <line x1="622" y1="240" x2="656" y2="250" stroke="#1a1b1e" strokeWidth="9" />
        </g>

        {/* ---------- tank ---------- */}
        <g key={config.tank} className="part-in-y">
          <path d={tankD} fill="url(#paintGrad)" stroke="#0c0c0e" strokeWidth="2" />
          <path d={tankD} fill="url(#tankSheen)" opacity="0.35" />
          <g clipPath="url(#tankClip)">
            <rect className="shine-loop" x="180" y="196" width="90" height="130" fill="url(#shineG)" />
          </g>
          <circle cx={capAt[0]} cy={capAt[1]} r="6" fill="#1a1b1e" stroke="#43444a" strokeWidth="1.5" />
        </g>

        {/* ---------- seat ---------- */}
        <g key={config.seat} className="part-in-l">
          <path d={seat.d} fill="url(#seatG)" stroke="#120d09" strokeWidth="1.5" />
          {seat.stitch && (
            <path d={seat.stitch} fill="none" stroke="#b98a5a" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.55" />
          )}
          {config.seat === "solo" && (
            <g stroke="#3a3b41" strokeWidth="3" strokeLinecap="round">
              <path d="M306 332 l6 5 -6 5 6 5" fill="none" />
              <path d="M336 332 l6 5 -6 5 6 5" fill="none" />
            </g>
          )}
        </g>

        {/* ---------- handlebars ---------- */}
        <g key={config.bars} className="part-in-y" strokeLinecap="round" fill="none">
          {config.bars === "clip" && (
            <>
              <line x1="634" y1="252" x2="612" y2="263" stroke="#c7cad1" strokeWidth="5" />
              <line x1="612" y1="263" x2="598" y2="268" stroke="#131318" strokeWidth="10" />
            </>
          )}
          {config.bars === "drag" && (
            <>
              <line x1="636" y1="240" x2="594" y2="247" stroke="#c7cad1" strokeWidth="5" />
              <line x1="594" y1="247" x2="580" y2="249" stroke="#131318" strokeWidth="10" />
            </>
          )}
          {config.bars === "trackerbar" && (
            <>
              <line x1="636" y1="242" x2="627" y2="227" stroke="#8f9298" strokeWidth="6" />
              <line x1="627" y1="227" x2="576" y2="221" stroke="#c7cad1" strokeWidth="5" />
              <line x1="576" y1="221" x2="562" y2="223" stroke="#131318" strokeWidth="10" />
            </>
          )}
          {config.bars === "ape" && (
            <>
              <path d="M636 240 C628 210 618 192 604 176" stroke="#c7cad1" strokeWidth="5" />
              <line x1="604" y1="176" x2="586" y2="181" stroke="#c7cad1" strokeWidth="5" />
              <line x1="586" y1="181" x2="573" y2="184" stroke="#131318" strokeWidth="10" />
            </>
          )}
        </g>

        {/* ---------- lighting ---------- */}
        <g key={config.light} className="part-in">
          <line x1="646" y1="256" x2="664" y2="270" stroke="#26272b" strokeWidth="4" strokeLinecap="round" />
          {config.light === "round" && (
            <>
              <circle cx="674" cy="281" r="25" fill="#ffb35c" opacity="0.22" filter="url(#softGlow)" />
              <circle cx="674" cy="281" r="20" fill="#141518" stroke="#33343a" strokeWidth="2.5" />
              <circle cx="674" cy="281" r="13" fill="url(#lensWarm)" />
            </>
          )}
          {config.light === "halo" && (
            <>
              <circle cx="674" cy="281" r="24" fill="#ff4d15" opacity="0.3" filter="url(#softGlow)" />
              <circle cx="674" cy="281" r="19" fill="#0b0b0d" stroke="#ff5a1c" strokeWidth="5" />
              <circle cx="674" cy="281" r="6" fill="#ffd0a8" />
            </>
          )}
          {config.light === "twinpod" && (
            <>
              <circle cx="668" cy="268" r="11" fill="#141518" stroke="#33343a" strokeWidth="2" />
              <circle cx="668" cy="268" r="6" fill="url(#lensWarm)" />
              <circle cx="680" cy="291" r="11" fill="#141518" stroke="#33343a" strokeWidth="2" />
              <circle cx="680" cy="291" r="6" fill="url(#lensWarm)" />
            </>
          )}
          {config.light === "bullet" && (
            <>
              <ellipse cx="672" cy="278" rx="13" ry="9" fill="#1a1b1e" stroke="#3d3e44" strokeWidth="1.5" />
              <circle cx="678" cy="278" r="4" fill="url(#lensWarm)" />
            </>
          )}
        </g>

        {/* foot peg + axles */}
        <rect x="438" y="410" width="34" height="6" rx="3" fill="#1d1e22" stroke="#33343a" />
        <circle cx={FRONT.x} cy={FRONT.y} r="7" fill="#26272c" stroke="#43444a" strokeWidth="1.5" />
        <circle cx={REAR.x} cy={REAR.y} r="7" fill="#26272c" stroke="#43444a" strokeWidth="1.5" />
      </g>

      {/* reflection */}
      <use href="#bikeG" transform={`translate(0 ${GROUND * 2}) scale(1 -1)`} opacity="0.055" mask="url(#reflMask)" />

      {/* ground line */}
      <line x1="60" y1={GROUND} x2="900" y2={GROUND} stroke="#f4f2ee" strokeOpacity="0.1" />
    </svg>
  );
}
