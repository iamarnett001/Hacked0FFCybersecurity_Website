import type { Metadata } from "next";

import { OverviewForm } from "@/components/overview-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { overview, overviewPath, site } from "@/lib/site";

export const metadata: Metadata = {
  // Leave-behind page: reachable by URL, QR, and a quiet site link — not search.
  robots: { index: false, follow: true },
  title: `${overview.title} — ${site.legalName}`,
  description: overview.lead,
  openGraph: {
    title: `${overview.title} — ${site.legalName}`,
    description: overview.lead,
    type: "website",
    url: `https://${site.domain}${overviewPath}`,
  },
};

export default function OverviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-accent">
              {overview.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.12] font-medium tracking-tight sm:text-5xl">
              {overview.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              {overview.lead}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
              {overview.positioning}
            </p>
            <p className="mt-8 max-w-2xl border-l border-accent/60 pl-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {overview.pricing}
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
              Questions this overview answers
            </p>
            <ol className="mt-8 grid gap-6 md:grid-cols-2">
              {overview.questions.map((question, index) => (
                <li
                  key={question}
                  className="border border-border bg-secondary/40 p-6"
                >
                  <p className="font-heading text-sm text-accent-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-heading text-xl leading-snug font-medium">
                    {question}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/60">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
                What you walk away with
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                A summary of exposure, gaps, and whether the spend matches the
                protection.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {overview.closing}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {overview.delivers.map((item) => (
                <article
                  key={item.title}
                  className="border border-border bg-background p-6"
                >
                  <h3 className="font-heading text-xl font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="request" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
                Request your overview
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                Tell us who you are.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                This is a conversation starter, not a questionnaire that tries
                to replace one. We use these details to size the discussion to
                your company.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-foreground">
                {overview.pricing}
              </p>
            </div>
            <OverviewForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
