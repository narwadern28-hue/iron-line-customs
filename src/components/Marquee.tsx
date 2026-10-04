const ITEMS = [
  "CAFE RACERS",
  "BOBBERS",
  "SCRAMBLERS",
  "FLAT TRACKERS",
  "BRAT STYLE",
  "ADVENTURE",
  "FULL CUSTOM",
  "RESTOMODS",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y hairline bg-coal py-5"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              >
                <span
                  className={
                    (i + half) % 2 === 0
                      ? "font-display text-2xl tracking-wider text-bone/90 sm:text-3xl"
                      : "font-display text-2xl tracking-wider text-outline-faint sm:text-3xl"
                  }
                >
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-ember/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
