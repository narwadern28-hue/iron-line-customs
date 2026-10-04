/* ------------------------------------------------------------------ */
/*  IRONLINE CUSTOMS — site data                                       */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "BUILDS", href: "#builds" },
  { label: "CUSTOMISE", href: "#builder" },
  { label: "ABOUT", href: "#about" },
  { label: "WORKSHOP", href: "#workshop" },
  { label: "CONTACT", href: "#contact" },
];

export interface Build {
  id: string;
  no: string;
  name: string;
  model: string;
  desc: string;
  img: string;
  specs: { engine: string; finish: string; stance: string };
}

export const BUILDS: Build[] = [
  {
    id: "blackout",
    no: "01",
    name: "BLACKOUT",
    model: "IR-4 · 650 TWIN BOBBER",
    desc: "A murdered-out street bobber. Cerakote black on black, slammed stance, nothing it doesn't need.",
    img: "/images/build-blackout.jpg",
    specs: { engine: "650cc Parallel Twin", finish: "Matte Cerakote", stance: "Slammed Hardtail" },
  },
  {
    id: "desertx",
    no: "02",
    name: "DESERT X",
    model: "IR-3 · 900 DESERT RACER",
    desc: "Built for red dirt and long horizons. High pipes, knobbies and a tank full of range.",
    img: "/images/build-desert-x.jpg",
    specs: { engine: "900cc V-Twin", finish: "Desert Sand", stance: "Long-Travel" },
  },
  {
    id: "iron-scrambler",
    no: "03",
    name: "IRON SCRAMBLER",
    model: "IR-3 · 900 SCRAMBLER",
    desc: "Raw brushed alloy, spoked wheels and a high-mount exhaust. Street legal, trail ready.",
    img: "/images/build-scrambler.jpg",
    specs: { engine: "900cc Twin", finish: "Brushed Alloy", stance: "Raised Dual-Sport" },
  },
  {
    id: "redline",
    no: "04",
    name: "REDLINE",
    model: "IR-2 · 1000 CAFE RACER",
    desc: "Low clip-ons, rearsets and a hand-formed alloy tank in deep Bloodline red. Our fastest build yet.",
    img: "/images/build-redline.jpg",
    specs: { engine: "1000cc Inline Four", finish: "Bloodline Red", stance: "Track Drop" },
  },
  {
    id: "brat",
    no: "05",
    name: "BRAT CUSTOM",
    model: "IR-1 · 750 BRAT",
    desc: "Flat tan leather, chunky rubber and eucalypt green. The everyday custom done properly.",
    img: "/images/build-brat.jpg",
    specs: { engine: "750cc Twin", finish: "Eucalypt Green", stance: "Street Neutral" },
  },
  {
    id: "outback",
    no: "06",
    name: "OUTBACK",
    model: "IR-5 · 1200 ADVENTURE",
    desc: "Engineered to cross the country and back. Crash protection, racks and 600km of legs.",
    img: "/images/build-outback.jpg",
    specs: { engine: "1200cc Boxer Twin", finish: "Graphite Armour", stance: "Adventure Tall" },
  },
];

/* ------------------------------------------------------------------ */
/*  Configurator                                                       */
/* ------------------------------------------------------------------ */

export type CategoryId =
  | "base"
  | "tank"
  | "paint"
  | "seat"
  | "exhaust"
  | "wheels"
  | "bars"
  | "light";

export interface Option {
  id: string;
  name: string;
  blurb: string;
  price: number;
  stops?: [string, string];
}

export interface BaseOption extends Option {}

export const BASES: BaseOption[] = [
  { id: "roadster", name: "IR-1 ROADSTER", blurb: "The balanced all-rounder street platform.", price: 28900 },
  { id: "cafe", name: "IR-2 CAFE RACER", blurb: "Low, lean and quick. Pure cafe stance.", price: 32900 },
  { id: "scrambler", name: "IR-3 SCRAMBLER", blurb: "High pipes, wide bars, dirt-ready attitude.", price: 34400 },
  { id: "bobber", name: "IR-4 BOBBER", blurb: "Chopped, slammed, matte menace.", price: 36900 },
];

export const TANKS: Option[] = [
  { id: "classic", name: "Classic Teardrop", blurb: "Hand-rolled steel, timeless lines.", price: 0 },
  { id: "tracker", name: "Flat Tracker", blurb: "Race-bred flat track profile.", price: 1400 },
  { id: "peanut", name: "Peanut Tank", blurb: "Compact old-school bobber tank.", price: 900 },
];

export const PAINTS: Option[] = [
  { id: "obsidian", name: "Obsidian Black", blurb: "Deep gloss black, hand-laid clear.", price: 0, stops: ["#101014", "#2c2c33"] },
  { id: "graphite", name: "Brushed Graphite", blurb: "Mechanical grey with steel depth.", price: 1200, stops: ["#3a3b41", "#7c7f88"] },
  { id: "ember", name: "Burnt Ember", blurb: "Our signature house orange.", price: 1800, stops: ["#8a2f0d", "#ff5a1c"] },
  { id: "bloodline", name: "Bloodline Red", blurb: "Deep candy over black base.", price: 1800, stops: ["#5c0d10", "#c41e24"] },
  { id: "sand", name: "Desert Sand", blurb: "Warm outback matte tan.", price: 1500, stops: ["#6e5f44", "#c2ad82"] },
  { id: "eucalypt", name: "Eucalypt Green", blurb: "Muted bush green, satin finish.", price: 1500, stops: ["#1d2c25", "#50695a"] },
  { id: "alloy", name: "Raw Alloy", blurb: "Bare brushed aluminium, clear sealed.", price: 2200, stops: ["#83868d", "#d9dbe0"] },
  { id: "midnight", name: "Midnight Blue", blurb: "Near-black blue under light.", price: 1500, stops: ["#0e1a2b", "#33507a"] },
];

export const SEATS: Option[] = [
  { id: "cafe", name: "Cafe Hump", blurb: "Hand-stitched leather with alloy cowl.", price: 1100 },
  { id: "brat", name: "Brat Flat", blurb: "Long flat pan, two-up friendly.", price: 800 },
  { id: "solo", name: "Sprung Solo", blurb: "Old-school leather saddle on springs.", price: 1300 },
  { id: "trackerpad", name: "Tracker Pad", blurb: "Slim race pad, grippy top.", price: 950 },
];

export const EXHAUSTS: Option[] = [
  { id: "slash", name: "Slash-Cut Low", blurb: "Low stainless system, deep note.", price: 1600 },
  { id: "high", name: "High Scrambler", blurb: "High-mount with drilled heat shield.", price: 2200 },
  { id: "twin", name: "Twin Stack", blurb: "Twin staggered cans, full bark.", price: 2800 },
  { id: "shorty", name: "GP Shorty", blurb: "Short reverse-cone, race bred.", price: 1900 },
];

export const WHEELS: Option[] = [
  { id: "mag", name: "Black Mag", blurb: "Cast alloy, powdercoated black.", price: 0 },
  { id: "spoked", name: "Spoked Chrome", blurb: "Hand-laced stainless spokes.", price: 1500 },
  { id: "bronze", name: "Forged Bronze", blurb: "Forged aluminium, bronze anodised.", price: 2400 },
];

export const BARS: Option[] = [
  { id: "clip", name: "Clip-Ons", blurb: "Low and committed. Cafe proper.", price: 650 },
  { id: "drag", name: "Drag Bar", blurb: "Flat, direct and aggressive.", price: 450 },
  { id: "trackerbar", name: "Tracker Bar", blurb: "Wide bend for leverage and control.", price: 550 },
  { id: "ape", name: "Mini Ape", blurb: "Old-school rise, laid-back reach.", price: 750 },
];

export const LIGHTS: Option[] = [
  { id: "round", name: "Classic Round", blurb: "5¾ inch warm halogen lamp.", price: 0 },
  { id: "halo", name: "LED Halo", blurb: "Full LED ring, ember DRL.", price: 900 },
  { id: "twinpod", name: "Twin Pod", blurb: "Stacked dual projector pods.", price: 1100 },
  { id: "bullet", name: "Bullet Minimal", blurb: "Tiny billet bullet lamp.", price: 500 },
];

export const CATEGORY_OPTIONS: Record<Exclude<CategoryId, "base">, Option[]> = {
  tank: TANKS,
  paint: PAINTS,
  seat: SEATS,
  exhaust: EXHAUSTS,
  wheels: WHEELS,
  bars: BARS,
  light: LIGHTS,
};

export type BuildConfig = Record<CategoryId, string>;

export const DEFAULT_CONFIG: BuildConfig = {
  base: "cafe",
  tank: "classic",
  paint: "obsidian",
  seat: "cafe",
  exhaust: "slash",
  wheels: "spoked",
  bars: "clip",
  light: "round",
};

/** Presets applied when a base platform is selected */
export const BASE_PRESETS: Record<string, Partial<BuildConfig>> = {
  roadster: { tank: "classic", seat: "brat", exhaust: "twin", wheels: "mag", bars: "drag", light: "round" },
  cafe: { tank: "classic", seat: "cafe", exhaust: "slash", wheels: "spoked", bars: "clip", light: "round" },
  scrambler: { tank: "tracker", seat: "trackerpad", exhaust: "high", wheels: "spoked", bars: "trackerbar", light: "bullet" },
  bobber: { tank: "peanut", seat: "solo", exhaust: "shorty", wheels: "mag", bars: "ape", light: "bullet" },
};

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  base: "Base Bike",
  tank: "Tank",
  paint: "Paint",
  seat: "Seat",
  exhaust: "Exhaust",
  wheels: "Wheels",
  bars: "Handlebars",
  light: "Lighting",
};

export const formatAUD = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    quote:
      "I handed them a rough idea and a garage-find donor bike. What rolled out of the workshop six months later stopped traffic. Every detail feels considered — it rides as good as it looks.",
    name: "Marcus Delaney",
    meta: "Melbourne, VIC — REDLINE build",
  },
  {
    quote:
      "The team talked me through every decision, sent photo updates each week and delivered on the quoted price to the dollar. It's the third bike I've owned and the first one that feels truly mine.",
    name: "Sarah Kavanagh",
    meta: "Brisbane, QLD — BRAT CUSTOM build",
  },
  {
    quote:
      "Perth to Broome and back on my OUTBACK build without a single hiccup. These blokes build bikes to be ridden hard, not parked in a showroom. Couldn't recommend them more.",
    name: "Dave Reilly",
    meta: "Perth, WA — OUTBACK build",
  },
];

/* ------------------------------------------------------------------ */
/*  Workshop gallery                                                   */
/* ------------------------------------------------------------------ */

export interface GalleryItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/37517094/pexels-photo-37517094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "TIG welding a custom frame with sparks in a dark workshop",
    tag: "FABRICATION",
    title: "Frame TIG welding",
  },
  {
    src: "https://images.pexels.com/photos/14315283/pexels-photo-14315283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Welder working at night surrounded by sparks",
    tag: "FABRICATION",
    title: "Late-night fabrication",
    tall: true,
  },
  {
    src: "/images/detail-engine.jpg",
    alt: "Close-up of a motorcycle engine with polished cooling fins",
    tag: "ENGINE",
    title: "Engine detailing",
  },
  {
    src: "https://images.pexels.com/photos/8985913/pexels-photo-8985913.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Organised mechanic tools on a workshop cabinet",
    tag: "TOOLING",
    title: "The tool wall",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/3818583/pexels-photo-3818583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Mechanic focused on repairing a motorcycle in the workshop",
    tag: "ASSEMBLY",
    title: "Final assembly",
  },
  {
    src: "https://images.pexels.com/photos/29814453/pexels-photo-29814453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Black motorcycle in a dimly lit garage",
    tag: "DELIVERY",
    title: "Ready for handover",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/16243257/pexels-photo-16243257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Workshop wall with welding equipment and tools",
    tag: "THE SHOP",
    title: "Fabrication bay",
  },
  {
    src: "https://images.pexels.com/photos/32678612/pexels-photo-32678612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Riders with custom motorcycles in a moody garage",
    tag: "DELIVERY",
    title: "Owner handover night",
    tall: true,
  },
];
