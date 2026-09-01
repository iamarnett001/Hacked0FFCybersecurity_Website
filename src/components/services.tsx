import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
            Services
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
            Three connected services. Use one, or run them as a program.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Each engagement is sized to your environment, operations, and risk —
            not a packaged SKU. The objective is a trusted partner who helps you
            understand risk, improve security, keep technology running, and
            respond when something goes wrong.
          </p>
        </div>

        <ol className="mt-14 space-y-0 divide-y divide-border border-y border-border">
          {services.map((service) => (
            <li
              key={service.number}
              className="grid gap-8 py-10 lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
            >
              <p className="font-heading text-3xl text-accent-foreground/70">
                {service.number}
              </p>
              <div>
                <h3 className="font-heading text-2xl font-medium tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">
                  {service.offer}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.promise}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  What you walk away with
                </p>
                <ul className="mt-4 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
