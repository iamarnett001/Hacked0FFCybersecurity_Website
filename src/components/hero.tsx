import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--accent) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--accent) 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-end lg:py-32">
        <div className="space-y-8">
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-accent">
            For owners, families, and closely held companies
          </p>
          <h1 className="font-heading text-4xl leading-[1.12] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {site.positioning}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary-foreground px-5 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Request a conversation
            </a>
            <a
              href="#services"
              className="inline-flex h-11 items-center justify-center rounded-md border border-primary-foreground/80 bg-transparent px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              See how we work
            </a>
          </div>
        </div>
        <aside className="border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm md:p-8">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-accent">
            The brief
          </p>
          <p className="mt-4 font-heading text-2xl leading-snug text-primary-foreground">
            Keep hackers off your business.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Family companies and high-net-worth households are attacked because
            the data is valuable and the defenses are thin. We close that gap
            with a named professional you can call.
          </p>
        </aside>
      </div>
    </section>
  );
}
