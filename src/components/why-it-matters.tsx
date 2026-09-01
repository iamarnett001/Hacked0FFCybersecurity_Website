import { supportingFacts, stats } from "@/lib/site";

export function WhyItMatters() {
  return (
    <section id="why" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-accent-foreground/80">
            Why it matters
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            Small businesses are not overlooked. They are preferred.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Headlines follow the Fortune 500. Criminals follow the path of least
            resistance: valuable data, banking access, and no one watching after
            hours. That describes most family and closely held companies.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.value}
              className="bg-background px-5 py-8 md:px-6"
            >
              <p className="font-heading text-4xl tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {stat.label}
              </p>
              <p className="mt-4 text-[11px] tracking-wide text-muted-foreground">
                {stat.source}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {supportingFacts.map((fact) => (
            <article key={fact.title} className="space-y-3">
              <h3 className="font-heading text-xl leading-snug font-medium">
                {fact.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {fact.body}
              </p>
              {"source" in fact && fact.source ? (
                <p className="text-[11px] text-muted-foreground/80">
                  {fact.source}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
