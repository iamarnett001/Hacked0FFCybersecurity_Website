import { outcomes } from "@/lib/site";

export function Outcomes() {
  return (
    <section id="outcomes" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
              Outcomes
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
              The value is not a product list. It is what changes for you.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              You should be able to run the company, travel, and sleep without
              wondering who is watching the network. That is the job.
            </p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="bg-background p-6 md:p-7">
                <h3 className="font-heading text-xl font-medium">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {outcome.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
