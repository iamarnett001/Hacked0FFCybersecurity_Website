import { audiences } from "@/lib/site";

export function Audience() {
  return (
    <section className="border-b border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
            Who this is for
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
            Built for businesses where the owners still answer the phone.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="border border-border bg-background p-6 md:p-7"
            >
              <h3 className="font-heading text-xl font-medium">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {audience.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
