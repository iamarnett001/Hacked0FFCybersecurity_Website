import { Mark } from "@/components/mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <Mark className="size-6 text-accent" />
            <p className="text-sm tracking-wide">{site.legalName}</p>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/70">
            {site.tagline}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="block text-primary-foreground underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
