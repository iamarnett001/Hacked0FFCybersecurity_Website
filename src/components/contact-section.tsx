import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-muted-foreground">
            Request more information
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
            Tell us what you are trying to protect.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A short note is enough. We will reply from {site.email} with a
            proposed next step — typically a focused conversation, not a demo
            theater.
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            Direct line:{" "}
            <a
              className="text-foreground underline underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
